// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { CreateSortedMapItem_ConstructItemConfig, EnqueueItem_ConstructItemConfig, PrettifiedEnqueueItemData, PrettifiedFlushAllQueuesData, PrettifiedListSortedMapItemsData, PrettifiedReadQueueItemsData, PrettifiedSortedMapItemData, PrettifiedUpdateSortedMapItem, RawEnqueueItemData, RawFlushAllQueuesData, RawListSortedMapItemsData, RawReadQueueItemsData, RawSortedMapItemData, RawUpdateSortedMapItem, UpdateSortedMapItem_ConstructItemConfig } from "./memoryStores.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "MemoryStore", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets a sorted map item.
 * @endpoint GET /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{itemId}
 * 
 * @param universeId The id of the universe to get the sorted map item from.
 * @param sortedMap The sorted map to get the item from.
 * @param itemId The id of the item to get.
 * 
 * @example
 * type Item = { isReal: boolean }
   const { data } = await MemoryStoresApi.sortedMapItem<Item>({ universeId: 5243626809, sortedMap: "MySortedMap", itemId: "Testing123" })
 * @exampleData {"path":"cloud/v2/universes/5243626809/memory-stores/sorted-maps/MySortedMap/items/Testing123","value":{"isReal":true},"etag":"12","expireTime":"2024-04-18T01:44:49.000Z","id":"Testing123","numericSortKey":1}
 * @exampleRawBody {"path":"cloud/v2/universes/5243626809/memory-stores/sorted-maps/MySortedMap/items/Testing123","value":{"isReal":true},"etag":"12","expireTime":"2024-04-18T01:44:49Z","id":"Testing123","numericSortKey":1}
 */
export const sortedMapItem = createApiMethod(async <ItemValue>(
  { universeId, sortedMap, itemId }: { universeId: Identifier, sortedMap: string, itemId: string }
): ApiMethod<RawSortedMapItemData<ItemValue>, PrettifiedSortedMapItemData<ItemValue>> => ({
  path: `/v2/universes/${universeId}/memory-store/sorted-maps/${sortedMap}/items/${itemId}`,
  method: "GET",
  name: "sortedMapItem",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.expireTime = new Date(obj.expireTime))
}))


/**
 * Lists items of a sorted map.
 * @endpoint GET /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items
 * 
 * @param universeId The id of the universe to get the sorted map item from.
 * @param sortedMap The sorted map to get the item from.
 * @param maxPageSize The id of the item to get.
 * @param orderBy The order of the returned sorted map items.
 * @param filter filter returned sorted map items.
 * 
 * @example const { data:items } = await MemoryStoresApi.listSortedMapItems<Item>({ universeId: 5243626809, sortedMap: "MySortedMap", maxPageSize: 1 })
 * @exampleData [{"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items/Testing123","value":{"isReal":true},"etag":"24","expireTime":"2024-04-18T04:31:14.000Z","id":"Testing123","numericSortKey":1}]
 * @exampleRawBody {"items":[{"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items/Testing123","value":{"isReal":true},"etag":"24","expireTime":"2024-04-18T04:31:14Z","id":"Testing123","numericSortKey":1}],"nextPageToken":"S_USLzRFVMU73i67jNK349FgCtYxw4Wl18ziPHeFRZoACgBUZXN0aW5nMTIzCQAAv_AAAAAAAAA"}
 */
export const listSortedMapItems = createApiMethod(async (
  { universeId, sortedMap, maxPageSize, orderBy, filter, cursor }:
  { universeId: Identifier, sortedMap: string, maxPageSize?: number, orderBy?: "asc" | "desc", filter?: string, cursor?: string }
): ApiMethod<RawListSortedMapItemsData, PrettifiedListSortedMapItemsData> => ({
  path: `/v2/universes/${universeId}/memory-store/sorted-maps/${sortedMap}/items`,
  method: "GET",
  searchParams: { maxPageSize, orderBy, filter, pageToken: cursor },
  name: "listSortedMapItems",

  formatRawDataFn: ({ items }) => cloneAndMutateObject(items, obj => {
    obj.forEach((value) => { value.expireTime = new Date(value.expireTime) })
  }),

  getCursorsFn: ({ nextPageToken }) => [ undefined, nextPageToken ]
}))

/**
 * Creates a sorted map item.
 * @endpoint POST /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items
 * 
 * @param universeId The id of the universe to create the sorted map item in.
 * @param sortedMap The sorted map to create the item in.
 * @param item The sorted map item data.
 * 
 * @example
 * type Item = { isReal: boolean }
   const { data } = await MemoryStoresApi.createSortedMapItem<Item>({
     universeId: 5243626809, sortedMap: "MySortedMap",
     item: { id: "Testing123", value: { isReal: true }, ttl: "300s", numericSortKey: 1 }
   })
 * @exampleData {"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items","value":{"isReal":true},"etag":"10","expireTime":"2024-04-18T00:30:14.000Z","id":"Testing123","numericSortKey":1}
 * @exampleRawBody {"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items","value":{"isReal":true},"etag":"10","expireTime":"2024-04-18T00:30:14Z","id":"Testing123","numericSortKey":1}
 */
export const createSortedMapItem = createApiMethod(async <ItemValue>(
  { universeId, sortedMap, item }: { universeId: Identifier, sortedMap: string, item: CreateSortedMapItem_ConstructItemConfig<ItemValue> }
): ApiMethod<RawSortedMapItemData<ItemValue>, PrettifiedSortedMapItemData<ItemValue>> => ({
  path: `/v2/universes/${universeId}/memory-store/sorted-maps/${sortedMap}/items`,
  method: "POST",
  body: { Id: item.id, Value: item.value, Ttl: item.ttl, NumericSortKey: item.numericSortKey, StringSortKey: item.stringSortKey },
  name: "createSortedMapItem",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.expireTime = new Date(obj.expireTime))
}))


/**
 * Updates a sorted map item.
 * @endpoint PATCH /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{itemId}
 * 
 * @param universeId The id of the universe to get the sorted map item from.
 * @param sortedMap The sorted map to get the item from.
 * @param itemId The id of the item to update.
 * @param updatedItemData The data to update the sorted map item with.
 * @param allowMissing If set to true, and the item is not found, a new item will be created. Default false.
 * 
 * @example
 * type Item = { isReal: boolean }
   const { data:updatedItem } = await MemoryStoresApi.updateSortedMapItem<Item>({
     universeId: 5243626809, sortedMap: "MySortedMap", itemId: "Testing123",
     updatedItemData: { value: { isReal: true }, ttl: "300s", numericSortKey: 1 }
   });
 * @exampleData {"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items/","value":{"isReal":false},"etag":"20","expireTime":"2024-04-18T03:48:53.000Z","numericSortKey":null}
 * @exampleRawBody {"path":"cloud/v2/universes/5243626809/memory-store/sorted-maps/MySortedMap/items/","value":{"isReal":false},"etag":"20","expireTime":"2024-04-18T03:48:53Z","numericSortKey":null}
 */
export const updateSortedMapItem = createApiMethod(async <ItemValue>(
  { universeId, sortedMap, itemId, updatedItemData, allowMissing }:
  { universeId: Identifier, sortedMap: string, itemId: string, updatedItemData: UpdateSortedMapItem_ConstructItemConfig<ItemValue>, allowMissing?: boolean }
): ApiMethod<RawUpdateSortedMapItem<ItemValue>, PrettifiedUpdateSortedMapItem<ItemValue>> => ({
  path: `/v2/universes/${universeId}/memory-store/sorted-maps/${sortedMap}/items/${itemId}`,
  method: "PATCH",
  searchParams: { allowMissing },
  body: {
    Value: updatedItemData.value, Ttl: updatedItemData.ttl, NumericSortKey: updatedItemData.numericSortKey, StringSortKey: updatedItemData.stringSortKey
  },
  name: "updateSortedMapItem",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.expireTime = new Date(obj.expireTime))
}))


/**
 * Deletes a sorted map item.
 * @endpoint DELETE /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{itemId}
 * 
 * @param universeId The id of the universe to get the sorted map item from.
 * @param sortedMap The sorted map to get the item from.
 * @param itemId The id of the item to update.
 * @param etag Server generated id for conditional delete.
 * 
 * @example await MemoryStoresApi.deleteSortedMapItem({ universeId: 5243626809, sortedMap: "MySortedMap", itemId: "Testing1234" });
 * @exampleData ""
 * @exampleRawBody ""
 */
export const deleteSortedMapItem = createApiMethod(async (
  { universeId, sortedMap, itemId, etag }:
  { universeId: Identifier, sortedMap: string, itemId: string, etag?: string }
): ApiMethod<""> => ({
  path: `/v2/universes/${universeId}/memory-store/sorted-maps/${sortedMap}/items/${itemId}`,
  method: "DELETE",
  searchParams: { etag },
  name: "deleteSortedMapItem",
}))

/**
 * Adds an item to a memory store queue.
 * @endpoint POST /v2/universes/{universeId}/memory-store/queues/{queue}/items
 * 
 * @param universeId The id of the universe to get the sorted map item from.
 * @param sortedMap The sorted map to get the item from.
 * @param itemId The id of the item to update.
 * @param etag Server generated id for conditional delete.
 * 
 * @example
 * const { data:enqueuedItem } = await MemoryStoresApi.enqueueItem({
     universeId: 5243626809, queue: "MyQueue",
     item: { name: "MyItem", value: "fooBar", ttl: "300s" }
   });
 * @exampleData {"path":"cloud/v2/universes/5243626809/memory-store/queues/MyQueue/items/7fffffffffffffff0000000000000003","data":{"name":"MyItem","value":"fooBar"},"priority":0,"expireTime":2024-06-04T08:10:33.000Z}
 * @exampleRawBody {"path":"cloud/v2/universes/5243626809/memory-store/queues/MyQueue/items/7fffffffffffffff0000000000000003","data":{"name":"MyItem","value":"fooBar"},"priority":0,"expireTime":"2024-06-04T08:10:33Z"}
 */
export const enqueueItem = createApiMethod(async <ItemValue>(
  { universeId, queue, item }:
  { universeId: Identifier, queue: string, item: EnqueueItem_ConstructItemConfig<ItemValue> }
): ApiMethod<RawEnqueueItemData<ItemValue>, PrettifiedEnqueueItemData<ItemValue>> => ({
  path: `/v2/universes/${universeId}/memory-store/queues/${queue}/items`,
  method: "POST",
  body: {
    data: { name: item.name, value: item.value },
    ttl: item.ttl,
    priority: item.priority
  },
  name: "enqueueItem",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.expireTime = new Date(obj.expireTime))
}))


/**
 * Reads queue items.
 * @endpoint GET /v2/universes/{universeId}/memory-store/queues/{queue}/items:read
 * 
 * @param universeId The id of the universe to read queue items from.
 * @param queue Name of the Queue.
 * @param limit Maximum entries to read, Max 200, Default 1.
 * @param allOrNothing Whether to read any items if >= count can’t be read. Default false.
 * @param invisibilityTimeoutSeconds Invisibility timeout for items read, default 30s. This will make previously read items invisible for the provided duration in the next Read request.
 * 
 * @example
 * type Item = { isReal: boolean };
 * const { data:queueItems } = await MemoryStoresApi.readQueueItems<Item>({ universeId: 5243626809, queue: "MyQueue", limit: 2 });
 * @exampleData {"items":[{"name":"Testing123","value":{"isReal":true}},{"name":"Testing1234","value":{"isReal":true}}],"id":"48e44da3c8754a4ab7ed728d07ac9526"}
 * @exampleRawBody {"data":[{"name":"Testing123","value":{"isReal":true}},{"name":"Testing1234","value":{"isReal":true}}],"id":"5cfc27af46da4cf08b41aa9a3d78a75e"}
 */
export const readQueueItems = createApiMethod(async <ItemValue extends any>(
  { universeId, queue, limit, allOrNothing, invisibilityTimeoutSeconds }:
  { universeId: Identifier, queue: string, limit?: number, allOrNothing?: boolean, invisibilityTimeoutSeconds?: number }
): ApiMethod<RawReadQueueItemsData<ItemValue>, PrettifiedReadQueueItemsData<ItemValue>> => ({
  path: `/v2/universes/${universeId}/memory-store/queues/${queue}/items:read`,
  method: "GET",
  searchParams: { count: limit, allOrNothing, invisibilityTimeoutSeconds },
  name: "readQueueItems",

  formatRawDataFn: ({ data, id }) => ({ items: data, readId: id })
}))
// ABOVE


/**
 * Dequeues queue items.
 * @endpoint POST /v2/universes/{universeId}/memory-store/queues/{queue}/items:discard
 * 
 * @param universeId The id of the universe to remove queue items from.
 * @param queue Name of the Queue.
 * @param readId ID returned from a previous Read Queue call. It will discard all items that were read from the previous call.
 * 
 * @example await MemoryStoresApi.dequeueItems({ universeId: 5243626809, queue: "MyQueue", readId: "5cfc27af46da4cf08b41aa9a3d78a75e" })
 * @exampleData ""
 * @exampleRawBody ""
 */
export const dequeueItems = createApiMethod(async (
  { universeId, queue, readId }:
  { universeId: Identifier, queue: string, readId: string }
): ApiMethod<""> => ({
  path: `/v2/universes/${universeId}/memory-store/queues/${queue}/items:discard`,
  method: "POST",
  searchParams: { readId },
  name: "dequeueItems"
}))

/**
 * Removes all items from every queue in a given universe.
 * @endpoint POST /v2/universes/${universeId}/memory-store:flush
 * 
 * @param universeId The id of the universe to flush all queue items from.
 * 
 * @example const { data:createdOperation } = await MemoryStoresApi.flushAllQueues({ universeId: 5243626809 });
 * @exampleData {"path":"cloud/v2/universes/5243626809/operations/AAUAAAAAAADRMx55T0AKRxSgFCrSusMzqOKQNyVaQz8eMi9t-dwQwQ","done":false,"id":"AAUAAAAAAADRMx55T0AKRxSgFCrSusMzqOKQNyVaQz8eMi9t-dwQwQ"}
 * @exampleRawBody {"path":"cloud/v2/universes/5243626809/operations/AAUAAAAAAADRMx55T0AKRxSgFCrSusMzqOKQNyVaQz8eMi9t-dwQwQ","done":null}
 */
export const flushAllQueues = createApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: UniverseId }
): ApiMethod<RawFlushAllQueuesData<UniverseId>, PrettifiedFlushAllQueuesData<UniverseId>> => ({
  path: `/v2/universes/${universeId}/memory-store:flush`,
  method: "POST",
  name: "flushQueue",

  pathToPoll: ({ path }) => `/universes/${universeId}/memory-store/operations/${path.split("/")[5] as string}`,

  formatRawDataFn: ({ path, done }) => ({
    path, done: done ? true : false
  })
}))




