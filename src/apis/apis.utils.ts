// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { ApiError, InvalidRequestDataError, UnexpectedError } from "../errors"
import { isOneOfMany } from "../utils"
import { AgnosticResponse } from "../http/httpAdapters/httpAdapters.utils"
import { getConfig } from "../config/config"
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
    return await fn.call(getConfig())

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