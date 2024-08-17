import type { ISODateTime, ObjectPrettify, Prettify } from "typeforge"

type Prefixify<P extends string|undefined> = P extends string ? `${P}${string}` : string


// GET /v1/universes/{universeId}/standard-datastores ----------------------------------------------------------------
type ListStandardDatastoreData<Prefix extends string, TimeType> = ObjectPrettify<{
  name: Prefixify<Prefix>,
  createdTime: TimeType
}[]>

export type RawListStandardDatastoreData<Prefix extends string> = ObjectPrettify<{
  datastores: ListStandardDatastoreData<Prefix, ISODateTime>,
  nextPageCursor: string
}>

export type PrettifiedListStandardDatastoreData<Prefix extends string> = ListStandardDatastoreData<Prefix, Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores/datastore/entries ----------------------------------------------
export type RawStandardDatastoreKeysData<Prefix extends string|undefined> = ObjectPrettify<{
  keys: { key: Prefixify<Prefix> }[],
  nextPageCursor: string
}>

export type PrettifiedStandardDatastoreKeysData<Prefix extends string> = Prefixify<Prefix>[]
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry ---------------------------------------
type SetStandardDatastoreEntryData<TemporalType> = ObjectPrettify<{
  version: string,
  deleted: boolean,
  contentLength: number,
  createdTime: TemporalType,
  objectCreatedTime: TemporalType
}>

export type RawSetStandardDatastoreEntryData = SetStandardDatastoreEntryData<ISODateTime>

export type PrettifiedSetStandardDatastoreEntryData = SetStandardDatastoreEntryData<Date>
// --------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry -----------------------------------------
export type PrettifiedStandardDatastoreEntryData<Schema extends Record<any, any> | string | number = string | number> = {
  entry: Prettify<Schema>,
  checksumsMatch: boolean,
  metadata: {
    contentMD5: string,
    entryVersion: string,
    entryCreatedTime: Date,
    entryVersionCreatedTime: Date,
    entryAttributes: Record<string, string> | null,
    entryUserIds: number[]
  }
}
// --------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions -------------------------------
type ListStandardDatastoreEntryVersionsData<TemporalType> = ObjectPrettify<{
  version: string,
  deleted: boolean,
  contentLength: number,
  createdTime: TemporalType,
  objectCreatedTime: TemporalType
}[]>

export type RawListStandardDatastoreEntryVersionsData = ObjectPrettify<{
  versions: ListStandardDatastoreEntryVersionsData<ISODateTime>,
  nextPageCursor: string
}>

export type PrettifiedListStandardDatastoreEntryVersionsData = ListStandardDatastoreEntryVersionsData<Date>
// -------------------------------------------------------------------------------------------------------------------