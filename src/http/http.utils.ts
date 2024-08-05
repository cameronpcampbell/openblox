// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ObjectPrettify, Prettify } from "typeforge"
import type { AnyError as AnyRobloxError } from "parse-roblox-errors"

import type { RestMethod, SecureUrl } from "../utils/utils.types"

export type RobloxCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`


export type HttpHandlerProps = {
  url: SecureUrl,
  method: RestMethod,
  headers?: Record<string, any>,
  body?: any,
  formData?: Record<string, any>,
  rawFormData?: FormData
}

export type Credentials = {
  cookie?: RobloxCookie,
  cloudKey?: string,
  oauthToken?: string
}

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
//////////////////////////////////////////////////////////////////////////////////


export class HttpResponse<Body extends any = any> {
  fullResponse: unknown
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
  type: "Csrf" | "Generic"
  errors: AnyRobloxError[]
  response: HttpResponse

  constructor(type: "Csrf" | "Generic", response: HttpResponse, errors: AnyRobloxError[]) {
    this.type = type
    this.errors = errors
    this.response = response
  }
}