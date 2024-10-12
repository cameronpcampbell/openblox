// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { OrderedDatastoreEntry, PrettifiedListOrderedDatastoreEntriesData, RawListOrderedDatastoreEntriesData } from "./orderedDataStores_V1.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "OrderedDatastores_V1", baseUrl: "https://apis.roblox.com/ordered-data-stores" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Returns a list of entries from an ordered data store.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param maxPageSize The maximum number of entries to return. The service may return fewer than this value. The default value is 10. The maximum value is 100, and any input above 100 is coerced to 100.
 * @param orderBy The enumeration direction. The order by default is ascending. Input a desc suffix for descending.
 * @param filter The range of qualifying values of entries to return.
 * @param cursor A page token received from a previous List call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to List must match the call providing the page token.
 * 
 * @example
 * const { data:entries } = await OrderedDataStoresApi_V1.listOrderedDatastoreEntries({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global"
   })
 * @exampleData [ { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" } ]
 * @exampleRawBody { entries: [ { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" } ], nextPageToken: "" }
 */
export const listOrderedDatastoreEntries = createApiMethod(async <UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string>(
  { universeId, orderedDataStore, scope, maxPageSize, orderBy, filter, cursor }:
  {
    universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope,
    maxPageSize?: number, orderBy?: "desc" | "asc", filter?: string, cursor?: string
  }
): ApiMethod<
  RawListOrderedDatastoreEntriesData<UniverseId, OrderedDataStore, Scope>,
  PrettifiedListOrderedDatastoreEntriesData<UniverseId, OrderedDataStore, Scope>
> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`,
  searchParams: { max_page_size: maxPageSize, page_token: cursor, order_by: orderBy, filter },
  name: `listOrderedDatastoreEntries`,

  formatRawDataFn: ({ entries }) => entries,

  getCursorsFn: (rawData) => [ null, rawData.nextPageToken ]
}))


/**
 * Creates a new entry with the content value provided.
 * @endpoint POST /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The name of the entry.
 * @param value The value of the entry.
 * 
 * @example
 * const { data:createdEntry } = await OrderedDataStoresApi_V1.createOrderedDatastoreEntry({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global",
     id: "45348282", value: 54
   })
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 */
export const createOrderedDatastoreEntry = createApiMethod(async <
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string, Value extends Identifier
>(
  { universeId, orderedDataStore, scope, id, value }:
  { universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id, value: Value }
): ApiMethod<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Value, false, Id>> => ({
  method: "POST",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`,
  searchParams: { id },
  body: { value },
  name: `createOrderedDatastoreEntry`,
}))


/**
 * Returns a list of entries from an ordered data store.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * 
 * @example
 * const { data:entry } = await OrderedDataStoresApi_V1.orderedDatastoreEntry({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global", id: "45348281"
   })
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 */
export const orderedDatastoreEntry = createApiMethod(async <
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string
>(
  { universeId, orderedDataStore, scope, id }:
  { universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id }
): ApiMethod<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Identifier, false, Id>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`,
  name: `orderedDatastoreEntry`,
}))


/**
 * Deletes the specified entry in an ordered datastore.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * 
 * @example
 * const { data:success } = await OrderedDataStoresApi_V1.deleteOrderedDatastoreEntry({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global", id: "45348281"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const deleteOrderedDatastoreEntry = createApiMethod(async (
  { universeId, orderedDataStore, scope, id }:
  { universeId: Identifier, orderedDataStore: string, scope: string, id: string }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`,
  name: `deleteOrderedDatastoreEntry`,

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Updates the specified entry.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * @param newValue The value to set the entry to.
 * @param createIfNoEntryExists The flag to allow the creation of an entry if the entry doesn't exist. (allow_missing)
 * 
 * @example
 * const { data:updatedEntry } = await OrderedDataStoresApi_V1.updateOrderedDatastoreEntry({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global",
     id: "45348281", newValue: 58
   })
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 58, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 58, id: "45348281" }
 */
export const updateOrderedDatastoreEntry = createApiMethod(async <
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string, Value extends Identifier
>(
  { universeId, orderedDataStore, scope, id, newValue, createIfNoEntryExists }:
  { universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id, newValue: Value, createIfNoEntryExists?: boolean }
): ApiMethod<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Value, false, Id>> => ({
  method: "PATCH",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`,
  searchParams: { allow_missing: createIfNoEntryExists ?? "false" },
  body: { value: newValue },
  name: `updateOrderedDatastoreEntry`,
}))


/**
 * Increments the specified entry.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `OrderedDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * @param incrementBy The number to increment the entry's value by.
 * @param createIfNoEntryExists The flag to allow the creation of an entry if the entry doesn't exist. (allow_missing)
 * 
 * @example
 * const { data:incrementedEntry } = await OrderedDataStoresApi_V1.incrementOrderedDatastoreEntry({
     universeId: 5097539509, orderedDataStore: "PointsStore", scope: "global", id: "45348281",
     incrementBy: 26, createIfNoEntryExists: true
   })
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 66, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 66, id: "45348281" }
 */
  export const incrementOrderedDatastoreEntry = createApiMethod(async <
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string
>(
  { universeId, orderedDataStore, scope, id, incrementBy, createIfNoEntryExists }:
  { universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id, incrementBy: Identifier, createIfNoEntryExists?: boolean }
): ApiMethod<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Identifier, false, Id>> => ({
  method: "POST",
  path: `/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}:increment`,
  searchParams: { allow_missing: createIfNoEntryExists ?? "false" },
  body: { amount: incrementBy },
  name: `incrementOrderedDatastoreEntry`,
}))