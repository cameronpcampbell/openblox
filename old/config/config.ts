import { PrettifyKeyof, UnionToArray, ValuesFromArrayToUnion, KeyValuePairsMap, ArrayDup } from "../lib/lib.types"

// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/*type Apis = keyof PrettifyKeyof<typeof AllApis>

type ApiCacheConfigSettings<CustomSettings extends Object> = CustomSettings | "!"

type ApiCacheConfigDepth1Keys = UnionToArray<Apis | "default">

type ApiCacheConfigDepth1<Settings extends Object> = ValuesFromArrayToUnion<
  KeyValuePairsMap<ApiCacheConfigDepth1Keys, ArrayDup<[ApiCacheConfigSettings<Settings>], ArrayLength<ApiCacheConfigDepth1Keys>>>
>

type ApiCacheConfigDepth2<Settings extends Object> = {
  [OuterKey in keyof typeof AllApis]?: { [InnerKey in (ApiMethodNames<OuterKey> | "default") as any]?: ApiCacheConfigSettings<Settings> }
} & { default: ApiCacheConfigSettings<Settings> }

export type ApiCacheConfig<Settings extends Object> = 
ApiCacheConfigSettings<Settings> | 
PrettifyKeyof<
  Partial<
    Unionise2ObjectsValues<
      ApiCacheConfigDepth1<Settings>,
      ApiCacheConfigDepth2<Settings>
    >
  >
>

export type RobloSecurityCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`

type ClientConfig = { cookie?: RobloSecurityCookie, apiCacheMiddleware?: any, csrfRetries?: number }*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type RobloSecurityCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`

type Config = { cookie?: RobloSecurityCookie, apiCacheMiddleware?: any, csrfRetries?: number }

var config = {}

export function setConfig(newConfig: Config) {
  config = newConfig
}

export function getConfig() {
  return config
}