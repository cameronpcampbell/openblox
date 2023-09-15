// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import merge from "lodash.merge"
import { parseBEDEV1ErrorFromJSON, parseBEDEV2ErrorFromJSON } from "parse-roblox-errors-node"

import { AuthorizationDeniedError, NoCsrfTokenError, ThrottledError } from "../errors"
import { formatSearchParams } from "./http.utils"
import { AgnosticResponse } from "./httpAdapters/httpAdapters.utils"
import { cloneAndMutateObject } from "../utils"
import { FetchAdapter } from "./httpAdapters/fetchAdapter"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig, RequestConfig } from "./httpAdapters/httpAdapters.types"
import type { CredentialsOverride } from "../config/config.types"
import type { AnyError } from "parse-roblox-errors-node"
import { CacheAdapterConfig, CacheResultType } from "../cacheAdapters/cacheAdapters.types"
import { parseAnyError } from "parse-roblox-errors-node/dist/utils/parseAnyError"

type SettingsConfig = {
  cacheSettings?: Object,
  credentialsOverride?: CredentialsOverride
}
type SettingsConfigUnsafe = (SettingsConfig & {
  csrfData?: { token: string, attempts: number },
  body?: Object,
  formData?: Object
})

type ClassicApiHeaders = { headers: { Cookie: `.ROBLOSECURITY=${string}` } }
type CloudApiHeaders =  { headers: { "x-api-key": string } }
type CredentialsHeaders = ClassicApiHeaders & CloudApiHeaders
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
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

const getAndRemoveFromObj = (obj: { [key: string | number | symbol]: any }, key: string) => {
  const target = obj[key]
  delete obj[key]
  return target
}

const handleErrors = (res: AgnosticResponse) => {
  if (!(res instanceof AgnosticResponse)) return

  if (res.statusCode == 429) {
    throw new ThrottledError(res)
  } else if (res.statusCode == 401) {
    throw new AuthorizationDeniedError(res)
  }
}

const detectBEDEVVersionForUrl = (url: string): 1 | 2 | undefined => {
  const urlObject = new URL(url)

  if (urlObject.host == "apis.roblox.com") return 2
  if (urlObject.host.endsWith(".roblox.com")) return 1
  return undefined
}

const getParsedErrors = async (errorRes: AgnosticResponse): Promise<AnyError[] | undefined> => {
  const BEDEVVersion = detectBEDEVVersionForUrl(errorRes.url)
  return BEDEVVersion == 1 ?
    await parseBEDEV1ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : BEDEVVersion == 2 ?
    await parseBEDEV2ErrorFromStringAndHeaders(JSON.stringify(errorRes.body), errorRes.headers)
  : undefined
}

const isOpenCloudUrl = (url: string): boolean => url.startsWith("https://apis.roblox.com/cloud")

const addCredentialOverride = (
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

const cacheAdapterGet = async <CacheAdapter extends CacheAdapterConfig>(
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const cacheDisabledData: { cachedData: any, cachedResultType: CacheResultType } = { cachedData: undefined, cachedResultType: "DISABLED" }


export class HttpHelper {
  classicApiHeaders?: { headers: { Cookie: `.ROBLOSECURITY=${string}` } }
  cloudApiHeaders?: { headers: { "x-api-key": string } }
  cacheAdapter?: CacheAdapterConfig
  csrfRetries: number
  httpAdapter: HttpAdapterConfig<any>

  constructor(
    { cookie, cloudKey, cacheAdapter, csrfRetries, httpAdapter = FetchAdapter }:
    { cookie?: string, cloudKey?: string, cacheAdapter?: CacheAdapterConfig, csrfRetries?: number, httpAdapter?: HttpAdapterConfig<any> }
  ) {
    this.classicApiHeaders = cookie ? { headers: { Cookie: `.ROBLOSECURITY=${cookie}`} } : undefined
    this.cloudApiHeaders = cloudKey ? { headers: { "x-api-key": cloudKey } } : undefined
    this.cacheAdapter = cacheAdapter
    this.csrfRetries = csrfRetries ?? 1
    this.httpAdapter = httpAdapter
  }

  async get<ResBody extends any = {}>(url: string, config?: RequestConfig & SettingsConfig): Promise<{
    response?: AgnosticResponse, data: ResBody, cachedResultType: CacheResultType
  }> {
    const [ cacheSettings, searchParams ] = [
      config && getAndRemoveFromObj(config, "cacheSettings"),
      config?.searchParams
    ]
    const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
    const httpAdapter = this.httpAdapter
    const cacheAdapter = this?.cacheAdapter
    const shouldCache: boolean = cacheAdapter && cacheSettings && (cacheSettings != "!")

    try {
      // Gets data (tries to get cached data first if possible).
      const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData

      // Makes request if no cached data was found.
      const baseHeaders = addCredentialOverride(
        (isOpenCloudUrl(fullUrl) ? this.cloudApiHeaders : this.classicApiHeaders) as CredentialsHeaders, config?.credentialsOverride as any
      )
      const rawRes = cachedData ? undefined : await httpAdapter.get(fullUrl, merge(baseHeaders, config))
      const response = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (response && response?.statusCode !== 200) throw response
      const data = cachedData || response?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) await cacheAdapter?.set({ key: fullUrl, value: data }, cacheSettings)

      return { data: data, response, cachedResultType }

    } catch (error: unknown) {
      if (error instanceof AgnosticResponse) {
        const parsedErrors = await getParsedErrors(error)
        if (parsedErrors) error.errors = parsedErrors
        handleErrors(error)
      }
      throw error
    }
  }

  async post<ResBody extends any = {}>(url: string, config?: (RequestConfig & SettingsConfigUnsafe)): Promise<{
    response?: AgnosticResponse, data: ResBody, cachedResultType: CacheResultType
  }> {
    let clonedConfig = { ...config }
    const [ cacheSettings, searchParams, body, csrfData ] = [
      clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
      clonedConfig?.searchParams,
      clonedConfig?.body,
      clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
    ]
    const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
    const httpAdapter = this.httpAdapter
    const cacheAdapter = this.cacheAdapter
    const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
    const currentAttempts: number = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

      // Makes request if no cached data was found.
      const baseHeaders = isOpenCloudUrl(fullUrl) ? this.cloudApiHeaders : this.classicApiHeaders
      const rawRes = cachedData ? undefined : await httpAdapter.post(fullUrl, merge(
        baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
      ) as any)
      const response = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (response && response?.statusCode !== 200) throw response
      const data = cachedData || response?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) await cacheAdapter.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

      return { data, response, cachedResultType }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (error instanceof AgnosticResponse) {
        const parsedErrors = await getParsedErrors(error)
        if (parsedErrors) error.errors = parsedErrors

        if (error.statusCode === 403) {
          const resCsrfToken = error.headers.get("x-csrf-token")
          // Retries the request but with the csrf token
          if (resCsrfToken && (currentAttempts < (this.csrfRetries + 1))) {
            return await this.post(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
          } else throw new NoCsrfTokenError(error)
        }
        
        handleErrors(error)
      }
      throw error
    }
  }

  async patch<ResBody extends any = {}>(url: string, config?: (RequestConfig & SettingsConfigUnsafe)): Promise<{
    response?: AgnosticResponse, data: ResBody, cachedResultType: CacheResultType
  }> {
    let clonedConfig = { ...config }
    const [ cacheSettings, searchParams, body, csrfData ] = [
      clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
      clonedConfig?.searchParams,
      clonedConfig?.body,
      clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
    ]
    const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}`
    const httpAdapter = this.httpAdapter 
    const cacheAdapter = this.cacheAdapter
    const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
    const currentAttempts: number = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

      // Makes request if no cached data was found.
      const baseHeaders = isOpenCloudUrl(fullUrl) ? this.cloudApiHeaders : this.classicApiHeaders
      const rawRes = cachedData ? undefined : await httpAdapter.patch(fullUrl, merge(
        baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
      ) as any)
      const response = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (response && response?.statusCode !== 200) throw response
      const data = cachedData || response?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) await cacheAdapter.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

      return { data, response, cachedResultType }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (error instanceof AgnosticResponse) {
        const parsedErrors = await getParsedErrors(error)
        if (parsedErrors) error.errors = parsedErrors

        if (error.statusCode === 403) {
          const resCsrfToken = error.headers.get("x-csrf-token")
          // Retries the request but with the csrf token
          if (resCsrfToken && (currentAttempts < (this.csrfRetries + 1))) {
            return await this.patch(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
          } else throw new NoCsrfTokenError(error)
        }
        
        handleErrors(error)
      }
      throw error
    }
  }


  async delete<ResBody extends any = {}>(url: string, config?: (RequestConfig & SettingsConfigUnsafe)): Promise<{
    response?: AgnosticResponse, data: ResBody, cachedResultType: CacheResultType
  }> {
    let clonedConfig = { ...config }
    const [ cacheSettings, searchParams, body, csrfData ] = [
      clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
      clonedConfig?.searchParams,
      clonedConfig?.body,
      clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
    ]
    const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
    const httpAdapter = this.httpAdapter
    const cacheAdapter = this.cacheAdapter
    const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
    const currentAttempts: number = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

      // Makes request if no cached data was found.
      const baseHeaders = isOpenCloudUrl(fullUrl) ? this.cloudApiHeaders : this.classicApiHeaders
      const rawRes = cachedData ? undefined : await httpAdapter.delete(fullUrl, merge(
        baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
      ) as any)
      const response = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (response && response?.statusCode !== 200) throw response
      const data = cachedData || response?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) await cacheAdapter.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

      return { data, response, cachedResultType }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (error instanceof AgnosticResponse) {
        const parsedErrors = await getParsedErrors(error)
        if (parsedErrors) error.errors = parsedErrors

        if (error.statusCode === 403) {
          const resCsrfToken = error.headers.get("x-csrf-token")
          // Retries the request but with the csrf token
          if (resCsrfToken && (currentAttempts < (this.csrfRetries + 1))) {
            return await this.delete(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
          } else throw new NoCsrfTokenError(error)
        }
        
        handleErrors(error)
      }
      throw error
    }
  }


}