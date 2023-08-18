import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios"
import merge from "lodash.merge"
import { AuthorizationDeniedError, NoCsrfTokenError, ThrottledError } from "../../errors"

type Response<T> = { data: T, res: AxiosResponse<T, any> | undefined }

export type HttpHelperType = {
  get: <T = any>(url: string, config?: AxiosRequestConfig, cacheSettings?: Object) => Promise<Response<T>>,
  post: <T = any>(url: string, postData?: any, csrfData?: { token: string, attempts: number }, config?: AxiosRequestConfig<any>, cacheSettings?: Object) => Promise<Response<T>>,
  patch: <T = any>(url: string, patchData?: any, csrfData?: { token: string, attempts: number }, config?: AxiosRequestConfig<any>, cacheSettings?: Object) => Promise<Response<T>>,
}

const HandleErrors = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.status === 429) {
      throw new ThrottledError(error.response as AxiosResponse<any, any>)
    } else if (error.response?.status === 401) {
      throw new AuthorizationDeniedError(error.response as AxiosResponse<any, any>)
    }
  }
}

export class HttpHelper {
  baseUrl: string
  baseConfig: AxiosRequestConfig<any>
  apiCacheMiddleware: any
  csrfRetries: number
  parentName?: string 

  constructor(
    { baseUrl, cookie, apiCacheMiddleware, csrfRetries, parentName }:
    { baseUrl?: `https://${string}`, cookie?: string, apiCacheMiddleware?: (...args:any) => any, csrfRetries?: number, parentName?: string }
  ) {
    this.baseUrl = baseUrl ?? ""
    this.baseConfig = { headers: { Cookie: `.ROBLOSECURITY=${cookie}` } }
    this.apiCacheMiddleware = apiCacheMiddleware
    this.csrfRetries = csrfRetries ?? 1
    this.parentName = parentName
  }

  async get<T = any>(url: string, config: AxiosRequestConfig = {}, cacheSettings?: Object): Promise<Response<T>> {
    const fullUrl = `${this.baseUrl}${url}`
    const apiCacheMiddleware = this?.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: T = shouldCache ? await apiCacheMiddleware.get({ key: fullUrl }) : undefined
      const res: AxiosResponse<T> = cachedData as any || await axios.get<T>(fullUrl, merge(this.baseConfig, config))
      const data = cachedData || res?.data

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, value: data }, cacheSettings)

      return { data: data, res }

    } catch (error: unknown) {
      HandleErrors(error)
      throw error
    }
  }

  async post<T = any>(url: string, postData?: any, csrfData?: { token: string, attempts: number }, config?: AxiosRequestConfig<any>, cacheSettings?: Object): Promise<Response<T>> {
    const fullUrl = `${this.baseUrl}${url}`
    const mergedConfig = merge(this.baseConfig, config)
    const apiCacheMiddleware = this.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings
    const currentAttempts = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: T = shouldCache ? await apiCacheMiddleware.get({ key: fullUrl, keyData: postData }) : undefined
      const res: AxiosResponse<T> = cachedData as any || await axios.post<T>(fullUrl, postData, merge(mergedConfig, { headers: { "x-csrf-token": csrfData?.token } }))
      const data = cachedData || res?.data

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, keyData: postData, value: data }, cacheSettings)

      return { data, res }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (isAxiosError(error) && (error as AxiosError).response?.status === 403) {
        const resCsrfToken: string = (error as AxiosError).response?.headers["x-csrf-token"]
        if (!resCsrfToken) throw error

        // Retries the post request but with the csrf token
        if (currentAttempts < (this.csrfRetries + 1)) {
          return await this.post(url, postData, { token: resCsrfToken, attempts: currentAttempts + 1 }, config, cacheSettings)
        } else throw new NoCsrfTokenError(error)
      }
      HandleErrors(error)
      throw error
    }
  }

  async patch<T = any>(url: string, patchData?: any, csrfData?: { token: string, attempts: number }, config?: AxiosRequestConfig<any>, cacheSettings?: Object): Promise<Response<T>> {
    const fullUrl = `${this.baseUrl}${url}`
    const mergedConfig = merge(this.baseConfig, config)
    const apiCacheMiddleware = this.apiCacheMiddleware
    const shouldCache = apiCacheMiddleware && cacheSettings
    const currentAttempts = csrfData?.attempts ?? 1

    try {
      // Gets data (tries to get cached data first if possible).
      const cachedData: T = shouldCache ? await apiCacheMiddleware.get({ key: fullUrl, keyData: patchData }) : undefined
      const res: AxiosResponse<T> = cachedData as any || await axios.patch<T>(fullUrl, patchData, merge(mergedConfig, { headers: { "x-csrf-token": csrfData?.token } }))
      const data = cachedData || res?.data

      // Caches response (maybe).
      if (shouldCache && !cachedData) apiCacheMiddleware.set({ key: fullUrl, keyData: patchData, value: data }, cacheSettings)

      return { data, res }

    } catch (error: unknown) {
      // Unauthorised error - csrf token needs to be included.
      if (isAxiosError(error) && (error as AxiosError).response?.status === 403) {
        const resCsrfToken: string = (error as AxiosError).response?.headers["x-csrf-token"]
        if (!resCsrfToken) throw error

        // Retries the patch request but with the csrf token
        if (currentAttempts < (this.csrfRetries + 1)) {
          return await this.patch(url, patchData, { token: resCsrfToken, attempts: currentAttempts + 1 }, config, cacheSettings)
        } else throw new NoCsrfTokenError(error)
      }
      HandleErrors(error)
      throw error
    }
  }


}