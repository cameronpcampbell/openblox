// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../apis.utils";
import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse } from "../../apis.types"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, mutateObject } from "../../../utils";
import { MakeKeyOptional, NonEmptyArray } from "../../../utils/utils.types";
import { FormattedAuthenticatedUserSpotlightedGamesData, FormattedGameMedia_v1Data, FormattedGamesInfoData, FormattedGamesProductInfoData, FormattedPlacesInfoData, GameInfo, RawAuthenticatedUserSpotlightedGamesData, RawGameMedia_v1Data, RawGamesInfoData, RawGamesProductInfoData, RawPlacesInfoData } from "./gamesApi.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://games.roblox.com"
const apiName = "ClassicGamesApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = [  ]


// [ GAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about multiple games
 * @endpoint GET /v1/games
 * 
 * @param universeIds A list of universe Ids. Cannot exceed a maximum of 100 IDs.
 * 
 * @example const { data:info } = await ClassicGamesApi.gamesInfo([ 1685831367 ])
 * @exampleData { "1685831367": { rootPlaceId: 4922741943, name: "RoCamping", description: "Lorem ipsum dolor sit amet.", sourceName: null, sourceDescription: null, creator: { id: 5850082, name: "MightyPart Games", type: "Group", isRNVAccount: false, hasVerifiedBadge: false }, price: null, allowedGearGenres: [ "Adventure" ], allowedGearCategories: [], isGenreEnforced: true, copyingAllowed: false, playing: 0, visits: 2712, maxPlayers: 4, created: 2020-04-20T15:36:20.927Z, updated: 2022-01-13T13:41:48.747Z, studioAccessToApisAllowed: false, createVipServersAllowed: false, universeAvatarType: "MorphToR15", genre: "Adventure", isAllGenre: false, isFavoritedByUser: false, favoritedCount: 99 } }
 * @exampleRawBody { data: [ { id: 1685831367, rootPlaceId: 4922741943, name: "RoCamping", description: "Lorem ipsum dolor sit amet.", sourceName: null, sourceDescription: null, creator: { id: 5850082, name: "MightyPart Games", type: "Group", isRNVAccount: false, hasVerifiedBadge: false }, price: null, allowedGearGenres: [ "Adventure" ], allowedGearCategories: [], isGenreEnforced: true, copyingAllowed: false, playing: 0, visits: 2712, maxPlayers: 4, created: "2020-04-20T15:36:20.927Z", updated: "2022-01-13T13:41:48.747Z", studioAccessToApisAllowed: false, createVipServersAllowed: false, universeAvatarType: "MorphToR15", genre: "Adventure", isAllGenre: false, isFavoritedByUser: false, favoritedCount: 99 } ] }
 */
export async function gamesInfo<UniverseId extends number>(
  this: ThisAllOverrides, universeIds: NonEmptyArray<UniverseId>
): ApiMethodResponse<RawGamesInfoData, FormattedGamesInfoData<UniverseId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawGamesInfoData>(
      `${baseUrl}/v1/games`, {
        searchParams: { universeIds },
        apiName, methodName: "gamesInfo", overrides
      }
    )

    const getFormattedData = (): FormattedGamesInfoData<UniverseId> => (
      createObjectMapByKeyWithMiddleware(rawBody.data, "id", (item: GameInfo<string>) => {
        delete (item as MakeKeyOptional<typeof item, "id">).id;
        (item as any as GameInfo<Date>).created = new Date(item.created);
        (item as any as GameInfo<Date>).updated = new Date(item.updated);
        return item
      })
    )

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Gets information about a specific games media.
 * @endpoint GET /v1/games/{universeId}/media
 * 
 * @param universeId The id of the universe to get media data from.
 * 
 * @example const { data:media } = await ClassicGamesApi.gameMedia_V1(1685831367)
 * @exampleData { data: [ { id: 17225376, assetTypeId: 1, assetType:  "Image", imageId: 5130624799, videoHash: null, videoTitle: null, approved: true, altText: null } ] }
 * @exampleRawBody [ { id: 17225376, assetTypeId: 1, assetType: "Image", imageId: 5130624799, videoHash: null, videoTitle: null, approved: true, altText: null } ]
 */
export async function gameMedia_v1(this: ThisAllOverrides, universeId: number): ApiMethodResponse<
  RawGameMedia_v1Data, FormattedGameMedia_v1Data
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawGameMedia_v1Data>(
      `${baseUrl}/v1/games/${universeId}/media`, {
        apiName, methodName: "gameMedia_v1", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cacheMetadata })
  })
}


/**
 * Gets product info (which is used to purchase a game) for multiple games.
 * @endpoint GET /v1/games/games-product-info
 * 
 * @param universeIds A list of universe Ids. Cannot exceed a maximum of 100 IDs.
 * 
 * @example const { data:productInfo } = await ClassicGamesApi.gamesProductInfo([ 1685831367 ])
 * @exampleData { "1685831367": { isForSale: false, productId: 0, price: null, sellerId: 1536374574 } }
 * @exampleRawBody { data: [ { universeId: 1685831367, isForSale: false, productId: 0, price: null, sellerId: 1536374574 } ] }
 */
export async function gamesProductInfo<UniverseId extends number>(
  this: ThisAllOverrides, universeIds: NonEmptyArray<UniverseId>
): ApiMethodResponse<
  RawGamesProductInfoData, FormattedGamesProductInfoData<UniverseId>
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawGamesProductInfoData>(
      `${baseUrl}/v1/games/games-product-info`, {
        searchParams: { universeIds },
        apiName, methodName: "gamesProductInfo", overrides
      }
    )

    const getFormattedData = (): FormattedGamesProductInfoData<UniverseId> => (
      createObjectMapByKeyWithMiddleware(rawBody.data, "universeId", (item) => {
        delete (item as MakeKeyOptional<typeof item, "universeId">).universeId
        return item
      })
    )

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Gets games that the client (authenticated user) should spotlight.
 * @endpoint GET /v1/games/list-spotlight
 * 
 * @example const { data:spotlighted } = await ClassicGamesApi.authenticatedUserSpotlightedGames()
 * @exampleData [ { spotlightType: "FriendsPlaying", spotlightActionText: "JohnDoe is visiting", spotlightTypeData: { users: [ 123456789 ], friendsAffinityScores: null }, gameInfo: { creatorId: 123456789, creatorName: "Lorem Ipsum", creatorType: "Group", creatorHasVerifiedBadge: false, totalUpVotes: 228065, totalDownVotes: 8384, universeId: 123456789, name: "Lorem Ipsum Simulator", placeId: 123456789, playerCount: 8091, imageToken: "T_12701714080_befd", isSponsored: false, nativeAdData: "", isShowSponsoredLabel: false, price: null, analyticsIdentifier: null, gameDescription: "lorem ipsum dolor sit amet", genre: "", minimumAge: 0, ageRecommendationDisplayName: "" } }, { spotlightType: "RecommendedForYou", spotlightActionText: "Recommended For You", spotlightTypeData: null, gameInfo: { creatorId: 123456789, creatorName: "Simulator Studios", creatorType: "Group", creatorHasVerifiedBadge: false, totalUpVotes: 5288567, totalDownVotes: 326071, universeId: 123456789, name: "Simulator Simulator", placeId: 123456789, playerCount: 579819, imageToken: "T_2753915549_12c8", isSponsored: false, nativeAdData: "", isShowSponsoredLabel: false, price: null, analyticsIdentifier: null, gameDescription: "", genre: "", minimumAge: 0, ageRecommendationDisplayName: "" } } ]
 * @exampleRawBody { data: [ { spotlightType: "FriendsPlaying", spotlightActionText: "JohnDoe is visiting", spotlightTypeData: { users: [ 123456789 ], friendsAffinityScores: null }, gameInfo: { creatorId: 123456789, creatorName: "Lorem Ipsum", creatorType: "Group", creatorHasVerifiedBadge: false, totalUpVotes: 228065, totalDownVotes: 8384, universeId: 123456789, name: "Lorem Ipsum Simulator", placeId: 123456789, playerCount: 8091, imageToken: "T_12701714080_befd", isSponsored: false, nativeAdData: "", isShowSponsoredLabel: false, price: null, analyticsIdentifier: null, gameDescription: "lorem ipsum dolor sit amet", genre: "", minimumAge: 0, ageRecommendationDisplayName: "" } }, { spotlightType: "RecommendedForYou", spotlightActionText: "Recommended For You", spotlightTypeData: null, gameInfo: { creatorId: 123456789, creatorName: "Simulator Studios", creatorType: "Group", creatorHasVerifiedBadge: false, totalUpVotes: 5288567, totalDownVotes: 326071, universeId: 123456789, name: "Simulator Simulator", placeId: 123456789, playerCount: 579819, imageToken: "T_2753915549_12c8", isSponsored: false, nativeAdData: "", isShowSponsoredLabel: false, price: null, analyticsIdentifier: null, gameDescription: "", genre: "", minimumAge: 0, ageRecommendationDisplayName: "" } } ] }
 */
export async function authenticatedUserSpotlightedGames(this: ThisAllOverrides): ApiMethodResponse<
  RawAuthenticatedUserSpotlightedGamesData, FormattedAuthenticatedUserSpotlightedGamesData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawAuthenticatedUserSpotlightedGamesData>(
      `${baseUrl}/v1/games/list-spotlight`, {
        apiName, methodName: "authenticatedUserSpotlightedGames", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cacheMetadata })
  })
}


/**
 * Gets games that the client (authenticated user) should spotlight.
 * @endpoint GET /v1/games/multiget-place-details
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export async function placesInfo<PlaceId extends number>(this: ThisAllOverrides, placeIds: PlaceId[]): ApiMethodResponse<
  RawPlacesInfoData<PlaceId>, FormattedPlacesInfoData<PlaceId>
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawPlacesInfoData<PlaceId>>(
      `${baseUrl}/v1/games/multiget-place-details`, {
        searchParams: { placeIds },
        apiName, methodName: "placesInfo", overrides
      }
    )

    const getFormattedData = () => createObjectMapByKeyWithMiddleware(
      rawBody, "placeId", obj => cloneAndMutateObject(obj, obj => delete obj.placeId)
    ) as FormattedPlacesInfoData<PlaceId>

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
