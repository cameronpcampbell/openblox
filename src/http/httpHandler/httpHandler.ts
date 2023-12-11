// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { HBAClient } from "roblox-bat";

import { FetchAdapter } from "../httpAdapters/fetchAdapter"
import { AgnosticResponse } from "../httpAdapters"
import { NoCsrfTokenError } from "../../errors"
import { buildFullUrl, handleErrors, isOpenCloudUrl, isUrlAccountSessionProtected, md5HashOfReqBody } from "./httpHandler.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { SecureUrl } from "../../utils/utils.types"

import type { HttpHandlerConfig, HttpRequestConfigSafeMethod, HttpRequestConfigUnsafeMethod, MethodResponse } from "./httpHandler.types"
import { getOpenbloxConfig } from "../../config"
import { buildCacheKey } from "../../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const HttpHandler = ({
  cookie, cloudKey, caching, maxCsrfAttempts=1, httpAdapter=FetchAdapter, hardwareBackedAuthentication
}: HttpHandlerConfig) => {
  const hbaClient = hardwareBackedAuthentication && new HBAClient({ onSite: true })

  const cacheAdapters = caching?.adapters
  let savedCSRFToken = ""
  let openbloxConfig: ReturnType<typeof getOpenbloxConfig>

  const unsafeMethod = (httpMethodName: "post" | "patch" | "delete" | "get") => {
    let thisMethod = async <ResponseBody = void>(
      url: SecureUrl,
      { overrides, searchParams, validStatusCodes, body, formData, csrfData, headers, apiName, methodName }: HttpRequestConfigUnsafeMethod
    ): MethodResponse<ResponseBody> => {
      let cookieToUse
      try {
        // If the key "shouldNotCacheMethods" exists in overrides then it means there are no overrides.
        overrides = !((overrides as any)?.shouldNotCacheMethods) ? overrides : undefined
        if (!openbloxConfig) openbloxConfig = getOpenbloxConfig()

        const fullUrl = searchParams ? buildFullUrl(url, searchParams) : url
        const [ credentialsOverride, cacheSettingsOverride ] = [ overrides?.credentials, overrides?.cacheSettings ]

        // builds the key used for caching if caching is enabled
        /*const cacheKey = cacheAdapters && buildCacheKey(
          openbloxConfig?.caching?.keyPrefix ?? "openblox", fullUrl,
          md5HashOfReqBody(body ?? formData),
          openbloxConfig._hash,
          overrides?._hashes?._credentialsOverrideHash
        )*/

        // Returns cached version if it exists.
        /*const { cacheMetadata, rawBodyAndData } = cacheAdapters ?
          await (openbloxConfig.cache as ReturnType<typeof cacheHandler>).get<ResponseBody>(cacheKey as string, cacheSettingsOverride, apiName, methodName)
        : { cacheMetadata: { key: cacheKey, type: "DISABLED", apiName, methodName } as CacheMetadata, rawBodyAndData: undefined }
        const cacheType = cacheMetadata.type
        if (cacheType == "HIT") return { rawBody: rawBodyAndData?.rawBody as ResponseBody, cacheMetadata }*/

        const isOpenCloud = isOpenCloudUrl(fullUrl)

        // gets hba (hardware backed authentication) headers.
        const hbaHeaders = ((!isOpenCloud) && hbaClient) && isUrlAccountSessionProtected(fullUrl, httpMethodName) ?
          await hbaClient.generateBaseHeaders(fullUrl, !!cookie, body)
        : {}

        // Makes request.
        cookieToUse = !isOpenCloud && (credentialsOverride?.cookie || cookie)
        const response = await httpAdapter[httpMethodName](fullUrl, {
          body, formData,
          headers: {
            Cookie: cookieToUse,
            "x-api-key": isOpenCloud && (credentialsOverride?.cloudKey || cloudKey),
            "x-csrf-token": csrfData?.token || savedCSRFToken,
            "Authorization": (isOpenCloud && credentialsOverride?.oauthToken) && `Bearer ${ credentialsOverride?.oauthToken }`,
            ...headers,
            ...hbaHeaders
          }
        })
        const responseStatusCode = response.statusCode
        if (response && (responseStatusCode != 200 && !validStatusCodes?.includes(responseStatusCode))) throw response

        // Returns uncached data and response.
        return { rawBody: response.body, cacheMetadata: {} as any, response }

      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) {
          const responseCsrfToken = error.headers.get("x-csrf-token")
          if (error.statusCode === 403 && responseCsrfToken) {
            
            
            // Retries the request but with the csrf token
            const currentCsrfAttempts = csrfData?.attempts ?? 1
            if (responseCsrfToken && currentCsrfAttempts <= maxCsrfAttempts) {
              // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
              if (savedCSRFToken != responseCsrfToken && cookieToUse == cookie) savedCSRFToken = responseCsrfToken

              return await thisMethod(url, {
                searchParams, validStatusCodes, body, formData, overrides,
                csrfData: { token: responseCsrfToken, attempts: currentCsrfAttempts+1 }, headers,
                apiName, methodName
              })
            }
            else throw new NoCsrfTokenError(error)
          }
          handleErrors(error)
        }
        throw error
      }
    }

    return thisMethod
  }

  const methods = {

    get: unsafeMethod("get"),

    post: unsafeMethod("post"),

    patch: unsafeMethod("patch"),

    delete: unsafeMethod("delete")

  }

  return methods

}