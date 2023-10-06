// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { HttpHandler } from "../http/httpHandler"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig } from "../http/httpAdapters/httpAdapters.types"
import type { CacheAdapterConfig } from "../cacheAdapters/cacheAdapters.types"
import type { ApiMethodNames, ApiName } from "../apis/apis.types"
import { PrettifyKeyof } from "../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type RobloSecurityCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`


export type ConfigSettings = {
  cookie?: RobloSecurityCookie,

  cloudKey?: string,

  cacheAdapter?: CacheAdapterConfig,

  httpAdapter?: HttpAdapterConfig,

  csrfRetries?: number,

  methodsDataEnforceNoReferences?: boolean
}

export type Config<ThisApiName extends ApiName = any> = ConfigSettings & {
  http: ReturnType<typeof HttpHandler>,
  
  findSettings: (apiName: ThisApiName, methodName:ApiMethodNames[ThisApiName]) => Promise<any>
}


export type CredentialsOverride = { cookie?: RobloSecurityCookie | "", cloudKey?: string, oauthToken?: string }
export type CacheSettingsOverride = { cacheSettings?: any }
export type AllOverrides = PrettifyKeyof<CredentialsOverride & CacheSettingsOverride>
export type ThisAllOverrides = AllOverrides | void | undefined | null | any
