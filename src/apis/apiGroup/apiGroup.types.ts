import type { ObjectPrettify, Prettify, StringIsLiteral } from "typeforge"
import type { RestMethod } from "../../utils/utils.types"
import type { HttpResponse, RobloxCookie } from "../../http/http.utils"
import { OpenbloxConfig } from "../../config"


// Create Api Group Types ---------------------------------------------------------------------------------------------
type ApiGroupProps = {
  name: string,
  baseUrl: `https://${string}`,
  defaultGetCursors?: (rawData: any) => ([ previous: string | null, next: string | null ])
}

export type CreateApiGroupFn = (props: ApiGroupProps) => {
  createApiMethod: AddApiMethodFn,
  
  addExistingApiMethod: <Method extends CallApiMethod<any, any, boolean>>(method: Method) => Method
}
// -------------------------------------------------------------------------------------------------------------------


// Add Api Method Types ----------------------------------------------------------------------------------------------
type ApiMethodCursorKeys = "cursor" | "startRowIndex" | "pageNumber"

type ApiMethodResponseFromMethod<
  MethodData extends ApiMethodData, ArgsContainCursor extends boolean
> = ApiMethodResponse<
  Exclude<MethodData["🔒__PRIVATE_RAW_DATA"], undefined>, Exclude<MethodData["🔒__PRIVATE_FORMATTED_DATA"], undefined>, ArgsContainCursor
>

type AddApiMethodFn = <Args extends Record<any, any>, MethodData extends ApiMethodData>(handlerFn: AddApiMethodHandlerFn<Args, MethodData>) => (
  CallApiMethod<Args, MethodData>
)
// -------------------------------------------------------------------------------------------------------------------


type ObjectIsLiteral<Obj extends Record<any, any>> = ({ [Key in keyof Obj]: false })["constructor"] extends false ? false : true

// Call Api Method Types ---------------------------------------------------------------------------------------------
type CallApiMethodContext = {
  cookie?: RobloxCookie,
  cloudKey?: string,
  oauthToken?: string
} | void

type GetArgsContainsCursor<Args extends Record<any, any>> = ObjectIsLiteral<Args> extends true
  ? true extends StringIsLiteral<Extract<keyof Args, ApiMethodCursorKeys>> ? true : false
  : false

export type CallApiMethod<
  Args extends Record<any, any>, MethodData extends ApiMethodData,
  ArgsContainsCursor extends boolean = GetArgsContainsCursor<Args>
> = (this: CallApiMethodContext | any, args: keyof Args extends undefined ? void : Args) => Promise<
  ApiMethodResponseFromMethod<MethodData, ArgsContainsCursor>
>
// -------------------------------------------------------------------------------------------------------------------



// Add Api Method Handler Types --------------------------------------------------------------------------------------
export type ApiMethodDataFormatRawData<RawData = any, FormattedData = any> = {
  formatRawDataFn: (rawData: RawData, response: HttpResponse<RawData>) => FormattedData
}

export type Cursor = string | null | number | undefined

type ApiMethodData<
  RawData = any, FormattedData = undefined,

  _FormattedData = FormattedData extends undefined ? RawData : FormattedData,
  _PrettifiedRawData = Prettify<RawData>, _PrettifiedFormattedData = FormattedData extends undefined ? _PrettifiedRawData : Prettify<FormattedData>
> = {
  method: RestMethod,
  path: `/${string}`,
  name: string,

  searchParams?: Record<string, any> | string,
  headers?: Record<string, any>,

  body?: Record<string, any> | string | number,
  formData?: FormData,

  // Extra optional settings.
  applyFieldMask?: boolean,

  pathToPoll?: (rawData: RawData) => string,

  getCursorsFn?: (rawData: _PrettifiedRawData) => ([ previous: Cursor, next: Cursor ]),

  "🔒__PRIVATE_RAW_DATA"?: _PrettifiedRawData,
 "🔒__PRIVATE_FORMATTED_DATA"?: _PrettifiedFormattedData,
} & (
  FormattedData extends undefined ? {}
  : ApiMethodDataFormatRawData<RawData, _FormattedData>
)

export type ApiMethod<
  RawData = any, PrettifiedData = undefined,
> = Promise<ApiMethodData<RawData, PrettifiedData>>

type AddApiMethodHandlerFn<Args extends Record<any, any>, MethodData extends ApiMethodData> = (args: Args) => Promise<MethodData>
// -------------------------------------------------------------------------------------------------------------------


// Api Method Response -----------------------------------------------------------------------------------------------
export type ApiMethodResponse<
  RawData = any, PrettifiedData = any, ArgsContainsCursor extends boolean | null = null, IsRoot extends boolean = true
> = ArgsContainsCursor extends false
  ? ApiMethodResponse_WithoutPagination<RawData, PrettifiedData> &
    { again: () => Promise<ApiMethodResponse_WithoutPagination<RawData, PrettifiedData>> }
  : ApiMethodResponse_WithPagination<RawData, PrettifiedData, ArgsContainsCursor, IsRoot> &
    { again: () => Promise<ApiMethodResponse_WithoutPagination<RawData, PrettifiedData>> }

type ApiMethodResponse_WithoutPagination<RawData = any, PrettifiedData = any> = ObjectPrettify<
  {
    data: PrettifiedData,
    response: ObjectPrettify<HttpResponse<RawData>>,
    configUsed: OpenbloxConfig,
  }
>

type ApiMethodResponse_WithPagination<
  RawData = any, PrettifiedData = any, ArgsContainsCursor extends boolean | null = null, IsRoot extends boolean = true
> = ObjectPrettify<
  ApiMethodResponse_WithoutPagination<RawData, PrettifiedData>
  & (
    (ArgsContainsCursor extends null ? {
      cursors?: { previous: Cursor, next: Cursor },
      [Symbol.asyncIterator]?: IsRoot extends false
        ? null
        : () => AsyncGenerator<ApiMethodResponse<RawData, PrettifiedData, ArgsContainsCursor, false>> 
    }
    : ArgsContainsCursor extends true ? {
      cursors: { previous: Cursor, next: Cursor },
      [Symbol.asyncIterator]: IsRoot extends false
        ? null
        : () => AsyncGenerator<ApiMethodResponse<RawData, PrettifiedData, ArgsContainsCursor, false>> 
    }
    : {})
  )
>
// -------------------------------------------------------------------------------------------------------------------