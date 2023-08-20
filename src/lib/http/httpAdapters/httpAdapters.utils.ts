import { AgResponseConfig } from "./httpAdapters.types"

export class AgResponse {
  statusCode: number
  body: any
  headers: { [key: string]: string }
  rawResponse: any

  constructor({ statusCode, body, headers, rawResponse }: AgResponseConfig) {
    this.statusCode = statusCode
    this.body = body
    this.headers = headers
    this.rawResponse = rawResponse
  }
}