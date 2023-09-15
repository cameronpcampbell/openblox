import { AgResponse } from "./httpAdapters.utils"

export type RequestConfig = {
  searchParams?: { [key: string]: any },
  headers?: { [key: string]: string },
}

export type RequestConfigWithBody = RequestConfig & {
  body: Object
}

export type AgResponseConfig = {
  statusCode: number,
  body: Object,
  headers: { [key: string]: string }
  rawResponse: any
}

export type FetchAdapterConfig<ResponseShape> = {
  get: (url: string, config?: RequestConfig) => Promise<ResponseShape>,
  post: (url: string, config?: RequestConfigWithBody) => Promise<ResponseShape>,
  patch: (url: string, config?: RequestConfigWithBody) => Promise<ResponseShape>,
  parseRes: <ResBody extends Object>(res: ResponseShape) => Promise<AgResponse>
}