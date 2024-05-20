// [ Modules ] ///////////////////////////////////////////////////////////////////
import { FetchAdapter } from "../httpAdapters/fetchHttpAdapter"
import { getConfig } from "../../config"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { RobloxCookie } from "../../config"
import type { RestMethod, SecureUrl } from "../../utils/utils.types"
import { ObjectPrettify, Prettify } from "typeforge"
import { removeNullUndefined } from "../../utils/utils"

export type HttpHandlerProps = {
  url: SecureUrl,
  method: RestMethod,
  headers?: Record<string, any>,
  body?: any,
  formData?: Record<string, any>
}

export type Credentials = {
  cookie?: RobloxCookie,
  cloudKey?: string,
  oauthToken?: string
}
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
let savedCsrfToken = ""

export type HttpResponseProps<
  Body extends any = any,
> = ObjectPrettify<{
  fullResponse: any,
  url: SecureUrl,
  method: RestMethod,
  success: boolean,
  statusCode: number,
  headers: Headers,
  body: Body,
}>

export class HttpResponse<Body extends any = any> {
  fullResponse: any
  url: SecureUrl
  method: RestMethod
  success: boolean
  statusCode: number
  headers: Headers
  body: Prettify<Body>

  constructor(props: HttpResponseProps) {
    this.fullResponse = props.fullResponse
    this.url = props.url
    this.method = props.method
    this.success = props.success
    this.statusCode = props.statusCode
    this.headers = props.headers
    this.body = props.body
  }
}

export class HttpError {
  errorResponse: HttpResponse

  constructor(error: HttpResponse) {
    this.errorResponse = error
  }
}
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const objectToFormData = (formDataObject?: Record<string, any>) => {
  if (!formDataObject) return
  const formData = new FormData()
  Object.entries(formDataObject).forEach(([key, value]) => formData.append(key, value))

  return formData
}
//////////////////////////////////////////////////////////////////////////////////

export const HttpHandler = async <RawData extends any = any>(
  { url, method, headers, body, formData }: HttpHandlerProps, { cookie, cloudKey, oauthToken }: Credentials
) => {
  const configHttp = getConfig()?.http
  const adapter = configHttp?.adapter || FetchAdapter
  const maxCsrfAttempts = configHttp?.csrfMaxAttempts || 2

  let currentCsrfAttempt = 1

  const requestData = {
    url, method,
    body: typeof body == "object" ? JSON.stringify(body) : body,
    formData: objectToFormData(formData),
  }

  const requestDataHeaders = removeNullUndefined({
    ...headers,
    Cookie: cookie as string,
    "x-api-key": cloudKey,
    Authorization: oauthToken && `Bearer ${oauthToken}`,
    "Content-Type": !(formData && Object.keys(formData)?.length) && "application/json" || null,
  })

  const handlerMain = async (): Promise<HttpResponse<RawData> | HttpError | unknown> => {
    try {
      const response = await adapter<RawData>({ ...requestData, headers: { ...requestDataHeaders, "x-csrf-token": savedCsrfToken } })
      if (!response.success) throw response

      return response

    } catch (error) {
      if (!(error instanceof HttpResponse)) return error

      if (currentCsrfAttempt > maxCsrfAttempts) return new HttpError(error)
      currentCsrfAttempt++

      const responseCsrfToken = error.headers.get("x-csrf-token")
      if (error.statusCode != 403 || (!responseCsrfToken)) return new HttpError(error)

      // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
      if (cookie == getConfig()?.cookie) savedCsrfToken = responseCsrfToken

      return handlerMain()
    }
  }

  return await handlerMain()
}