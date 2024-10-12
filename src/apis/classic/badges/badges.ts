// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ISODateTime, ArrayNonEmptyIfConst, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { SortOrder } from "../../../utils/utils.types"
import type { PrettifiedBadgeAwardedDateForUserData, PrettifiedBadgeInfoData, PrettifiedBadgesAwardedDatesForUserData, PrettifiedPaginatedBadgesData, RawBadgeAwardedDateForUserData, RawBadgeInfoData, RawBadgesAwardedDatesForUserData, RawPaginatedBadgesData } from "./badges.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicBadgesApi", baseUrl: "https://badges.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// [ Badges ] ////////////////////////////////////////////////////////////////////
/**
 * Gets information for a badge.
 * @endpoint GET /v1/badges/{badgeId}
 * 
 * @param badgeId The ID of the badge to get information for.
 * 
 * @example const { data:badgeInfo } = await ClassicBadgesApi.badgeInfo({ badgeId: 2124533401 })
 * @exampleData {"id":2124533401,"name":"Tutorial Done","description":"Tutorial Lol","displayName":"Tutorial Done","displayDescription":"Tutorial Lol","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653Z","updated":"2023-08-26T12:43:15.280Z","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}
 * @exampleRawBody {"id":2124533401,"name":"Tutorial Done","description":"Tutorial Lol","displayName":"Tutorial Done","displayDescription":"Tutorial Lol","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653Z","updated":"2023-08-26T12:43:15.280Z","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}
 */
export const badgeInfo = createApiMethod(async <BadgeId extends Identifier>(
  { badgeId }: { badgeId: BadgeId }
): ApiMethod<RawBadgeInfoData<BadgeId>, PrettifiedBadgeInfoData<BadgeId>> => ({
  method: "GET",
  path: `/v1/badges/${badgeId}`,
  name: `badgeInfo`,

  formatRawDataFn: rawData => cloneAndMutateObject(rawData, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })
}))


/**
 * Updates a badge.
 * @endpoint PATCH /v1/badges/{badgeId}
 * 
 * @param badgeId The ID of the badge to update.
 * @param name The new name for the badge.
 * @param description The new description for the badge.
 * @param enabled If the badge is to enabled.
 * 
 * @example const { data:success } = await ClassicBadgesApi.updateBadge({ badgeId: 2124533401, description: "hello" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const updateBadge = createApiMethod(async (
  { badgeId, name, description, enabled }: { badgeId: Identifier, name?: string, description?: string, enabled?: boolean }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/badges/${badgeId}`,
  name: `updateBadge`,
  body: { name, description, enabled },

  formatRawDataFn: rawData => dataIsSuccess(rawData)
}))


/**
 * Gets metadata about the badges system.
 * @endpoint GET /v1/badges/metadata
 * 
 * @example const { data:metadata } = await ClassicBadgesApi.badgesMetadata()
 * @exampleData {"badgeCreationPrice":100,"maxBadgeNameLength":50,"maxBadgeDescriptionLength":1000}
 * @exampleRawBody {"badgeCreationPrice":100,"maxBadgeNameLength":50,"maxBadgeDescriptionLength":1000}
 */
export const badgesMetadata = createApiMethod(async (
): ApiMethod<{ badgeCreationPrice: number, maxBadgeNameLength: number, maxBadgeDescriptionLength: number }> => ({
  method: "GET",
  path: `/v1/badges/metadata`,
  name: `badgesMetadata`,
}))


/**
 * Gets badges for a specific universe.
 * @endpoint GET /v1/universes/{universeId}/badges
 * 
 * @param universeId The ID of the universe to get badges from.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:badges } = await ClassicBadgesApi.badgesForUniverse({ universeId: 1685831367 })
 * @exampleData [{"id":2124533401,"name":"Tutorial Done","description":"true","displayName":"Tutorial Done","displayDescription":"true","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653Z","updated":"2024-07-16T22:34:44.021Z","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"eyJrZXkiOiJpZF8yendBQUFYSGo2OEVkem42aHpwayIsInNvcnRPcmRlciI6IkFzYyIsInBhZ2luZ0RpcmVjdGlvbiI6IkZvcndhcmQiLCJwYWdlTnVtYmVyIjoyLCJkaXNjcmltaW5hdG9yIjoidW5pdmVyc2VJZDoxNjg1ODMxMzY3IiwiY291bnQiOjEwfQplMzk4ODQzNTg5NGYxNzU4MTk1YmVlNWFhMDE5NTI1MmJiMjdhZDRiYzU5YzE3NjNjNjg3M2UxYmExNDdkMWZh","data":[{"id":2124533401,"name":"Tutorial Done","description":"true","displayName":"Tutorial Done","displayDescription":"true","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653+00:00","updated":"2024-07-16T22:34:44.021+00:00","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}]}
 */
export const badgesForUniverse = createApiMethod(async <UniverseId extends Identifier>(
  { universeId, limit, sortOrder, cursor }: { universeId: UniverseId, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPaginatedBadgesData<UniverseId>, PrettifiedPaginatedBadgesData<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/badges`,
  searchParams: { limit, sortOrder, cursor },
  name: `badgesForUniverse`,

  formatRawDataFn: ({ data }) => data.map(badgeInfo => cloneAndMutateObject(badgeInfo, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  }))
}))


/**
 * Gets the number of free badges left for the current UTC day by their awarding game.
 * @endpoint GET /v1/universes/{universeId}/free-badges-quota
 * 
 * @param universeId The ID of the universe to get free badges for.
 * 
 * @example const { data:freeBadgesLeft } = await ClassicBadgesApi.freeBadgesLeftForUniverse({ universeId: 1685831367 })
 * @exampleData 5
 * @exampleRawBody 5
 */
export const freeBadgesLeftForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<number> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/free-badges-quota`,
  name: `freeBadgesLeftForUniverse`,
}))


/**
 * Gets a list of badges a user has been awarded
 * @endpoint GET /v1/users/{userId}/badges
 * 
 * @param userId The ID of the user to get badges for.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:badges } = await ClassicBadgesApi.userBadges({ userId: 45348281 })
 * @exampleData [{"id":2124533401,"name":"Tutorial Done","description":"true","displayName":"Tutorial Done","displayDescription":"true","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653Z","updated":"2024-07-16T22:34:44.021Z","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"eyJrZXkiOiJpZF8yendBQUFYSGo2OEVkem42aHpwayIsInNvcnRPcmRlciI6IkFzYyIsInBhZ2luZ0RpcmVjdGlvbiI6IkZvcndhcmQiLCJwYWdlTnVtYmVyIjoyLCJkaXNjcmltaW5hdG9yIjoidW5pdmVyc2VJZDoxNjg1ODMxMzY3IiwiY291bnQiOjEwfQplMzk4ODQzNTg5NGYxNzU4MTk1YmVlNWFhMDE5NTI1MmJiMjdhZDRiYzU5YzE3NjNjNjg3M2UxYmExNDdkMWZh","data":[{"id":2124533401,"name":"Tutorial Done","description":"true","displayName":"Tutorial Done","displayDescription":"true","enabled":true,"iconImageId":5316501478,"displayIconImageId":5316501478,"created":"2020-05-05T08:20:10.653+00:00","updated":"2024-07-16T22:34:44.021+00:00","statistics":{"pastDayAwardedCount":0,"awardedCount":394,"winRatePercentage":0},"awardingUniverse":{"id":1685831367,"name":"RoCamping","rootPlaceId":4922741943}}]}
 */
export const userBadges = createApiMethod(async (
  { userId, limit, sortOrder, cursor }: { userId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPaginatedBadgesData, PrettifiedPaginatedBadgesData> => ({
  method: "GET",
  path: `/v1/users/${userId}/badges`,
  searchParams: { limit, sortOrder, cursor },
  name: `userBadges`,

  formatRawDataFn: ({ data }) => data.map(badgeInfo => cloneAndMutateObject(badgeInfo, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  }))
}))
//////////////////////////////////////////////////////////////////////////////////



// [ Badge Awards ] //////////////////////////////////////////////////////////////
/**
 * Gets timestamp for when a single badge was awarded to a user.
 * @endpoint GET /v1/users/{userId}/badges/{badgeId}/awarded-date
 * 
 * @param badgeId The ID of the badge to get award date from.
 * @param userId The ID of thw user to get award date for.
 * 
 * @example const { data:awardDate } = await ClassicBadgesApi.badgeAwardedDateForUser({ badgeId: 2124533401, userId: 45348281 })
 * @exampleData 2020-11-15T18:51:30.604Z
 * @exampleRawBody {"badgeId":2124533401,"awardedDate":"2020-11-15T18:51:30.604064Z"}
 */
export const badgeAwardedDateForUser = createApiMethod(async <BadgeId extends Identifier>(
  { badgeId, userId }: { badgeId: BadgeId, userId: Identifier }
): ApiMethod<RawBadgeAwardedDateForUserData<BadgeId>, PrettifiedBadgeAwardedDateForUserData> => ({
  method: "GET",
  path: `/v1/users/${userId}/badges/${badgeId}/awarded-date`,
  name: `badgeAwardedDateForUser`,

  formatRawDataFn: rawData => {
    if (typeof rawData == "string") return null
    return new Date(rawData.awardedDate)
  }
}))


/**
 * Gets timestamp for when multiple badges were awarded to a user.
 * @endpoint GET /v1/users/{userId}/badges/awarded-dates
 * 
 * @param badgeIds The IDs of the badges to get award dates from.
 * @param userId The ID of thw user to get award date for.
 * 
 * @example const { data:awardDates } = await ClassicBadgesApi.badgesAwardedDatesForUser({ badgeIds: [ 2124533401 ], userId: 45348281 })
 * @exampleData {"2124533401":"2020-11-15T18:51:30.604Z"}
 * @exampleRawBody {"data":[{"badgeId":2124533401,"awardedDate":"2020-11-15T18:51:30.604064Z"}]}
 */
export const badgesAwardedDatesForUser = createApiMethod(async <BadgeId extends Identifier>(
  { badgeIds, userId }: { badgeIds: ArrayNonEmptyIfConst<BadgeId>, userId: Identifier }
): ApiMethod<RawBadgesAwardedDatesForUserData<BadgeId>, PrettifiedBadgesAwardedDatesForUserData<BadgeId>> => ({
  method: "GET",
  path: `/v1/users/${userId}/badges/awarded-dates`,
  searchParams: { badgeIds },
  name: `badgesAwardedDatesForUser`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "badgeId", ({ awardedDate }) => new Date(awardedDate) )
}))


/**
 * Removes a specific badge from a specific user.
 * @endpoint DELETE /v1/user/{userId}/badges/{badgeId}
 * 
 * @param badgeId The ID of the badge to remove from the user.
 * @param userId The ID of the user to remove the badge from.
 * 
 * @example const { data:success } = await ClassicBadgesApi.removeBadgeFromUser({ badgeId: 2124533401, userId: 45348281 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeBadgeFromUser = createApiMethod(async (
  { badgeId, userId }: { badgeId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/user/${userId}/badges/${badgeId}`,
  name: `removeBadgeFromUser`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Removes a specific badge from the authenticated user.
 * @endpoint DELETE /v1/user/badges/{badgeId}
 * 
 * @param badgeId The ID of the badge to remove from the authenticated user.
 * 
 * @example const { data:success } = await ClassicBadgesApi.authenticatedUserRemoveBadge({ badgeId: 2124533401 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserRemoveBadge = createApiMethod(async (
  { badgeId }: { badgeId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/user/badges/${badgeId}`,
  name: `authenticatedUserRemoveBadge`,

  formatRawDataFn: dataIsSuccess
}))
//////////////////////////////////////////////////////////////////////////////////