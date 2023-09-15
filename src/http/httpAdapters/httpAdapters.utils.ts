// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyError } from "parse-roblox-errors-node"
import type { AgnosticResponseConfig } from "./httpAdapters.types"
import type { CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class AgnosticResponse {
  statusCode: number
  cache?: CacheResultType
  url: string
  headers: Map<any, any>
  body: any
  errors?: AnyError[]
  rawResponse: any

  constructor({ url, statusCode, body, headers, rawResponse }: AgnosticResponseConfig) {
    this.url = url
    this.statusCode = statusCode
    this.body = body
    this.headers = headers
    this.rawResponse = rawResponse
  }
}