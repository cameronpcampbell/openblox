// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedUniverseFollowingStatusForUserData, RawUniverseFollowingsForUserData, RawUniverseFollowingStatusForUserData } from "./legacyFollowings.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "LegacyFollowings", baseUrl: "https://apis.roblox.com/legacy-followings" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// [ Users ] /////////////////////////////////////////////////////////////////////
/**
 * Gets all universes that a user is following.
 * @endpoint GET /v1/users/{userId}/universes
 * 
 * @param userId The ID of the user to get universe followings for.
 * 
 * @example const { data:followings } = await LegacyFollowingsApi.universeFollowingsForUser({ userId: 45348281 })
 * @exampleData [1040909955,1055503474,1127443799,1165192137,1200754375,1236793313,1272809249,1291219836,1325075446,1333987814,1455656959,1459495916,1475796875,1566033,1619449303,1638574655,1642810480,1652474931,1658520392,1684207825,1685831367,1756953036,1778285344,245662005,2471084,37146255,3837270861,38625144,4459945221,4571818074,478688139,495693931,498490399,518243913,5693752693,602133888,6102030522,6211067578,777854650,878103525,88070565,904999465,953412571,99361251]
 * @exampleRawBody [{"universeId":1040909955,"userId":45348281},{"universeId":1055503474,"userId":45348281},{"universeId":1127443799,"userId":45348281},{"universeId":1165192137,"userId":45348281},{"universeId":1200754375,"userId":45348281},{"universeId":1236793313,"userId":45348281},{"universeId":1272809249,"userId":45348281},{"universeId":1291219836,"userId":45348281},{"universeId":1325075446,"userId":45348281},{"universeId":1333987814,"userId":45348281},{"universeId":1455656959,"userId":45348281},{"universeId":1459495916,"userId":45348281},{"universeId":1475796875,"userId":45348281},{"universeId":1566033,"userId":45348281},{"universeId":1619449303,"userId":45348281},{"universeId":1638574655,"userId":45348281},{"universeId":1642810480,"userId":45348281},{"universeId":1652474931,"userId":45348281},{"universeId":1658520392,"userId":45348281},{"universeId":1684207825,"userId":45348281},{"universeId":1685831367,"userId":45348281},{"universeId":1756953036,"userId":45348281},{"universeId":1778285344,"userId":45348281},{"universeId":245662005,"userId":45348281},{"universeId":2471084,"userId":45348281},{"universeId":37146255,"userId":45348281},{"universeId":3837270861,"userId":45348281},{"universeId":38625144,"userId":45348281},{"universeId":4459945221,"userId":45348281},{"universeId":4571818074,"userId":45348281},{"universeId":478688139,"userId":45348281},{"universeId":495693931,"userId":45348281},{"universeId":498490399,"userId":45348281},{"universeId":518243913,"userId":45348281},{"universeId":5693752693,"userId":45348281},{"universeId":602133888,"userId":45348281},{"universeId":6102030522,"userId":45348281},{"universeId":6211067578,"userId":45348281},{"universeId":777854650,"userId":45348281},{"universeId":878103525,"userId":45348281},{"universeId":88070565,"userId":45348281},{"universeId":904999465,"userId":45348281},{"universeId":953412571,"userId":45348281},{"universeId":99361251,"userId":45348281}]
 */
export const universeFollowingsForUser = createApiMethod(async <UserId extends Identifier>(
  { userId }: { userId: Identifier }
): ApiMethod<RawUniverseFollowingsForUserData<UserId>, Identifier[]> => ({
  method: "GET",
  path: `/v1/users/${userId}/universes`,
  name: `universeFollowingsForUser`,

  formatRawDataFn: rawData => rawData.map(result => result.universeId)
}))


/**
 * Gets the following status between a user and a universe.
 * @endpoint GET /v1/users/{userId}/universes/{universeId}/status
 * 
 * @param universeId The ID of the universe to get following status for.
 * @param userId The ID of the user to get following status for.
 * 
 * @example const { data:status } = await LegacyFollowingsApi.universeFollowingStatusForUser({ universeId: 4922741943, userId: 45348281 })
 * @exampleData {"universeId":4922741943,"userId":45348281,"canFollow":true,"isFollowing":false,"followingCountByType":44,"followingLimitByType":200}
 * @exampleRawBody "UniverseId":4922741943,"UserId":45348281,"CanFollow":true,"IsFollowing":false,"FollowingCountByType":44,"FollowingLimitByType":200}
 */
export const universeFollowingStatusForUser = createApiMethod(async <UniverseId extends Identifier, UserId extends Identifier>(
  { universeId, userId }: { universeId: UniverseId, userId: UserId }
): ApiMethod<RawUniverseFollowingStatusForUserData<UniverseId, UserId>, PrettifiedUniverseFollowingStatusForUserData<UniverseId, UserId>> => ({
  method: "GET",
  path: `/v1/users/${userId}/universes/${universeId}/status`,
  name: `universeFollowingStatusForUser`,

  formatRawDataFn: toCamel
}))


/**
 * Unfollows a particular universe as the authenticated user.
 * @endpoint DELETE /v1/users/{userId}/universes/{universeId}
 * 
 * @param universeId The ID of the universe to unfollow.
 * @param userId The ID of the authenticated user.
 * 
 * @example const { data:ids } = await LegacyFollowingsApi.authedUserUnfollowUniverse({ universeId: 4922741943, userId: 45348281 })
 * @exampleData {"universeId":4922741943,"userId":45348281}
 * @exampleRawBody {"universeId":4922741943,"userId":45348281} 
 */
export const authedUserUnfollowUniverse = createApiMethod(async <UniverseId extends Identifier, UserId extends Identifier>(
  { universeId, userId }: { universeId: UniverseId, userId: UserId }
): ApiMethod<{ universeId: UniverseId, userId: UserId }> => ({
  method: "DELETE",
  path: `/v1/users/${userId}/universes/${universeId}`,
  name: `authedUserUnfollowUniverse`,
}))


/**
 * Follows a particular universe as the authenticated user.
 * @endpoint POST /v1/users/{userId}/universes/{universeId}
 * 
 * @param universeId The ID of the universe to follow.
 * @param userId The ID of the authenticated user.
 * 
 * @example const { data:ids } = await LegacyFollowingsApi.authedUserFollowUniverse({ universeId: 4922741943, userId: 45348281 })
 * @exampleData {"universeId":4922741943,"userId":45348281} 
 * @exampleRawBody {"universeId":4922741943,"userId":45348281} 
 */
export const authedUserFollowUniverse = createApiMethod(async <UniverseId extends Identifier, UserId extends Identifier>(
  { universeId, userId }: { universeId: UniverseId, userId: UserId }
): ApiMethod<{ universeId: UniverseId, userId: UserId }> => ({
  method: "POST",
  path: `/v1/users/${userId}/universes/${universeId}`,
  name: `authedUserFollowUniverse`,
}))
//////////////////////////////////////////////////////////////////////////////////