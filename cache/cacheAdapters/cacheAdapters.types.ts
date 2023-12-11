// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { ApiMethods, ApiName } from "../../apis/apis.types"
import type { AnyObject, ArrayDup, ArrayLength, KeyValuePairsMap, PrettifyKeyof, UnionToArray, Unionise2ObjectsValues, ValuesFromArrayToUnion } from "../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type IncludedConfigSettings<CustomSettings extends Object> = CustomSettings | "!"

type IncludedConfigDepth1Keys = UnionToArray<ApiName | "default" | "defaultForce">

type IncludedConfigDepth1<Settings extends Object = {}> = ValuesFromArrayToUnion<
  KeyValuePairsMap<IncludedConfigDepth1Keys, ArrayDup<[IncludedConfigSettings<Settings>], ArrayLength<IncludedConfigDepth1Keys>>>
>
type IncludedConfigDepth2<Settings extends Object> = {
  [OuterKey in ApiName]?: { [InnerKey in ((keyof ApiMethods[OuterKey]) | "default" | "defaultForce")]?: IncludedConfigSettings<Settings> & {} }
} & { default: IncludedConfigSettings<Settings>, defaultForce: IncludedConfigSettings<Settings> }


export type IncludedConfig<Settings extends AnyObject> = 
IncludedConfigSettings<Settings> & {} | 
PrettifyKeyof<
  Partial<
    Unionise2ObjectsValues<
      IncludedConfigDepth1<Settings>,
      IncludedConfigDepth2<Settings>
    >
  >
>

export type CacheAdapterConfig<IncludedSettings extends AnyObject = any> = {
  get: (key: string) => Promise<{ rawBody?: string, data?: string, dataAndRawBody?: string, timestamp: number } | undefined>,
  set: (key: string, value: { rawBody?: any, data?: any, dataAndRawBody?: any, timestamp: number }, cacheSettings: IncludedSettings) => Promise<void>,
  included: IncludedConfig<IncludedSettings>, alias: string
}

export type CacheResultType = "HIT" | "MISS" | "DISABLED"

export type CacheMetadata<RawBody = any, Data = any> = PrettifyKeyof<{
  key: string,
  type: CacheResultType,
  adapterUsedAlias?: string,
  apiName: ApiName,
  methodName: string,
  
  env: {
    allSettingsOverrides: { [adapterAlias: string]: AnyObject | "!" | undefined } | undefined,
    allAdapters: CacheAdapterConfig[]
  },

  result?: {
    data?: Data,
    rawBody?: RawBody,
  },

  timestamp?: number
}>

export type CacheAdapter<IncludedConfigSettings extends AnyObject, ThisAdaptersConfig extends AnyObject = {}> = (
  config: PrettifyKeyof<{ included: PrettifyKeyof<IncludedConfig<IncludedConfigSettings>>, alias: string } & ThisAdaptersConfig>
) => CacheAdapterConfig