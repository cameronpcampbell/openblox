// [ Modules ] ///////////////////////////////////////////////////////////////////
import { config } from "../../config";
import { HttpHandler, isOpenCloudUrl } from "../../http/httpHandler";
import { isObject, objectToFieldMask } from "../../utils/utils";
import { ApiMethodDataFormatRawData, ApiMethodResponse, CallApiMethod, CreateApiGroupFn, Cursor } from "./apiGroup.types";
import { HttpResponse } from "../../http/http.utils";
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { SecureUrl } from "../../utils/utils.types";
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

const formatSearchParams = (params?: Record<string, any>) => {
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
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
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
  args: Record<any, any>, overrides: any,
  handlerFnCursorArg: "cursor" | "startRowIndex" | "pageNumber"
) => (
  async function* () {
    if (isNoMoreData(initialResponse.data)) return
    yield initialResponse

    let nextCursor = initialResponse.cursors?.next
    if (isCursorEmpty(nextCursor)) return

    while (true) {
      const newValue = await callApiMethod.call(overrides, { ...args, [handlerFnCursorArg]: nextCursor })
      if (isNoMoreData(newValue.data)) return
      yield newValue

      nextCursor = newValue.cursors?.next as Cursor
      if (isCursorEmpty(nextCursor)) return
    }
  }
)

const sleep = async (s: number) => new Promise(resolve => setTimeout(resolve, s * 1000))

const expBackoff = (delay: number, lastIter: number) => {
  return delay + (5 * lastIter)
}
//////////////////////////////////////////////////////////////////////////////////


export const createApiGroup: CreateApiGroupFn = ({ name:groupName, baseUrl, defaultGetCursors:groupDefaultGetCursors }) => (
  // createApiMethod.
  (handlerFn) => {
    const handlerFnArgs = getParams(handlerFn)
    const handlerFnCursorArg = 
      handlerFnArgs.includes("cursor") ? "cursor" :
      handlerFnArgs.includes("startRowIndex") ? "startRowIndex" :
      handlerFnArgs.includes("pageNumber") ? "pageNumber" : null

    const thisDefaultGetCursors = groupDefaultGetCursors ?? defaultGetCursors

    return async function callApiMethod(args) {
      const overrides = this
      const cookie = overrides?.cookie || config?.cookie
      const cloudKey =  overrides?.cloudKey || config?.cloudKey
      const oauthToken = overrides?.oauthToken

      const handlerFnData = await handlerFn(args as any)
      let { path, method, searchParams, applyFieldMask, body, formData, headers, getCursorsFn, pathToPoll, name } = handlerFnData
      const formatRawDataFn = (handlerFnData as (typeof handlerFnData & Partial<ApiMethodDataFormatRawData>)).formatRawDataFn

      // Converts the search params into a string (and adds an update mask param if specified).
      let formattedSearchParams = formatSearchParams(searchParams)
      if (applyFieldMask && body && isObject(body)) formattedSearchParams += `&updateMask=${objectToFieldMask(body as Record<any, any>)}`

      const url: SecureUrl = `${baseUrl}${path}${formattedSearchParams ? `?${new URLSearchParams(formattedSearchParams).toString()}` : ""}`

      // Adds credentials to headers.
      if (cookie || cloudKey || oauthToken) {
        if (!headers) headers = {}
        if (cookie) headers["Cookie"] = cookie
        if (cloudKey) headers["x-api-key"] = cloudKey
        if (oauthToken) headers["Authorization"] = `Bearer ${oauthToken}`
      }

      let response = await HttpHandler({ method, url, body, formData, headers })

      if (!(response instanceof HttpResponse)) throw response
      let rawData = response.body

      // Uncompleted long running operation.
      let opPath = rawData?.path
      if (isOpenCloudUrl(url) && opPath && rawData?.done === false) {
        console.warn(`Polling '${groupName}.${name}' (Please be patient)...`)

        if (pathToPoll) opPath = pathToPoll(rawData)

        const operationPrefix = opPath.match(/^(\/?)cloud\/v[1-9]+(\/?)/)
          ? operationPrefixRegexWithoutVersion.exec(url)?.[1] as SecureUrl
          : operationPrefixRegexWithVersion.exec(url)?.[1] as SecureUrl
        const opUrl = `${operationPrefix}${opPath}` as SecureUrl

        const headers = { "x-api-key": cloudKey }

        let delay = 0
        for (let iter = 0; iter > -1; iter++) {
          response = await HttpHandler({ method: "GET", url: opUrl, headers })
          if (!(response instanceof HttpResponse)) throw response
          rawData = response.body

          if (rawData?.done === true) break

          await sleep(delay)
          delay = expBackoff(delay, iter)
        }
      }

      let apiMethodResult: ApiMethodResponse<any, any>
      if (formatRawDataFn) apiMethodResult = { response, get data() { return formatRawDataFn(rawData, response) } }
      else apiMethodResult = { response, data: rawData }

      if (handlerFnCursorArg) {
        let [ previousCursor, nextCursor ] = (getCursorsFn ?? thisDefaultGetCursors)(rawData);
        apiMethodResult.cursors = { previous: previousCursor, next: nextCursor }
        if (args && !("__notRoot" in args)) {
          (apiMethodResult as any as ApiMethodResponse<any, any, true>)[Symbol.asyncIterator] = paginate(
            apiMethodResult, callApiMethod as CallApiMethod<any, any, true>, args as Record<any, any>, overrides, handlerFnCursorArg
          ) as any
        }
      }

      return apiMethodResult as any
    }
  }
)