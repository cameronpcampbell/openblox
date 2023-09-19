// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import merge from "lodash.merge"

import { NoCsrfTokenError } from "../../errors"
import { formatSearchParams } from "../http.utils"
import { AgnosticResponse } from "../httpAdapters/httpAdapters.utils"
import { cloneAndMutateObject } from "../../utils"
import { FetchAdapter } from "../httpAdapters/fetchAdapter"

import { addCredentialOverride, cacheAdapterGet, cacheDisabledData, getAndRemoveFromObj, getParsedErrors, handleErrors, isOpenCloudUrl } from "./httpHandler.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig, RequestConfig } from "../httpAdapters/httpAdapters.types"
import type { CacheAdapterConfig, CacheResultType } from "../../cacheAdapters/cacheAdapters.types"

import { CredentialsHeaders, MethodResponse, SettingsConfig, SettingsConfigUnsafe } from "./httpHandler.types"
import { RobloSecurityCookie } from "../.."
import { PrettifyKeyof } from "../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type HttpHandlerConfig = {
  cookie?: RobloSecurityCookie,
  cloudKey?: string,
  cacheAdapter?: CacheAdapterConfig,
  csrfRetries?: number,
  httpAdapter?: HttpAdapterConfig
}

export const HttpHandler = ({ cookie, cloudKey, cacheAdapter, csrfRetries=1, httpAdapter=FetchAdapter }: HttpHandlerConfig) => {
  const classicApiHeaders = cookie && { headers: { Cookie: `.ROBLOSECURITY=${cookie}` } }
  const cloudApiHeaders = cloudKey && { headers: { "x-api-key": cloudKey } }

  const methods = {

    get: async <ResponseBody extends any = {}>(
      url: string, config?: PrettifyKeyof<RequestConfig & SettingsConfig>
    ): MethodResponse<ResponseBody> => {
      const [ cacheSettings, searchParams ] = [
        config && getAndRemoveFromObj(config, "cacheSettings"),
        config?.searchParams
      ]
      const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
      const shouldCache: boolean = cacheAdapter && cacheSettings && (cacheSettings != "!")
  
      try {
        // Gets data (tries to get cached data first if possible).
        const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData
  
        // Makes request if no cached data was found.
        const baseHeaders = addCredentialOverride(
          (isOpenCloudUrl(fullUrl) ? cloudApiHeaders : classicApiHeaders) as CredentialsHeaders, config?.credentialsOverride as any
        )
        const rawRes = cachedData ? undefined : await httpAdapter.get(fullUrl, merge(baseHeaders, config))
        const response = rawRes && await httpAdapter.parseRes<ResponseBody>(rawRes)
        if (response && response?.statusCode !== 200) throw response
        const data = cachedData || response?.body
  
        // Caches response (maybe).
        if (shouldCache && !cachedData) await cacheAdapter?.set({ key: fullUrl, value: data }, cacheSettings)
  
        return { data: data, body: data, response, cachedResultType }
  
      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) {
          const parsedErrors = await getParsedErrors(error)
          if (parsedErrors) error.errors = parsedErrors
          handleErrors(error)
        }
        throw error
      }
    },

    post: async <ResponseBody extends any = {}>(
      url: string, config?: PrettifyKeyof<RequestConfig & SettingsConfigUnsafe>
    ): MethodResponse<ResponseBody> => {
      let clonedConfig = { ...config }
      const [ cacheSettings, searchParams, body, csrfData ] = [
        clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
        clonedConfig?.searchParams,
        clonedConfig?.body,
        clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
      ]
      const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
      const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
      const currentAttempts: number = csrfData?.attempts ?? 1

      try {
        // Gets data (tries to get cached data first if possible).
        const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

        // Makes request if no cached data was found.
        const baseHeaders = isOpenCloudUrl(fullUrl) ? cloudApiHeaders : classicApiHeaders
        const rawRes = cachedData ? undefined : await httpAdapter.post(fullUrl, merge(
          baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
        ) as any)
        const response = rawRes && await httpAdapter.parseRes<ResponseBody>(rawRes)
        if (response && response?.statusCode !== 200) throw response
        const data = cachedData || response?.body

        // Caches response (maybe).
        if (shouldCache && !cachedData) await cacheAdapter?.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

        return { data, body: data, response, cachedResultType }

      } catch (error: unknown) {
        // Unauthorised error - csrf token needs to be included.
        if (error instanceof AgnosticResponse) {
          const parsedErrors = await getParsedErrors(error)
          if (parsedErrors) error.errors = parsedErrors

          if (error.statusCode === 403) {
            const resCsrfToken = error.headers.get("x-csrf-token")
            // Retries the request but with the csrf token
            if (resCsrfToken && (currentAttempts < (csrfRetries + 1))) {
              return await methods.post(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
            } else throw new NoCsrfTokenError(error)
          }
          
          handleErrors(error)
        }
        throw error
      }
    },

    patch: async <ResponseBody extends any = {}>(
      url: string, config?: PrettifyKeyof<RequestConfig & SettingsConfigUnsafe>
    ): MethodResponse<ResponseBody> => {
      let clonedConfig = { ...config }
      const [ cacheSettings, searchParams, body, csrfData ] = [
        clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
        clonedConfig?.searchParams,
        clonedConfig?.body,
        clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
      ]
      const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
      const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
      const currentAttempts: number = csrfData?.attempts ?? 1

      try {
        // Gets data (tries to get cached data first if possible).
        const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

        // Makes request if no cached data was found.
        const baseHeaders = isOpenCloudUrl(fullUrl) ? cloudApiHeaders : classicApiHeaders
        const rawRes = cachedData ? undefined : await httpAdapter.patch(fullUrl, merge(
          baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
        ) as any)
        const response = rawRes && await httpAdapter.parseRes<ResponseBody>(rawRes)
        if (response && response?.statusCode !== 200) throw response
        const data = cachedData || response?.body

        // Caches response (maybe).
        if (shouldCache && !cachedData) await cacheAdapter?.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

        return { data, body: data, response, cachedResultType }

      } catch (error: unknown) {
        // Unauthorised error - csrf token needs to be included.
        if (error instanceof AgnosticResponse) {
          const parsedErrors = await getParsedErrors(error)
          if (parsedErrors) error.errors = parsedErrors

          if (error.statusCode === 403) {
            const resCsrfToken = error.headers.get("x-csrf-token")
            // Retries the request but with the csrf token
            if (resCsrfToken && (currentAttempts < (csrfRetries + 1))) {
              return await methods.patch(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
            } else throw new NoCsrfTokenError(error)
          }
          
          handleErrors(error)
        }
        throw error
      }
    },

    delete: async <ResponseBody extends any = {}>(
      url: string, config?: PrettifyKeyof<RequestConfig & SettingsConfigUnsafe>
    ): MethodResponse<ResponseBody> => {
      let clonedConfig = { ...config }
      const [ cacheSettings, searchParams, body, csrfData ] = [
        clonedConfig && getAndRemoveFromObj(clonedConfig, "cacheSettings"),
        clonedConfig?.searchParams,
        clonedConfig?.body,
        clonedConfig && getAndRemoveFromObj(clonedConfig, "csrfData"),
      ]
      const fullUrl = `${url}${searchParams ? `?${await formatSearchParams(searchParams)}` : ""}` 
      const shouldCache = cacheAdapter && cacheSettings && (cacheSettings != "!")
      const currentAttempts: number = csrfData?.attempts ?? 1

      try {
        // Gets data (tries to get cached data first if possible).
        const { cachedData, cachedResultType } = shouldCache ? await cacheAdapterGet(cacheAdapter, { key: fullUrl, keyData: body }) : cacheDisabledData

        // Makes request if no cached data was found.
        const baseHeaders = isOpenCloudUrl(fullUrl) ? cloudApiHeaders : classicApiHeaders
        const rawRes = cachedData ? undefined : await httpAdapter.delete(fullUrl, merge(
          baseHeaders, clonedConfig, { headers: { ["x-csrf-token"]: csrfData?.token } }
        ) as any)
        const response = rawRes && await httpAdapter.parseRes<ResponseBody>(rawRes)
        if (response && (response?.statusCode !== 200 && !(config?.validStatusCodes?.includes(response?.statusCode)) )) throw response
        const data = cachedData || response?.body

        // Caches response (maybe).
        if (shouldCache && !cachedData) await cacheAdapter?.set({ key: fullUrl, keyData: body, value: data }, cacheSettings)

        return { data, body: data, response, cachedResultType }

      } catch (error: unknown) {
        // Unauthorised error - csrf token needs to be included.
        if (error instanceof AgnosticResponse) {
          const parsedErrors = await getParsedErrors(error)
          if (parsedErrors) error.errors = parsedErrors

          if (error.statusCode === 403) {
            const resCsrfToken = error.headers.get("x-csrf-token")
            // Retries the request but with the csrf token
            if (resCsrfToken && (currentAttempts < (csrfRetries + 1))) {
              return await methods.delete(url, cloneAndMutateObject(config, obj => obj.csrfData = { token: resCsrfToken, attempts: currentAttempts + 1 }))
            } else throw new NoCsrfTokenError(error)
          }
          
          handleErrors(error)
        }
        throw error
      }
    },

  }


  return methods


}