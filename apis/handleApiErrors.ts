import { AxiosResponse, isAxiosError } from "axios"
import { AuthorizationDeniedError, InvalidRequestDataError, ThrottledError } from "../errors"
import { IsOneOfMany } from "../utils"

export const HandleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (error instanceof ThrottledError || error instanceof AuthorizationDeniedError) throw error

  if (!knownErrorStatusCodes) return
  if (!isAxiosError(error)) return
  if (await IsOneOfMany(error.response?.status, knownErrorStatusCodes)) throw new InvalidRequestDataError(error.response as AxiosResponse<any, any>)
}