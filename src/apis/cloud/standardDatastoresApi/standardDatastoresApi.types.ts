import { PrettifyArray, PrettifyKeyof, PrettifyUnion } from "../../../utils/utils.types"

type Prefixify<P extends string|undefined> = P extends string ? `${P}${string}` : string

export type StandardDatastoreEntryData<Schema = any> = PrettifyKeyof<{
  entry: Schema extends Object ? PrettifyKeyof<Schema> : Schema,
  checksumsMatch: boolean,
  metadata: {
    contentMD5: string,
    entryVersion: string,
    entryCreatedTime: Date,
    entryVersionCreatedTime: Date,
    entryAttributes: { [Key: string]: string } | null,
    entryUserIds: number[]
  }
}>

// GET /v1/universes/{universeId}/standard-datastores ----------------------------------------------------------------
type ListStandardDatastoreData<Prefix extends string|undefined, TimeType> = PrettifyKeyof<{
  name: Prefixify<Prefix>,
  createdTime: TimeType
}[]>

export type RawListStandardDatastoreData<Prefix extends string|undefined> = PrettifyKeyof<{
  datastores: ListStandardDatastoreData<Prefix, string>,
  nextPageCursor: string
}>

export type FormattedListStandardDatastoreData<Prefix extends string|undefined> = ListStandardDatastoreData<Prefix, Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores/datastore/entries ----------------------------------------------
export type RawStandardDatastoreKeysData<Prefix extends string|undefined> = PrettifyKeyof<{
  keys: { key: Prefixify<Prefix> }[],
  nextPageCursor: string
}>

export type FormattedStandardDatastoreKeysData<Prefix extends string|undefined> = Prefixify<Prefix>[]
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry ---------------------------------------
export type SetStandardDatastoreEntryConfig = PrettifyKeyof<{
  matchVersion?: string,
  exclusiveCreate?: boolean,
  scope?: string,
  entryAttributes?: string[],
  entryUserIds?: (number|string)[]
}>

type SetStandardDatastoreEntryData<TimeType> = PrettifyKeyof<{
  version: string,
  deleted: boolean,
  contentLength: number,
  createdTime: TimeType,
  objectCreatedTime: TimeType
}>

export type RawSetStandardDatastoreEntryData = SetStandardDatastoreEntryData<string>

export type FormattedSetStandardDatastoreEntryData = SetStandardDatastoreEntryData<Date>
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/increment -----------------------------
export type IncrementStandardDatastoreEntryConfig = {
  scope?: string,
  entryAttributes?: { [Key: string]: string }
  entryUserIds?: number[]
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions -------------------------------
export type ListStandardDatastoreEntryVersionsConfig = {
  scope?: string,
  startTime?: Date | string,
  endTime?: Date | string,
  sortOrder?: "Ascending" | "Descending",
  limit?: number
}

type ListStandardDatastoreEntryVersionsData<TimeType> = PrettifyKeyof<{
  version: string,
  deleted: boolean,
  contentLength: number,
  createdTime: TimeType,
  objectCreatedTime: TimeType
}[]>

export type RawListStandardDatastoreEntryVersionsData = PrettifyKeyof<{
  versions: ListStandardDatastoreEntryVersionsData<string>,
  nextPageCursor: string
}>

export type FormattedListStandardDatastoreEntryVersionsData = ListStandardDatastoreEntryVersionsData<Date>
// -------------------------------------------------------------------------------------------------------------------