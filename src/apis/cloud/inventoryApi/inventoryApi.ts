// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../../apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { Identifier, PrettifyUnion } from "../../../utils/utils.types"
import type { ApiMethodResponse } from "../../apis.types"
import type { RawInventoryItemsForUserData, FormattedInventoryItemsForUserData, InventoryItemsForUserFilter } from "./inventoryApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const formatFilter = (filter: InventoryItemsForUserFilter) => {
  console.log( Object.entries(filter).map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(",") : value}`).join(";") )
  return Object.entries(filter).map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(",") : value}`).join(";")
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://apis.roblox.com/cloud"
const apiName = "InventoryApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = []


// [ INVENTORY ] /////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Lists (specified) items from a specific users inventory.
 * @category Inventory
 * @endpoint GET /v2/users/${userId}/inventory-items
 * @tags [ "CloudKey Needed" ]
 * 
 * @param userId The id of the user to get the inventory items for.
 * @param maxPageSize The maximum amount of items to return.
 * @param filter Filters the returned inventory items by specified criterias.
 * @param pageToken A paging cursor for a specified page.
 * 
 * @example
 * const { data:inventoryItems } = await CloudInventoryApi.inventoryItemsForUser(45348281, 3, {
    privateServers: true,
    gamePasses: true
  })
 * @exampleData { inventoryItems: [ { path: 'users/45348281/inventory-items/R0FNRV9QQVNTX0lEPTEyNTI3', gamePassDetails: { gamePassId: '12527' } } ],
  nextPageToken: 'djEveyJGaWVsZEluZGV4IjoyLCJWYWx1ZUluZGV4IjowLCJDdXJzb3IiOiIxMjUyNyIsIkZpbHRlckhhc2giOiJrV3Y2VFQ0ZW1FOGgzT1RQL1hjOXFkdGIwR0JiWjNySkRMU3FTSmV5TUVJPSJ9' }
 * @exampleRawBody { inventoryItems: [ { path: 'users/45348281/inventory-items/R0FNRV9QQVNTX0lEPTEyNTI3', gamePassDetails: { gamePassId: '12527' } } ],
  nextPageToken: 'djEveyJGaWVsZEluZGV4IjoyLCJWYWx1ZUluZGV4IjowLCJDdXJzb3IiOiIxMjUyNyIsIkZpbHRlckhhc2giOiJrV3Y2VFQ0ZW1FOGgzT1RQL1hjOXFkdGIwR0JiWjNySkRMU3FTSmV5TUVJPSJ9' }
 */
export async function inventoryItemsForUser(
  this: ThisAllOverrides, userId: Identifier, maxPageSize: number = 10, filter?:PrettifyUnion<InventoryItemsForUserFilter>, cursor?: string
): ApiMethodResponse<RawInventoryItemsForUserData, FormattedInventoryItemsForUserData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<RawInventoryItemsForUserData>(
      `${baseUrl}/v2/users/${userId}/inventory-items`, {
        searchParams: { maxPageSize, pageToken: cursor, filter: filter && formatFilter(filter) },
        apiName, methodName: "inventoryItemsForUser", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.inventoryItems, response, cursors: { next: rawBody.nextPageToken }, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////