// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "./httpAdapters.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type RequestConfig = {
  searchParams?: { [key: string]: any },
  headers?: { [key: string]: string },
}

export type RequestConfigWithBody = RequestConfig & {
  body: Object,
  formData: Object
}


export type AgnosticResponseConfig = {
  url: string
  statusCode: number,
  cache?: CacheResultType,
  body: any,
  headers: Map<any, any>
  rawResponse: any
}

export type HttpAdapterConfig<ResponseShape = any> = {
  get: (url: string, config?: RequestConfig) => Promise<ResponseShape>,
  post: (url: string, config?: RequestConfigWithBody) => Promise<ResponseShape>,
  patch: (url: string, config?: RequestConfigWithBody) => Promise<ResponseShape>,
  delete: (url: string, config?: RequestConfigWithBody) => Promise<ResponseShape>,
  parseRes: <ResBody extends any>(res: ResponseShape) => Promise<AgnosticResponse>
}