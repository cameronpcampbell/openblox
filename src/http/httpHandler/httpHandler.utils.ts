// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnyError, parseBEDEV1ErrorFromJSON, parseBEDEV2ErrorFromJSON } from "parse-roblox-errors-node"
import { parseAnyError } from "parse-roblox-errors-node/dist/utils/parseAnyError";

import { AgnosticResponse } from "../httpAdapters";
import { AuthorizationDeniedError, ThrottledError } from "../../errors";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CredentialsOverride } from "../../config/config.types";
import type { CacheAdapterConfig, CacheResultType } from "../../cacheAdapters/cacheAdapters.types";

import type { CredentialsHeaders } from "./httpHandler.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

export const getAndRemoveFromObj = (obj: { [key: string | number | symbol]: any }, key: string) => {
  const target = obj[key]
  delete obj[key]
  return target
}

export const handleErrors = (res: AgnosticResponse) => {
  if (!(res instanceof AgnosticResponse)) return

  if (res.statusCode == 429) {
    throw new ThrottledError(res)
  } else if (res.statusCode == 401) {
    throw new AuthorizationDeniedError(res)
  }
}

export const detectBEDEVVersionForUrl = (url: string): 1 | 2 | undefined => {
  const urlObject = new URL(url)

  if (urlObject.host == "apis.roblox.com") return 2
  if (urlObject.host.endsWith(".roblox.com")) return 1
  return undefined
}

export const getParsedErrors = async (errorRes: AgnosticResponse): Promise<AnyError[] | undefined> => {
  const BEDEVVersion = detectBEDEVVersionForUrl(errorRes.url)
  return BEDEVVersion == 1 ?
    await parseBEDEV1ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : BEDEVVersion == 2 ?
    await parseBEDEV2ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : undefined
}

export const isOpenCloudUrl = (url: string): boolean =>
  url.startsWith("https://apis.roblox.com/cloud")
  || url.startsWith("https://apis.roblox.com/datastore")
  || url.startsWith("https://apis.roblox.com/messaging-service")
  || url.startsWith("https://apis.roblox.com/ordered-data-stores")

export const addCredentialOverride = (
  baseHeaders: CredentialsHeaders, credentialsOverride: CredentialsOverride
) => {
  if (credentialsOverride?.cookie || credentialsOverride?.cookie == "") {
    if (!baseHeaders) baseHeaders = { headers: {} } as any
    baseHeaders.headers.Cookie = `.ROBLOSECURITY=${credentialsOverride.cookie}`
  }
  if (credentialsOverride?.cloudKey || credentialsOverride?.cloudKey == "") {
    if (!baseHeaders) baseHeaders = { headers: {} } as any
    baseHeaders.headers["x-api-key"] = credentialsOverride.cloudKey
  }
  return baseHeaders
}

export const cacheAdapterGet = async <CacheAdapter extends CacheAdapterConfig>(
  cacheAdapter?: CacheAdapter, ...args: Parameters<CacheAdapter["get"]>
): Promise<{ cachedData: any, cachedResultType: CacheResultType }> => {
  try {
    // @ts-expect-error | Typescipt doesn't understand that `args` can indeed be spread.
    const cachedResult = await cacheAdapter?.get(...args)
    return { cachedData: cachedResult, cachedResultType: cachedResult ? "HIT" : "MISS" }

  } catch {
    return { cachedData: undefined, cachedResultType: "MISS" }
  }
}

export const cacheDisabledData: { cachedData: any, cachedResultType: CacheResultType } = { cachedData: undefined, cachedResultType: "DISABLED" }
