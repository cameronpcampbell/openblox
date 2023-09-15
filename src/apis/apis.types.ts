// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////


import * as _AllClassicApis from "./classic"
import * as _AllCloudApis from "./cloud"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyError } from "parse-roblox-errors"

import type { AnyObject, Only, KeysOfTypeFunction, PrettifyKeyof } from "../utils/utils.types"
import { AgnosticResponse } from "../http/httpAdapters"
import { CacheResultType } from "../cacheAdapters/cacheAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type AllClassicApis = typeof _AllClassicApis
export type AllCloudApis = typeof _AllCloudApis
export type AllApis = AllClassicApis & AllCloudApis

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

type ApiMethodResponseBase<RawData, Data> = {
  rawData: RawData,
  data: Data,
  response?: AgnosticResponse,
  cache: CacheResultType
}

export type ApiMethodResponse<
  RawData, FormattedData = RawData, Pagination extends "CLASSIC_PAGINATION" | "CLASSIC_PAGINATION_ROWS_INDEX" |  "OPENCLOUD_PAGINATION" | false = false
> = Promise<
  PrettifyKeyof<Pagination extends "CLASSIC_PAGINATION" ? ApiMethodResponseBase<RawData, FormattedData> & {
    cursors: {
      previous?: string,
      next?: string
    }
  }

  : Pagination extends "CLASSIC_PAGINATION_ROWS_INDEX" ? ApiMethodResponseBase<RawData, FormattedData> & {
    nextRowIndex: number
  }

  : Pagination extends "OPENCLOUD_PAGINATION" ? ApiMethodResponseBase<RawData, FormattedData> & {
    nextPage?: string
  }

  : ApiMethodResponseBase<RawData, FormattedData>>
>
