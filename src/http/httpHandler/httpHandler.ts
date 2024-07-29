// [ Modules ] ///////////////////////////////////////////////////////////////////
import { parseBEDEV1ErrorFromStringAndHeaders, parseBEDEV2ErrorFromStringAndHeaders } from "parse-roblox-errors"
import jwkToPem from 'jwk-to-pem'
import { HBAClient } from "roblox-bat"

import { HttpError, HttpResponse } from "../http.utils"
import { FetchAdapter } from "../httpAdapters/fetchHttpAdapter"
import { getConfig } from "../../config"
import { removeNullUndefined } from "../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Credentials, HttpHandlerProps } from "../http.utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
let savedCsrfToken = ""
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const objectToFormData = (formDataObject?: Record<string, any>, rawFormData?: FormData) => {
  if (!formDataObject) return
  const formData = rawFormData || new FormData()

  Object.entries(formDataObject).forEach(([key, value]) => formData.append(key, value?.constructor == Object ? JSON.stringify(value) : value))

  return formData
}

export const isOpenCloudUrl = (url: string): boolean =>
  url.startsWith("https://apis.roblox.com/cloud") ||
  url.startsWith("https://apis.roblox.com/datastore") ||
  url.startsWith("https://apis.roblox.com/messaging-service") ||
  url.startsWith("https://apis.roblox.com/ordered-data-stores") ||
  url.startsWith("https://apis.roblox.com/assets")

export const detectBEDEVVersionForUrl = (url: string): 1 | 2 | undefined => {
  const urlObject = new URL(url)

  if (urlObject.host == "apis.roblox.com") return 2
  if (urlObject.host.endsWith(".roblox.com")) return 1
  return undefined
}

export const getParsedErrors = async (response: HttpResponse): Promise<any> => {
  const BEDEVVersion = detectBEDEVVersionForUrl(response.url)
  return BEDEVVersion == 1 ?
    await parseBEDEV1ErrorFromStringAndHeaders(JSON.stringify(response.body), response.headers as any as Headers)
  : BEDEVVersion == 2 ?
    await parseBEDEV2ErrorFromStringAndHeaders(JSON.stringify(response.body), response.headers as any as Headers)
  : undefined
}


function stringToArrayBuffer(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const arrayBufferToString = (buf: ArrayBuffer) => String.fromCharCode.apply<null, any, string>(null, new Uint8Array(buf))

const exportPrivateKey = async (key: CryptoKey) => btoa(arrayBufferToString(await crypto.subtle.exportKey("pkcs8", key)))
const exportPublicKey = async (key: CryptoKey) => btoa(arrayBufferToString(await crypto.subtle.exportKey("spki", key)))

const importPrivateKey = async (key: string) => await crypto.subtle.importKey(
  "pkcs8", stringToArrayBuffer(atob(key)), { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"]
)
const importPublicKey = async (key: string) => await crypto.subtle.importKey(
  "spki", stringToArrayBuffer(atob(key)), { name: "ECDSA", namedCurve: "P-256" }, true, []
)


const createHbaKeys = async () => {
  const keyPair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign"])
  return {
    private: await exportPrivateKey(keyPair.privateKey),
    public: await exportPublicKey(keyPair.publicKey)
  }
}

const importHbaKeys = async (keys: { private: string, public: string }): Promise<CryptoKeyPair> => {
  return { privateKey: await importPrivateKey(keys.private), publicKey: await importPublicKey(keys.public) }
}
//////////////////////////////////////////////////////////////////////////////////


export const HttpHandler = async <RawData extends any = any>(
  { url, method, headers, body, formData, rawFormData }: HttpHandlerProps, { cookie, cloudKey, oauthToken }: Credentials
) => {
  const configHttp = getConfig()?.http
  const adapter = configHttp?.adapter || FetchAdapter
  const maxCsrfAttempts = configHttp?.csrfMaxAttempts || 2

  let currentCsrfAttempt = 1

  const parsedFormData = objectToFormData(formData, rawFormData)

  const requestData = {
    url, method,
    body: body?.constructor == Object ? JSON.stringify(body) : body,
    formData: parsedFormData,
  }



  /*const hbaClient = new HBAClient({
    cookie,
    keys: await importHbaKeys({ private: process.env.ROBLOX_HBA_PRIVATE_KEY as string, public: process.env.ROBLOX_HBA_PUBLIC_KEY as string })
  });

  const hbaHeaders = await hbaClient.generateBaseHeaders(
    url,
    true, // set to false or undefined if not authenticated
    body
  );*/


  const requestDataHeaders = removeNullUndefined({
    Cookie: cookie as string,
    "x-api-key": cloudKey,
    Authorization: oauthToken && `Bearer ${oauthToken}`,
    "Content-Type": headers?.["Content-Type"] || (!((formData && Object.keys(formData)?.length) || rawFormData) && "application/json" || null),
    ...headers,
    //...hbaHeaders,
  })

  const handlerMain = async (): Promise<HttpResponse<RawData> | HttpError> => {
    try {
      const response = await adapter<RawData>({ ...requestData, headers: { ...requestDataHeaders, "x-csrf-token": savedCsrfToken } })
      if (!response.success) throw response

      return response

    } catch (error) {
      if (!(error instanceof HttpResponse)) throw error

      if (currentCsrfAttempt > maxCsrfAttempts) throw new HttpError("Csrf", error, await getParsedErrors(error))

      const responseCsrfToken = error.headers.get("x-csrf-token")
      if (error.statusCode != 403 || (!responseCsrfToken)) {
        // Not a csrf error.
        throw new HttpError("Generic", error, await getParsedErrors(error))

      } else {
        // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
        if (cookie == getConfig()?.cookie) savedCsrfToken = responseCsrfToken

        // retries the request with the new csrf token.
        currentCsrfAttempt++
        return handlerMain()
      }
    }
  }

  return await handlerMain()
}