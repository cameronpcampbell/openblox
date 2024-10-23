# HTTP Adapters
By default Openblox uses `fetch` to make HTTP requests. Some users may prefer to use something different or are using a runtime which doesn't support fetch. For this reason Openblox facilitates the use of any of any HTTP library / framework via `HTTP Adapters`.

## Example HTTP Adapter.
```ts showLineNumbers copy
// ./myHttpAdapter.ts

// [ Modules ] ///////////////////////////////////////////////////////////////////
import { HttpAdapter, HttpResponse } from "openblox/http"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const getBody = async (response: Response, contentType: string | null) => {
  return contentType?.startsWith("application/json") ? await response.json() : await response.text()
}
//////////////////////////////////////////////////////////////////////////////////


export const FetchAdapter: HttpAdapter = async ({ url, method, headers, body, formData }) => {
  const response = await fetch(url, { method, headers: headers as any, body: formData || body, cache: "no-store" } as any)

  /* Different libraries return HTTP responses in slightly different ways, so returning
     this class ensures every HTTP adapter returns their responses in the same way. */
  return new HttpResponse({
      url, method,
      success: response.ok,
      statusCode: response.status,
      headers: response.headers as any as Headers,
      body: await getBody(response, response.headers.get("content-type")),
      fullResponse: response
  } as any)
}
```

## Configuring Openblox To Use The Above HTTP Adapter.

```ts showLineNumbers copy
// ./index.ts
import "dotenv/config"
import { updateConfig } from "openblox/config"
import { MyHttpAdapter } from "./myHttpAdapter"

updateConfig({
  http: {
    adapter: MyHttpAdapter
  }
})

// make api requests via openblox here!
```
