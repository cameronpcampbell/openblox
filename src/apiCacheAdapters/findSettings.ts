import { IncludedConfig } from "./apiCacheHelpers";
import * as AllApis from "../apis"
import { find, map } from "p-iteration";

function doesOverlap(array1: any[], array2:any[]) {
  return !!(array1.filter(item => array2.includes(item)).length)
}

export const FindSettings = async (included: IncludedConfig<Object>, apiName: string, funcName: string): Promise<Object | undefined> => {
  apiName = apiName.replace(/Class$/, "")

  let settings: any = included
  if (!settings || settings === "!") return

  settings = settings?.[apiName] ?? settings.default ?? settings
  if (!settings || settings === "!") return

  settings = settings?.[funcName] ?? settings.default ?? settings
  if (!settings || settings === "!") return

  const settingsKeys = Object.keys(settings)
  settings = (typeof settings === 'object' && !Object.keys(settings).length) ? undefined : settings
  if (doesOverlap(settingsKeys, Object.keys(AllApis))) return

  let allApiFuncs = (AllApis as any)[apiName]
  const [allApiFuncsKeys, allApiFuncsValues] = [Object.keys(allApiFuncs), Object.values(allApiFuncs)]
  allApiFuncs = await map(allApiFuncsValues, async (item:any, i:number) => typeof item == "function" ? allApiFuncsKeys[i] : undefined )
  if (doesOverlap(settingsKeys, allApiFuncs)) return

  return settings
}