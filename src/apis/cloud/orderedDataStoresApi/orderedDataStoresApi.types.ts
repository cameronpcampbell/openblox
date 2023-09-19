import { PrettifyKeyof } from "../../../utils/utils.types"

export type OrderedDatastoreEntry<
  UniverseId extends number, OrderedDataStore extends string, Scope extends string, Id extends string, Value extends number = number
> = PrettifyKeyof<{
  path: `universes/${UniverseId}/orderedDataStores/${OrderedDataStore}/scopes/${Scope}/entries/${Id}`,
  value: Value,
  id: Id
}>

// GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries ------------------------
export type ListOrderedDatastoreEntriesConfig = PrettifyKeyof<{
  maxPageSize: number,
  orderBy: "desc" | "asc",
  filter: string
}>

export type FormattedListOrderedDatastoreEntriesData = PrettifyKeyof<{
  path: string,
  value: number,
  id: string
}[]>

export type RawListOrderedDatastoreEntriesData = PrettifyKeyof<{
  entries: FormattedListOrderedDatastoreEntriesData,
  nextPageToken: string
}>
// -------------------------------------------------------------------------------------------------------------------
