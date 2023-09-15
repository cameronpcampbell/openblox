// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach, map } from "p-iteration"

import { apiFuncBaseHandler as BaseHandler } from "../../apis.utils"
import { createObjectMapByKeyWithMiddleware } from "../../../utils"
import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustSize, AvatarFullSize, AvatarHeadshotSize, BadgesData, BundlesData, BundleSize, DeveloperProductsData, DeveloperProductSize, GamePassesData, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIdsData, ThumbnailReturnPolicy, GamesIconSize, GroupEmblemSize, MetadataData, GamesIconsData, GroupsEmblemsData, PlacesIconsData, PlaceThumbnailSize, Avatar3dData, Outfit3dData, OutfitsData, OutfitSize, BatchRequest, BatchData, FormattedAssetsData, FormattedBadgesData, FormattedBundlesData, FormattedGamePassesData, FormattedGameFromThumbnailIdsData, FormattedGamesIconsData, FormattedDeveloperProductsData, FormattedGamesData, GamesData, FormattedGroupsEmblemsData, FormattedPlacesIconsData, FormattedOutfitsData, BatchResponseElement, AvatarsBustsData, FormattedAvatarsBustsData, FormattedAvatarsFullData, AvatarsFullData, FormattedAvatarsHeadshotsData, AvatarsHeadshotsData, FormattedBatchData
} from "./thumbnailsApi.types"
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse } from "../../apis.types"
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
 * @example const { data:assetsThumbnails } = await ThumbnailsApi.assetsThumbnails([7229442422], "PlaceHolder", "420x420");
 * @exampleData { "7229442422": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 7229442422, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } ] }
 */
export async function assetsThumbnails(this: ThisAllOverrides, assetIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: AssetSize, format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<AssetsData, FormattedAssetsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<AssetsData>(`${baseUrl}/v1/assets`, {
      searchParams: { assetIds, returnPolicy, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "assetsThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedAssetsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400, 403]) 
}

/**
 * Gets 3d thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/assets-thumbnail-3d
 * 
 * @param assetId The id of the asset to get a 3d thumbnail for.
 * 
 * @example const { data:asset3dData } = await ThumbnailsApi.asset3dThumbnail(6768917255);
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 * @exampleRawData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 */
export async function asset3dThumbnail(this: ThisAllOverrides, assetId: number): ApiMethodResponse<Asset3dData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<Asset3dData>(`${baseUrl}/v1/assets-thumbnail-3d`, {
      searchParams: { assetId },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "asset3dThumbnail")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { data:rawData, rawData, response, cache }
  }, [400])
}

/**
 * Gets animated thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/asset-thumbnail-animated
 * 
 * @param assetId The id of the asset to get an animated thumbnail for.
 * 
 * @example const { data:assetAnimatedData } = await ThumbnailsApi.assetAnimatedThumbnail(6768917255);
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: null }
 * @exampleRawData { targetId: 6768917255, state: "Completed", imageUrl: null }
 */
export async function assetAnimatedThumbnail(this: ThisAllOverrides, assetId: number): ApiMethodResponse<AssetAnimatedData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<AssetAnimatedData>(`${baseUrl}/v1/asset-thumbnail-animated`, {
      searchParams: { assetId },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "assetAnimatedThumbnail")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { data:rawData, rawData, response, cache }
  }, [400])
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
 * @example const { data:badgesThumbnails } = await ThumbnailsApi.badgesThumbnails([2124533401]);
 * @exampleData  { "2124533401": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 2124533401, state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } ] }
 */
export async function badgesThumbnails(this: ThisAllOverrides, badgeIds: number[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false): ApiMethodResponse<
  BadgesData, FormattedBadgesData
> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<BadgesData>(`${baseUrl}/v1/badges/icons`, {
      searchParams: { badgeIds, size:"150x150", format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "badgesThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedBadgesData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )
    return { data:formattedData, rawData, response, cache }
  }, [400])
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
 * @example const { data:bundlesThumbnails } = await ThumbnailsApi.bundlesThumbnails([181]);
 * @exampleData { "181": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } }
 * @exampleRawData { data: [ { targetId: 181, state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } ] }
 */
export async function bundlesThumbnails(
  this: ThisAllOverrides, bundleIds: number[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false
): ApiMethodResponse<BundlesData, FormattedBundlesData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<BundlesData>(`${baseUrl}/v1/bundles/thumbnails`, {
      searchParams: { bundleIds, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "bundlesThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedBundlesData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400])
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
 * @example const { data:developerProductsThumbnails } = await ThumbnailsApi.developerProductsThumbnails([3616425]);
 * @exampleData { "3616425": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 3616425, state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } ] }
 */
export async function developerProductsThumbnails(
  this: ThisAllOverrides, developerProductIds: number[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false
): ApiMethodResponse<DeveloperProductsData, FormattedDeveloperProductsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<DeveloperProductsData>(`${baseUrl}/v1/developer-products/icons`, {
      searchParams: { developerProductIds, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
        apiName, "developerProductsThumbnails"
      )),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedDeveloperProductsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400])
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
 * @example const { data:gamePassesThumbnails } = await ThumbnailsApi.gamePassesThumbnails([9063647]);
 * @exampleData { "9063647": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 9063647, state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } ] }
 */
export async function gamePassesThumbnails(
  this: ThisAllOverrides, gamePassIds: number[], format: ThumbnailFormat="Png", isCircular: boolean=false
): ApiMethodResponse<GamePassesData, FormattedGamePassesData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<GamePassesData>(`${baseUrl}/v1/game-passes`, {
      searchParams: { gamePassIds, size:"150x150", format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "gamePassesThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedGamePassesData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )
    
    return { data:formattedData, rawData, response, cache }
  }, [400])
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
 * @example const { data:gameThumbnails } = await ThumbnailsApi.gameThumbnailsFromIds(1685831367, [5030792576]);
 * @exampleData { "5030792576": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } }
 * @exampleRawData { data: [ { targetId: "5030792576", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } ] }
 */
export async function gameThumbnailsFromIds(this: ThisAllOverrides, universeId: number, thumbnailIds: number[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<GameFromThumbnailIdsData, FormattedGameFromThumbnailIdsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<GameFromThumbnailIdsData>(`${baseUrl}/v1/games/${universeId}/thumbnails`, {
      searchParams: { thumbnailIds, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "gameThumbnailsFromIds")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedGameFromThumbnailIdsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400, 403])
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
 * @example const { data:gamesIcons } = await ThumbnailsApi.gamesIcons([1685831367]);
 * @exampleData { "1685831367": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 1685831367, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } ] }
 */
export async function gamesIcons(this: ThisAllOverrides, universeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<GamesIconsData, FormattedGamesIconsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<GameFromThumbnailIdsData>(`${baseUrl}/v1/games/icons`, {
      searchParams: { universeIds, size, format, isCircular, returnPolicy },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "gamesIcons")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedGamesIconsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId",
      async ({state, imageUrl}) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400, 403])
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
 * @example const { data:gamesThumbnails } = await ThumbnailsApi.gamesThumbnails([1685831367]);
 * @exampleData { '1685831367': { error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } }
 * @exampleRawData { data: [ { universeId: 1685831367, error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } ] }
 */
export async function gamesThumbnails(this: ThisAllOverrides, universeIds: number[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<GamesData, FormattedGamesData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<GamesData>(`${baseUrl}/v1/games/multiget/thumbnails`, {
      searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "gamesThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedGamesData = await createObjectMapByKeyWithMiddleware(rawData.data, "universeId",
      async ({ error, thumbnails }) => ({ error, thumbnails })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400])
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
 * @example const { data:groupsEmblems } = await ThumbnailsApi.groupsEmblems([5850082]);
 * @exampleData { "5850082": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 5850082, state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } ] }
 */
export async function groupsEmblems(this: ThisAllOverrides, groupIds: number[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<GroupsEmblemsData, FormattedGroupsEmblemsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<GroupsEmblemsData>("/v1/groups/icons", {
      searchParams: { groupIds, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupsEmblems")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedGroupsEmblemsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400])
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ METADATA ] //////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail metadata.
 * @category Metadata
 * @endpoint GET /v1/metadata
 */
export async function thumbnailsMetadata(this: ThisAllOverrides): ApiMethodResponse<MetadataData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<MetadataData>(`${baseUrl}/v1/metadata`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "thumbnailsMetadata")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { data: rawData as unknown as MetadataData, rawData, response, cache }
  }, [400])
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
 * @example const { data:placesIconsThumbnails } = await ThumbnailsApi.placesIcons([4922741943]);
 * @exampleData { "4922741943": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } }
 * @exampleRawData { data: [ { targetId: 4922741943, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } ] }
 */
export async function placesIcons(this: ThisAllOverrides, placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<PlacesIconsData, FormattedPlacesIconsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<PlacesIconsData>(`${baseUrl}/v1/places/gameicons`, {
      searchParams: { placeIds, returnPolicy, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "placesIcons")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedPlacesIconsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return { data:formattedData, rawData, response, cache }
  }, [400, 403])
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
 * @example const { data:avatarsFullThumbnails } = await ThumbnailsApi.avatarsFullThumbnails([45348281], "150x150");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } }
 * @exampleRawData { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } ] }
 */
export async function avatarsFullThumbnails(this: ThisAllOverrides, userIds: number[], size: AvatarFullSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<AvatarsFullData, FormattedAvatarsFullData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<AvatarsFullData>(`${baseUrl}/v1/users/avatar`, {
      searchParams: { size, format, isCircular, userIds },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "avatarsFullThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedAvatarsFullData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return { data: formattedData, rawData, response, cache }
  }, [400, 403])
}

/**
 * Gets 3d avatar thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar-3d
 * 
 * @param userId The id of the user to get a 3d avatar thumbnail for.
 * 
 * @example const { data:avatar3dData } = await ThumbnailsApi.avatar3dThumbnail(45348281);
 * @exampleData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 * @exampleRawData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 */
export async function avatar3dThumbnail(this: ThisAllOverrides, userId: number): ApiMethodResponse<Avatar3dData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<Avatar3dData>(`${baseUrl}/v1/users/avatar-3d`, {
      searchParams: { userId },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "avatar3dThumbnail")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { data: rawData, rawData, response, cache }
  }, [400])
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
 * @example const { data:avatarsBustsThumbnails } = await ThumbnailsApi.avatarsBustsThumbnails([45348281], "150x150");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png" } }
 * @exampleRawData { data: [ { targetId: 45348281, state: 'Completed', imageUrl: 'https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png' } ] }
 */
export async function avatarsBustsThumbnails(this: ThisAllOverrides, userIds: number[], size: AvatarBustSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<AvatarsBustsData, FormattedAvatarsBustsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<AvatarsBustsData>(`${baseUrl}/v1/users/avatar-bust`, {
      searchParams: { size, format, isCircular, userIds },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "avatarsBustsThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedAvatarsBustsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return { data: formattedData, rawData, response, cache }
  }, [400, 403])
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
 * @example const { data:avatarsHeadshotsThumbnails } = await ThumbnailsApi.avatarsHeadshotsThumbnails([45348281], "720x720");
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } }
 * @exampleRawData { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
 */
export async function avatarsHeadshotsThumbnails(this: ThisAllOverrides, userIds: number[], size: AvatarHeadshotSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<AvatarsHeadshotsData, FormattedAvatarsHeadshotsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<AvatarsHeadshotsData>(`${baseUrl}/v1/users/avatar-headshot`, {
      searchParams: { size, format, isCircular, userIds },
      cacheSettings:  this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
        apiName, "avatarsHeadshotsThumbnails"
      )),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedAvatarsHeadshotsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )

    return { data: formattedData, rawData, response, cache }
  }, [400, 403])
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
 * @example const { data:outfit3dData } = await ThumbnailsApi.outfit3dThumbnail(110540093);
 * @exampleData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 * @exampleRawData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 */
export async function outfit3dThumbnail(this: ThisAllOverrides, outfitId: number): ApiMethodResponse<Outfit3dData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<Outfit3dData>(`${baseUrl}/v1/users/outfit-3d`, {
      searchParams: { outfitId },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "outfit3dThumbnail")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return { data: rawData, rawData, response, cache }
  }, [])
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
 * @example const { data:outfitsThumbnails } = await ThumbnailsApi.outfitsThumbnails([110540093]);
 * @exampleData { "110540093": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } }
 * @exampleRawData { data: [ { targetId: 110540093, state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } ] }
 */
export async function outfitsThumbnails(this: ThisAllOverrides, userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): ApiMethodResponse<OutfitsData, FormattedOutfitsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.get<OutfitsData>(`${baseUrl}/v1/users/outfits`, {
      searchParams: { userOutfitIds, size, format, isCircular },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "outfitsThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const formattedData: FormattedOutfitsData = await createObjectMapByKeyWithMiddleware(
      rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
    )
    
    return { data: formattedData, rawData, response, cache }
  }, [400])
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
 * const { data:thumbnails } = await ThumbnailsApi.batchThumbnails([
     {
       type: "AvatarHeadShot",
        targetId: 45348281,
        size: "720x720",
        format: "Png",
        isCircular: false
      }
    ]);
 * @exampleData { AvatarHeadShot: { "45348281": { requestId: null, errorCode: 0, errorMessage: "", state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } } }
 * @exampleRawData { data: [ { requestId: null, errorCode: 0, errorMessage: "", targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
  */
export async function batchThumbnails<BReq extends BatchRequest>(this: ThisAllOverrides, requests: readonly BReq[]): ApiMethodResponse<
  BatchData, FormattedBatchData<BReq>
> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawData, response, cachedResultType:cache } = await this.http.post<BatchData>(`${baseUrl}/v1/batch`, {
      body: requests,
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "batchThumbnails")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const rawDataDataLength = rawData.data.length - 1
    let insertedTypeData: any = await map(rawData.data, async (item:any, i: number) => {
      item = { ...item }
      item.type = requests[rawDataDataLength - i].type; return item
    })
    let formattedData: { [key:string]: any } = {}
    await forEach(insertedTypeData, async (item: any) => {
      item = { ...item }
      const { type, targetId }: { type: string, targetId: number } = item
      if (!formattedData[type]) formattedData[type] = {}

      delete item.type
      delete item.targetId
      formattedData[type][targetId] = item
    })

    return { data: formattedData as Record<BReq["type"], Record<BReq["targetId"], BatchResponseElement>>, rawData, response, cache }
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////