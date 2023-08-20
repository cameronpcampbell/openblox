import { AxiosResponse } from "axios"
import { forEach } from "p-iteration"
import { AgResponse } from "./lib/http/httpAdapters/httpAdapters.utils"

export class ThrottledError extends Error {
  statusCode: number
  errors: any[]
  response: AgResponse
  
  constructor(res: AgResponse) {
    const errors = res.body

    super(errors?.[0]?.message ?? "Too many requests.")
    this.name = "ThrottledError"
    this.statusCode = res.statusCode
    this.errors = errors
    this.response = res
  }
}

export class AuthorizationDeniedError extends Error {
  statusCode: number
  errors: any[]
  response: AgResponse
  
  constructor(res: AgResponse) {
    const errors = res.body

    super(errors?.[0]?.message ?? "Authorization has been denied for this request.")
    this.name = "AuthorizationDeniedError"
    this.statusCode = res.statusCode
    this.errors = errors
    this.response = res
  }
}

export class InvalidRequestDataError extends Error {
  statusCode: number
  errors: any[]
  response: AgResponse
  
  constructor(res: AgResponse) {
    const errors = res.body

    super(errors?.[0]?.message ?? "Request data is invalid.")
    this.name = "InvalidRequestDataError"
    this.statusCode = res.statusCode
    this.errors = errors
    this.response = res
  }
}

export class UnexpectedError extends Error {
  error: any

  constructor(error: unknown) {
    super("An unexpected error has occured.")
    this.name = "UnexpectedError"
    this.error = error
  }
}

export class NoCsrfTokenError extends Error {
  error: any

  constructor(error: unknown) {
    super("CSRF token was missing.")
    this.name = "NoCsrfTokenError"
    this.error = error
  }
}

const ApiErrors = ["ThrottledError", "AuthorizationDeniedError", "InvalidRequestDataError", "UnexpectedError", "NoCsrfTokenError"]

export const ApiError = async (error:any) => {
  try {
    await forEach(ApiErrors, async errorType => { if (error.name == errorType) throw new Error(errorType) })
    return false
  } catch (error: any) {
    return error.message
  }
}