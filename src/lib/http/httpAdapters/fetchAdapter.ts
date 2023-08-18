import { formatSearchParams } from "../http.utils"

type Url = `http://${string}` | `https://${string}`

type RequestConfig = {
  searchParams?: { [key: string]: any },
  headers?: { [key: string]: string }
}

type RequestConfigWithBody = RequestConfig & {
  body: Object
}

export const HttpFetchAdapter = {
  get: async <ResData>(url: Url, config?: RequestConfig): Promise<{
    res: Response, data: ResData
  }> => {
    const searchParams = formatSearchParams(config?.searchParams)

    const res: Response = await fetch(searchParams ? `${url}?${searchParams}` : url, {
      method: "GET",
      headers: config?.headers
    })

    return { res, data: await res.json() as ResData }
  },

  post: async <ResData>(url: Url, config?: RequestConfigWithBody): Promise<{
    res: Response, data: ResData
  }> => {
    const searchParams = formatSearchParams(config?.searchParams)
    const body = config?.body

    const res: Response = await fetch(searchParams ? `${url}?${searchParams}` : url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers
      },
      body: body && JSON.stringify(body)
    })

    return { res, data: await res.json() as ResData }
  },

  patch: async <ResData>() => {

  }
}