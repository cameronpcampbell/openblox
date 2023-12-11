// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { cloneDeep } from "lodash";

import { ApiError, InvalidRequestDataError, UnexpectedError } from "../errors"
import { isObjectOrArray, isOneOfMany } from "../utils"
import { AgnosticResponse } from "../http/httpAdapters/httpAdapters.utils"
import { getOpenbloxConfig } from "../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
type ResolvedType<T> = T extends Promise <infer R> ? R : never;

import type { ApiMethodResponse, ApiMethodResponse_Cursors } from "./apis.types";
import type { PrettifyKeyof } from "../utils/utils.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const handleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (await ApiError(error)) throw error

  if (!knownErrorStatusCodes) return
  if (!(error instanceof AgnosticResponse)) throw error
  if (await isOneOfMany(error.statusCode, knownErrorStatusCodes)) throw new InvalidRequestDataError(error)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const apiFuncBaseHandler = async <T extends (...args: any) => any>(fn: T): (
  Promise<ResolvedType<ReturnType<T>>>
) => {
  return await fn.call(getOpenbloxConfig())
  /*try {
    return await fn.call(getOpenbloxConfig())

  } catch (error: unknown) {
    //await handleApiErrors(error, knownErrorStatusCodes)
    throw new UnexpectedError(error)
  }*/
}

export const dataIsSuccess = (data: any) => {
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null
  ) {
    return !Object.keys(data).length
  }
  return false
}

export const createFormattedData = <FormattedDataType>(fn: () => FormattedDataType) => {
  let cachedFormattedData: FormattedDataType

  return () => {
    if (cachedFormattedData) return cachedFormattedData
    cachedFormattedData = fn()
    return cachedFormattedData
  }
}

type BuildApiMethodResponse_Params = Awaited<ApiMethodResponse<any, any>> & { cursors?: ApiMethodResponse_Cursors }

type BuildApiMethodResponse_DefinedParams<
  Params extends BuildApiMethodResponse_Params = BuildApiMethodResponse_Params,
  Cursors extends ApiMethodResponse_Cursors|void = ApiMethodResponse_Cursors|void
> = (
  Cursors extends void ?
    Omit<Omit<Params, "data">, "cursors"> & { data: Params["data"] | (() => Params["data"]) }
  :
    Omit<Omit<Params, "data">, "cursors"> & { data: Params["data"] | (() => Params["data"]) } & { cursors: Cursors }
)

type BuildApiMethodResponse_Response<Cursors extends ApiMethodResponse_Cursors|void = ApiMethodResponse_Cursors|void> = PrettifyKeyof<
  Cursors extends void ?
    Omit<BuildApiMethodResponse_Params, "cursors">
  :
    Omit<BuildApiMethodResponse_Params, "cursors"> & { cursors: Cursors }
>

export const buildApiMethodResponse = <
  _Params extends BuildApiMethodResponse_Params = BuildApiMethodResponse_Params,
  _Cursors extends ApiMethodResponse_Cursors|void = ApiMethodResponse_Cursors|void
>(
  params: BuildApiMethodResponse_DefinedParams<_Params, _Cursors>
): BuildApiMethodResponse_Response<_Cursors> => {
  let { data, rawBody, response, cacheMetadata } = params
  const openbloxConfig = getOpenbloxConfig()

  // If caching is enabled
  /*if (openbloxConfig.caching?.adapters.length && cacheMetadata.type == "MISS" && openbloxConfig.cache) {
    const formattedDataIsCached = openbloxConfig.caching.formattedDataIsCached ?? true
    data = formattedDataIsCached && data instanceof Function ? data() : data
    openbloxConfig.cache.set(rawBody, formattedDataIsCached ? data : undefined, cacheMetadata)
  }*/

  // If cached data was found
  /*if (cacheMetadata.result) {
    console.log(">> data is from cache")
    return (("cursors" in params) ?
      { data: cacheMetadata.result.data, rawBody, response, cacheMetadata, cursors: params.cursors }
    :
      { data: cacheMetadata.result.data, rawBody, response, cacheMetadata }) as BuildApiMethodResponse_DefinedParams<_Params, _Cursors>*/

  /*} else*/ if (data instanceof Function) {
    //console.log(">> data is a function")
    const dataGetter = createFormattedData(data)
    return (("cursors" in params) ?
      { get data() { return dataGetter() }, rawBody, response, cacheMetadata, cursors: params.cursors }
    :
      { get data() { return dataGetter() }, rawBody, response, cacheMetadata }) as BuildApiMethodResponse_DefinedParams<_Params, _Cursors>

  // Makes sure that "data" is not a reference to "rawBody".
  } else if (isObjectOrArray(data) && openbloxConfig.formattedDataEnforceNoReferences) {
    //console.log(">> object/array - no references")
    const dataGetter = createFormattedData(() => cloneDeep(data))
    return (("cursors" in params) ?
      { get data() { return dataGetter() }, rawBody, response, cacheMetadata, cursors: params.cursors }
    :
      { get data() { return dataGetter() }, rawBody, response, cacheMetadata }) as BuildApiMethodResponse_DefinedParams<_Params, _Cursors>

  } else {
    //console.log(">> data is not a function - nothing")
    return (("cursors" in params) ?
      { data, rawBody, response, cacheMetadata, cursors: params.cursors }
    :
      { data, rawBody, response, cacheMetadata }) as BuildApiMethodResponse_DefinedParams<_Params, _Cursors>

  }
}