// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { HttpHandler } from "../http/httpHandler"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig } from "../http/httpAdapters/httpAdapters.types"
import type { CacheAdapterConfig } from "../cache/cacheAdapters/cacheAdapters.types"
import type { ApiMethodNames, ApiName } from "../apis/apis.types"
import { AnyObject, Nullable, PrettifyKeyof } from "../utils/utils.types"
import { cacheHandler } from "../cache/cacheHandler/cacheHandler"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type RobloSecurityCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`


export type CacheSettings = {
  keyPrefix?: string,
  formattedDataIsCached?: boolean,
  adapters: CacheAdapterConfig[]
}

export type HttpSettings = {
  maxCsrfAttempts?: number,
  hardwareBackedAuthentication?: boolean,
  adapter?: HttpAdapterConfig
}

export type ConfigSettings = {
  // The cookie is used to authenticate with classic endpoints
  cookie?: RobloSecurityCookie,

  // The cloudkey is used to authenticate with cloud endpoints.
  cloudKey?: string,

  caching?: CacheSettings
  //cacheAdapter?: CacheAdapterConfig,

  httpRequests?: HttpSettings,

  // If true then it makes sure that "data" contains no references to "rawBody".
  formattedDataEnforceNoReferences?: boolean,

  // If true then "data" is cached alongside "rawBody" and "headers".
  //formattedDataIsCached?: boolean,
}

export type Config<ThisApiName extends ApiName = any> = PrettifyKeyof<ConfigSettings & {
  http: ReturnType<typeof HttpHandler>,
  cache?: ReturnType<typeof cacheHandler>
  
  findSettings: (apiName: ThisApiName, methodName:ApiMethodNames[ThisApiName]) => Promise<any>,

  _hash?: string
}>


export type CredentialsOverride = PrettifyKeyof<{ cookie?: RobloSecurityCookie | "", cloudKey?: string, oauthToken?: string }>
export type CacheSettingsOverride = PrettifyKeyof<{ [adapterAlias: string]: AnyObject }>

export type AllOverrides = PrettifyKeyof<{
  credentials: CredentialsOverride,
  cacheSettings: {
    [adapterAlias: string]: AnyObject
  },
  _hashes?: {
    _credentialsOverrideHash: string,
    _cacheSettingsOverrideHash: string
  }
}>

export type AllOverridesSettings = PrettifyKeyof<Nullable<CredentialsOverride & { cacheSettings?: CacheSettingsOverride }>>
export type ThisAllOverrides = AllOverrides | void | undefined | null | any
