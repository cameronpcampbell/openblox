// [ Types ] /////////////////////////////////////////////////////////////////////
import { getConfig, RobloxCookie } from "../config"
import { HttpHandler, HttpResponse } from "../http/httpHandler"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { IsUnion, UnionPrettify, ObjectPrettify, Falsey } from "typeforge"
import type { RestMethod, SecureUrl } from "../utils/utils.types"

export type ApiMethod<
  RawData, PrettifiedData = undefined,
  PrettifiedDataOrRawData = PrettifiedData extends undefined ? RawData : PrettifiedData,
> = Promise<
  {
    path: `/${string}`,
    method: RestMethod,
    searchParams?: Record<string, any>,
    headers?: Record<string, string | null | undefined>,
    formData?: Record<string, any>,
    body?: any,
    name: string,

    // Hacky workaround to set types for rawData and prettifiedData
    rawData?: RawData,
    prettifiedData?: PrettifiedDataOrRawData,

    getCursorsFn?: (rawData: RawData) => ([ previous: string | number | undefined | null, next: string | number | undefined | null ])
  } &
  (PrettifiedData extends undefined ? {} : { prettifyFn: (rawData: RawData, response: HttpResponse<RawData>) => PrettifiedDataOrRawData })
>

type ApiMethodResult<
  Args extends Record<any, any> | undefined,
  RawData, PrettifiedData = RawData,
> = ObjectPrettify<(
  {
    data: PrettifiedData,
    response: HttpResponse<RawData>
  } & (
    "cursor" extends keyof Args ? { cursors: PrettifiedCursors }
    : "startRowIndex" extends keyof Args ? { cursors: PrettifiedCursors }
    : {}
  )
)>

type PrettifiedCursors = ObjectPrettify<{
  next?: string,
  previous?: string
}>

export type PrettifyData<Input, _ExtendsDate extends boolean = Input extends Date ? true : false> = (
  _ExtendsDate extends true ? Input
  : Input extends boolean ? boolean
  : Input extends Record<any, any> ? ObjectPrettify<Input>
  : IsUnion<Input> extends true ? UnionPrettify<Input>
  // @ts-ignore | hush hush shawty
  : Array<any> extends Input ? PrettifyData<Input[number]>[]
  : Input extends Array<any> ? PrettifyData<Input[number]>[]
  : Input
)
//////////////////////////////////////////////////////////////////////////////////

// [ Variables ] /////////////////////////////////////////////////////////////////
const config = getConfig()
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const formatSearchParams = (params?: Record<string, any>) => {
  if (!params) return ""
  
  const [paramsKeys, paramsValues] = [Object.keys(params), Object.values(params)]
  const formattedParams: { [key: string]:string } = {}

  paramsValues.forEach((param:any, i:number) => {
    if (param == undefined || param == null) return
    if (typeof(param) == "string") return formattedParams[paramsKeys[i] as string] = param
    if (Array.isArray(param)) return formattedParams[paramsKeys[i] as string] = param.join(",")
    if (param instanceof Date) return formattedParams[paramsKeys[i] as string] = param.toDateString()
    return formattedParams[paramsKeys[i] as string] = param.toString()
  })
  
  return `?${new URLSearchParams(formattedParams).toString()}`
}

const defaultGetCursors = (responseBody: Record<any, any>) => {
  return [ responseBody.previousPageCursor, responseBody.nextPageCursor ]
}

function getParams(func:(...args: any[]) => any) {
  let str = func.toString()

  const argsStr = /(?:async) (?:\((?:\{ (.+) \})\))/.exec(str)?.[1]
  if (!argsStr) return []

  return argsStr.replaceAll(/{(.*)}/g, "").replaceAll(/ = ([^,]+)/g, "").replaceAll(/:( *)/g, "").split(", ")
}
//////////////////////////////////////////////////////////////////////////////////


type CreateApiGroup = (args: { groupName: string, baseUrl: SecureUrl }) => (
  <
    Args extends Record<string, any> | undefined,
    Returns extends ApiMethod<any, any>,
  >(getDataFn: (args: Args) => Returns) => (
    (this: any, args: keyof Args extends undefined ? void : Args) => (
      Promise<ApiMethodResult<
        Args,
        PrettifyData<NonNullable<Awaited<Returns>["rawData"]>>,
        PrettifyData<NonNullable<Awaited<Returns>["prettifiedData"]>>
      >>
    )
  )
)

export const createApiGroup: CreateApiGroup = ({ groupName, baseUrl }) => {
  return (getDataFn) => {
    const rawArgs = getParams(getDataFn)
    const rawArgsContainsCursor = (rawArgs.includes("cursor") || rawArgs.includes("startRowIndex")) ? true : false

    return async function (this, args) {
      const apiMethodData = await getDataFn(args as any)
      const { path, method, searchParams, headers, body, formData } = apiMethodData

      const url: SecureUrl = `${baseUrl}${path}${formatSearchParams(searchParams)}`

      const response = await HttpHandler({ url, method, headers, body, formData }, {
        cookie: this.cookie || config.cookie,
        cloudKey: this.cloudKey || config.cloudKey,
        oauthToken: this.oauthToken,
      })
      if (!(response instanceof HttpResponse)) throw response // TODO: better error handling
      const responseBody = response.body

      const prettifyFn = (apiMethodData as any)?.prettifyFn

      const apiMethodResult = {
        response, data: (prettifyFn ? prettifyFn(response.body, response) : response.body)
      }

      // Adds cursors to the response if they exist.
      if (rawArgsContainsCursor && (responseBody as unknown) instanceof Object) {
        const [ previous, next] = (apiMethodData.getCursorsFn ?? defaultGetCursors)(responseBody as Record<any, any>);

        (apiMethodResult as Record<any, any>).cursors = { previous, next } as PrettifiedCursors
      }

      return apiMethodResult as any
    }
  }
}

type NumberIsLiteral<Num extends number> = (
  number extends Num ? false
  : [Num] extends [never] ? false
  : [Num] extends [string | number] ? true
  : false
)