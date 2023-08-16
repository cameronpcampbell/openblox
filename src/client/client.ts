import { ThumbnailsApiClass } from "../apis/thumbnailsApi"
import { UsersApiClass } from "../apis/usersApi"

import * as AllApis from "../apis"
import { ArrayDup, ArrayLength, KeyValuePairsMap, KeysOfTypeFunction, ObjectValues, PrettifyKeyof, UnionToArray, Unionise2ObjectsValues, ValuesFromArrayToUnion } from "../utils/utilityTypes"

type Apis = keyof PrettifyKeyof<typeof AllApis>
type ApiMethods<ApiName extends keyof typeof AllApis> = PrettifyKeyof<
  Exclude<KeysOfTypeFunction<(typeof AllApis)[ApiName]> & {}, "getCallerFunctionName">
> & {}


type ApiFunctions<ApiName extends keyof typeof AllApis> = PrettifyKeyof<
  Omit<
    Omit<
      /* @ts-expect-error */
      { [Key in ApiMethods<ApiName>]: (typeof AllApis[ApiName])[Key] }, "apiCacheMiddleware"
    >,
    "findSettings"
  > & {}
>

type ApiCacheConfigSettings<CustomSettings extends Object> = CustomSettings | "!"

type ApiCacheConfigDepth1Keys = UnionToArray<Apis | "default">

type ApiCacheConfigDepth1<Settings extends Object> = ValuesFromArrayToUnion<
  KeyValuePairsMap<ApiCacheConfigDepth1Keys, ArrayDup<[ApiCacheConfigSettings<Settings>], ArrayLength<ApiCacheConfigDepth1Keys>>>
>
type ApiCacheConfigDepth2<Settings extends Object> = {
  [OuterKey in keyof typeof AllApis]?: { [InnerKey in (ApiMethods<OuterKey> | "default") as any]?: ApiCacheConfigSettings<Settings> }
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
type ClientConfig = { cookie?: RobloSecurityCookie, apiCacheMiddleware?: any, csrfRetries?: number }

export class OpenbloxClient {
  apis: {
    UsersApi: ApiFunctions<"UsersApi">,
    ThumbnailsApi: ApiFunctions<"ThumbnailsApi">
  }

  constructor({ cookie, apiCacheMiddleware, csrfRetries = 1}: ClientConfig) {
    this.apis = {
      UsersApi: new UsersApiClass({cookie, apiCacheMiddleware, csrfRetries}),
      ThumbnailsApi: new ThumbnailsApiClass({cookie, apiCacheMiddleware, csrfRetries})
    }
  }
}