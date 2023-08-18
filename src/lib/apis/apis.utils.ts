import { AxiosResponse, isAxiosError } from "axios"
import { ApiError, InvalidRequestDataError, UnexpectedError } from "../../errors"
import { isOneOfMany } from "../lib.utils"

const HandleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (await ApiError(error)) throw error

  if (!knownErrorStatusCodes) return
  if (!isAxiosError(error)) return
  if (await isOneOfMany(error.response?.status, knownErrorStatusCodes)) throw new InvalidRequestDataError(error.response as AxiosResponse<any, any>)
}

export const ApiFuncBaseHandler = async (fn: () => Promise<any>, knownErrorStatusCodes: number[]) => {
  try {
    return await fn()

  } catch (error: unknown) {
    await HandleApiErrors(error, knownErrorStatusCodes)
    throw new UnexpectedError(error)
  }
}