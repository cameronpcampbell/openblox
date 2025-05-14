// [ Modules ] ///////////////////////////////////////////////////////////////////
import { defaultOpenbloxConfig, OpenbloxConfig } from "../../config";
import { HttpHandler, isOpenCloudUrl } from "../../http/httpHandler";
import { isObject, objectToFieldMask } from "../../utils/utils";
import { HttpResponse } from "../../http/http.utils";
import { pollHttp } from "../../helpers"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { UrlSecure } from "typeforge";

import type { ApiMethodDataFormatRawData, ApiMethodResponse, CallApiMethod, CreateApiGroupFn, Cursor } from "./apiGroup.types";
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const operationPrefixRegexWithVersion = /((?:.+)(?:v[1-9]+\/))(?:.+)/
const operationPrefixRegexWithoutVersion = /(.+\/)(cloud\/)(?:v[1-9]+)(?:.+)/
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const getParams = (func: (...args: any[]) => any) => {
  let str = func.toString()

  const argsStr = /(?:async) (?:\((?:\{ (.+) \})\))/.exec(str)?.[1]
  if (!argsStr) return []

  return argsStr.replaceAll(/{(.*)}/g, "").replaceAll(/ = ([^,]+)/g, "").replaceAll(/:( *)/g, "").split(", ")
}

const formatSearchParams = (params?: Record<string, any> | string) => {
  if (typeof(params) == "string") return params
  if (!params) return ""
  
  const [paramsKeys, paramsValues] = [Object.keys(params), Object.values(params)]
  const formattedParams: { [key: string]:string } = {}

  paramsValues.forEach((param:any, i:number) => {
    if (param == undefined || param == null) return
    if (typeof(param) == "string") return formattedParams[paramsKeys[i] as string] = param
    if (Array.isArray(param)) return formattedParams[paramsKeys[i] as string] = param.join(",")
    if (param instanceof Date) return formattedParams[paramsKeys[i] as string] = param.toISOString()
    return formattedParams[paramsKeys[i] as string] = param.toString()
  })
  
  return formattedParams
}

const defaultGetCursors = (rawData: Record<any, any>) => {
  return [ rawData.previousPageCursor, rawData.nextPageCursor ]
}

function isObjectEmpty(obj: Record<any, any>) {
  for (var prop in obj) if (obj.hasOwnProperty(prop)) return false
  return true
}

const isNoMoreData = (data: any) => {
  if (data?.constructor == Object) return isObjectEmpty(data)
  if (Array.isArray(data)) return !data.length
  return !!data
}

const isCursorEmpty = (cursor: Cursor) => (!cursor || (typeof cursor == "string" && cursor.length === 0))

const paginate = (
  initialResponse: ApiMethodResponse,
  callApiMethod: CallApiMethod<any, any, true>,
  args: Record<any, any>, config: any,
  handlerFnCursorArg: "cursor" | "startRowIndex" | "pageNumber"
) => (
  async function* () {
    if (isNoMoreData(initialResponse.data)) return
    yield initialResponse

    let nextCursor = initialResponse.cursors?.next
    if (isCursorEmpty(nextCursor)) return

    while (true) {
      const newValue = await callApiMethod.call(config, { ...args, [handlerFnCursorArg]: nextCursor })
      if (isNoMoreData(newValue.data)) return
      yield newValue

      nextCursor = newValue.cursors?.next as Cursor
      if (isCursorEmpty(nextCursor)) return
    }
  }
)

const pollForResponse = async (config: OpenbloxConfig, url: string, operationPath: string, cloudKey: string) => {
  const operationPrefix = operationPath.match(/^(\/?)cloud\/v[1-9]+(\/?)/)
    ? operationPrefixRegexWithoutVersion.exec(url)?.[1] as UrlSecure
    : operationPrefixRegexWithVersion.exec(url)?.[1] as UrlSecure
  
  const operationUrl = `${operationPrefix}${operationPath}` as UrlSecure

  const headers = { "x-api-key": cloudKey }

  let response: any
  await pollHttp.call(config, { method: "GET", url: operationUrl, headers }, async (polledResponse, stopPolling) => {
    if (!(polledResponse.body as { done?: boolean }).done) return
    response = polledResponse
    stopPolling()
  })

  return response
}
//////////////////////////////////////////////////////////////////////////////////


export const createApiGroup: CreateApiGroupFn = ({ name:groupName, baseUrl, defaultGetCursors:groupDefaultGetCursors }) => ({
  // createApiMethod.
  createApiMethod: (handlerFn) => {
    const handlerFnArgs = getParams(handlerFn)
    const handlerFnCursorArg = 
      handlerFnArgs.includes("cursor") ? "cursor" :
      handlerFnArgs.includes("startRowIndex") ? "startRowIndex" :
      handlerFnArgs.includes("pageNumber") ? "pageNumber" : null

    const thisDefaultGetCursors = groupDefaultGetCursors ?? defaultGetCursors

    const createCallApiMethod = (_baseUrl: UrlSecure = baseUrl): CallApiMethod<any, any, boolean> => async function (args) {
      const config = this || defaultOpenbloxConfig
      const cookie = config?.cookie
      const cloudKey = config?.cloudKey
      const oauthToken = config?.oauthToken

      const handlerFnData = await handlerFn(args as any)
      let { path, method, searchParams, applyFieldMask, body, formData, headers, getCursorsFn, pathToPoll, name } = handlerFnData
      const formatRawDataFn = (handlerFnData as (typeof handlerFnData & Partial<ApiMethodDataFormatRawData>)).formatRawDataFn

      // Converts the search params into a string (and adds an update mask param if specified).
      let formattedSearchParams = formatSearchParams(searchParams)
      if (applyFieldMask && body && isObject(body)) formattedSearchParams += `&updateMask=${objectToFieldMask(body as Record<any, any>)}`

      const url: UrlSecure = `${_baseUrl}${path}${formattedSearchParams ? `?${new URLSearchParams(formattedSearchParams).toString()}` : ""}`

      // Adds credentials to headers.
      if (cookie || cloudKey || oauthToken) {
        if (!headers) headers = {}
        if (cookie) headers["Cookie"] = cookie
        if (cloudKey) headers["x-api-key"] = cloudKey
        if (oauthToken) headers["Authorization"] = `Bearer ${oauthToken}`
      }

      let main: () => Promise<any>
      main = async () => {
        let response: HttpResponse = await HttpHandler(config, { method, url, body, formData, headers }) as any // TODO
        if (!(response instanceof HttpResponse)) throw response
        let rawData = response.body

        // Uncompleted long running operation.
        let opPath = rawData?.path
        if (opPath && rawData?.done === false && isOpenCloudUrl(url)) {
          console.warn(`Polling '${groupName}.${name}' (Please be patient)...`)
          response = await pollForResponse(config, url, pathToPoll ? pathToPoll(rawData) : opPath, cloudKey)
          rawData = response.body
        }

        let cachedData: any

        let apiMethodResult: ApiMethodResponse<any, any> = formatRawDataFn
          ? { response, again: main, get data() {
            if (cachedData) return cachedData
            else {
              cachedData = formatRawDataFn(rawData, response)
              return cachedData
            }
          }, configUsed: config }
          : { response, again: main, data: rawData, configUsed: config }

        // Applies async iterator if method is paginated.
        if (handlerFnCursorArg) {
          let [ previousCursor, nextCursor ] = (getCursorsFn ?? thisDefaultGetCursors)(rawData);
          apiMethodResult.cursors = { previous: previousCursor, next: nextCursor }
          if (args && !("__notRoot" in args)) {
            (apiMethodResult as any as ApiMethodResponse<any, any, true>)[Symbol.asyncIterator] = paginate(
              apiMethodResult, callApiMethod as CallApiMethod<any, any, true>, args as Record<any, any>, config, handlerFnCursorArg
            ) as any
          }
        }

        return apiMethodResult as any
      }

      return await main()
    }

    const callApiMethod = createCallApiMethod().bind(undefined);

    // To handle legacy open cloud endpoints which use classic endpoints but with different base urls.
    (callApiMethod as any)._deriveWithDifferentBaseUrl = (baseUrl: UrlSecure) => createCallApiMethod(baseUrl)

    return callApiMethod
  },

  addExistingApiMethod: <Method extends CallApiMethod<any, any, boolean>>(method: Method): Method => {
    return (method as any)._deriveWithDifferentBaseUrl(baseUrl)
  }
})
