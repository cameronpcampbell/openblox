// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectPrettify, ObjectRemoveKeys, StringIsLiteral } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

type MinimalDatastore<
  UniverseId extends Identifier, Id extends string = string, IsEntry extends boolean = false,
  DataStore extends string = string, Scope extends string = string
> = ObjectPrettify<{
  path: `universes/${UniverseId}/data-stores/${DataStore}${
    IsEntry extends true ? `/entries/${StringIsLiteral<Scope> extends true ? `${Scope}/` : ""}${Id}` : ""
  }`,
  id: Id
}>

// GET /v2/universes/{universeId}/data-stores ------------------------------------------------------------------------
export type RawListStandardDatastoresData<UniverseId extends Identifier, Prefix extends string> = {
  dataStores: PrettifiedListStandardDatastoresData<UniverseId, Prefix>,
  nextPageToken: string
}

export type PrettifiedListStandardDatastoresData<UniverseId extends Identifier, Prefix extends string> =
  MinimalDatastore<UniverseId, `${Prefix}${string}`>[]
// -------------------------------------------------------------------------------------------------------------------


/* GET /v2/universes/{universe}/data-stores/{data-store}/entries
   GET /v2/universes/{universe}/data-stores/{data-store}/scopes/{scope}/entries ----------------------------------- */
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