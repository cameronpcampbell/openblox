import type { Identifier, ObjectPrettify } from "typeforge"


export type MinimalOrderedDataStoreEntry<
  UniverseId extends Identifier, DataStoreId extends string, Scope extends string,
  EntryId extends string = string, EntryValue extends number = number
> = ObjectPrettify<{
  path: `universes/${UniverseId}/ordered-data-stores/${DataStoreId}/scopes/${Scope}/entries/${EntryId}`,
  value: EntryValue,
  id: EntryId
}>

 

// GET /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries ---------------------------
export type RawListOrderedDatastoreEntries<UniverseId extends Identifier, DataStoreId extends string, Scope extends string> = {
  orderedDataStoreEntries: MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope>[],
  nextPageToken: string
}

export type PrettifiedListOrderedDatastoreEntries<UniverseId extends Identifier, DataStoreId extends string, Scope extends string> =
MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope>[]
// -------------------------------------------------------------------------------------------------------------------