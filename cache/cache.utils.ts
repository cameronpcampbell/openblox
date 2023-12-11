// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import * as AllClassicApis from "../apis/classic";
import * as AllCloudApis from "../apis/cloud";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { ApiName, ApiMethods, AllApis as _AllApis } from "../apis/apis.types";
import type { IncludedConfig } from "./cacheAdapters/cacheAdapters.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const doesOverlap = (array1: any[], array2:any[]) => !!(array1.filter(item => array2.includes(item)).length)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let AllApis: _AllApis

export const FindSettings = (included: IncludedConfig<Object>, apiName: ApiName, methodName: string): Object | undefined => {
  let settings: any = included
  if (!settings || settings == "!") return

  if (!AllApis) AllApis = { ...AllClassicApis, ...AllCloudApis }
  const isUnsafeMethod = (AllApis[apiName] as any).shouldNotCacheMethods.includes(methodName)

  settings = settings?.[apiName] ?? (!isUnsafeMethod && settings.default) ?? settings.defaultForce ?? settings
  if (!settings || settings == "!") return

  settings = settings?.[methodName] ?? (!isUnsafeMethod && settings.default) ?? settings.defaultForce ?? settings
  if (!settings || settings == "!") return

  const settingsKeys = Object.keys(settings)
  settings = (typeof settings === 'object' && !Object.keys(settings).length) ? undefined : settings
  if (doesOverlap(settingsKeys, Object.keys(AllApis))) return

  let apiExports = (AllApis as ApiMethods)[apiName]
  const [allApiFuncsKeys, allApiFuncsValues] = [Object.keys(apiExports), Object.values(apiExports)]
  const apiMethods = allApiFuncsValues.map((item:any, i:number) => typeof item == "function" ? allApiFuncsKeys[i] : undefined)
  if (doesOverlap(settingsKeys, apiMethods)) return

  if (isUnsafeMethod && settings.default) return

  return settings
}