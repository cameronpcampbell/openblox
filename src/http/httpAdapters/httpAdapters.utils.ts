// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyError } from "parse-roblox-errors-node"
import type { AgnosticResponseConfig } from "./httpAdapters.types"
import type { CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class AgnosticResponse {
  statusCode: AgnosticResponseConfig["statusCode"]
  cache?: AgnosticResponseConfig["cache"]
  url: AgnosticResponseConfig["url"]
  headers: AgnosticResponseConfig["headers"]
  body: AgnosticResponseConfig["body"]
  rawResponse: AgnosticResponseConfig["rawResponse"]
  errors?: AnyError[]

  constructor({ url, statusCode, body, headers, rawResponse }: AgnosticResponseConfig) {
    this.url = url
    this.statusCode = statusCode
    this.body = body
    this.headers = headers
    this.rawResponse = rawResponse
  }
}