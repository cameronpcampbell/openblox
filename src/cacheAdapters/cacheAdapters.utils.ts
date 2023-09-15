// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration";

import * as AllClassicApis from "../apis/classic";
import * as AllCloudApis from "../apis/cloud";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ApiName, ApiMethods } from "../apis/apis.types";
import { IncludedConfig } from "./cacheAdapters.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const doesOverlap = (array1: any[], array2:any[]) => !!(array1.filter(item => array2.includes(item)).length)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const AllApis = { ...AllClassicApis, ...AllCloudApis }


export const FindSettings = async (included: IncludedConfig<Object>, apiName: ApiName, methodName: string): Promise<Object | undefined> => {
  let settings: any = included
  if (!settings || settings == "!") return

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
  const apiMethods = await map(allApiFuncsValues, async (item:any, i:number) => typeof item == "function" ? allApiFuncsKeys[i] : undefined )
  if (doesOverlap(settingsKeys, apiMethods)) return

  if (isUnsafeMethod && settings.default) return

  return settings
}