// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { HttpHelper } from "../http/httpHelper"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig } from "../http/httpAdapters/httpAdapters.types"
import type { CacheAdapterConfig } from "../http/cacheAdapters/cacheAdapters.types"
import type { ApiMethodNames, ApiName } from "../apis/apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type RobloSecurityCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`


export type ConfigSettings = {
  cookie?: RobloSecurityCookie,

  cloudKey?: string,

  cacheAdapter?: CacheAdapterConfig,

  httpAdapter?: HttpAdapterConfig,

  csrfRetries?: number
}

export type Config<ThisApiName extends ApiName = any> = ConfigSettings & {
  http: HttpHelper,
  
  findSettings: (apiName: ThisApiName, methodName:ApiMethodNames[ThisApiName]) => Promise<any>
}


export type CredentialsOverride = { cookie?: RobloSecurityCookie | "", cloudKey?: string }
export type CacheSettingsOverride = { cacheSettings?: any }
export type AllOverrides = CredentialsOverride & CacheSettingsOverride
export type ThisAllOverrides = AllOverrides | void | undefined | any
