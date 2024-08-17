import type { Identifier, ISODateTime, ObjectEither, ObjectPrettify, PrettifyDeep, StringIsLiteral, StringReplaceAll, UnionPrettify } from "typeforge"


type DataStoreEntryState = UnionPrettify<"STATE_UNSPECIFIED" | "ACTIVE" | "DELETED">

type MinimalDatastore<
  UniverseId extends Identifier, Id extends string = string, IsEntry extends boolean = false,
  DataStore extends string = string, Scope extends string = string
> = ObjectPrettify<{
  path: `universes/${UniverseId}/data-stores/${DataStore}${
    IsEntry extends true ? `/entries/${StringIsLiteral<Scope> extends true ? `${Scope}/` : ""}${Id}` : ""
  }`,
  id: Id
}>


type FullDatastore<
  TemporalType extends ISODateTime | Date, Schema extends Record<any, any> | any[] | null | boolean | string | number
> = {
  path: `universes/${Identifier}/data-stores/${string}${`/scope/${string}` | ""}/entries/${string}${`@${string}` | ""}`,
  createTime: TemporalType,
  revisionId: string,
  revisionCreateTime: TemporalType,
  state: DataStoreEntryState,
  etag: string,
  value: PrettifyDeep<Schema>,
  id: string,
  users: `users/${Identifier}`[],
  attributes: Record<any, any>
}

export type RawFullDatastoreData<Schema extends Record<any, any> | any[] | null | boolean | string | number> = FullDatastore<ISODateTime, Schema>

export type PrettifiedFullDatastoreData<Schema extends Record<any, any> | any[] | null | boolean | string | number> = FullDatastore<Date, Schema>

// GET /v2/universes/{universeId}/data-stores ------------------------------------------------------------------------
export type RawListStandardDatastoresData<UniverseId extends Identifier, Prefix extends string> = {
  dataStores: PrettifiedListStandardDatastoresData<UniverseId, Prefix>,
  nextPageToken: string
}

export type PrettifiedListStandardDatastoresData<UniverseId extends Identifier, Prefix extends string> =
  MinimalDatastore<UniverseId, `${Prefix}${string}`>[]
// -------------------------------------------------------------------------------------------------------------------


// /cloud/v2/universes/{universeId}/data-stores:snapshot -------------------------------------------------------------
type CreateStandardDataStoreSnapshotData<TemporalType extends ISODateTime | Date> = ObjectEither<
  { newSnapshotTaken: true, latestSnapshotTime: TemporalType },
  { newSnapshotTaken: false }
>

export type RawCreateStandardDataStoreSnapshotData = CreateStandardDataStoreSnapshotData<ISODateTime>
export type PrettifiedCreateStandardDataStoreSnapshotData = CreateStandardDataStoreSnapshotData<Date>
// -------------------------------------------------------------------------------------------------------------------


/* GET /v2/universes/{universe}/data-stores/{data-store}/entries
   GET /v2/universes/{universe}/data-stores/{data-store}/scopes/{scope}/entries ------------------------------------ */
export type RawListStandardDatastoreEntriesData<
  UniverseId extends Identifier, Prefix extends string, DataStore extends string, Scope extends string
> = {
  dataStoreEntries: PrettifiedListStandardDatastoreEntriesData<UniverseId, Prefix, DataStore, Scope>,
  nextPageToken: string
} | undefined

export type PrettifiedListStandardDatastoreEntriesData<
UniverseId extends Identifier, Prefix extends string, DataStore extends string, Scope extends string
> =
  MinimalDatastore<UniverseId, `${Prefix}${string}`, true, DataStore, Scope>[]
// --------------------------------------------------------------------------------------------------------------------



/* GET /v2/universes/{universe}/data-stores/{data-store}/entries/{entryId}:listRevisions
 * GET /v2/universes/{universe}/data-stores/{data-store}/scopes/{scope}/entries/{entryId}:listRevisions ------------- */
type StandardDataStoreEntryRevision<
  TemporalType extends ISODateTime | Date, UniverseId extends Identifier, DataStore extends string, Scope extends string, EntryId extends string
> = ObjectPrettify<{
  path: `universes/${UniverseId}/data-stores/${DataStore}${StringIsLiteral<Scope> extends true ? `/scope/${Scope}` : ""}/entries/${StringReplaceAll<EntryId, "/", ":">}@${string}`,
  createTime: TemporalType,
  revisionId: string,
  revisionCreateTime: TemporalType,
  state: DataStoreEntryState,
  etag: string,
  id: `${EntryId}@${string}`
}>

export type RawListStandardDataStoreEntryRevisionsData<
  UniverseId extends Identifier, DataStore extends string, Scope extends string, EntryId extends string
> = {
  dataStoreEntries: StandardDataStoreEntryRevision<ISODateTime, UniverseId, DataStore, EntryId, Scope>[],
  nextPageToken: string
}

export type PrettifiedListStandardDataStoreEntryRevisionsData<
  UniverseId extends Identifier, DataStore extends string, Scope extends string, EntryId extends string
> = StandardDataStoreEntryRevision<Date, UniverseId, DataStore, Scope, EntryId>[]
// --------------------------------------------------------------------------------------------------------------------