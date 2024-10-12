// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { MinimalOrderedDataStoreEntry, PrettifiedListOrderedDatastoreEntries, RawListOrderedDatastoreEntries } from "./orderedDataStores_V2.types"
import type { ApiMethod } from "../../apiGroup"
import type { SortOrder } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "OrderedDatastores_V2", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Helper Functions ] //////////////////////////////////////////////////////////
const formatEntryFilter = (lessThanOrEq?: number, moreThanOrEq?: number) => {
  return `${
    lessThanOrEq ? `entry <= ${lessThanOrEq}` : ""
  }${(lessThanOrEq && moreThanOrEq) ? " && " : ""}${
    moreThanOrEq ? `entry >= ${moreThanOrEq}` : ""
  }`
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Lists entries in an ordered data store.
 * @endpoint GET /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries
 * 
 * @param universeId The ID of the universe to get ordered data store entries from.
 * @param dataStoreId The ID (name) of the data store to get entries from.
 * @param scope The scope to get entries from.
 * @param sortOrder Whether to return the results from biggest to smallest (Desc) or smallest to biggest (Asc).
 * @param lessThanOrEq Filters the results to include those less than or equal to a specific number (can be used in tangent with `moreThabOrEq`).
 * @param moreThanOrEq Filters the results to include those more than or equal to a specific number (can be used in tangent with `lessThabOrEq`).
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example
 * const { data:entries } = await OrderedDataStoresApi_V2.listOrderedDatastoreEntries({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", sortOrder: "Desc", lessThanOrEq: 80, moreThanOrEq: 70
   })
 * @exampleData [{"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":78,"id":"45348281"}]
 * @exampleRawBody {"orderedDataStoreEntries":[{"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":78,"id":"45348281"}]}
 */
export const listOrderedDatastoreEntries = createApiMethod(async <UniverseId extends Identifier, DataStoreId extends string, Scope extends string>(
  { universeId, dataStoreId, scope, sortOrder, lessThanOrEq, moreThanOrEq, limit, cursor }:
  {
    universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope,
    sortOrder?: SortOrder, lessThanOrEq?: number, moreThanOrEq?: number,
    limit?: number, cursor?: string
  }
): ApiMethod<
  RawListOrderedDatastoreEntries<UniverseId, DataStoreId, Scope>, PrettifiedListOrderedDatastoreEntries<UniverseId, DataStoreId, Scope>
> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries`,
  searchParams: {
    orderBy: sortOrder == "Desc" ? "value desc" : "", filter: formatEntryFilter(lessThanOrEq, moreThanOrEq),
    maxPageSize: limit, pageToken: cursor,
  },
  name: `listOrderedDatastoreEntries`,

  getCursorsFn: ({ nextPageToken }) => [ null, nextPageToken ],

  formatRawDataFn: ({ orderedDataStoreEntries }) => orderedDataStoreEntries ?? []
}))


/**
 * Creates a new entry in an ordered data store.
 * @endpoint POST /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries
 * 
 * @param universeId The ID of the universe to create the entry in.
 * @param dataStoreId The ID (name) of the data store to create the entry in.
 * @param scope The scope for the data store entry.
 * @param entryId the ID (name) for the entry.
 * 
 * @example
 * const { data:entry } = await OrderedDataStoresApi_V2.createOrderedDataStoreEntry({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", entryId: "453482811", entryValue: 15
   })
 * @exampleData {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":15,"id":"45348281"}
 * @exampleRawBody {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":15,"id":"45348281"}
 */
export const createOrderedDataStoreEntry = createApiMethod(async <
  UniverseId extends Identifier, DataStoreId extends string, Scope extends string, EntryId extends string, EntryValue extends number
>(
  {universeId, dataStoreId, scope, entryId, entryValue }:
  {
    universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope, entryId: EntryId, entryValue: EntryValue
  }
): ApiMethod<MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope, EntryId, EntryValue>> => ({
  method: "POST",
  path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries`,
  searchParams: { id: entryId },
  body: { value: entryValue },
  name: `createOrderedDataStoreEntry`,
}))


/**
 * Gets an new entry in an ordered data store.
 * @endpoint GET /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries
 * 
 * @param universeId The ID of the universe to get the entry from.
 * @param dataStoreId The ID (name) of the data store to get the entry from.
 * @param scope The scope of the data store entry.
 * @param entryId the ID (name) of the entry.
 * 
 * @example
 * const { data:entry } = await OrderedDataStoresApi_V2.orderedDataStoreEntry({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", entryId: "45348281"
   })
 * @exampleData {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":78,"id":"45348281"}
 * @exampleRawBody {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":78,"id":"45348281"}
 */
export const orderedDataStoreEntry = createApiMethod(async <
  UniverseId extends Identifier, DataStoreId extends string, Scope extends string, EntryId extends string
>(
  {universeId, dataStoreId, scope, entryId }: { universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope, entryId: EntryId }
): ApiMethod<MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope, EntryId>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries/${entryId}`,
  name: `orderedDataStoreEntry`,
}))


/**
 * Deletes an entry from an ordered data store.
 * @endpoint DELETE /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries
 * 
 * @param universeId The ID of the universe to delete the entry from.
 * @param dataStoreId The ID (name) of the data store to delete the entry from.
 * @param scope The scope of the data store entry to delete.
 * @param entryId the ID (name) of the entry to delete.
 * 
 * @example
 * const { data:success } = await OrderedDataStoresApi_V2.deleteOrderedDataStoreEntry({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", entryId: "45348281"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const deleteOrderedDataStoreEntry = createApiMethod(async <
  UniverseId extends Identifier, DataStoreId extends string, Scope extends string, EntryId extends string
>(
  {universeId, dataStoreId, scope, entryId }: { universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope, entryId: EntryId }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries/${entryId}`,
  name: `deleteOrderedDataStoreEntry`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Updates an entry in an ordered data store.
 * @endpoint PATCH /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries/{entryId}
 * 
 * @param universeId The ID of the universe to update the entry in.
 * @param dataStoreId The ID (name) of the data store to update the entry in.
 * @param scope The scope of the data store entry to update.
 * @param entryId the ID (name) of the entry to update.
 * 
 * @example
 * const { data:entry } = await OrderedDataStoresApi_V2.updateOrderedDataStoreEntry({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", entryId: "45348281", newEntryValue: 45
   })
 * @exampleData {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":45,"id":"45348281"}
 * @exampleRawBody {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":45,"id":"45348281"}
 */
export const updateOrderedDataStoreEntry = createApiMethod(async <
  UniverseId extends Identifier, DataStoreId extends string, Scope extends string, EntryId extends string, EntryValue extends number
>(
  {universeId, dataStoreId, scope, entryId, newEntryValue, allowIfMissing }:
  {
    universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope, entryId: EntryId, newEntryValue: EntryValue, allowIfMissing?: boolean
  }
): ApiMethod<MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope, EntryId, EntryValue>> => ({
  method: "PATCH",
  path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries/${entryId}`,
  searchParams: { allowIfMissing },
  body: { value: newEntryValue },
  name: `updateOrderedDataStoreEntry`,
}))


/**
 * Updates an entry in an ordered data store.
 * @endpoint PATCH /v2/universes/{universeId}/ordered-data-stores/{dataStoreId}/scopes/{scope}/entries/{entryId}:increment
 * 
 * @param universeId The ID of the universe to update the entry in.
 * @param dataStoreId The ID (name) of the data store to update the entry in.
 * @param scope The scope of the data store entry to update.
 * @param entryId the ID (name) of the entry to update.
 * 
 * @example
 * const { data:entry } = await OrderedDataStoresApi_V2.incrementOrderedDataStoreEntry({
     universeId: 5097539509, dataStoreId: "PointsStore", scope: "global", entryId: "45348281", incrementBy: 42
   })
 * @exampleData {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":42,"id":"45348281"}
 * @exampleRawBody {"path":"universes/5097539509/ordered-data-stores/PointsStore/scopes/global/entries/45348281","value":42,"id":"45348281"}
 */
   export const incrementOrderedDataStoreEntry = createApiMethod(async <
    UniverseId extends Identifier, DataStoreId extends string, Scope extends string, EntryId extends string
  >(
    {universeId, dataStoreId, scope, entryId, incrementBy }:
    {
      universeId: UniverseId, dataStoreId: DataStoreId, scope: Scope, entryId: EntryId, incrementBy: number
    }
  ): ApiMethod<MinimalOrderedDataStoreEntry<UniverseId, DataStoreId, Scope, EntryId>> => ({
    method: "POST",
    path: `/v2/universes/${universeId}/ordered-data-stores/${dataStoreId}/scopes/${scope}/entries/${entryId}:increment`,
    body: { amount: incrementBy },
    name: `incrementOrderedDataStoreEntry`,
  }))