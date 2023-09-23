// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnyError, parseBEDEV1ErrorFromJSON, parseBEDEV2ErrorFromJSON } from "parse-roblox-errors-node"
import { parseAnyError } from "parse-roblox-errors-node/dist/utils/parseAnyError"
import { AgnosticResponse } from "../httpAdapters"
import { AuthorizationDeniedError, ThrottledError } from "../../errors"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnyObject, SecureUrl } from "../../utils/utils.types"
import { CacheAdapterConfig, CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const cacheDisabledData: { cachedData: AnyObject | undefined, cachedResultType: CacheResultType } = { cachedData: undefined, cachedResultType: "DISABLED" }


export const buildFullUrl = (url: SecureUrl, searchParams: AnyObject) => {
  if (!searchParams) return url
  const [paramsKeys, paramsValues] = [Object.keys(searchParams), Object.values(searchParams)]
  const formattedParams: { [key: string]:string } = {}

  paramsValues.forEach((param:any, i:number) => {
    if (param == undefined || param == null) return
    if (typeof(param) == "string") return formattedParams[paramsKeys[i]] = param
    if (Array.isArray(param)) return formattedParams[paramsKeys[i]] = param.join("%2C")
    if (param instanceof Date) return formattedParams[paramsKeys[i]] = encodeURIComponent(param.toDateString())
    if (typeof(param) == "boolean") return formattedParams[paramsKeys[i]] = param.toString()
    return formattedParams[paramsKeys[i]] = encodeURIComponent(param.toString())
  })
  
  return `${url}${searchParams ? `?${
    Object.entries(formattedParams).map(([ key, value ]) => `${key}=${value}`).join("&")
  }` : ""}`
}

export const isOpenCloudUrl = (url: string): boolean =>
  url.startsWith("https://apis.roblox.com/cloud")
  || url.startsWith("https://apis.roblox.com/datastore")
  || url.startsWith("https://apis.roblox.com/messaging-service")
  || url.startsWith("https://apis.roblox.com/ordered-data-stores")

export const cacheAdapterGet = async (cacheAdapter?: CacheAdapterConfig, ...args: Parameters<CacheAdapterConfig["get"]>): Promise<
  { cachedData: AnyObject | undefined, cachedResultType: CacheResultType }
> => {
  try {
    const cachedResult = await cacheAdapter?.get(...args)
    return { cachedData: cachedResult, cachedResultType: cachedResult ? "HIT" : "MISS" }

  } catch {
    return { cachedData: undefined, cachedResultType: "MISS" }
  }
}

export const detectBEDEVVersionForUrl = (url: string): 1 | 2 | undefined => {
  const urlObject = new URL(url)

  if (urlObject.host == "apis.roblox.com") return 2
  if (urlObject.host.endsWith(".roblox.com")) return 1
  return undefined
}

export function parseBEDEV1ErrorFromStringAndHeaders(text: string, headers: Map<string, string>) {
  return parseAnyError(
    () => text.trim(),
    parseBEDEV1ErrorFromJSON,
    headers as any,
  );
}

export function parseBEDEV2ErrorFromStringAndHeaders(text: string, headers: Map<string, string>) {
  return parseAnyError(
    () => text.trim(),
    parseBEDEV2ErrorFromJSON,
    headers as any,
  );
}

export const getParsedErrors = async (errorRes: AgnosticResponse): Promise<AnyError[] | undefined> => {
  const BEDEVVersion = detectBEDEVVersionForUrl(errorRes.url)
  return BEDEVVersion == 1 ?
    await parseBEDEV1ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : BEDEVVersion == 2 ?
    await parseBEDEV2ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : undefined
}

export const handleErrors = async (errorResponse: AgnosticResponse) => {
  const parsedErrors = await getParsedErrors(errorResponse)
  if (parsedErrors) errorResponse.errors = parsedErrors
 
  if (errorResponse.statusCode == 429) {
    throw new ThrottledError(errorResponse)
  } else if (errorResponse.statusCode == 401) {
    throw new AuthorizationDeniedError(errorResponse)
  }
}