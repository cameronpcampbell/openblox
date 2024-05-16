// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicPremiumFeatures", baseUrl: "https://premiumFeatures.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets the followers count for a specific user.
 * @endpoint GET /v1/users/{userId}/validate-membership
 * 
 * @param userId The id of the user to get the follower count for.
 * 
 * @example const { data:hasPremium } = await ClassicPremiumFeaturesApi.userHasPremium({ userId: 45348281 })
 * @exampleData true
 * @exampleRawBody true
 */
export const userHasPremium = addApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<boolean> => ({
  path: `/v1/users/${userId}/validate-membership`,
  method: "GET",
  name: "userHasPremium",
}))