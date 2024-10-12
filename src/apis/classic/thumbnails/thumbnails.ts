// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { createObjectMapByKeyWithMiddleware } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ArrayNonEmptyIfConst } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { AssetAnimatedThumbnailData, AssetSize, AvatarsFullThumbnailsSize, BatchRequest, BatchResponseElement, BundleSize, DeveloperProductSize, GamesIconSize, GameThumbnailSize, GroupEmblemSize, OutfitSize, PlaceThumbnailSize, PrettifiedBatchThumbnailsData, PrettifiedGamesThumbnailsData, PrettifiedThumbnailsData, RawBatchThumbnailsData, RawGamesThumbnailsData, RawThumbnailsData, ThumbnailData, ThumbnailFormat, ThumbnailReturnPolicy, ThumbnailsMetadataData } from "./thumbnails.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicThumbnails", baseUrl: "https://thumbnails.roblox.com" })
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
export const assetsThumbnails = createApiMethod(async <AssetId extends Identifier>(
  { assetIds, returnPolicy = "PlaceHolder", size, format = "WebP", isCircular }:
  { assetIds: ArrayNonEmptyIfConst<AssetId>, returnPolicy?: ThumbnailReturnPolicy, size: AssetSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<any, any> => ({
  path: `/v1/assets`,
  method: "GET",
  searchParams: { assetIds, returnPolicy, size, format, isCircular },
  name: "gamesThumbnails",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
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
export const asset3dThumbnail = createApiMethod(async <AssetId extends Identifier>(
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
export const assetAnimatedThumbnail = createApiMethod(async <AssetId extends Identifier>(
  { assetId }: { assetId: AssetId }
): ApiMethod<AssetAnimatedThumbnailData<AssetId>> => ({
  method: "GET",
  path: `/v1/asset-thumbnail-animated`,
  searchParams: { assetId },
  name: `assetAnimatedThumbnail`,
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Badges ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
export const badgesThumbnails = createApiMethod(async <BadgeId extends Identifier>(
  { badgeIds, format  = "WebP", isCircular }: { badgeIds: ArrayNonEmptyIfConst<BadgeId>, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<BadgeId>, PrettifiedThumbnailsData<BadgeId>> => ({
  method: "GET",
  path: `/v1/badges/icons`,
  searchParams: { badgeIds, size:"150x150", format, isCircular },
  name: `badgesThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ Bundles ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:bundlesThumbnails } = await ClassicThumbnailsApi.bundlesThumbnails({ bundleIds: [181] });
 * @exampleData { "181": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 181, state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } ] }
 */
export const bundlesThumbnails = createApiMethod(async <BundleId extends Identifier>(
  { bundleIds, size="420x420", format = "WebP", isCircular }:
  { bundleIds: ArrayNonEmptyIfConst<BundleId>, size?: BundleSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<BundleId>, PrettifiedThumbnailsData<BundleId>> => ({
  method: "GET",
  path: `/v1/bundles/thumbnails`,
  searchParams: { bundleIds, size, format, isCircular },
  name: `bundlesThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ Developer Products ] ////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:developerProductsThumbnails } = await ClassicThumbnailsApi.developerProductsThumbnails({ developerProductIds: [3616425] });
 * @exampleData { "3616425": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 3616425, state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } ] }
 */
export const developerProductsThumbnails = createApiMethod(async <DeveloperProductId extends Identifier>(
  { developerProductIds, size = "420x420", format = "WebP", isCircular }: {
    developerProductIds: ArrayNonEmptyIfConst<DeveloperProductId>, size?: DeveloperProductSize, format?: ThumbnailFormat, isCircular?: boolean 
  }
): ApiMethod<RawThumbnailsData<DeveloperProductId>, PrettifiedThumbnailsData<DeveloperProductId>> => ({
  method: "GET",
  path: `/v1/developer-products/icons`,
  searchParams: { developerProductIds, size, format, isCircular },
  name: `developerProductsThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ Game Passes ] ///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail for multiple game passes.
 * @category Game Passes
 * @endpoint GET /v1/game-passes
 * 
 * @param gamePassIds The ids of the game passes to get thumbnails for.
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:gamePassesThumbnails } = await ClassicThumbnailsApi.gamePassesThumbnails({ gamePassIds: [9063647] });
 * @exampleData { "9063647": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 9063647, state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } ] }
 */
export const gamePassesThumbnails = createApiMethod(async <GamePassId extends Identifier>(
  { gamePassIds, format = "WebP", isCircular }:
  { gamePassIds: ArrayNonEmptyIfConst<GamePassId>, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<GamePassId>, PrettifiedThumbnailsData<GamePassId>> => ({
  method: "GET",
  path: `/v1/game-passes`,
  searchParams: { gamePassIds, format, size:"150x150", isCircular },
  name: `gamePassesThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ Games ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:gameThumbnails } = await ClassicThumbnailsApi.gameThumbnailsFromIds({ universeId: 1685831367, thumbnailIds: [5030792576] });
 * @exampleData { "5030792576": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: "5030792576", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } ] }
 */
export const gameThumbnailsFromIds = createApiMethod(async <ThumbnailId extends Identifier>(
  { universeId, thumbnailIds, size = "480x270", format = "WebP", isCircular }:
  { universeId: Identifier, thumbnailIds: ArrayNonEmptyIfConst<ThumbnailId>, size?: GameThumbnailSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<ThumbnailId>, PrettifiedThumbnailsData<ThumbnailId>> => ({
  method: "GET",
  path: `/v1/games/${universeId}/thumbnails`,
  searchParams: { thumbnailIds, size, format, isCircular },
  name: `gameThumbnailsFromIds`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


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
 * @example const { data:gamesIcons } = await ClassicThumbnailsApi.gamesIcons({ universeIds: [1685831367] });
 * @exampleData { "1685831367": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 1685831367, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7c1bf96fefde7b761e7b86bedf6fdca3/512/512/Image/Png" } ] }
 */
/*export const gamesIcons = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds, returnPolicy, size = "256x256", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmptyIfConst<UniverseId>, returnPolicy?: ThumbnailReturnPolicy, size?: GamesIconSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawThumbnailsData<UniverseId>, PrettifiedThumbnailsData<UniverseId>> => ({
  path: `/v1/games/icons`,
  method: "GET",
  searchParams: { universeIds, returnPolicy, size, format, isCircular },
  name: "gamesIcons",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
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
export const gamesThumbnails = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds, countPerUniverse, defaults, size = "480x270", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmptyIfConst<UniverseId>, countPerUniverse?: number, defaults?: boolean,
    size?: GameThumbnailSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawGamesThumbnailsData<UniverseId>, PrettifiedGamesThumbnailsData<UniverseId>> => ({
  path: `/v1/games/multiget/thumbnails`,
  method: "GET",
  searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
  name: "gamesThumbnails",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "universeId", gameThumbnailData => {
    delete (gameThumbnailData as Omit<typeof gameThumbnailData, "universeId"> & { universeId?: Identifier }).universeId
    return gameThumbnailData
  })
}))
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
 * @example const { data:groupsEmblems } = await ClassicThumbnailsApi.groupsEmblems({ groupIds: [5850082] });
 * @exampleData { "5850082": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } }
 * @exampleRawBody { data: [ { targetId: 5850082, state: "Completed", imageUrl: "https://tr.rbxcdn.com/caadbbddbed97108cfcff64fd1258b8f/420/420/Image/Png" } ] }
 */
export const groupsEmblems = createApiMethod(async <GroupId extends Identifier>(
  { groupIds, size = "420x420", format = "WebP", isCircular }:
  { groupIds: ArrayNonEmptyIfConst<GroupId>, size?: GroupEmblemSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<GroupId>, PrettifiedThumbnailsData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/icons`,
  searchParams: { groupIds, size, format, isCircular },
  name: `groupsEmblems`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
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
export const thumbnailsMetadata = createApiMethod(async (
): ApiMethod<ThumbnailsMetadataData> => ({
  method: "GET",
  path: `/v1/metadata`,
  name: `metadata`,
}))
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
export const placesIcons = createApiMethod(async <PlaceId extends Identifier>(
  { placeIds, returnPolicy, size = "256x256", format = "WebP", isCircular }:
  { placeIds: ArrayNonEmptyIfConst<PlaceId>, returnPolicy?: ThumbnailReturnPolicy, size?: GamesIconSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<PlaceId>, PrettifiedThumbnailsData<PlaceId>> => ({
  method: "GET",
  path: `/v1/places/gameicons`,
  searchParams: { placeIds, returnPolicy, size, format, isCircular },
  name: `placesIcons`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ Avatar ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:avatarsFullThumbnails } = await ClassicThumbnailsApi.avatarsFullThumbnails({ userIds: [45348281], size:"150x150" });
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } ] }
 */
export const avatarsFullThumbnails = createApiMethod(async <UserId extends Identifier>(
  { userIds, size = "420x420", format = "WebP", isCircular }:
  { userIds: ArrayNonEmptyIfConst<UserId>, size?: AvatarsFullThumbnailsSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<UserId>, PrettifiedThumbnailsData<UserId>> => ({
  method: "GET",
  path: `/v1/users/avatar`,
  searchParams: { userIds, size, format, isCircular },
  name: `avatarsFullThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))

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
 * @example const { data:avatarsBustsThumbnails } = await ClassicThumbnailsApi.avatarsBustsThumbnails({ userIds: [45348281], size:"150x150" });
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: 'Completed', imageUrl: 'https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png' } ] }
 */
export const avatarsBustsThumbnails = createApiMethod(async <UserId extends Identifier>(
  { userIds, size = "420x420", format = "WebP", isCircular }:
  { userIds: ArrayNonEmptyIfConst<UserId>, size?: AvatarsFullThumbnailsSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<UserId>, PrettifiedThumbnailsData<UserId>> => ({
  method: "GET",
  path: `/v1/users/avatar-bust`,
  searchParams: { userIds, size, format, isCircular },
  name: `avatarsBustsThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))


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
 * @example const { data:avatarsHeadshotsThumbnails } = await ClassicThumbnailsApi.avatarsHeadshotsThumbnails({ userIds: [45348281], size:"720x720" });
 * @exampleData { "45348281": { state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } }
 * @exampleRawBody { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
 */
export const avatarsHeadshotsThumbnails = createApiMethod(async <UserId extends Identifier>(
  { userIds, size = "420x420", format = "WebP", isCircular }:
  { userIds: ArrayNonEmptyIfConst<UserId>, size?: AvatarsFullThumbnailsSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<UserId>, PrettifiedThumbnailsData<UserId>> => ({
  method: "GET",
  path: `/v1/users/avatar-headshot`,
  searchParams: { userIds, size, format, isCircular },
  name: `avatarsHeadshotsThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))

/**
 * Gets 3d avatar thumbnail for multiple users.
 * @category Avatar
 * @endpoint GET /v1/users/avatar-3d
 * 
 * @param userId The id of the user to get a 3d avatar thumbnail for.
 * 
 * @example const { data:avatar3dData } = await ClassicThumbnailsApi.avatar3dThumbnail({ userId: 45348281 });
 * @exampleData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 * @exampleRawBody { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
 */
export const avatar3dThumbnail = createApiMethod(async <UserId extends Identifier>(
  { userId }: { userId: UserId }
): ApiMethod<ThumbnailData<UserId>> => ({
  method: "GET",
  path: `/v1/users/avatar-3d`,
  searchParams: { userId },
  name: `avatar3dThumbnail`
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ OUTFITS ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets 3d outfit thumbnail for an outfit.
 * @category Outfits
 * @endpoint GET /v1/users/outfit-3d
 * 
 * @param outfitId The id of the outfit to get a 3d thumbnail for.
 * 
 * @example const { data:outfit3dData } = await ClassicThumbnailsApi.outfit3dThumbnail({ outfitId: 110540093 });
 * @exampleData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 * @exampleRawBody { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
 */
export const outfit3dThumbnail = createApiMethod(async <OutfitId extends Identifier>(
  { outfitId }: { outfitId: OutfitId }
): ApiMethod<ThumbnailData<OutfitId>> => ({
  method: "GET",
  path: `/v1/users/outfit-3d`,
  searchParams: { outfitId },
  name: `outfit3dThumbnail`,
}))

/**
 * Gets outfit thumbnail for multiple outfits.
 * @category Outfits
 * @endpoint GET /v1/users/outfits
 * 
 * @param outfitIds The ids of the outfits to get thumbnails for.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:outfitsThumbnails } = await ClassicThumbnailsApi.outfitsThumbnails({ outfitIds: [110540093] });
 * @exampleData { "110540093": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } }
 * @exampleRawBody { data: [ { targetId: 110540093, state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } ] }
 */
export const outfitsThumbnails = createApiMethod(async <OutfitId extends Identifier>(
  { outfitIds, size = "420x420", format = "WebP", isCircular }:
  { outfitIds: ArrayNonEmptyIfConst<OutfitId>, size?: OutfitSize, format?: ThumbnailFormat, isCircular?: boolean }
): ApiMethod<RawThumbnailsData<OutfitId>, PrettifiedThumbnailsData<OutfitId>> => ({
  method: "GET",
  path: `/v1/users/outfits`,
  searchParams: { userOutfitIds: outfitIds, size, format, isCircular },
  name: `outfitsThumbnails`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware( data, "targetId", ({ targetId, ...rest }) => (rest))
}))
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
 * const { data:thumbnails } = await ClassicThumbnailsApi.batchThumbnails({ requests: [
     {
       type: "AvatarHeadShot",
       targetId: 45348281,
       size: "720x720",
       format: "Png",
       isCircular: false
     }
   ]});
 * @exampleData { AvatarHeadShot: { "45348281": { requestId: null, errorCode: 0, errorMessage: "", state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } } }
 * @exampleRawBody { data: [ { requestId: null, errorCode: 0, errorMessage: "", targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
 */
export const batchThumbnails = createApiMethod(async <const BReq extends BatchRequest>(
  { requests }: { requests: BReq[] }
): ApiMethod<RawBatchThumbnailsData, PrettifiedBatchThumbnailsData<BReq>> => ({
  method: "POST",
  path: `/v1/batch`,
  body: requests,
  name: `batchThumbnails`,

  formatRawDataFn: ({ data }) => {
    const rawBodyDataLength = data.length - 1
    let insertedTypeData: any = data.map((item:any, i: number) => {
      item = { ...item }
      item.type = requests[rawBodyDataLength - i]?.type
      return item
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
    return formattedData as any
  }
}))