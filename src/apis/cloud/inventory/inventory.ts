// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { InventoryItemsForUser_Filter, PrettifiedInventoryItemsForUserData, RawInventoryItemsForUserData } from "./inventory.types"
import type { UnionPrettify } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Inventory", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const formatInventoryItemsForUserFilters = (filter: any) => {
  return Object.entries(filter).map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(",") : value}`).join(";")
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * 
 * @endpoint GET /v2/users/{userId}/inventory-items
 * @tags [ "CloudKey Needed" ]
 * 
 * @param userId The id of the user to get the inventory items for.
 * @param limit The maximum amount of items to return.
 * @param filter Filters the returned inventory items by specified criterias.
 * @param cursor A paging cursor for a specified page.
 * 
 * @example
 * const { data:inventoryItems } = await InventoryApi.inventoryItemsForUser({
     userId: 45348281, limit: 3, filter: { privateServers: true }
   })
 * @exampleData { inventoryItems: [ { path: 'users/45348281/inventory-items/R0FNRV9QQVNTX0lEPTEyNTI3', gamePassDetails: { gamePassId: '12527' } } ],
  nextPageToken: 'djEveyJGaWVsZEluZGV4IjoyLCJWYWx1ZUluZGV4IjowLCJDdXJzb3IiOiIxMjUyNyIsIkZpbHRlckhhc2giOiJrV3Y2VFQ0ZW1FOGgzT1RQL1hjOXFkdGIwR0JiWjNySkRMU3FTSmV5TUVJPSJ9' }
 * @exampleRawBody { inventoryItems: [ { path: 'users/45348281/inventory-items/R0FNRV9QQVNTX0lEPTEyNTI3', gamePassDetails: { gamePassId: '12527' } } ],
  nextPageToken: 'djEveyJGaWVsZEluZGV4IjoyLCJWYWx1ZUluZGV4IjowLCJDdXJzb3IiOiIxMjUyNyIsIkZpbHRlckhhc2giOiJrV3Y2VFQ0ZW1FOGgzT1RQL1hjOXFkdGIwR0JiWjNySkRMU3FTSmV5TUVJPSJ9' }
 */
export const inventoryItemsForUser = createApiMethod(async (
  { userId, limit, filter, cursor }: { userId: Identifier, limit?: number, filter?: UnionPrettify<InventoryItemsForUser_Filter>, cursor?: string }
): ApiMethod<RawInventoryItemsForUserData, PrettifiedInventoryItemsForUserData> => ({
  path: `/v2/users/${userId}/inventory-items`,
  method: "GET",
  searchParams: { maxPageSize: limit, filter: filter && formatInventoryItemsForUserFilters(filter), pageToken: cursor },
  name: "inventoryItemsForUser",

  formatRawDataFn: ({ inventoryItems }) => inventoryItems,

  getCursorsFn: ({ nextPageToken }) => [ null, nextPageToken ]
}))