// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { ApiError, InvalidRequestDataError, UnexpectedError } from "../errors"
import { isObjectOrArray, isOneOfMany } from "../utils"
import { AgnosticResponse } from "../http/httpAdapters/httpAdapters.utils"
import { getOpenbloxConfig } from "../config/config"
import { CacheResultType } from "../cacheAdapters/cacheAdapters.types";
import cloneDeep from "lodash.clonedeep";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
type ResolvedType<T> = T extends Promise <infer R> ? R : never;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const handleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (await ApiError(error)) throw error

  if (!knownErrorStatusCodes) return
  if (!(error instanceof AgnosticResponse)) throw error
  if (await isOneOfMany(error.statusCode, knownErrorStatusCodes)) throw new InvalidRequestDataError(error)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const apiFuncBaseHandler = async <T extends (...args: any) => any>(fn: T, knownErrorStatusCodes: number[]): (
  Promise<ResolvedType<ReturnType<T>>>
) => {
  try {
    return await fn.call(getOpenbloxConfig())

  } catch (error: unknown) {
    await handleApiErrors(error, knownErrorStatusCodes)
    throw new UnexpectedError(error)
  }
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

export const buildApiMethodResponse = <Data, RawBody, Cursors extends { previous?: string|number, next?: string|number } | undefined>(
  { data, rawBody, response, cache, cursors }:
  {
    data: (() => Data) | Data,
    rawBody: RawBody,
    response: AgnosticResponse | undefined,
    cache: CacheResultType,
    cursors?: Cursors
  }
): {
  data: Data,
  rawBody: RawBody,
  response: AgnosticResponse | undefined,
  cache: CacheResultType,
  cursors: Cursors
} => {
  if (typeof(data) == "function") {
    //console.log(">> function")
    const createdFormattedData = createFormattedData(data as (() => Data))
    return { get data() { return createdFormattedData() as Data }, rawBody, response, cache, cursors: cursors as Cursors }

  // Makes sure that "data" is not a reference to "rawBody".
  } else if (isObjectOrArray(data) && getOpenbloxConfig().methodsDataEnforceNoReferences) {
    //console.log(">> object/array - no references")
    const createdFormattedData = createFormattedData(() => cloneDeep(data) as (() => Data))
    return { get data() { return createdFormattedData() as Data }, rawBody, response, cache, cursors: cursors as Cursors }
  }

  //console.log(">> nothing")
  return { data, rawBody, response, cache, cursors: cursors as Cursors }
}

