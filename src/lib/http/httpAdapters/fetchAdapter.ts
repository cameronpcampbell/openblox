import type { FetchAdapterConfig, RequestConfig, RequestConfigWithBody } from "./httpAdapters.types"
import { AgResponse } from "./httpAdapters.utils"

export const FetchAdapter: FetchAdapterConfig<Response> = {
  get: async (url, config) => {

    const res = await fetch(url, {
      method: "GET",
      headers: config?.headers
    })

    return res
  },

  post: async (url, config) => {
    const body = config?.body

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers
      },
      body: body && JSON.stringify(body)
    })

    return res
  },

  patch: async (url, config) => {
    const body = config?.body

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers
      },
      body: body && JSON.stringify(body)
    })

    return res
  },

  parseRes: async <ResBody extends Object>(res: Response) => {
    const headers: { [key: string]: string } = {}
    res.headers.forEach((value, key) => {
      headers[key] = value
    })
  
    return new AgResponse({
      statusCode: res.status,
      body: await res.json() as ResBody,
      headers: headers,
      rawResponse: res
    })
  }
}