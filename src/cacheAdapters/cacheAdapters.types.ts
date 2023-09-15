// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { ApiMethods, ApiName } from "../apis/apis.types"
import type { AnyObject, ArrayDup, ArrayLength, KeyValuePairsMap, PrettifyKeyof, UnionToArray, Unionise2ObjectsValues, ValuesFromArrayToUnion } from "../utils/utils.types"
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
  get: ({ key, keyData }: { key: string, keyData?: AnyObject }) => Promise<AnyObject>,
  set: ({ key, keyData, value }: { key: string, keyData?: AnyObject, value: AnyObject }, cacheSettings: IncludedSettings) => Promise<void>,
  included: IncludedConfig<IncludedSettings>
}

export type CacheResultType = "HIT" | "MISS" | "DISABLED"