// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////


import * as _AllClassicApis from "./classic"
import * as _AllCloudApis from "./cloud"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyObject, Only, KeysOfTypeFunction, PrettifyKeyof } from "../utils/utils.types"
import { AgnosticResponse } from "../http/httpAdapters"
import { CacheResultType } from "../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type AllClassicApis = typeof _AllClassicApis
export type AllCloudApis = typeof _AllCloudApis
export type AllApis = AllClassicApis & AllCloudApis

type XXXX = ApiMethods["GroupsApi"]

export type ApiName = keyof AllClassicApis | keyof AllCloudApis

export type ApiMethods = {
  [ApiKey in ApiName]: {
    [MethodKey in KeysOfTypeFunction<AllApis[ApiKey]>]: AllApis[ApiKey][MethodKey]
  }
}

export type ApiMethodNames = {
  [ApiKey in ApiName]: keyof ApiMethods[ApiKey] & {}
}


export type SortOrder = "Asc" | "Desc"

export type DataWithCursors<Data extends AnyObject> = {
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: Data
}

export type ReturnedCursors = { previous: string | null, next: string | null }

type ApiMethodResponseBase<RawBody, Data> = PrettifyKeyof<{
  rawBody: RawBody,
  data: Data,
  response?: AgnosticResponse,
  cache: CacheResultType
}>

export type ApiMethodResponse<
  RawData, FormattedData = RawData, Pagination extends "PAGINATED" | false = false
> = Promise<
  PrettifyKeyof<
    Pagination extends "PAGINATED" ? ApiMethodResponseBase<RawData, FormattedData> & {
      cursors: {
        previous?: string|number,
        next?: string|number
      }
    }

    : ApiMethodResponseBase<RawData, FormattedData>
  >
>
