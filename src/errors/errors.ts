// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach } from "p-iteration"

import { AgnosticResponse } from "../http/httpAdapters/httpAdapters.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyError } from "parse-roblox-errors-node"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ThrottledError extends Error {
  statusCode: number
  errors: AnyError[]
  response: AgnosticResponse
  
  constructor(errorRes: AgnosticResponse) {
    const errors = errorRes.errors as AnyError[]

    super(errors?.[0]?.message ?? "Too many requests.")

    this.name = "ThrottledError"
    this.statusCode = errorRes.statusCode
    this.errors = errorRes.errors as AnyError[]
    this.response = errorRes
  }
}

new Error()

export class AuthorizationDeniedError extends Error {
  statusCode: number
  errors: AnyError[]
  response: AgnosticResponse
  
  constructor(errorRes: AgnosticResponse) {
    const errors = errorRes.errors as AnyError[]

    super(errors?.[0]?.message ?? "Authorization has been denied for this request.")
    this.name = "AuthorizationDeniedError"
    this.statusCode = errorRes.statusCode
    this.errors = errors
    this.response = errorRes
  }
}

export class InvalidRequestDataError extends Error {
  statusCode: number
  errors: AnyError[]
  response: AgnosticResponse
  
  constructor(errorRes: AgnosticResponse) {
    const errors = errorRes.errors as AnyError[]

    super(errors?.[0]?.message ?? "Request data is invalid.")
    this.name = "InvalidRequestDataError"
    this.statusCode = errorRes.statusCode
    this.errors = errors
    this.response = errorRes
  }
}

export class NoCsrfTokenError extends Error {
  errors: AnyError[]

  constructor(errorRes: AgnosticResponse) {
    const errors = errorRes.errors as AnyError[]

    super(errors?.[0]?.message ?? "CSRF token was missing.")
    this.name = "NoCsrfTokenError"
    this.errors = errors
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

const ApiErrors = ["ThrottledError", "AuthorizationDeniedError", "InvalidRequestDataError", "UnexpectedError", "NoCsrfTokenError"]

export const ApiError = async (error:any) => {
  try {
    await forEach(ApiErrors, async errorType => { if (error.name == errorType) throw new Error(errorType) })
    return false
  } catch (error: any) {
    return error.message
  }
}