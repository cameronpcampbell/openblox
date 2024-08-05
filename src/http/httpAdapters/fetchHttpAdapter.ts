// [ Modules ] ///////////////////////////////////////////////////////////////////
import { type HttpAdapter } from "./httpAdapters"
import { HttpResponse } from "../http.utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const getBody = async (response: Response, contentType: string | null) => {
  return contentType?.startsWith("application/json") ? await response.json() : await response.text()
}
//////////////////////////////////////////////////////////////////////////////////


export const FetchAdapter: HttpAdapter = async ({ url, method, headers, body, formData }) => {
  const response = await fetch(url, { method, headers: headers as any, body: formData || body, cache: "no-store", credentials: "include" } as any)

  return new HttpResponse({
      url, method,
      success: response.ok,
      statusCode: response.status,
      headers: response.headers as any as Headers,
      body: await getBody(response, response.headers.get("content-type")),
      fullResponse: response
  } as any)
}