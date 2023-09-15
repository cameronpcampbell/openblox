// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler } from "../../../apis/apis.utils"

import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse } from "../../apis.types"
import type { InventoryItemsForUserData, InventoryItemsForUserFilter } from "./inventoryApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const formatFilter = (filter: InventoryItemsForUserFilter) => (
  Object.entries(filter).map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(",") : value}`).join(";")
)
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
 * @exampleRawData { inventoryItems: [ { path: 'users/45348281/inventory-items/R0FNRV9QQVNTX0lEPTEyNTI3', gamePassDetails: { gamePassId: '12527' } } ],
  nextPageToken: 'djEveyJGaWVsZEluZGV4IjoyLCJWYWx1ZUluZGV4IjowLCJDdXJzb3IiOiIxMjUyNyIsIkZpbHRlckhhc2giOiJrV3Y2VFQ0ZW1FOGgzT1RQL1hjOXFkdGIwR0JiWjNySkRMU3FTSmV5TUVJPSJ9' }
 */
export async function inventoryItemsForUser(
  this: ThisAllOverrides, userId: number, maxPageSize: number = 10, filter?:InventoryItemsForUserFilter, pageToken?: string
): ApiMethodResponse<InventoryItemsForUserData, InventoryItemsForUserData, "OPENCLOUD_PAGINATION"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<InventoryItemsForUserData>(`${baseUrl}/v2/users/${userId}/inventory-items`, {
      searchParams: { maxPageSize, pageToken, filter: filter && formatFilter(filter) },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "inventoryItemsForUser")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { rawData, data: rawData, response, nextPage: rawData.nextPageToken, cache }
  }, [])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////