// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedUserSubscriptionsData, RawUserSubscriptionsData } from "./premiumFeatures.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicPremiumFeatures", baseUrl: "https://premiumFeatures.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Returns true if the user currently has a Roblox Premium subscription.
 * @endpoint GET /v1/users/{userId}/validate-membership
 * 
 * @param userId The ID of the user to get premium membership for.
 * 
 * @example const { data:hasPremium } = await ClassicPremiumFeaturesApi.userHasPremium({ userId: 45348281 })
 * @exampleData true
 * @exampleRawBody true
 */
export const userHasPremium = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<boolean> => ({
  path: `/v1/users/${userId}/validate-membership`,
  method: "GET",
  name: "userHasPremium",
}))

/**
 * Gets a list of subscriptions for a user. NOTE: Can only get subscriptions for the authenticated user.
 * @endpoint GET /v1/users/{userId}/subscriptions
 * 
 * @param userId The ID of the user to get subscriptions for.
 * 
 * @example const { data:subscriptions } = await ClassicPremiumFeaturesApi.userSubscriptions({ userId: 45348281 });
 * @exampleData {"subscriptionProductModel":{"premiumFeatureId":505,"subscriptionTypeName":"RobloxPremium450","robuxStipendAmount":450,"isLifetime":false,"expiration":2024-08-15T15:04:28.326Z,"renewal":2024-08-12T15:04:28.326Z,"created":2014-02-14T16:20:38.117Z,"purchasePlatform":"isIosApp","subscriptionName":"Roblox Premium 450"}}
 * @exampleRawBody {"subscriptionProductModel":{"premiumFeatureId":505,"subscriptionTypeName":"RobloxPremium450","robuxStipendAmount":450,"isLifetime":false,"expiration":"2024-08-15T15:04:28.326Z","renewal":"2024-08-12T15:04:28.326Z","created":"2014-02-14T16:20:38.117Z","purchasePlatform":"isIosApp","subscriptionName":"Roblox Premium 450"}}
 */
export const userSubscriptions = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawUserSubscriptionsData, PrettifiedUserSubscriptionsData> => ({
  path: `/v1/users/${userId}/subscriptions`,
  method: "GET",
  name: "userSubscriptions",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, ({ subscriptionProductModel }) => {
    subscriptionProductModel.expiration = new Date(subscriptionProductModel.expiration)
    subscriptionProductModel.renewal = new Date(subscriptionProductModel.renewal)
    subscriptionProductModel.created = new Date(subscriptionProductModel.created)
  })
}))