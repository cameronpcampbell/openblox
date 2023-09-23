// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "./httpAdapters.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type RequestConfig = {
  searchParams?: { [key: string]: any },
  headers?: { [key: string]: string|undefined|null|false },
  validStatusCodes?: number[]
}

export type RequestConfigWithBody = RequestConfig & {
  body?: Object,
  formData?: Object
}


export type AgnosticResponseConfig = {
  url: string
  statusCode: number,
  cache?: CacheResultType,
  body: any,
  headers: Map<string, string>
  rawResponse: any
}

export type HttpAdapterConfig = {
  get: (url: string, config?: RequestConfig) => Promise<AgnosticResponse>,
  post: (url: string, config?: RequestConfigWithBody) => Promise<AgnosticResponse>,
  patch: (url: string, config?: RequestConfigWithBody) => Promise<AgnosticResponse>,
  delete: (url: string, config?: RequestConfigWithBody) => Promise<AgnosticResponse>
}