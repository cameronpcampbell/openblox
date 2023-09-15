// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach } from "p-iteration"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const formatSearchParams = async (params?: { [key: string]:any }) => {
  if (!params) return
  const [paramsKeys, paramsValues] = [Object.keys(params), Object.values(params)]
  const formattedParams: { [key: string]:string } = {}

  await forEach(paramsValues, async (param:any, i:number) => {
    if (param == undefined || param == null) return
    if (typeof(param) == "string") return formattedParams[paramsKeys[i]] = param
    if (Array.isArray(param)) return formattedParams[paramsKeys[i]] = param.join(",")
    return formattedParams[paramsKeys[i]] = param.toString()
  })
  
  return new URLSearchParams(formattedParams).toString()
}