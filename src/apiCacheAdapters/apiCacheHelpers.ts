import * as AllApis from "../apis"
import { ArrayDup, ArrayLength, ArrayToUnion, KeyValuePairsMap, KeysOfTypeFunction, PrettifyKeyof, UnionToArray, Unionise2ObjectsValues, ValuesFromArrayToUnion } from "../utils/utilityTypes"

type Apis = keyof PrettifyKeyof<typeof AllApis>
type ApiMethods<ApiName extends keyof typeof AllApis> = PrettifyKeyof<KeysOfTypeFunction<(typeof AllApis)[ApiName]> & {}> & {}

type IncludedConfigSettings<CustomSettings extends Object> = CustomSettings | "!"

type IncludedConfigDepth1Keys = UnionToArray<Apis | "default">

type IncludedConfigDepth1<Settings extends Object = {}> = ValuesFromArrayToUnion<
  KeyValuePairsMap<IncludedConfigDepth1Keys, ArrayDup<[IncludedConfigSettings<Settings>], ArrayLength<IncludedConfigDepth1Keys>>>
>
type IncludedConfigDepth2<Settings extends Object> = {
  /* @ts-expect-error */
  [OuterKey in keyof typeof AllApis]?: { [InnerKey in (ApiMethods<OuterKey> | "default")]?: IncludedConfigSettings<Settings> & {} }
} & { default: IncludedConfigSettings<Settings> }

export type IncludedConfig<Settings extends Object> = 
IncludedConfigSettings<Settings> & {} | 
PrettifyKeyof<
  Partial<
    Unionise2ObjectsValues<
      IncludedConfigDepth1<Settings>,
      IncludedConfigDepth2<Settings>
    >
  >
>