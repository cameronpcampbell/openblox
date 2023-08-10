import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios"
import merge from "lodash.merge"
import { AuthorizationDeniedError, ThrottledError } from "@/errors"

type Response<T> = { data: T, res: AxiosResponse<T, any> }

export type HttpHelperType = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<Response<T>>,
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) => Promise<Response<T>>,
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) => Promise<Response<T>>,
}

const HandleErrors = (error: unknown) => {
  if (axios.isAxiosError(error)) {
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

  constructor(baseUrl?: string, cookie?: string) {
    this.baseUrl = baseUrl ?? ""
    this.baseConfig = { headers: { Cookie: `.ROBLOSECURITY=${cookie}` } }
  }

  async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<Response<T>> {
    try {
      const res = await axios.get<T>(`${this.baseUrl}${url}`, merge(this.baseConfig, config))
      return { data: res.data, res }
    } catch (error: unknown) {
      HandleErrors(error)
      throw error
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Response<T>> {
    const mergedConfig = merge(this.baseConfig, config)
    const fullUrl = `${this.baseUrl}${url}`
  
    try {
      return await axios.post(fullUrl, data, mergedConfig)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          const csrfToken = error.response.headers["x-csrf-token"]
          if (csrfToken) {
            try {
              const res = await axios.post<T>(fullUrl, data, merge(mergedConfig, { headers: { "x-csrf-token": csrfToken } }))
              return { data: res.data, res }
            } catch (error:unknown) {
              HandleErrors(error)
              throw error
            }
          }
        }
        else { HandleErrors(error) }
      }
      throw error
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<Response<T>> {
    const mergedConfig = merge(this.baseConfig, config)
    const fullUrl = `${this.baseUrl}${url}`
  
    try {
      return await axios.patch(fullUrl, data, mergedConfig)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          const csrfToken = error.response.headers["x-csrf-token"]
          if (csrfToken) {
            try {
              const res = await axios.patch<T>(fullUrl, data, merge(mergedConfig, { headers: { "x-csrf-token": csrfToken } }))
              return { data: res.data, res }
            } catch (error:unknown) {
              HandleErrors(error)
              throw error
            }
          }
        }
        else { HandleErrors(error) }
      }
      throw error
    }
  }

}