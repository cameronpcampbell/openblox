// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse, dataIsSuccess } from "../../../apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import { Identifier } from "../../../utils/utils.types"
import type { ApiMethodResponse } from "../../apis.types"
import type { FormattedListOrderedDatastoreEntriesData, ListOrderedDatastoreEntriesConfig, OrderedDatastoreEntry, RawListOrderedDatastoreEntriesData } from "./orderedDataStoresApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://apis.roblox.com/ordered-data-stores"
const apiName = "OrderedDatastoresApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = [ "createOrderedDatastoreEntry", "deleteOrderedDatastoreEntry", "updateOrderedDatastoreEntry", "incrementOrderedDatastoreEntry" ]


/**
 * Returns a list of entries from an ordered data store.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param config Extra settings.
 * @param config.maxPageSize The maximum number of entries to return. The service may return fewer than this value. The default value is 10. The maximum value is 100, and any input above 100 is coerced to 100.
 * @param config.orderBy The enumeration direction. The order by default is ascending. Input a desc suffix for descending.
 * @param config.filter The range of qualifying values of entries to return.
 * @param cursor A page token received from a previous List call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to List must match the call providing the page token.
 * 
 * @example const { data:entries } = await OrderedDatastoresApi.listOrderedDatastoreEntries(5097539509, "PointsStore", "global")
 * @exampleData [ { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" } ]
 * @exampleRawBody { entries: [ { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" } ], nextPageToken: "" }
 */
export async function listOrderedDatastoreEntries(
  this: ThisAllOverrides, universeId: Identifier, orderedDataStore: string, scope: string, config?: ListOrderedDatastoreEntriesConfig, cursor?: string
): ApiMethodResponse<RawListOrderedDatastoreEntriesData, FormattedListOrderedDatastoreEntriesData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const [ maxPageSize, orderBy, filter ] = [ config?.maxPageSize, config?.orderBy, config?.filter ]

    const { rawBody, response, cacheMetadata } = await this.http.get<RawListOrderedDatastoreEntriesData>(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`, {
        searchParams: { max_page_size: maxPageSize, page_token: cursor, order_by: orderBy, filter },
        apiName, methodName: "listOrderedDatastoreEntries", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.entries, response, cursors: { next: rawBody.nextPageToken }, cacheMetadata })
  })
}


/**
 * Creates a new entry with the content value provided.
 * @endpoint POST /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The name of the entry.
 * @param value The value of the entry.
 * 
 * @example
 * const { data:createdEntry } = await OrderedDatastoresApi.createOrderedDatastoreEntry(
     5097539509, "PointsStore", "global",
     "45348281", 54
   )
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 */
export async function createOrderedDatastoreEntry<
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string, Value extends number
>(
  this: ThisAllOverrides, universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id, value: Value 
): ApiMethodResponse<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id, Value>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.post<
      OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id, Value>
    >(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`, {
        searchParams: { id }, body: { value },
        apiName, methodName: "createOrderedDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
  })
}


/**
 * Returns a list of entries from an ordered data store.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * 
 * @example const { data:entry } = await OrderedDatastoresApi.orderedDatastoreEntry(5097539509, "PointsStore", "global", "45348281")
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 54, id: "45348281" }
 */
export async function orderedDatastoreEntry<
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string
>(
  this: ThisAllOverrides, universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope, id: Id
): ApiMethodResponse<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<
      OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id>
    >(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`, {
        apiName, methodName: "orderedDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
  })
}


/**
 * Deletes the specified entry.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * 
 * @example const { data:success } = await OrderedDatastoresApi.deleteOrderedDatastoreEntry( 5097539509, "PointsStore", "global", "45348281")
 * @exampleData true
 * @exampleRawBody {}
 */
export async function deleteOrderedDatastoreEntry(
  this: ThisAllOverrides, universeId: Identifier, orderedDataStore: string, scope: string, id: string
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.delete<{}>(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`, {
        apiName, methodName: "deleteOrderedDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cacheMetadata })
  })
}


/**
 * Updates the specified entry.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * @param newValue The value to set the entry to.
 * @param createIfNoEntryExists The flag to allow the creation of an entry if the entry doesn't exist. (allow_missing)
 * 
 * @example
 * const { data:updatedEntry } = await OrderedDatastoresApi.updateOrderedDatastoreEntry(
     5097539509, "PointsStore", "global",
     "45348281", 58
   )
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 58, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 58, id: "45348281" }
 */
export async function updateOrderedDatastoreEntry<
  UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string, NewValue extends number
>(
  this: ThisAllOverrides, universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope,
  id: Id, newValue: NewValue, createIfNoEntryExists?:boolean
): ApiMethodResponse<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id, NewValue>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.patch<
      OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id, NewValue>
    >(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}`, {
        searchParams: { allow_missing: createIfNoEntryExists || false },
        body: { value: newValue },
        apiName, methodName: "updateOrderedDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
  })
}


/**
 * Increments the specified entry.
 * @endpoint GET /v1/universes/{universeId}/orderedDataStores/{orderedDataStore}/scopes/{scope}/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with ordered data stores that you want to access.
 * @param orderedDataStore The name of the target ordered data store.
 * @param scope The name of the data store scope.
 * @param id The id of the entry.
 * @param incrementBy The number to increment the entry's value by.
 * @param createIfNoEntryExists The flag to allow the creation of an entry if the entry doesn't exist. (allow_missing)
 * 
 * @example const { data:incrementedEntry } = await OrderedDatastoresApi.incrementOrderedDatastoreEntry(
     5097539509, "PointsStore", "global",
     "45348281", 12
   )
 * @exampleData { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 66, id: "45348281" }
 * @exampleRawBody { path: "universes/5097539509/orderedDataStores/PointsStore/scopes/global/entries/45348281", value: 66, id: "45348281" }
 */
   export async function incrementOrderedDatastoreEntry<
   UniverseId extends Identifier, OrderedDataStore extends string, Scope extends string, Id extends string
 >(
   this: ThisAllOverrides, universeId: UniverseId, orderedDataStore: OrderedDataStore, scope: Scope,
   id: Id, incrementBy: number, createIfNoEntryExists?:boolean
 ): ApiMethodResponse<OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id>> {
   const overrides = this
   return BaseHandler(async function(this: ThisProfile) {
 
    const { rawBody, response, cacheMetadata } = await this.http.post<
      OrderedDatastoreEntry<UniverseId, OrderedDataStore, Scope, Id>
    >(
      `${baseUrl}/v1/universes/${universeId}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries/${id}:increment`, {
        searchParams: { allow_missing: createIfNoEntryExists || false },
        body: { amount: incrementBy },
        apiName, methodName: "incrementOrderedDatastoreEntry", overrides
      }
    )
 
     return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
   })
 }