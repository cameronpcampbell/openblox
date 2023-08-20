import { AxiosResponse, isAxiosError } from "axios"
import { ApiError, InvalidRequestDataError, UnexpectedError } from "../../errors"
import { isOneOfMany } from "../lib.utils"
import { AgResponse } from "../http/httpAdapters/httpAdapters.utils"

const HandleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (await ApiError(error)) throw error

  if (!knownErrorStatusCodes) return
  if (!(error instanceof AgResponse)) throw error
  if (await isOneOfMany(error.statusCode, knownErrorStatusCodes)) throw new InvalidRequestDataError(error)
}

type ResolvedType<T> = T extends Promise <infer R> ? R : never;

export const ApiFuncBaseHandler = async <T extends (...args: any) => any>(fn: T, knownErrorStatusCodes: number[]): (
  Promise<ResolvedType<ReturnType<T>>>
) => {
  try {
    return await fn()

  } catch (error: unknown) {
    await HandleApiErrors(error, knownErrorStatusCodes)
    throw new UnexpectedError(error)
  }
}