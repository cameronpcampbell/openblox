// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnyError, parseBEDEV1ErrorFromStringAndHeaders, parseBEDEV2ErrorFromStringAndHeaders } from "parse-roblox-errors"
import { AgnosticResponse } from "../httpAdapters"
import { AuthorizationDeniedError, ThrottledError } from "../../errors"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnyObject, SecureUrl } from "../../utils/utils.types"
import { createHash } from "crypto"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

export const detectBEDEVVersionForUrl = (url: string): 1 | 2 | undefined => {
  const urlObject = new URL(url)

  if (urlObject.host == "apis.roblox.com") return 2
  if (urlObject.host.endsWith(".roblox.com")) return 1
  return undefined
}

export const getParsedErrors = async (errorRes: AgnosticResponse): Promise<AnyError[] | undefined> => {
  const BEDEVVersion = detectBEDEVVersionForUrl(errorRes.url)
  return BEDEVVersion == 1 ?
    await parseBEDEV1ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers as any as Headers)
  : BEDEVVersion == 2 ?
    await parseBEDEV2ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers as any as Headers)
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

export const md5HashOfReqBody = (reqBody: AnyObject | undefined | string) => {
  if (!reqBody) return ""
  return createHash("md5").update(typeof(reqBody) == "string" ? reqBody : JSON.stringify(reqBody)).digest("hex")
}

type EndpointsAffectedByAccountSessionProtection = {
  [key: string]: "*" | [ url: string | RegExp, methods: string[] ][]
}

export const endpointsAffectedByAccountSessionProtection: EndpointsAffectedByAccountSessionProtection = {
  "https://auth.roblox.com": "*",

  "https://accountinformation.roblox.com": [
    ["v1/birthdate", [ "get", "post" ]],
    ["v1/gender", [ "get", "post" ]],
    ["v1/phone", [ "get", "post" ]],
    ["v1/phone/delete", [ "post" ]],
    ["v1/phone/resend", [ "post" ]],
    ["v1/phone/verify", [ "post" ]],
    ["v1/star-code-affiliates", [ "post", "delete" ]],
    ["v1/email/verify", [  "post" ]],
  ],

  "https://trades.roblox.com": [
   [/v1\/trades\/\d+\/accept/, [ "post" ]],
   [/v1\/trades\/\d+\/counter/, [ "post" ]],
   [/v1\/trades\/\d+\/decline/, [ "post" ]],
   ["v1/trades/expire-outdated", [ "post" ]],
   ["v1/trades/send", [ "post" ]],
  ],

  "https://billing.roblox.com": "*"
}

export const isUrlAccountSessionProtected = (urlStr: string, urlMethod: "post" | "patch" | "delete" | "get") => {
  const urlPath = new URL(urlStr).pathname.replace(/^\//, "")

  for (const baseUrl in endpointsAffectedByAccountSessionProtection) {
    if (!urlStr.startsWith(baseUrl)) continue

    const endpoints = endpointsAffectedByAccountSessionProtection[baseUrl]
    if (endpoints == "*") return true
    
    for (const endpointIndex in endpoints) {
      const [ endpointPath, methods ] = endpoints[endpointIndex]

      if (!methods.includes(urlMethod)) return false

      if (typeof endpointPath == "string" && urlPath.startsWith(endpointPath)) return true
      else if (endpointPath instanceof RegExp && endpointPath.test(urlPath)) return true
    }
  }

  return false
}