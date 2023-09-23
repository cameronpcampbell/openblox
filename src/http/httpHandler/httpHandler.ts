// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { FetchAdapter } from "../httpAdapters/fetchAdapter"
import { AgnosticResponse } from "../httpAdapters"
import { NoCsrfTokenError } from "../../errors"
import { buildFullUrl, cacheAdapterGet, cacheDisabledData, handleErrors, isOpenCloudUrl } from "./httpHandler.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { SecureUrl } from "../../utils/utils.types"

import type { HttpHandlerConfig, HttpRequestConfigSafeMethod, HttpRequestConfigUnsafeMethod, MethodResponse } from "./httpHandler.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const HttpHandler = ({ cookie, cloudKey, cacheAdapter, csrfRetries=1, httpAdapter=FetchAdapter }: HttpHandlerConfig) => {

  let savedCSRFToken = ""

  const methods = {

    get: async <ResponseBody = any>(
      url: SecureUrl, { cacheSettings, searchParams, credentialsOverride, validStatusCodes }: HttpRequestConfigSafeMethod
    ): MethodResponse<ResponseBody> => {
      try {
        const fullUrl = searchParams ? buildFullUrl(url, searchParams) : url
        const cachingEnabled = cacheAdapter && cacheSettings && cacheSettings != "!"

        // Returns cached version if it exists.
        const { cachedData, cachedResultType } = cachingEnabled ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData
        if (cachedResultType == "HIT") return { data: cachedData as ResponseBody, cachedResultType }

        // Makes request.
        const isOpenCloud = isOpenCloudUrl(fullUrl)
        const cookieToUse = !isOpenCloud && (credentialsOverride?.cookie || cookie)
        const response = await httpAdapter.get(fullUrl, {
          headers: {
            Cookie: cookieToUse && `.ROBLOSECURITY=${cookieToUse}`,
            "x-api-key": isOpenCloud && (credentialsOverride?.cloudKey || cloudKey),
          }
        })
        const responseStatusCode = response.statusCode
        if (response && (responseStatusCode != 200 && !validStatusCodes?.includes(responseStatusCode))) throw response

        // Caches response if caching is enabled and no previously cached data was found.
        const responseBody = response.body
        if (cachingEnabled && !cachedData) await cacheAdapter.set({ key: fullUrl, value: responseBody }, cacheSettings)

        // Returns uncached data and response.
        return { data: responseBody, cachedResultType }

      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) handleErrors(error)
        throw error
      }
    },

    post: async <ResponseBody = any>(
      url: SecureUrl,
      { cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData, csrfData }: HttpRequestConfigUnsafeMethod
    ): MethodResponse<ResponseBody> => {
      let cookieToUse
      try {
        const fullUrl = searchParams ? buildFullUrl(url, searchParams) : url
        const cachingEnabled = cacheAdapter && cacheSettings && cacheSettings != "!"

        // Returns cached version if it exists.
        const { cachedData, cachedResultType } = cachingEnabled ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData
        if (cachedResultType == "HIT") return { data: cachedData as ResponseBody, cachedResultType }

        // Makes request.
        const isOpenCloud = isOpenCloudUrl(fullUrl)
        cookieToUse = !isOpenCloud && (credentialsOverride?.cookie || cookie)
        const response = await httpAdapter.post(fullUrl, {
          body: body, formData,
          headers: {
            Cookie: cookieToUse && `.ROBLOSECURITY=${cookieToUse}`,
            "x-api-key": isOpenCloud && (credentialsOverride?.cloudKey || cloudKey),
            "x-csrf-token": csrfData?.token || savedCSRFToken
          }
        })
        const responseStatusCode = response.statusCode
        if (response && (responseStatusCode != 200 && !validStatusCodes?.includes(responseStatusCode))) throw response

        // Caches response if caching is enabled and no previously cached data was found.
        const responseBody = response.body
        if (cachingEnabled && !cachedData) await cacheAdapter.set({ key: fullUrl, value: responseBody }, cacheSettings)

        // Returns uncached data and response.
        return { data: responseBody, cachedResultType }

      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) {
          if (error.statusCode === 403) {
            const responseCsrfToken = error.headers.get("x-csrf-token")
            
            // Retries the request but with the csrf token
            const csrfAttempts = csrfData?.attempts ?? 1
            if (responseCsrfToken && csrfAttempts < (csrfRetries + 1)) {
              // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
              if (savedCSRFToken != responseCsrfToken && cookieToUse == cookie) savedCSRFToken = responseCsrfToken

              return await methods.post(url, {
                cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData,
                csrfData: { token: responseCsrfToken, attempts: csrfAttempts+1 }
              })
            }
            else throw new NoCsrfTokenError(error)
          }
          handleErrors(error)
        }
        throw error
      }
    },

    patch: async <ResponseBody = any>(
      url: SecureUrl,
      { cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData, csrfData }: HttpRequestConfigUnsafeMethod
    ): MethodResponse<ResponseBody> => {
      let cookieToUse
      try {
        const fullUrl = searchParams ? buildFullUrl(url, searchParams) : url
        const cachingEnabled = cacheAdapter && cacheSettings && cacheSettings != "!"

        // Returns cached version if it exists.
        const { cachedData, cachedResultType } = cachingEnabled ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData
        if (cachedResultType == "HIT") return { data: cachedData as ResponseBody, cachedResultType }

        // Makes request.
        const isOpenCloud = isOpenCloudUrl(fullUrl)
        cookieToUse = !isOpenCloud && (credentialsOverride?.cookie || cookie)
        const response = await httpAdapter.patch(fullUrl, {
          body: body, formData,
          headers: {
            Cookie: cookieToUse && `.ROBLOSECURITY=${cookieToUse}`,
            "x-api-key": isOpenCloud && (credentialsOverride?.cloudKey || cloudKey),
            "x-csrf-token": csrfData?.token || savedCSRFToken
          }
        })
        const responseStatusCode = response.statusCode
        if (response && (responseStatusCode != 200 && !validStatusCodes?.includes(responseStatusCode))) throw response

        // Caches response if caching is enabled and no previously cached data was found.
        const responseBody = response.body
        if (cachingEnabled && !cachedData) await cacheAdapter.set({ key: fullUrl, value: responseBody }, cacheSettings)

        // Returns uncached data and response.
        return { data: responseBody, cachedResultType }

      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) {
          if (error.statusCode === 403) {
            const responseCsrfToken = error.headers.get("x-csrf-token")
            
            // Retries the request but with the csrf token
            const csrfAttempts = csrfData?.attempts ?? 1
            if (responseCsrfToken && csrfAttempts < (csrfRetries + 1)) {
              // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
              if (savedCSRFToken != responseCsrfToken && cookieToUse == cookie) savedCSRFToken = responseCsrfToken

              return await methods.patch(url, {
                cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData,
                csrfData: { token: responseCsrfToken, attempts: csrfAttempts+1 }
              })
            }
            else throw new NoCsrfTokenError(error)
          }
          handleErrors(error)
        }
        throw error
      }
    },

    delete: async <ResponseBody = any>(
      url: SecureUrl,
      { cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData, csrfData }: HttpRequestConfigUnsafeMethod
    ): MethodResponse<ResponseBody> => {
      let cookieToUse
      try {
        const fullUrl = searchParams ? buildFullUrl(url, searchParams) : url
        const cachingEnabled = cacheAdapter && cacheSettings && cacheSettings != "!"

        // Returns cached version if it exists.
        const { cachedData, cachedResultType } = cachingEnabled ? await cacheAdapterGet(cacheAdapter, { key: fullUrl }) : cacheDisabledData
        if (cachedResultType == "HIT") return { data: cachedData as ResponseBody, cachedResultType }

        // Makes request.
        const isOpenCloud = isOpenCloudUrl(fullUrl)
        cookieToUse = !isOpenCloud && (credentialsOverride?.cookie || cookie)
        const response = await httpAdapter.delete(fullUrl, {
          body: body, formData,
          headers: {
            Cookie: cookieToUse && `.ROBLOSECURITY=${cookieToUse}`,
            "x-api-key": isOpenCloud && (credentialsOverride?.cloudKey || cloudKey),
            "x-csrf-token": csrfData?.token || savedCSRFToken
          }
        })
        const responseStatusCode = response.statusCode
        if (response && (responseStatusCode != 200 && !validStatusCodes?.includes(responseStatusCode))) throw response

        // Caches response if caching is enabled and no previously cached data was found.
        const responseBody = response.body
        if (cachingEnabled && !cachedData) await cacheAdapter.set({ key: fullUrl, value: responseBody }, cacheSettings)

        // Returns uncached data and response.
        return { data: responseBody, cachedResultType }

      } catch (error: unknown) {
        if (error instanceof AgnosticResponse) {
          if (error.statusCode === 403) {
            const responseCsrfToken = error.headers.get("x-csrf-token")
            
            // Retries the request but with the csrf token
            const csrfAttempts = csrfData?.attempts ?? 1
            if (responseCsrfToken && csrfAttempts < (csrfRetries + 1)) {
              // Only Changes the saved csrf token to be that of the response csrf token if the cookie used was not an override.
              if (savedCSRFToken != responseCsrfToken && cookieToUse == cookie) savedCSRFToken = responseCsrfToken

              return await methods.delete(url, {
                cacheSettings, searchParams, credentialsOverride, validStatusCodes, body, formData,
                csrfData: { token: responseCsrfToken, attempts: csrfAttempts+1 }
              })
            }
            else throw new NoCsrfTokenError(error)
          }
          handleErrors(error)
        }
        throw error
      }
    },

  }

  return methods

}