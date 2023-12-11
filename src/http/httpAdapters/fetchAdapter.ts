// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "."
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { HttpAdapterConfig } from "."
import { isObjectOrArray, removeEntriesWhereUndefinedValues } from "../../utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const getBody = async (res: Response) => {
  const text = await res.text()
  try { return JSON.parse(text) }
  catch { return text }
}

const stringifyIfObjectOrArray = (body: any) => {
  if (isObjectOrArray(body)) return JSON.stringify(body)
  return body
}

const objectToFormData = (data: Object) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value))
  return formData
}

const parseResponse = async <ResponseBody extends any>(res: Response): Promise<AgnosticResponse> => {
  return new AgnosticResponse({
    url: res.url,
    statusCode: res.status,
    body: await getBody(res) as ResponseBody,
    headers: res.headers as any as Map<string, string>,
    rawResponse: res
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const FetchAdapter: HttpAdapterConfig = {
  get: async (url, config) => {
    const headers = config?.headers

    return parseResponse(await fetch(url, {
      method: "GET",
      headers: headers && removeEntriesWhereUndefinedValues(headers)
    }))
  },

  post: async (url, config) => { 
    const [ body, formData, headers ] = [ config?.body, config?.formData, config?.headers ]

    return parseResponse(await fetch(url, {
      method: "POST",
      headers: {
        ...(( !(formData && Object.keys(formData)?.length) || !formData ) && { "Content-Type": "application/json" }),
        ...headers && removeEntriesWhereUndefinedValues(headers)
      },
      body: (formData ? objectToFormData(formData) : stringifyIfObjectOrArray(body)) as any
    }))
  },

  patch: async (url, config) => {
    const [ body, formData, headers ] = [ config?.body, config?.formData, config?.headers ]

    return parseResponse(await fetch(url, {
      method: "PATCH",
      headers: {
        ...(( !(formData && Object.keys(formData)?.length) || !formData ) && { "Content-Type": "application/json" }),
        ...headers && removeEntriesWhereUndefinedValues(headers)
      },
      body: (formData ? objectToFormData(formData) : stringifyIfObjectOrArray(body)) as any
    }))
  },

  delete: async (url, config) => {
    const [ body, formData, headers ] = [ config?.body, config?.formData, config?.headers ]

    return parseResponse(await fetch(url, {
      method: "DELETE",
      headers: {
        ...(( !(formData && Object.keys(formData)?.length) || !formData ) && { "Content-Type": "application/json" }),
        ...headers && removeEntriesWhereUndefinedValues(headers)
      },
      body: (formData ? objectToFormData(formData) :stringifyIfObjectOrArray(body)) as any
    }))
  },
}











