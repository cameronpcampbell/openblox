// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import { ArrayNonEmpty, Identifier } from "typeforge"

import type { AssetAnimatedThumbnailData, AssetSize, BundleSize, GamesIconSize, GameThumbnailSize, PrettifiedAssetsThumbnailsData, PrettifiedBadgesThumbnailsData, PrettifiedBundlesThumbnailsData, PrettifiedGamesIconsData, PrettifiedGamesThumbnailsData, RawAssetsThumbnailsData, RawBadgesThumbnailsData, RawBundlesThumbnailsData, RawGamesIconsData, RawGamesThumbnailsData, ThumbnailData, ThumbnailFormat, ThumbnailReturnPolicy } from "./thumbnails.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicThumbnails", baseUrl: "https://thumbnails.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Assets ] ////////////////////////////////////////////////////////////////////
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
 * @example const { data:assetsThumbnails } = await ClassicThumbnailsApi.assetsThumbnails({ assetIds: [7229442422], size: "420x420" });
 * @exampleData { "7229442422": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 7229442422, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } ] }
 */
export const assetsThumbnails = addApiMethod(async <AssetId extends Identifier>(
  { assetIds, returnPolicy = "PlaceHolder", size, format = "WebP", isCircular }:
  { assetIds: ArrayNonEmpty<AssetId>, returnPolicy?: ThumbnailReturnPolicy, size: AssetSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawAssetsThumbnailsData<AssetId>, PrettifiedAssetsThumbnailsData<AssetId>> => ({
  path: `/v1/assets`,
  method: "GET",
  searchParams: { assetIds, returnPolicy, size, format, isCircular },
  name: "gamesThumbnails",

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


/**
 * Gets 3d thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/assets-thumbnail-3d
 * 
 * @param assetId The id of the asset to get a 3d thumbnail for.
 * 
 * @example const { data:asset3dData } = await ClassicThumbnailsApi.asset3dThumbnail({ assetId: 6768917255 });
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 * @exampleRawBody { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
 */
export const asset3dThumbnail = addApiMethod(async <AssetId extends Identifier>(
  { assetId }: { assetId: AssetId }
): ApiMethod<ThumbnailData<AssetId>> => ({
  method: "GET",
  path: `/v1/assets-thumbnail-3d`,
  searchParams: { assetId },
  name: `asset3dThumbnail`,
}))

/**
 * Gets animated thumbnail for an asset.
 * @category Assets
 * @endpoint GET /v1/asset-thumbnail-animated
 * 
 * @param assetId The id of the asset to get an animated thumbnail for.
 * 
 * @example const { data:assetAnimatedData } = await ClassicThumbnailsApi.assetAnimatedThumbnail({ assetId: 6768917255 });
 * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: null }
 * @exampleRawBody { targetId: 6768917255, state: "Completed", imageUrl: null }
 */
export const assetAnimatedThumbnail = addApiMethod(async <AssetId extends Identifier>(
  { assetId }: { assetId: AssetId }
): ApiMethod<AssetAnimatedThumbnailData<AssetId>> => ({
  method: "GET",
  path: `/v1/asset-thumbnail-animated`,
  searchParams: { assetId },
  name: `assetAnimatedThumbnail`,
}))
//////////////////////////////////////////////////////////////////////////////////


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
 * @example const { data:badgesThumbnails } = await ClassicThumbnailsApi.badgesThumbnails({ badgeIds: [2124533401] });
 * @exampleData  { "2124533401": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 2124533401, state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } ] }
 */
export const badgesThumbnails = addApiMethod(async <BadgeId extends Identifier>(
  { badgeIds, format  = "WebP", isCircular }: { badgeIds: ArrayNonEmpty<BadgeId>, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawBadgesThumbnailsData<BadgeId>, PrettifiedBadgesThumbnailsData<BadgeId>> => ({
  method: "GET",
  path: `/v1/badges/icons`,
  searchParams: { badgeIds, size:"150x150", format, isCircular },
  name: `badgesThumbnails`,

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


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
export const bundlesThumbnails = addApiMethod(async <BundleId extends Identifier>(
  { bundleIds, size="420x420", format = "WebP", isCircular }:
  { bundleIds: ArrayNonEmpty<BundleId>, size?: BundleSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawBundlesThumbnailsData<BundleId>, PrettifiedBundlesThumbnailsData<BundleId>> => ({
  method: "GET",
  path: `/v1/bundles/thumbnails`,
  searchParams: { bundleIds, size, format, isCircular },
  name: `bundlesThumbnails`,

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


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
 * @example const { data:gamesThumbnails } = await ClassicThumbnailsApi.gamesThumbnails({ universeIds: [ 1685831367 ] });
 * @exampleData {"1685831367":{"error":null,"thumbnails":[{"targetId":5130624799,"state":"Completed","imageUrl":"https://tr.rbxcdn.com/611f558eaab21d31a688b0523cb12433/480/270/Image/Webp","version":"TN2"}]}}
 * @exampleRawBody {"data":[{"error":null,"thumbnails":[{"targetId":5130624799,"state":"Completed","imageUrl":"https://tr.rbxcdn.com/611f558eaab21d31a688b0523cb12433/480/270/Image/Webp","version":"TN2"}]}]}
 */
export const gamesThumbnails = addApiMethod(async <UniverseId extends Identifier>(
  { universeIds, countPerUniverse, defaults, size = "480x270", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmpty<UniverseId>, countPerUniverse?: number, defaults?: boolean,
    size?: GameThumbnailSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawGamesThumbnailsData<UniverseId>, PrettifiedGamesThumbnailsData<UniverseId>> => ({
  path: `/v1/games/multiget/thumbnails`,
  method: "GET",
  searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
  name: "gamesThumbnails",

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "universeId", gameThumbnailData => {
    delete (gameThumbnailData as Omit<typeof gameThumbnailData, "universeId"> & { universeId?: Identifier }).universeId
    return gameThumbnailData
  })
}))


export const gamesIcons = addApiMethod(async <UniverseId extends Identifier>(
  { universeIds, returnPolicy, size = "256x256", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmpty<UniverseId>, returnPolicy?: ThumbnailReturnPolicy, size?: GamesIconSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawGamesIconsData<UniverseId>, PrettifiedGamesIconsData<UniverseId>> => ({
  path: `/v1/games/icons`,
  method: "GET",
  searchParams: { universeIds, returnPolicy, size, format, isCircular },
  name: "gamesIcons",

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "targetId", gameIconData => {
    delete (gameIconData as Omit<typeof gameIconData, "targetId"> & { targetId?: Identifier }).targetId
    return gameIconData
  })
}))
//////////////////////////////////////////////////////////////////////////////////