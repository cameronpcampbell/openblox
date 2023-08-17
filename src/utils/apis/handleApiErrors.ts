import { AxiosResponse, isAxiosError } from "axios"
import { ApiError, InvalidRequestDataError } from "../../errors"
import { isOneOfMany } from "../../utils"

export const HandleApiErrors = async (error:any, knownErrorStatusCodes?: number[]) => {
  if (await ApiError(error)) throw error

  if (!knownErrorStatusCodes) return
  if (!isAxiosError(error)) return
  if (await isOneOfMany(error.response?.status, knownErrorStatusCodes)) throw new InvalidRequestDataError(error.response as AxiosResponse<any, any>)
}