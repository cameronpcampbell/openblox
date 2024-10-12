// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { SortOrder } from "../../../utils/utils.types"
import type { FormattedAuthedUserPrivateServersForPlace, FormattedAuthedUserSpotlightedGamesData, FormattedGamesInfoData, FormattedGamesProductInfo, FormattedGroupGamesData, FormattedniversesVoteStatusData, FormattedPlaceServerListData, FormattedPlacesInfoData, FormattedRecommendationsForUniversesData, FormattedUniverseGamePassesData, FormattedUniverseMediaData, FormattedUserGamesPlayabilityStatusesData, PrettifiedUserGamesData, RawAuthedUserGamesPlayabilityStatusesData, RawAuthedUserPrivateServersForPlace, RawAuthedUserSpotlightedGamesData, RawGamesInfoData, RawGamesProductInfo, RawGroupGamesData, RawPlaceServerListData, RawPlacesInfoData, RawRecommendationsForUniversesData, RawUniverseGamePassesData, RawUniverseMediaData, RawUniversesVoteStatusData, RawUserGamesData, VipServerInfoData } from "./games.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicGames", baseUrl: "https://games.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Games ] /////////////////////////////////////////////////////////////////////
/**
 * Gets a list of games info from universe ids.
 * @endpoint GET /v1/games
 * 
 * @param universeIds The IDs of the games to get information for.
 * 
 * @example const { data:games } = await ClassicGamesApi.universesInfo({ universeIds: [ 1685831367 ] })
 * @exampleData {"1685831367":{"rootPlaceId":4922741943,"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","sourceName":"RoCamping","sourceDescription":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","creator":{"id":5850082,"name":"MightyPart Games","type":"Group","isRNVAccount":false,"hasVerifiedBadge":false},"price":null,"allowedGearGenres":["Adventure"],"allowedGearCategories":[],"isGenreEnforced":true,"copyingAllowed":false,"playing":0,"visits":2718,"maxPlayers":4,"created":"2020-04-20T15:36:20.927Z","updated":"2024-05-23T20:51:29.867Z","studioAccessToApisAllowed":false,"createVipServersAllowed":false,"universeAvatarType":"MorphToR15","genre":"Adventure","isAllGenre":false,"isFavoritedByUser":true,"favoritedCount":97}} 
 * @exampleRawBody {"data":[{"id":1685831367,"rootPlaceId":4922741943,"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","sourceName":"RoCamping","sourceDescription":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","creator":{"id":5850082,"name":"MightyPart Games","type":"Group","isRNVAccount":false,"hasVerifiedBadge":false},"price":null,"allowedGearGenres":["Adventure"],"allowedGearCategories":[],"isGenreEnforced":true,"copyingAllowed":false,"playing":0,"visits":2718,"maxPlayers":4,"created":"2020-04-20T15:36:20.927Z","updated":"2024-05-23T20:51:29.867Z","studioAccessToApisAllowed":false,"createVipServersAllowed":false,"universeAvatarType":"MorphToR15","genre":"Adventure","isAllGenre":false,"isFavoritedByUser":true,"favoritedCount":97}]}
 */ 
export const universesInfo = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawGamesInfoData<UniverseId>, FormattedGamesInfoData<UniverseId>> => ({
  method: "GET",
  path: `/v1/games`,
  searchParams: { universeIds },
  name: "universesInfo",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, ...gameInfo }) => {
    gameInfo.created = new Date(gameInfo.created) as any
    gameInfo.updated = new Date(gameInfo.updated) as any
    return gameInfo
  })
}))

/**
 * Gets product information for multiple games.
 * @endpoint GET /v1/games/games-product-info
 * 
 * @param universeIds The IDs of the games to get product information for.
 * 
 * @example const { data:products } = await ClassicGamesApi.universesProductInfo({ universeIds: [ 1685831367 ] })
 * @exampleData {"1685831367":{"isForSale":false,"productId":0,"price":null,"sellerId":1536374574}} 
 * @exampleRawBody  {"data":[{"universeId":1685831367,"isForSale":false,"productId":0,"price":null,"sellerId":1536374574}]}
 */
export const universesProductInfo = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawGamesProductInfo<UniverseId>, FormattedGamesProductInfo<UniverseId>> => ({
  method: "GET",
  path: `/v1/games/games-product-info`,
  searchParams: { universeIds },
  name: `universesProductInfo`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "universeId", ({ universeId, ...rest }) => rest)
}))


/**
 * Gets games that should be spotlighted by the authenticated user.
 * @endpoint GET /v1/games/list-spotlight
 * 
 * @example const { data:spotlightedGames } = await ClassicGamesApi.authedUserSpotlightedGames()
 * @exampleData [{"spotlightType":"RecommendedForYou","spotlightActionText":"Recommended For You","spotlightTypeData":null,"gameInfo":{"creatorId":61596111,"creatorName":"LoremIpsum","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":1128381,"totalDownVotes":102161,"universeId":1116885111,"name":"Simulator Simulator","placeId":1924121221,"playerCount":161616,"imageToken":"T_4921112121_61da","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""}}] 
 * @exampleRawBody [{"spotlightType":"RecommendedForYou","spotlightActionText":"Recommended For You","spotlightTypeData":null,"gameInfo":{"creatorId":61596111,"creatorName":"LoremIpsum","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":1128381,"totalDownVotes":102161,"universeId":1116885111,"name":"Simulator Simulator","placeId":1924121221,"playerCount":161616,"imageToken":"T_4921112121_61da","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""}}] 
 */
export const authedUserSpotlightedGames = createApiMethod(async (
): ApiMethod<RawAuthedUserSpotlightedGamesData, FormattedAuthedUserSpotlightedGamesData> => ({
  method: "GET",
  path: `/v1/games/list-spotlight`,
  name: `authedUserSpotlightedGames`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets information for multiple places.
 * @endpoint GET /v1/games/multiget-place-details
 * 
 * @param placeIds The IDs of the places to get information for.
 * 
 * @example const { data:places } = await ClassicGamesApi.placesInfo({ placeIds: [ 4922741943 ] })
 * @exampleData {"4922741943":{"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","sourceName":"RoCamping","sourceDescription":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0","url":"https://www.roblox.com/games/4922741943/RoCamping","builder":"MightyPart Games","builderId":5850082,"hasVerifiedBadge":false,"isPlayable":true,"reasonProhibited":"None","universeId":1685831367,"universeRootPlaceId":4922741943,"price":0,"imageToken":"T_4922741943_678b"}}
 * @exampleRawBody [{"placeId":4922741943,"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","sourceName":"RoCamping","sourceDescription":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0","url":"https://www.roblox.com/games/4922741943/RoCamping","builder":"MightyPart Games","builderId":5850082,"hasVerifiedBadge":false,"isPlayable":true,"reasonProhibited":"None","universeId":1685831367,"universeRootPlaceId":4922741943,"price":0,"imageToken":"T_4922741943_678b"}]
 */
export const placesInfo = createApiMethod(async <PlaceId extends Identifier>(
  { placeIds }: { placeIds: ArrayNonEmptyIfConst<PlaceId> }
): ApiMethod<RawPlacesInfoData<PlaceId>, FormattedPlacesInfoData<PlaceId>> => ({
  method: "GET",
  path: `/v1/games/multiget-place-details`,
  searchParams: { placeIds },
  name: `placesInfo`,

  formatRawDataFn: rawData => createObjectMapByKeyWithMiddleware(rawData, "placeId", ({ placeId, ...rest }) => rest)
}))


/**
 * Gets universes playability statuses for the authenticated user.
 * @endpoint GET /v1/games/multiget-playability-status
 * 
 * @param universeIds The IDs of the universes to get playability statuses for.
 * 
 * @example const { data:playabilityStatuses } = await ClassicGamesApi.authedUserGamesPlayabilityStatuses({ universeIds: [ 1685831367 ] })
 * @exampleData {"1685831367":{"playabilityStatus":"Playable","isPlayable":true}} 
 * @exampleRawBody [{"playabilityStatus":"Playable","isPlayable":true,"universeId":1685831367}]
 */
export const authedUserGamesPlayabilityStatuses = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawAuthedUserGamesPlayabilityStatusesData<UniverseId>, FormattedUserGamesPlayabilityStatusesData<UniverseId>> => ({
  method: "GET",
  path: `/v1/games/multiget-playability-status`,
  searchParams: { universeIds },
  name: `authedUserGamesPlayabilityStatuses`,

  formatRawDataFn: rawData => createObjectMapByKeyWithMiddleware(rawData, "universeId", ({ universeId, ...rest }) => rest)
}))


/**
 * Get game recommendations based on a particular universe.
 * @endpoint GET /v1/games/recommendations/game/{universeId}
 * 
 * @param universeId The ID of the universe to get recommendations for.
 * @param truncatedResults Return truncated results.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:recommendations } = await ClassicGamesApi.recommendationsFromUniverse({ universeId: 1685831367 })
 * @exampleData [{"creatorId":61648063,"creatorName":"ItsMuneeeb","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":1257869,"totalDownVotes":116797,"universeId":2711375305,"name":"Catalog Avatar Creator","placeId":7041939546,"playerCount":25621,"imageToken":"T_7041939546_4ca1","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":15022320,"creatorName":"Telanthric Development","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":1048903,"totalDownVotes":143468,"universeId":4778845442,"name":"[🔥ABYSMAL MODE] Toilet Tower Defense","placeId":13775256536,"playerCount":43710,"imageToken":"T_13775256536_16f1","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":12836673,"creatorName":"Wiggity.","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":6142327,"totalDownVotes":419260,"universeId":4777817887,"name":"[TRADE] Blade Ball","placeId":13772394625,"playerCount":51902,"imageToken":"T_13772394625_9ccc","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":60596019,"creatorName":"Wolfpaq","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":5829113,"totalDownVotes":902982,"universeId":1686885941,"name":"Brookhaven 🏡RP","placeId":4924922222,"playerCount":415192,"imageToken":"T_4924922222_6555","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":3959677,"creatorName":"BIG Games Pets","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":2426474,"totalDownVotes":92767,"universeId":3317771874,"name":"Pet Simulator 99! 🎲 RNG","placeId":8737899170,"playerCount":229718,"imageToken":"T_8737899170_539c","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":12013007,"creatorName":"Yielding Arts","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":2469880,"totalDownVotes":470017,"universeId":3808081382,"name":"[BOSS] The Strongest Battlegrounds","placeId":10449761463,"playerCount":172610,"imageToken":"T_10449761463_f88a","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""}] 
 * @exampleRawBody {"games":[{"creatorId":61648063,"creatorName":"ItsMuneeeb","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":1257869,"totalDownVotes":116797,"universeId":2711375305,"name":"Catalog Avatar Creator","placeId":7041939546,"playerCount":25621,"imageToken":"T_7041939546_4ca1","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":15022320,"creatorName":"Telanthric Development","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":1048903,"totalDownVotes":143468,"universeId":4778845442,"name":"[🔥ABYSMAL MODE] Toilet Tower Defense","placeId":13775256536,"playerCount":43710,"imageToken":"T_13775256536_16f1","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":12836673,"creatorName":"Wiggity.","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":6142327,"totalDownVotes":419260,"universeId":4777817887,"name":"[TRADE] Blade Ball","placeId":13772394625,"playerCount":51902,"imageToken":"T_13772394625_9ccc","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":60596019,"creatorName":"Wolfpaq","creatorType":"User","creatorHasVerifiedBadge":true,"totalUpVotes":5829113,"totalDownVotes":902982,"universeId":1686885941,"name":"Brookhaven 🏡RP","placeId":4924922222,"playerCount":415192,"imageToken":"T_4924922222_6555","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":3959677,"creatorName":"BIG Games Pets","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":2426474,"totalDownVotes":92767,"universeId":3317771874,"name":"Pet Simulator 99! 🎲 RNG","placeId":8737899170,"playerCount":229718,"imageToken":"T_8737899170_539c","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""},{"creatorId":12013007,"creatorName":"Yielding Arts","creatorType":"Group","creatorHasVerifiedBadge":true,"totalUpVotes":2469880,"totalDownVotes":470017,"universeId":3808081382,"name":"[BOSS] The Strongest Battlegrounds","placeId":10449761463,"playerCount":172610,"imageToken":"T_10449761463_f88a","isSponsored":false,"nativeAdData":"","isShowSponsoredLabel":false,"price":null,"analyticsIdentifier":null,"gameDescription":"","genre":"","minimumAge":0,"ageRecommendationDisplayName":""}],"nextPaginationKey":"startRowIndex_20,version_"}
 */
export const recommendationsFromUniverse = createApiMethod(async (
  { universeId, truncatedResults, limit, cursor }: { universeId: Identifier, truncatedResults?: boolean, limit?: number, cursor?: string }
): ApiMethod<RawRecommendationsForUniversesData, FormattedRecommendationsForUniversesData> => ({
  method: "GET",
  path: `/v1/games/recommendations/game/${universeId}`,
  searchParams: { IsTruncatedResultsEnabled: truncatedResults, MaxRows: limit, PaginationKey: cursor },
  name: `recommendationsFromUniverse`,

  formatRawDataFn: ({ games }) => games,

  getCursorsFn: ({ nextPaginationKey }) => [ null, nextPaginationKey ]
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Game Instances ] ////////////////////////////////////////////////////////////
/**
 * Gets a list of private server for a particular universe that the authenticated user can access.
 * @endpoint GET /v1/games/{placeId}/private-servers
 * 
 * @param placeId The ID of the place to get private servers for.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:privateServers } = await ClassicGamesApi.authedUserPrivateServersForPlace({ placeId: 26838733 })
 * @exampleData [{"maxPlayers":10,"playerTokens":[],"players":[],"name":"TAG GANG","vipServerId":10262938,"owner":{"hasVerifiedBadge":false,"id":45348281,"name":"MightyPart","displayName":"Mighty"}}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"maxPlayers":10,"playerTokens":[],"players":[],"name":"TAG GANG","vipServerId":10262938,"owner":{"hasVerifiedBadge":false,"id":45348281,"name":"MightyPart","displayName":"Mighty"}}]}
 */
export const authedUserPrivateServersForPlace = createApiMethod(async (
  { placeId, limit, sortOrder, cursor }: { placeId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawAuthedUserPrivateServersForPlace, FormattedAuthedUserPrivateServersForPlace> => ({
  method: "GET",
  path: `/v1/games/${placeId}/private-servers`,
  searchParams: { limit, sortOrder, cursor },
  name: `authedUserPrivateServersForPlace`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets the server list for a place.
 * @endpoint GET /v1/games/{placeId}/servers/{serverType}
 * 
 * @param placeId The ID of the place to get private servers for.
 * @param serverType The type of servers to return.
 * @param excludeFullGames If full games should be omitted from the response.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:servers } = await ClassicGamesApi.placeServerList({ placeId: 26838733, serverType: "Public" })
 * @exampleData [{"id":"1cf0594e-196a-469d-a9f8-ac0c7a1a0c89","maxPlayers":10,"playing":6,"playerTokens":["7532A11338571C5B914711CECB920A9C","576940A121EC4A28EDF1A984FB4D40BA","4AC528DB8689F636EE495A31219B4156","DC41B4724EC46B0D561458B378C52A25","FB9F483ACD1B0C22A916F12F2B8C5EE5"],"players":[],"fps":59.942818,"ping":82},{"id":"3a492d51-1b28-4f5b-92f5-ea7f8eb81a05","maxPlayers":10,"playing":4,"playerTokens":["4FA1CB5B5D01574AB7E1A1AEFA683894","DE71FC497ACEA320A57B2E168AF851ED","0B9CB48166467EE29E89564A7A9CCB68","13FCCCF441B16EFF86C938D8440FB9F0"],"players":[],"fps":59.995846,"ping":216},{"id":"3333da7e-8a94-464a-b749-9162404c3f71","maxPlayers":10,"playing":3,"playerTokens":["D98666B566AD7834D20A02A7C4554E22","EB2D522809D8F87E41778ABEF349F305","97A0BA814C637D44F2A3E1A8AD190837"],"players":[],"fps":59.955658,"ping":138}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":"1cf0594e-196a-469d-a9f8-ac0c7a1a0c89","maxPlayers":10,"playing":6,"playerTokens":["7532A11338571C5B914711CECB920A9C","576940A121EC4A28EDF1A984FB4D40BA","4AC528DB8689F636EE495A31219B4156","DC41B4724EC46B0D561458B378C52A25","FB9F483ACD1B0C22A916F12F2B8C5EE5"],"players":[],"fps":59.942818,"ping":82},{"id":"3a492d51-1b28-4f5b-92f5-ea7f8eb81a05","maxPlayers":10,"playing":4,"playerTokens":["4FA1CB5B5D01574AB7E1A1AEFA683894","DE71FC497ACEA320A57B2E168AF851ED","0B9CB48166467EE29E89564A7A9CCB68","13FCCCF441B16EFF86C938D8440FB9F0"],"players":[],"fps":59.995846,"ping":216},{"id":"3333da7e-8a94-464a-b749-9162404c3f71","maxPlayers":10,"playing":3,"playerTokens":["D98666B566AD7834D20A02A7C4554E22","EB2D522809D8F87E41778ABEF349F305","97A0BA814C637D44F2A3E1A8AD190837"],"players":[],"fps":59.955658,"ping":138}]}
 */
export const placeServerList = createApiMethod(async (
  { placeId, serverType, excludeFullGames, limit, sortOrder, cursor }:
  { placeId: Identifier, serverType: "Friends" | "Public", excludeFullGames?: boolean, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPlaceServerListData, FormattedPlaceServerListData> => ({
  method: "GET",
  path: `/v1/games/${placeId}/servers/${serverType == "Public" ? 0 : 1}`,
  searchParams: { excludeFullGames, limit, sortOrder, cursor },
  name: `placeServerList`,

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Favorites ] /////////////////////////////////////////////////////////////////
/**
 * Gets the favorited status between the authenticated user and a particular universe
 * @endpoint GET /v1/games/{universeId}/favorites
 * 
 * @param universeId The ID of the universe to get favorited status for.
 * 
 * @example const { data:favoritedStatus } = await ClassicGamesApi.authedUserUniverseIsFavorited({ universeId: 1685831367 })
 * @exampleData true
 * @exampleRawBody {"isFavorited":true}
 */
export const authedUserUniverseIsFavorited = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ isFavorited: boolean }, boolean> => ({
  method: "GET",
  path: `/v1/games/${universeId}/favorites`,
  name: `authedUserUniverseIsFavorited`,

  formatRawDataFn: ({ isFavorited }) => isFavorited
}))


/**
 * Sets the favorited status for a particular universe for the authenticated user.
 * @endpoint POST /v1/games/{universeId}/favorites
 * 
 * @param universeId The ID of the universe to set favorited status for.
 * @param status The new status for the favorite.
 * 
 * @example const { data:newStatus } = await ClassicGamesApi.authedUserUniverseSetFavorite({ universeId: 1685831367, status: true })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserUniverseSetFavorite = createApiMethod(async (
  { universeId, status }: { universeId: Identifier, status: boolean }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/games/${universeId}/favorites`,
  name: `authedUserUniverseToggleFavorite`,
  body: { isFavorited: status },

  formatRawDataFn: dataIsSuccess
}))


/**
 * Gets favorites count for a particular universe.
 * @endpoint GET /v1/games/{universeId}/favorites/count
 * 
 * @param universeId The ID of the universe to get favorites count for.
 * 
 * @example const { data:favoritesCount } = await ClassicGamesApi.universeFavoritesCount({ universeId: 1685831367 })
 * @exampleData 0
 * @exampleRawBody {"favoritesCount":0}
 */
export const universeFavoritesCount = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ favoritesCount: number }, number> => ({
  method: "GET",
  path: `/v1/games/${universeId}/favorites/count`,
  name: `universeFavoritesCount`,

  formatRawDataFn: ({ favoritesCount }) => favoritesCount
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Game Passes ] ///////////////////////////////////////////////////////////////
/**
 * Gets game passes for a particular universe.
 * @endpoint GET /v1/games/{universeId}/game-passes
 * 
 * @param universeId The ID of the universe to get game passes for.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:gamePasses } = await ClassicGamesApi.universeGamePasses({ universeId: 1685831367 })
 * @exampleData [{"id":9063647,"name":"Campers Club","displayName":"Campers Club","productId":975542678,"price":350,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":9260419,"name":"Support Us","displayName":"Support Us","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":false},{"id":9260480,"name":"Donate","displayName":"Donate","productId":979386303,"price":15,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":9820606,"name":"Starterpack","displayName":"Starterpack","productId":995094227,"price":100,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":11546631,"name":"Donate Plusss","displayName":"Donate Plusss","productId":1084063256,"price":250,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":false},{"id":880904271,"name":"Name!!!","displayName":"Name!!!","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880843288,"name":"Name!!!1","displayName":"Name!!!1","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880933261,"name":"name!","displayName":"name!","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880882288,"name":"My Pass","displayName":"My Pass","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880670566,"name":"My Pass","displayName":"My Pass","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true}] 
 * @exampleRawBody {"previousPageCursor":"id_2zwAAAXGZdoHHzgCKTN8","nextPageCursor":null,"data":[{"id":9063647,"name":"Campers Club","displayName":"Campers Club","productId":975542678,"price":350,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":9260419,"name":"Support Us","displayName":"Support Us","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":false},{"id":9260480,"name":"Donate","displayName":"Donate","productId":979386303,"price":15,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":9820606,"name":"Starterpack","displayName":"Starterpack","productId":995094227,"price":100,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":true},{"id":11546631,"name":"Donate Plusss","displayName":"Donate Plusss","productId":1084063256,"price":250,"sellerName":"MightyPart Games","sellerId":1536374574,"isOwned":false},{"id":880904271,"name":"Name!!!","displayName":"Name!!!","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880843288,"name":"Name!!!1","displayName":"Name!!!1","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880933261,"name":"name!","displayName":"name!","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880882288,"name":"My Pass","displayName":"My Pass","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true},{"id":880670566,"name":"My Pass","displayName":"My Pass","productId":null,"price":null,"sellerName":"MightyPart Games","sellerId":null,"isOwned":true}]}
 */
export const universeGamePasses = createApiMethod(async (
  { universeId, limit = 100, sortOrder, cursor }: { universeId: Identifier, limit?: number, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUniverseGamePassesData, FormattedUniverseGamePassesData> => ({
  method: "GET",
  path: `/v1/games/${universeId}/game-passes`,
  searchParams: { limit, sortOrder, cursor },
  name: `universeGamePasses`,

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Votes ] /////////////////////////////////////////////////////////////////////
/**
 * Gets the authenticated users vote status for a particular universe.
 * @endpoint GET /v1/games/{universeId}/votes/user
 * 
 * @param universeId The ID of the universe to get vote status for.
 * 
 * @example const { data:voteStatus } = await ClassicGamesApi.authedUserUniverseVoteStatus({ universeId: 1685831367 })
 * @exampleData {"canVote":false,"userVote":true,"reasonForNotVoteable":"PlayGame"}
 * @exampleRawBody {"canVote":false,"userVote":true,"reasonForNotVoteable":"PlayGame"}
 */
export const authedUserUniverseVoteStatus = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ canVote: boolean, userVote: boolean, reasonForNotVoteable: "PlayGame" | "" }> => ({
  method: "GET",
  path: `/v1/games/${universeId}/votes/user`,
  name: `authedUserUniverseVoteStatus`,
}))

/**
 * Gets a list of vote statuses for multiple universes.
 * @endpoint GET /v1/games/votes
 * 
 * @param universeIds The IDs of the universes to get vote statuses for. Cannot exceed a maximum of 100 IDs.
 * 
 * @example const { data:voteStatuses } = await ClassicGamesApi.universesVoteStatus({ universeIds: [ 1685831367 ] })
 * @exampleData {"1685831367":{"upVotes":78,"downVotes":14}}
 * @exampleRawBody "data":[{"id":1685831367,"upVotes":78,"downVotes":14}]}
 */
export const universesVoteStatus = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawUniversesVoteStatusData<UniverseId>, FormattedniversesVoteStatusData<UniverseId>> => ({
  method: "GET",
  path: `/v1/games/votes`,
  searchParams: { universeIds },
  name: `universesVoteStatus`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, ...rest }) => rest)
}))


/**
 * Sets the upvote status for a particular universe for the authenticated user. 
 * @endpoint PATCH /v1/games/${universeId}/user-votes
 * 
 * @param universeId The ID of the universe to upvote.
 * @param upvote If the universe is to be upvoted.
 * 
 * @example const { data:success } = await ClassicGamesApi.authedUserSetUniverseUpvote({ universeId: 1685831367, upvote: true })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserSetUniverseUpvote = createApiMethod(async (
  { universeId, upvote }: { universeId: Identifier, upvote: boolean }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/games/${universeId}/user-votes`,
  body: { vote: upvote },
  name: `authedUserSetUniverseUpvote`,

  formatRawDataFn: dataIsSuccess
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Vip Servers ] ///////////////////////////////////////////////////////////////
/**
 * Gets information about particular private servers.
 * @endpoint GET /v1/private-servers
 * 
 * @param privateServerIds The IDs of the private servers to get info for.
 * 
 * @example const { data:vipServersAllowed } = await ClassicGamesApi.vipServersAllowedForUniverse({ universeId: 1685831367 })
 * @exampleData true
 * @exampleRawBody {"privateServersEnabled": true}
 */
export const vipServersAllowedForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ privateServersEnabled: boolean }, boolean> => ({
  method: "GET",
  path: `/v1/private-servers/enabled-in-universe/${universeId}`,
  name: `vipServersAllowedForUniverse`,

  formatRawDataFn: ({ privateServersEnabled }) => privateServersEnabled
}))


/**
 * Sees if a particular user can be invited to a vip server by the authenticated user.
 * @endpoint GET /v1/vip-server/can-invite/{userId}
 * 
 * @param userId The ID of the user to see if they are allowed to recieve an invite to a vip server.
 * 
 * @example const { data:canInviteData } = await ClassicGamesApi.authedUserCanUserBeInvitedToVipServer({ userId: 12345 })
 * @exampleData {"canInvite":false,"doesOwnerPrivacyRestrictJoins":false,"inviteResponseType":4}
 * @exampleRawBody {"canInvite":false,"doesOwnerPrivacyRestrictJoins":false,"inviteResponseType":4}
 */
export const authedUserCanUserBeInvitedToVipServer = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ canInvite: boolean, doesOwnerPrivacyRestrictJoins: boolean, inviteResponseType: number }> => ({
  method: "GET",
  path: `/v1/vip-server/can-invite/${userId}`,
  name: `authedUserCanUserBeInvitedToVipServer`,
}))


/**
 * Gets information about a particular vip server.
 * @endpoint GET /v1/vip-servers/{vipServerId}
 * 
 * @param vipServerId The ID of the vip server to get info for.
 * 
 * @example const { data:serverInfo } = await ClassicGamesApi.vipServerInfo({ vipServerId: 1630945839 })
 * @exampleData {"id":1630945839,"name":"Testing","game":{"id":6430220996,"name":"Get Id","rootPlace":{"id":18980972074,"name":"Get Id"}},"joinCode":"70420354791950165689950670608627","active":true,"subscription":{"active":false,"expired":false,"expirationDate":"2024-09-17T15:49:02.8879762Z","price":null,"canRenew":false,"hasInsufficientFunds":false,"hasRecurringProfile":true,"hasPriceChanged":true},"permissions":{"clanAllowed":false,"enemyClanId":null,"friendsAllowed":false,"users":[]},"voiceSettings":{"enabled":false},"link":"https://www.roblox.com/games/18980972074?privateServerLinkCode=70420354791950165689950670608627"} 
 * @exampleRawBody {"id":1630945839,"name":"Testing","game":{"id":6430220996,"name":"Get Id","rootPlace":{"id":18980972074,"name":"Get Id"}},"joinCode":"70420354791950165689950670608627","active":true,"subscription":{"active":false,"expired":false,"expirationDate":"2024-09-17T15:49:02.8879762Z","price":null,"canRenew":false,"hasInsufficientFunds":false,"hasRecurringProfile":true,"hasPriceChanged":true},"permissions":{"clanAllowed":false,"enemyClanId":null,"friendsAllowed":false,"users":[]},"voiceSettings":{"enabled":false},"link":"https://www.roblox.com/games/18980972074?privateServerLinkCode=70420354791950165689950670608627"}
 */
export const vipServerInfo = createApiMethod(async <VipServerId extends Identifier>(
  { vipServerId }: { vipServerId: VipServerId }
): ApiMethod<VipServerInfoData<VipServerId>> => ({
  method: "GET",
  path: `/v1/vip-servers/${vipServerId}`,
  name: `vipServerInfo`,
}))


/**
 * Updates a vip server.
 * @endpoint PATCH /v1/vip-servers/{vipServerId}
 * 
 * @param vipServerId The ID of the vip server to update.
 * @param name The new name for the vip server.
 * @param newJoinCode If the join code should be regenerated.
 * @param active If the vip server should be active.
 * 
 * @example const { data:serverInfo } = await ClassicGamesApi.updateVipServer({ vipServerId: 1630945839, name: "New Name" })
 * @exampleData {"id":1630945839,"name":"New Name","game":{"id":6430220996,"name":"Get Id","rootPlace":{"id":18980972074,"name":"Get Id"}},"joinCode":"70420354791950165689950670608627","active":true,"subscription":{"active":false,"expired":false,"expirationDate":"2024-09-17T15:49:02.8879762Z","price":null,"canRenew":false,"hasInsufficientFunds":false,"hasRecurringProfile":true,"hasPriceChanged":true},"permissions":{"clanAllowed":false,"enemyClanId":null,"friendsAllowed":false,"users":[]},"voiceSettings":{"enabled":false},"link":"https://www.roblox.com/games/18980972074?privateServerLinkCode=70420354791950165689950670608627"} 
 * @exampleRawBody {"id":1630945839,"name":"New Name","game":{"id":6430220996,"name":"Get Id","rootPlace":{"id":18980972074,"name":"Get Id"}},"joinCode":"70420354791950165689950670608627","active":true,"subscription":{"active":false,"expired":false,"expirationDate":"2024-09-17T15:49:02.8879762Z","price":null,"canRenew":false,"hasInsufficientFunds":false,"hasRecurringProfile":true,"hasPriceChanged":true},"permissions":{"clanAllowed":false,"enemyClanId":null,"friendsAllowed":false,"users":[]},"voiceSettings":{"enabled":false},"link":"https://www.roblox.com/games/18980972074?privateServerLinkCode=70420354791950165689950670608627"} 
 */
export const updateVipServer = createApiMethod(async <
  VipServerId extends Identifier, Name extends string, Active extends boolean
>(
  { vipServerId, name, newJoinCode, active }:
  { vipServerId: VipServerId, name?: Name, newJoinCode?: boolean, active?: Active }
): ApiMethod<VipServerInfoData<VipServerId, Name, Active>> => ({
  method: "PATCH",
  path: `/v1/vip-servers/${vipServerId}`,
  body: { name, newJoinCode, active },
  name: `updateVipServer`,
}))


/**
 * Updates voice settings for a vip server.
 * @endpoint PATCH /v1/vip-servers/{vipServerId}/voicesettings
 * 
 * @param vipServerId The ID of the vip server to update voice settings for.
 * @param enabled If voice settings should be enabled.
 * 
 * @example const { data:serverInfo } = await ClassicGamesApi.updateVipServerVoiceSettings({ vipServerId: 1630945839, enabled: true })
 * @exampleData { "enabled": true }
 * @exampleRawBody { "enabled": true }
 */
export const updateVipServerVoiceSettings = createApiMethod(async <Enabled extends boolean>(
  { vipServerId, enabled }: { vipServerId: Identifier, enabled: boolean }
): ApiMethod<{ enabled: Enabled }> => ({
  method: "PATCH",
  path: `/v1/vip-servers/${vipServerId}/voicesettings`,
  body: { enabled },
  name: `updateVipServerVoiceSettings`,
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Games V2 ] //////////////////////////////////////////////////////////////////
/**
 * Gets media for a particular universe.
 * @endpoint GET /v2/games/{universeId}/media
 * 
 * @param universeId The ID of the universe to get media for.
 * 
 * @example const { data:media } = await ClassicGamesApi.universeMedia({ universeId: 1685831367 })
 * @exampleData [{"assetTypeId":1,"assetType":"Image","imageId":5130624799,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5030792576,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5030792559,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5055393500,"videoHash":null,"videoTitle":null,"approved":true,"altText":null}] 
 * @exampleRawBody {"data":[{"assetTypeId":1,"assetType":"Image","imageId":5130624799,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5030792576,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5030792559,"videoHash":null,"videoTitle":null,"approved":true,"altText":null},{"assetTypeId":1,"assetType":"Image","imageId":5055393500,"videoHash":null,"videoTitle":null,"approved":true,"altText":null}]}
 */
export const universeMedia = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<RawUniverseMediaData, FormattedUniverseMediaData> => ({
  method: "GET",
  path: `/v2/games/${universeId}/media`,
  name: `universeMedia`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets games made by a particular group.
 * @endpoint GET /v2/groups/{groupId}/games
 * 
 * @param groupId The ID of the group to get games for.
 * @param accessFilter Filters the returned games by an access filter.
 * @param limit The number of results per request.
 * @param sortOrder The order the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:games } = await ClassicGamesApi.groupGames({ groupId: 5850082 })
 * @exampleData [{"id":2721703342,"name":"RoCamping 2","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":7061026197,"type":"Place"},"created":"2021-07-07T18:50:52.77Z","updated":"2021-10-09T15:01:02.147Z","placeVisits":189},{"id":2148864919,"name":"Nomadic","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5967892302,"type":"Place"},"created":"2020-11-17T18:17:58.37Z","updated":"2020-11-17T18:18:01.38Z","placeVisits":0},{"id":1864457335,"name":"RoCamping but it's 100 players","description":"NOTE: This is a meme game, we don't really update this game\r\n\r\nALSO NOTE: I sure it'll be chaotic if you play in a full server.\r\n\r\nRoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5323662969,"type":"Place"},"created":"2020-07-10T14:59:42.607Z","updated":"2020-07-11T01:02:53.91Z","placeVisits":1},{"id":1840468091,"name":"RO-FACTOR","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5255036322,"type":"Place"},"created":"2020-06-29T16:57:48.19Z","updated":"2021-10-09T15:00:45.08Z","placeVisits":109},{"id":1685831367,"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":4922741943,"type":"Place"},"created":"2020-04-20T20:36:21.117Z","updated":"2022-05-27T16:36:40.1Z","placeVisits":2721},{"id":1651554338,"name":"Ninjas Unleashed: Legion","description":"No secret projects here\r\nScriptor/Game Designer - NamelessGuy2005\r\nBuilder/Animator - Flaroh\r\n","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":4857762148,"type":"Place"},"created":"2020-04-04T13:17:08.12Z","updated":"2020-04-20T15:37:55.803Z","placeVisits":16}] 
 * @exampleRawBody {"previousPageCursor":"0_2_f7e8a87d65742375fdea66bbd6c77728","nextPageCursor":null,"data":[{"id":2721703342,"name":"RoCamping 2","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":7061026197,"type":"Place"},"created":"2021-07-07T18:50:52.77Z","updated":"2021-10-09T15:01:02.147Z","placeVisits":189},{"id":2148864919,"name":"Nomadic","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5967892302,"type":"Place"},"created":"2020-11-17T18:17:58.37Z","updated":"2020-11-17T18:18:01.38Z","placeVisits":0},{"id":1864457335,"name":"RoCamping but it's 100 players","description":"NOTE: This is a meme game, we don't really update this game\r\n\r\nALSO NOTE: I sure it'll be chaotic if you play in a full server.\r\n\r\nRoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5323662969,"type":"Place"},"created":"2020-07-10T14:59:42.607Z","updated":"2020-07-11T01:02:53.91Z","placeVisits":1},{"id":1840468091,"name":"RO-FACTOR","description":null,"creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":5255036322,"type":"Place"},"created":"2020-06-29T16:57:48.19Z","updated":"2021-10-09T15:00:45.08Z","placeVisits":109},{"id":1685831367,"name":"RoCamping","description":"RoCamping is a fun adventure game where the end-goal is to create the best camp ever. Gather resources, chop down trees, go down caves and much more! Start your journey today!\r\n\r\nNOTE: RoCamping is still in BETA so expect there to be glitches, if you find a glitch then don't hesitate to join our group and report it there.\r\n\r\nCurrent Version: BETA v3,0\r\n\r\nalvinblox","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":4922741943,"type":"Place"},"created":"2020-04-20T20:36:21.117Z","updated":"2022-05-27T16:36:40.1Z","placeVisits":2721},{"id":1651554338,"name":"Ninjas Unleashed: Legion","description":"No secret projects here\r\nScriptor/Game Designer - NamelessGuy2005\r\nBuilder/Animator - Flaroh\r\n","creator":{"id":5850082,"type":"Group"},"rootPlace":{"id":4857762148,"type":"Place"},"created":"2020-04-04T13:17:08.12Z","updated":"2020-04-20T15:37:55.803Z","placeVisits":16}]}
 */
export const groupGames = createApiMethod(async <GroupId extends Identifier>(
  { groupId , accessFilter, limit, sortOrder, cursor }:
  { groupId: GroupId, accessFilter?: 1 | 2 | 4, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupGamesData<GroupId>, FormattedGroupGamesData<GroupId>> => ({
  method: "GET",
  path: `/v2/groups/${groupId}/games`,
  searchParams: { accessFilter, limit, sortOrder, cursor },
  name: `groupGames`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets a list of games made by a specific user.
 * @endpoint GET /v2/users/{userId}/games
 * 
 * @param userId The id of the user to get games for.
 * @param limit The maximum amount of games to return.
 * @param sortOrder The order the results are sorted it.
 * @param cursor the paging cursor for the previous or next page.
 * 
 * @example const { data:games } = await ClassicGamesApi.userGames({ userId: 45348281 })
 * @exampleData [{"id":6430220996,"name":"Get Id","description":"","creator":{"id":45348281,"type":"User"},"rootPlace":{"id":18980972074,"type":"Place"},"created":"2024-08-17T12:47:01.458Z","updated":"2024-08-17T12:48:42.181Z","placeVisits":0},{"id":6041794959,"name":"Octree Terrain","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":17642363611,"type":"Place"},"created":"2024-05-28T03:10:40.847Z","updated":"2024-08-14T09:24:03.800Z","placeVisits":0},{"id":5638577595,"name":"New name!","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":16349154726,"type":"Place"},"created":"2024-02-13T02:39:58.590Z","updated":"2024-07-17T23:48:51.577Z","placeVisits":7},{"id":5587129688,"name":"InventorySystem","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":16175332793,"type":"Place"},"created":"2024-01-30T14:49:01.037Z","updated":"2024-01-30T14:58:18.877Z","placeVisits":0},{"id":5529979812,"name":"ChunkLoader","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15995287896,"type":"Place"},"created":"2024-01-15T16:42:51.047Z","updated":"2024-01-16T17:27:36.540Z","placeVisits":0},{"id":5411380627,"name":"Tiny Glade Recreation","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15666536580,"type":"Place"},"created":"2023-12-17T19:16:33.380Z","updated":"2023-12-19T19:00:58.817Z","placeVisits":6},{"id":5243131845,"name":"Test Game","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15208361152,"type":"Place"},"created":"2023-10-29T16:03:43.603Z","updated":"2023-10-29T16:04:15.920Z","placeVisits":0},{"id":5097539509,"name":"DatastoreTest1","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":14790444893,"type":"Place"},"created":"2023-09-16T10:55:13.767Z","updated":"2023-09-19T09:51:54.117Z","placeVisits":0},{"id":5076006380,"name":"DynamicTerrain","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":14724555168,"type":"Place"},"created":"2023-09-09T06:54:43.173Z","updated":"2023-09-20T19:28:02.660Z","placeVisits":0},{"id":4621449053,"name":"TerrainGen15","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":13257759048,"type":"Place"},"created":"2023-04-26T12:48:16.137Z","updated":"2023-05-20T21:33:10.770Z","placeVisits":0}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"10_1_7a425d1039a04d17a68f267f83ee3d41","data":[{"id":6430220996,"name":"Get Id","description":"","creator":{"id":45348281,"type":"User"},"rootPlace":{"id":18980972074,"type":"Place"},"created":"2024-08-17T12:47:01.4582503Z","updated":"2024-08-17T12:48:42.1812674Z","placeVisits":0},{"id":6041794959,"name":"Octree Terrain","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":17642363611,"type":"Place"},"created":"2024-05-28T03:10:40.847Z","updated":"2024-08-14T09:24:03.8Z","placeVisits":0},{"id":5638577595,"name":"New name!","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":16349154726,"type":"Place"},"created":"2024-02-13T02:39:58.59Z","updated":"2024-07-17T23:48:51.577Z","placeVisits":7},{"id":5587129688,"name":"InventorySystem","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":16175332793,"type":"Place"},"created":"2024-01-30T14:49:01.037Z","updated":"2024-01-30T14:58:18.877Z","placeVisits":0},{"id":5529979812,"name":"ChunkLoader","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15995287896,"type":"Place"},"created":"2024-01-15T16:42:51.047Z","updated":"2024-01-16T17:27:36.54Z","placeVisits":0},{"id":5411380627,"name":"Tiny Glade Recreation","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15666536580,"type":"Place"},"created":"2023-12-17T19:16:33.38Z","updated":"2023-12-19T19:00:58.817Z","placeVisits":6},{"id":5243131845,"name":"Test Game","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":15208361152,"type":"Place"},"created":"2023-10-29T16:03:43.603Z","updated":"2023-10-29T16:04:15.92Z","placeVisits":0},{"id":5097539509,"name":"DatastoreTest1","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":14790444893,"type":"Place"},"created":"2023-09-16T10:55:13.767Z","updated":"2023-09-19T09:51:54.117Z","placeVisits":0},{"id":5076006380,"name":"DynamicTerrain","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":14724555168,"type":"Place"},"created":"2023-09-09T06:54:43.173Z","updated":"2023-09-20T19:28:02.66Z","placeVisits":0},{"id":4621449053,"name":"TerrainGen15","description":null,"creator":{"id":45348281,"type":"User"},"rootPlace":{"id":13257759048,"type":"Place"},"created":"2023-04-26T12:48:16.137Z","updated":"2023-05-20T21:33:10.77Z","placeVisits":0}]}
 */
export const userGames = createApiMethod(async (
  { userId, limit, sortOrder, cursor }: { userId: Identifier, limit?: 10 | 25 | 50, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUserGamesData, PrettifiedUserGamesData> => ({
  path: `/v2/users/${userId}/games`,
  method: "GET",
  searchParams: { limit, sortOrder, cursor },
  name: "userGames",

  formatRawDataFn: ({ data }) => data.map(gameData => cloneAndMutateObject(gameData, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })),

  getCursorsFn: ({ previousPageCursor, nextPageCursor }) => [ previousPageCursor, nextPageCursor ]
}))
//////////////////////////////////////////////////////////////////////////////////