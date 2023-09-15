import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios"
import merge from "lodash.merge"
import { AuthorizationDeniedError, NoCsrfTokenError, ThrottledError } from "../../errors"
import { formatSearchParams } from "./http.utils"
import { FetchAdapterConfig, RequestConfig } from "./httpAdapters/httpAdapters.types"
import { AgResponse } from "./httpAdapters/httpAdapters.utils"
import { cloneAndMutateObject, mutateObject } from "../lib.utils"
import { FetchAdapter } from "./httpAdapters/fetchAdapter"

type OldResponse<T> = { data: T, res: AxiosResponse<T, any> | undefined }

type SettingsConfig = { cacheSettings?: Object }
type SettingsConfigUnsafe = (SettingsConfig & {
  csrfData?: { token: string, attempts: number },
  body?: Object
})

const getAndRemoveFromObj = (obj: { [key: string | number | symbol]: any }, key: string) => {
  const target = obj[key]
  delete obj[key]
  return target
}

const HandleErrors = (res: AgResponse) => {
  if (!(res instanceof AgResponse)) return

  if (res.statusCode == 429) {
    throw new ThrottledError(res)
  } else if (res.statusCode == 401) {
    throw new AuthorizationDeniedError(res)
  }
}

export class HttpHelper {
  baseUrl: string
  baseConfig: AxiosRequestConfig<any>
  apiCacheMiddleware: any
  csrfRetries: number
  httpAdapter: FetchAdapterConfig<any>

  constructor(
    { baseUrl, cookie, apiCacheMiddleware, csrfRetries, httpAdapter = FetchAdapter }:
    { baseUrl?: `https://${string}`, cookie?: string, apiCacheMiddleware?: (...args:any) => any, csrfRetries?: number, httpAdapter?: FetchAdapterConfig<any> }
  ) {
    this.baseUrl = baseUrl ?? ""
    this.baseConfig = { headers: { Cookie: `.ROBLOSECURITY=${cookie}` } }
    this.apiCacheMiddleware = apiCacheMiddleware
    this.csrfRetries = csrfRetries ?? 1
    this.httpAdapter = httpAdapter as typeof httpAdapter
  }

  async get<ResBody extends Object = {}>(url: string, config?: RequestConfig & SettingsConfig): Promise<{ res: Response, data: ResBody }> {
    const [ cacheSettings, searchParams ] = [
      config && getAndRemoveFromObj(config, "cacheSettings"),
      config?.searchParams
    ]
    const fullUrl = `${this.baseUrl}${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
    const httpAdapter = this.httpAdapter
    const apiCacheMiddleware = this?.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: ResBody = shouldCache && await apiCacheMiddleware.get({ key: fullUrl })

      // Makes request if no cached data was found.
      const rawRes = cachedData ? undefined : await httpAdapter.get(fullUrl, {
        ...this.baseConfig as any,
        ...config
      })
      const res = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (res?.statusCode !== 200) throw res
      const data = cachedData || res?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, value: data }, cacheSettings)

      return { data: data, res }

    } catch (error: unknown) {
      HandleErrors(error as AgResponse)
      throw error
    }
  }

  async post<ResBody extends Object = {}>(url: string, config?: (RequestConfig & SettingsConfigUnsafe)): Promise<
    { res?: AgResponse, data: ResBody }
  > {
    let clonedConfig = { ...config }
    const [ cacheSettings, searchParams, body, csrfData ] = [
      clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
      clonedConfig?.searchParams,
      clonedConfig?.body,
      clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
    ]
    const fullUrl = `${this.baseUrl}${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
    const httpAdapter = this.httpAdapter
    const apiCacheMiddleware = this.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings
    const currentAttempts: number = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: ResBody = shouldCache && await apiCacheMiddleware.get({ key: fullUrl, keyData: body })

      // Makes request if no cached data was found.
      const rawRes = cachedData ? undefined : await httpAdapter.post(fullUrl, merge(
        this.baseConfig, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
      ) as any)
      const res = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (res?.statusCode !== 200) throw res
      const data = cachedData || res?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

      return { data, res }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (error instanceof AgResponse && error.statusCode === 403) {
        const resCsrfToken = error.headers["x-csrf-token"]
        // Retries the request but with the csrf token
        if (resCsrfToken && (currentAttempts < (this.csrfRetries + 1))) {
          return await this.post(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
        } else throw new NoCsrfTokenError(error)
      }
      HandleErrors(error as AgResponse)
      throw error
    }
  }

  async patch<ResBody extends Object = {}>(url: string, config?: (RequestConfig & SettingsConfigUnsafe)): Promise<
    { res?: AgResponse, data: ResBody }
  > {
    let clonedConfig = { ...config }
    const [ cacheSettings, searchParams, body, csrfData ] = [
      clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
      clonedConfig?.searchParams,
      clonedConfig?.body,
      clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
    ]
    const fullUrl = `${this.baseUrl}${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}`
    const httpAdapter = this.httpAdapter 
    const apiCacheMiddleware = this.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings
    const currentAttempts: number = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: ResBody = shouldCache && await apiCacheMiddleware.get({ key: fullUrl, keyData: body })

      // Makes request if no cached data was found.
      const rawRes = cachedData ? undefined : await httpAdapter.patch(fullUrl, merge(
        this.baseConfig, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
      ) as any)
      const res = rawRes && await httpAdapter.parseRes<ResBody>(rawRes)
      if (res?.statusCode !== 200) throw res
      const data = cachedData || res?.body

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

      return { data, res }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (error instanceof AgResponse && error.statusCode === 403) {
        const resCsrfToken = error.headers["x-csrf-token"]
        // Retries the request but with the csrf token
        if (resCsrfToken && (currentAttempts < (this.csrfRetries + 1))) {
          return await this.patch(url, mutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
        } else throw new NoCsrfTokenError(error)
      }
      HandleErrors(error as AgResponse)
      throw error
    }
  }


}