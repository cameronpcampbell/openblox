import type { Identifier, ObjectPrettify } from "typeforge"

export type OrderedDatastoreEntry<
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string,
  Value extends Identifier = Identifier, ValueOptional extends boolean = false,
  Id extends string = string
> = ObjectPrettify<
  { path: `universes/${UniverseId}/orderedDataStores/${OrderedDataStore}/scopes/${Scope}/entries/${Id}` } &
  (ValueOptional extends true ? { value?: `${Value}` } : { value: `${Value}` }) &
  { id: Id }
>

// GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries ------------------------
export type RawListOrderedDatastoreEntriesData<
UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string
> = ObjectPrettify<{
  entries: OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, `${number}`, true>[],
  nextPageToken: string
}>

export type PrettifiedListOrderedDatastoreEntriesData<
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string
> =  OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, `${number}`, true>[]
// -------------------------------------------------------------------------------------------------------------------