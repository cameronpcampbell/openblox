// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedSubscriptionInfoData, RawSubscriptionInfoData } from "./subscriptions.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Inventory", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * 
 * @endpoint GET /v2/universes/{universeId}/subscription-products/{subscriptionProductId}/subscriptions/{subscriptionId}
 * 
 * @param universeId The id of the universe.
 * @param subscriptionProductId The id of the subscription.
 * @param subscriptionId The Id of the user who subscribed.
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const subscriptionInfo = createApiMethod(async <
  UniverseId extends Identifier, SubscriptionProductId extends string, SubscriptionId extends Identifier
>(
  { universeId, subscriptionProductId, subscriptionId }:
  { universeId: UniverseId, subscriptionProductId: SubscriptionProductId, subscriptionId: SubscriptionId }
): ApiMethod<
  RawSubscriptionInfoData<UniverseId, SubscriptionProductId, SubscriptionId>,
  PrettifiedSubscriptionInfoData<UniverseId, SubscriptionProductId, SubscriptionId>
> => ({
  path: `/v2/universes/${universeId}/subscription-products/${subscriptionProductId}/subscriptions/${subscriptionId}`,
  method: "GET",
  name: "inventoryItemsForUser",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    const { createTime, updateTime, lastBillingTime, nextRenewTime, expireTime } = obj
    if (createTime) obj.createTime = new Date(createTime);
    if (updateTime) obj.updateTime = new Date(updateTime);
    if (lastBillingTime) obj.lastBillingTime = new Date(lastBillingTime);
    if (nextRenewTime) obj.updateTime = new Date(nextRenewTime);
    if (expireTime) obj.updateTime = new Date(expireTime);
  })
}))