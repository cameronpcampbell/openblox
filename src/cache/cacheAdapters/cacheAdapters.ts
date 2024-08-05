import { ObjectPrettifyDeep } from "typeforge"
//import type { AllApis } from "../../apis/apis.types"

type AllApis = any

export type CacheConfig<Settings extends Record<string, any>> = Settings | ObjectPrettifyDeep<(
  { "*"?: Settings } &
  {
    [ApiName in keyof AllApis]?: (
      (Settings & {
        [MethodName in keyof AllApis[ApiName]]?: undefined
      }) | {
        [MethodName in keyof AllApis[ApiName]]?: Settings
      }
    )
  }
)>

export type CacheAdapter<
  Settings extends Record<string, any>, CustomConfig extends Record<string, any>
>  = (<Config extends ObjectPrettifyDeep<CustomConfig & { included: CacheConfig<Settings> }>>(config: Config) => ({
  name: string,
  get: (key: string) => any,
  set: (settings: Settings, key: string, value: any) => void,
}))

