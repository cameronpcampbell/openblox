// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "../httpAdapters"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheAdapterConfig, CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
import type { CredentialsOverride, RobloSecurityCookie } from "../../config/config.types"
import type { AnyObject, NonEmptyArray, PrettifyKeyof } from "../../utils/utils.types"
import type { HttpAdapterConfig } from "../httpAdapters/httpAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type HttpHandlerConfig = {
  cookie?: RobloSecurityCookie,
  cloudKey?: string,
  cacheAdapter?: CacheAdapterConfig,
  csrfRetries?: number,
  httpAdapter?: HttpAdapterConfig,
}

export type HttpRequestConfigSafeMethod = PrettifyKeyof<{
  searchParams?: { [key: string]: any },
  credentialsOverride?: CredentialsOverride | undefined,
  cacheSettings?: AnyObject | "!",
  validStatusCodes?: NonEmptyArray<number>,
  headers?: { [key: string]: string|undefined|null|false }
}>

export type HttpRequestConfigUnsafeMethod = PrettifyKeyof<HttpRequestConfigSafeMethod & {
  body?: AnyObject|string,
  formData?: AnyObject,
  csrfData?: { token: string, attempts: number },
}>

export type MethodResponse<ResponseBody extends any = {}> = Promise<{
  response?: AgnosticResponse, data: ResponseBody, cachedResultType: CacheResultType
}>