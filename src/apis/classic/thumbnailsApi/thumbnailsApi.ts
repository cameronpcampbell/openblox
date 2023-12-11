// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as baseHandler, buildApiMethodResponse as buildResponse } from "../../apis.utils"
import { createObjectMapByKeyWithMiddleware } from "../../../utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustSize, AvatarFullSize, AvatarHeadshotSize, BadgesData, BundlesData, BundleSize, DeveloperProductsData, DeveloperProductSize, GamePassesData, ThumbnailFormat, GameThumbnailSize, ThumbnailReturnPolicy, GamesIconSize, GroupEmblemSize, MetadataData, GamesIconsData, GroupsEmblemsData, PlacesIconsData, PlaceThumbnailSize, Avatar3dData, Outfit3dData, OutfitsData, OutfitSize, BatchRequest, BatchData, FormattedAssetsData, FormattedBadgesData, FormattedBundlesData, FormattedGamePassesData, FormattedGamesIconsData, FormattedDeveloperProductsData, FormattedGamesData, GamesData, FormattedGroupsEmblemsData, FormattedPlacesIconsData, FormattedOutfitsData, BatchResponseElement, AvatarsBustsData, FormattedAvatarsBustsData, FormattedAvatarsFullData, AvatarsFullData, FormattedAvatarsHeadshotsData, AvatarsHeadshotsData, FormattedBatchData, RawGameThumbnailsFromIdsData, FormattedGameThumbnailsFromIdsData
} from "./thumbnailsApi.types"
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse } from "../../apis.types"
import { Identifier } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://thumbnails.roblox.com"
const apiName = "ClassicThumbnailsApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = []


// [ ASSETS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple assets.
 * @category Assets
 * @endpoint GET /v1/assets
 * 
 * @param assetIds The ids of the assets to get thumbnails for.
 * @param returnPolicy The policy to use in selecting the thumbnails to return.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:assetsThumbnails } = await ClassicThumbnailsApi.assetsThumbnails([7229442422], "PlaceHolder", "420x420");
 * @exampleData { "7229442422": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 7229442422, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } ] }
 */
export async function assetsThumbnails<AssetId extends Identifier>(
  this: ThisAllOverrides, assetIds: AssetId[], size: AssetSize, returnPolicy: ThumbnailReturnPolicy="PlaceHolder", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<AssetsData, FormattedAssetsData<AssetId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<AssetsData>(`${baseUrl}/v1/assets`, {
      searchParams: { assetIds, returnPolicy, size, format, isCircular },
      apiName, methodName: "assetsThumbnails", overrides
    })

    const getFormattedData = (): FormattedAssetsData<AssetId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  }) 
}

/**
 * Gets 3d thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/assets-thumbnail-3d
 * 
 * @param assetId The id of the asset to get a 3d thumbnail for.
 * 
 * @example const { data:asset3dData } = await ClassicThumbnailsApi.asset3dThumbnail(6768917255);
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 * @exampleRawBody { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 */
export async function asset3dThumbnail<AssetId extends Identifier>(this: ThisAllOverrides, assetId: AssetId): ApiMethodResponse<
  Asset3dData<AssetId>
> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<Asset3dData<AssetId>>(`${baseUrl}/v1/assets-thumbnail-3d`, {
      searchParams: { assetId },
      apiName, methodName: "asset3dThumbnail", overrides
    })

    return buildResponse({ data:rawBody, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets animated thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/asset-thumbnail-animated
 * 
 * @param assetId The id of the asset to get an animated thumbnail for.
 * 
 * @example const { data:assetAnimatedData } = await ClassicThumbnailsApi.assetAnimatedThumbnail(6768917255);
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: null }
 * @exampleRawBody { targetId: 6768917255, state: "Completed", imageUrl: null }
 */
export async function assetAnimatedThumbnail<AssetId extends Identifier>(this: ThisAllOverrides, assetId: AssetId): ApiMethodResponse<
  AssetAnimatedData<AssetId>
> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<AssetAnimatedData<AssetId>>(`${baseUrl}/v1/asset-thumbnail-animated`, {
      searchParams: { assetId },
      apiName, methodName: "assetAnimatedThumbnail", overrides
    })

    return buildResponse({ data:rawBody, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BADGES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple badges.
 * @category Badges
 * @endpoint GET /v1/badges/icons
 * 
 * @param badgeIds The ids of the badges to get thumbnails for.
 * @param format Specifies the format of the thumbnailS.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:badgesThumbnails } = await ClassicThumbnailsApi.badgesThumbnails([2124533401]);
 * @exampleData  { "2124533401": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 2124533401, state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } ] }
 */
export async function badgesThumbnails<BadgeId extends Identifier>(
  this: ThisAllOverrides, badgeIds: BadgeId[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false
): ApiMethodResponse<BadgesData, FormattedBadgesData<BadgeId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<BadgesData>(`${baseUrl}/v1/badges/icons`, {
      searchParams: { badgeIds, size:"150x150", format, isCircular },
      apiName, methodName: "badgesThumbnails", overrides
    })

    const getFormattedData = (): FormattedBadgesData<BadgeId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )
    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BUNDLES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple bundles.
 * @category Bundles
 * @endpoint GET /v1/bundles/thumbnails
 * 
 * @param bundleIds The ids of the bundles to get thumbnails for.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:bundlesThumbnails } = await ClassicThumbnailsApi.bundlesThumbnails([181]);
 * @exampleData { "181": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 181, state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } ] }
 */
export async function bundlesThumbnails<BundleId extends Identifier>(
  this: ThisAllOverrides, bundleIds: BundleId[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false
): ApiMethodResponse<BundlesData, FormattedBundlesData<BundleId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<BundlesData>(`${baseUrl}/v1/bundles/thumbnails`, {
      searchParams: { bundleIds, size, format, isCircular },
      apiName, methodName: "bundlesThumbnails", overrides
    })

    const getFormattedData = (): FormattedBundlesData<BundleId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DEVELOPER PRODUCTS ] ////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple developer products.
 * @category Developer Products
 * @endpoint GET /v1/developer-products/icons
 * 
 * @param developerProductIds The ids of the developer products to get thumbnails for.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:developerProductsThumbnails } = await ClassicThumbnailsApi.developerProductsThumbnails([3616425]);
 * @exampleData { "3616425": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 3616425, state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } ] }
 */
export async function developerProductsThumbnails<DeveloperProductId extends Identifier>(
  this: ThisAllOverrides, developerProductIds: DeveloperProductId[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false
): ApiMethodResponse<DeveloperProductsData, FormattedDeveloperProductsData<DeveloperProductId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<DeveloperProductsData>(`${baseUrl}/v1/developer-products/icons`, {
      searchParams: { developerProductIds, size, format, isCircular },
      apiName, methodName: "developerProductsThumbnails", overrides
    })

    const getFormattedData = (): FormattedDeveloperProductsData<DeveloperProductId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GAME PASSES ] ///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple game passes.
 * @category Game Passes
 * @endpoint GET /v1/game-passes
 * 
 * @param gamePassIds The ids of the game passes to get thumbnails for.
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:gamePassesThumbnails } = await ClassicThumbnailsApi.gamePassesThumbnails([9063647]);
 * @exampleData { "9063647": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 9063647, state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } ] }
 */
export async function gamePassesThumbnails<GamepassId extends Identifier>(
  this: ThisAllOverrides, gamePassIds: GamepassId[], format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<GamePassesData, FormattedGamePassesData<GamepassId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<GamePassesData>(`${baseUrl}/v1/game-passes`, {
      searchParams: { gamePassIds, size:"150x150", format, isCircular },
      apiName, methodName: "gamePassesThumbnails", overrides
    })

    const getFormattedData = (): FormattedGamePassesData<GamepassId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )
    
    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple thumbnail ids that belong to a specified universe.
 * @category Game Passes
 * @endpoint GET /v1/games/{universeId}/thumbnails
 * 
 * @param universeId The id of the universe to get the thumbnails from.
 * @param thumbnailIds The ids of the thumbnails.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:gameThumbnails } = await ClassicThumbnailsApi.gameThumbnailsFromIds(1685831367, [5030792576]);
 * @exampleData { "5030792576": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: "5030792576", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } ] }
 */
export async function gameThumbnailsFromIds<GameThumbnailId extends Identifier>(
  this: ThisAllOverrides, universeId: Identifier, thumbnailIds: GameThumbnailId[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<RawGameThumbnailsFromIdsData, FormattedGameThumbnailsFromIdsData<GameThumbnailId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<RawGameThumbnailsFromIdsData>(
      `${baseUrl}/v1/games/${universeId}/thumbnails`, {
        searchParams: { thumbnailIds, size, format, isCircular },
        apiName, methodName: "gameThumbnailsFromIds", overrides
      }
    )

    const getFormattedData = (): FormattedGameThumbnailsFromIdsData<GameThumbnailId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets thumbnail icon for multiple games.
 * @category Games
 * @endpoint GET /v1/games/icons
 * 
 * @param universeIds The ids of the universes to get the thumbnail icons from.
 * @param returnPolicy The policy to use in selecting the thumbnail icons to return.
 * @param size The thumbnail icons size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnail icons.
 * @param isCircular Dictates if the thumbnail icons should be masked by a circle.
 * 
 * @example const { data:gamesIcons } = await ClassicThumbnailsApi.gamesIcons([1685831367]);
 * @exampleData { "1685831367": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 1685831367, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } ] }
 */
export async function gamesIcons<UniverseId extends Identifier>(
  this: ThisAllOverrides, universeIds: UniverseId[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<GamesIconsData, FormattedGamesIconsData<UniverseId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<GamesIconsData>(`${baseUrl}/v1/games/icons`, {
      searchParams: { universeIds, size, format, isCircular, returnPolicy },
      apiName, methodName: "gamesIcons", overrides
    })

    const getFormattedData = (): FormattedGamesIconsData<UniverseId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId",
      ({state, imageUrl}) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
} 

/**
 * Gets thumbnail(s) for multiple games.
 * @category Games
 * @endpoint GET /v1/games/multiget/thumbnails
 * 
 * @param universeIds The ids of the universe to get thumbnails for.
 * @param countPerUniverse The amount of thumbnails to return for each universe
 * @param defaults True if defaults (if any) should be returned if no media exists.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:gamesThumbnails } = await ClassicThumbnailsApi.gamesThumbnails([1685831367]);
 * @exampleData { '1685831367': { error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } }
 * @exampleRawBody { data: [ { universeId: 1685831367, error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } ] }
 */
export async function gamesThumbnails<UniverseId extends Identifier>(
  this: ThisAllOverrides, universeIds: UniverseId[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<GamesData, FormattedGamesData<UniverseId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<GamesData>(`${baseUrl}/v1/games/multiget/thumbnails`, {
      searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
      apiName, methodName: "gamesThumbnails", overrides
    })

    const getFormattedData = (): FormattedGamesData<UniverseId> => createObjectMapByKeyWithMiddleware(rawBody.data, "universeId",
      async ({ error, thumbnails }) => ({ error, thumbnails })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUP EMBLEM ] //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets group emblem thumbnail for multiple groups.
 * @category Group Emblem
 * @endpoint GET /v1/groups/icons
 * 
 * @param groupIds The ids of the groups to get the thumbnail icons from.
 * @param size The thumbnail icons size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnail icons.
 * @param isCircular Dictates if the thumbnail icons should be masked by a circle.
 * 
 * @example const { data:groupsEmblems } = await ClassicThumbnailsApi.groupsEmblems([5850082]);
 * @exampleData { "5850082": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 5850082, state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } ] }
 */
export async function groupsEmblems<GroupId extends Identifier>(
  this: ThisAllOverrides, groupIds: GroupId[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<GroupsEmblemsData, FormattedGroupsEmblemsData<GroupId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<GroupsEmblemsData>(`${baseUrl}/v1/groups/icons`, {
      searchParams: { groupIds, size, format, isCircular },
      apiName, methodName: "groupsEmblems", overrides
    })

    const getFormattedData = (): FormattedGroupsEmblemsData<GroupId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ METADATA ] //////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail metadata.
 * @category Metadata
 * @endpoint GET /v1/metadata
 * 
 * @example const { data:metadata } = await ClassicThumbnailsApi.metadata();
 * @exampleData { isWebappUseCacheEnabled: false, webappCacheExpirationTimspan: "00:00:00" }
 * @exampleRawBody { isWebappUseCacheEnabled: false, webappCacheExpirationTimspan: "00:00:00" }
 */
export async function thumbnailsMetadata(this: ThisAllOverrides): ApiMethodResponse<MetadataData> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<MetadataData>(`${baseUrl}/v1/metadata`, {
      apiName, methodName: "thumbnailsMetadata", overrides
    })

    return buildResponse({ data: rawBody, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PLACES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail icon for multiple places.
 * @category Places
 * @endpoint GET /v1/places/gameicons
 * 
 * @param placeIds The ids of the places to get thumbnails for.
 * @param returnPolicy The policy to use in selecting the thumbnail icons to return.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:placesIconsThumbnails } = await ClassicThumbnailsApi.placesIcons([4922741943]);
 * @exampleData { "4922741943": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 4922741943, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } ] }
 */
export async function placesIcons<PlaceId extends Identifier>(
  this: ThisAllOverrides, placeIds: PlaceId[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<PlacesIconsData, FormattedPlacesIconsData<PlaceId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<PlacesIconsData>(`${baseUrl}/v1/places/gameicons`, {
      searchParams: { placeIds, returnPolicy, size, format, isCircular },
      apiName, methodName: "placesIcons", overrides
    })

    const getFormattedData = (): FormattedPlacesIconsData<PlaceId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return buildResponse({ data:getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ AVATAR ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets full avatar thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar
 * 
 * @param userIds The ids of the users to get thumbnails for.
 * @param size The avatar thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:avatarsFullThumbnails } = await ClassicThumbnailsApi.avatarsFullThumbnails([45348281], "150x150");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } ] }
 */
export async function avatarsFullThumbnails<UserId extends Identifier>(
  this: ThisAllOverrides, userIds: UserId[], size: AvatarFullSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<AvatarsFullData, FormattedAvatarsFullData<UserId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<AvatarsFullData>(`${baseUrl}/v1/users/avatar`, {
      searchParams: { size, format, isCircular, userIds },
      apiName, methodName: "avatarsFullThumbnails", overrides
    })

    const getFormattedData = (): FormattedAvatarsFullData<UserId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets 3d avatar thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar-3d
 * 
 * @param userId The id of the user to get a 3d avatar thumbnail for.
 * 
 * @example const { data:avatar3dData } = await ClassicThumbnailsApi.avatar3dThumbnail(45348281);
 * @exampleData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 * @exampleRawBody { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 */
export async function avatar3dThumbnail<UserId extends Identifier>(this: ThisAllOverrides, userId: UserId): ApiMethodResponse<Avatar3dData<UserId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<Avatar3dData<UserId>>(`${baseUrl}/v1/users/avatar-3d`, {
      searchParams: { userId },
      apiName, methodName: "avatar3dThumbnail", overrides
    })

    return buildResponse({ data: rawBody, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets avatar bust thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar-bust
 * 
 * @param userIds The ids of the users to get thumbnails for.
 * @param size The avatar thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:avatarsBustsThumbnails } = await ClassicThumbnailsApi.avatarsBustsThumbnails([45348281], "150x150");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: 'Completed', imageUrl: 'https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png' } ] }
 */
export async function avatarsBustsThumbnails<UserId extends Identifier>(
  this: ThisAllOverrides, userIds: UserId[], size: AvatarBustSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<AvatarsBustsData, FormattedAvatarsBustsData<UserId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<AvatarsBustsData>(`${baseUrl}/v1/users/avatar-bust`, {
      searchParams: { size, format, isCircular, userIds },
      apiName, methodName: "avatarsBustsThumbnails", overrides
    })

    const getFormattedData = (): FormattedAvatarsBustsData<UserId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets avatar headshot thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar-headshot
 * 
 * @param userIds The ids of the users to get thumbnails for.
 * @param size The avatar thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:avatarsHeadshotsThumbnails } = await ClassicThumbnailsApi.avatarsHeadshotsThumbnails([45348281], "720x720");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
 */
export async function avatarsHeadshotsThumbnails<UserId extends Identifier>(
  this: ThisAllOverrides, userIds: UserId[], size: AvatarHeadshotSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<AvatarsHeadshotsData, FormattedAvatarsHeadshotsData<UserId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<AvatarsHeadshotsData>(`${baseUrl}/v1/users/avatar-headshot`, {
      searchParams: { size, format, isCircular, userIds },
      apiName, methodName: "avatarsHeadshotsThumbnails", overrides
    })

    const getFormattedData = () => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ OUTFITS ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets 3d outfit thumbnail for an outfit.
 * @category Outfits
 * @endpoint GET /v1/users/outfit-3d
 * 
 * @param outfitId The id of the outfit to get a 3d thumbnail for.
 * 
 * @example const { data:outfit3dData } = await ClassicThumbnailsApi.outfit3dThumbnail(110540093);
 * @exampleData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 * @exampleRawBody { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 */
export async function outfit3dThumbnail<OutfitId extends Identifier>(
  this: ThisAllOverrides, outfitId: OutfitId
): ApiMethodResponse<Outfit3dData<OutfitId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<Outfit3dData<OutfitId>>(
      `${baseUrl}/v1/users/outfit-3d`, {
        searchParams: { outfitId },
        apiName, methodName: "outfit3dThumbnail", overrides
      }
    )

    return buildResponse({ data: rawBody, rawBody, response, cacheMetadata })
  })
}

/**
 * Gets outfit thumbnail for multiple outfits.
 * @category Outfits
 * @endpoint GET /v1/users/outfits
 * 
 * @param userOutfitIds The ids of the outfits to get thumbnails for.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:outfitsThumbnails } = await ClassicThumbnailsApi.outfitsThumbnails([110540093]);
 * @exampleData { "110540093": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 110540093, state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } ] }
 */
export async function outfitsThumbnails<OutfitId extends Identifier>(
  this: ThisAllOverrides, userOutfitIds: OutfitId[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<OutfitsData, FormattedOutfitsData<OutfitId>> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<OutfitsData>(`${baseUrl}/v1/users/outfits`, {
      searchParams: { userOutfitIds, size, format, isCircular },
      apiName, methodName: "outfitsThumbnails", overrides
    })

    const getFormattedData = (): FormattedOutfitsData<OutfitId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "targetId", ({ state, imageUrl }) => ({ state, imageUrl })
    )
    
    return buildResponse({ data: getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BATCH ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple things.
 * @category Batch
 * @endpoint POST /v1/batch
 * 
 * @param requests An array of BatchRequest objects.
 * 
 * @example
 * const { data:thumbnails } = await ClassicThumbnailsApi.batchThumbnails([
     {
       type: "AvatarHeadShot",
        targetId: 45348281,
        size: "720x720",
        format: "Png",
        isCircular: false
      }
    ]);
 * @exampleData { AvatarHeadShot: { "45348281": { requestId: null, errorCode: 0, errorMessage: "", state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } } }
 * @exampleRawBody { data: [ { requestId: null, errorCode: 0, errorMessage: "", targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
  */
export async function batchThumbnails<const BReq extends BatchRequest>(this: ThisAllOverrides, requests: readonly BReq[]): ApiMethodResponse<
  BatchData, FormattedBatchData<BReq>
> {
  const overrides = this

  return baseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.post<BatchData>(`${baseUrl}/v1/batch`, {
      body: requests,
      apiName, methodName: "batchThumbnails", overrides
    })

    const getFormattedData = () => {
      const rawBodyDataLength = rawBody.data.length - 1
      let insertedTypeData: any = rawBody.data.map((item:any, i: number) => {
        item = { ...item }
        item.type = requests[rawBodyDataLength - i].type; return item
      })
      let formattedData: { [key:string]: any } = {}
      insertedTypeData.forEach((item: any) => {
        item = { ...item }
        const { type, targetId }: { type: string, targetId: number } = item
        if (!formattedData[type]) formattedData[type] = {}
  
        delete item.type
        delete item.targetId
        formattedData[type][targetId] = item
      })
      return formattedData as Record<BReq["type"], Record<BReq["targetId"], BatchResponseElement>>
    }

    return buildResponse({ data: getFormattedData, rawBody, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////