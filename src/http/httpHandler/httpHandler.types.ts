// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "../httpAdapters"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AllOverrides, CacheSettings, RobloSecurityCookie } from "../../config/config.types"
import type { AnyObject, NonEmptyArray, PrettifyKeyof } from "../../utils/utils.types"
import type { HttpAdapterConfig } from "../httpAdapters/httpAdapters.types"
import { ApiName } from "../../apis/apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type HttpHandlerConfig = {
  cookie?: `.ROBLOSECURITY=${RobloSecurityCookie}`,
  cloudKey?: string,
  caching?: CacheSettings,
  maxCsrfAttempts?: number,
  httpAdapter?: HttpAdapterConfig,
  hardwareBackedAuthentication?: boolean
}

export type HttpRequestConfigSafeMethod = PrettifyKeyof<{
  searchParams?: { [key: string]: any },
  validStatusCodes?: NonEmptyArray<number>,
  headers?: { [key: string]: string|undefined|null|false },

  apiName: ApiName,
  methodName: string,
  overrides?: AllOverrides,
}>

export type HttpRequestConfigUnsafeMethod = PrettifyKeyof<HttpRequestConfigSafeMethod & {
  body?: AnyObject|string,
  formData?: AnyObject,
  csrfData?: { token: string, attempts: number },
}>

export type MethodResponse<ResponseBody extends any = {}> = Promise<{
  response?: AgnosticResponse, rawBody: ResponseBody, cacheMetadata: any/*CacheMetadata*/
}>

/*export type CacheAdapterGetResponse<ResponseBody> = {
  /*cacheMetadata: CacheMetadata,
  rawBodyAndData?: { rawBody: ResponseBody, data?: any }
}*/