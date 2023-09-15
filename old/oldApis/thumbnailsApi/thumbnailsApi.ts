// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach, map } from "p-iteration"

import { HttpHelper } from "../../lib/http/httpHelper"
import { createObjectMapByKeyWithMiddleware, createSearchParams } from "../../lib/lib.utils"
import { FindSettings } from "../../lib/apis/cacheAdapters/cacheAdapters.utils"
import { ApiFuncBaseHandler as BaseHandler } from "../../lib/apis/apis.utils"
import { FetchAdapter } from "../../lib/http/httpAdapters/fetchAdapter"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustSize, AvatarFullSize, AvatarHeadshotSize, BadgesData, BundlesData, BundleSize, DeveloperProductsData, DeveloperProductSize, GamePassesData, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIdsData, ThumbnailReturnPolicy, GamesIconSize, GroupEmblemSize, MetadataData, GamesIconsData, GroupsEmblemsData, PlacesIconsData, PlaceThumbnailSize, Avatar3dData, Outfit3dData, OutfitsData, OutfitSize, BatchRequest, BatchData, FormattedAssetsData, FormattedBadgesData, FormattedBundlesData, FormattedGamePassesData, FormattedGameFromThumbnailIdsData, FormattedGamesIconsData, FormattedDeveloperProductsData, FormattedGamesData, GamesData, FormattedGroupsEmblemsData, FormattedPlacesIconsData, FormattedOutfitsData, BatchResponseElement, AvatarsBustsData, FormattedAvatarsBustsData, FormattedAvatarsFullData, AvatarsFullData, FormattedAvatarsHeadshotsData, AvatarsHeadshotsData
} from "./thumbnailsApi.types"
import type { PrettifyKeyof } from "../../lib/lib.types"
import type { ApiMethods } from "../../lib/apis/apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class ThumbnailsApiClass {
  baseUrl: `https://${string}`
  http: HttpHelper
  name: string
  apiCacheMiddleware: any

  constructor(
    { cookie, apiCacheMiddleware, csrfRetries, httpAdapter }:
    { cookie?: string, apiCacheMiddleware?: any, csrfRetries?: number, httpAdapter?: any }
  ) {
    this.baseUrl = "https://thumbnails.roblox.com"
    this.name = "ThumbnailsApiClass"
    this.apiCacheMiddleware = apiCacheMiddleware

    this.http = new HttpHelper({baseUrl: this.baseUrl, cookie, apiCacheMiddleware, csrfRetries, httpAdapter})
  }

  private getCallerFunctionName() {
    try {
      throw new Error();
    } catch (error: any) {
      const stackLines = error.stack.split('\n');
      const callerLine = stackLines[2];
      const functionName = (/at (\S+)/.exec(callerLine) as any)[1];
      const classRegex = new RegExp('^' + this.name + '\\.');
      return functionName.replace(classRegex, '');
    }
  }

  private async findSettings(funcName: string) {
    return await FindSettings(this.apiCacheMiddleware?.arguments?.included, this.name, funcName)
  }


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
   * @example const { data:assetsThumbnails } = await ThumbnailsApi.assets([7229442422], "PlaceHolder", "420x420");
   * @exampleData { "7229442422": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } }
   * @exampleRawData { data: [ { targetId: 7229442422, state: "Completed", imageUrl: "https://tr.rbxcdn.com/7da8e78d9e2e303f0122c355f19f66d5/420/420/Image/Png" } ] }
   */
  assets = async (assetIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: AssetSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAssetsData, rawData: AssetsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AssetsData>("/v1/assets", {
        searchParams: { assetIds, returnPolicy, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedAssetsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res } 
    }, [400, 403]) 
  }

  /**
   * Gets 3d thumbnail for an asset.
   * @category Assets
   * @endpoint GET /v1/assets-thumbnail-3d
   * 
   * @param assetId The id of the asset to get a 3d thumbnail for.
   * 
   * @example const { data:asset3dData } = await ThumbnailsApi.asset3d(6768917255);
   * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
   * @exampleRawData { targetId: 6768917255, state: "Completed", imageUrl: 'https://t2.rbxcdn.com/30ac72dfa05dff91baae9b8c0f9049e3' }
   */
  asset3d = async (assetId: number): Promise<
    { data: Asset3dData, rawData: Asset3dData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<Asset3dData>("/v1/assets-thumbnail-3d", {
        searchParams: { assetId },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data:rawData, rawData, res }
    }, [400])
  }

  /**
   * Gets animated thumbnail for an asset.
   * @category Assets
   * @endpoint GET /v1/asset-thumbnail-animated
   * 
   * @param assetId The id of the asset to get an animated thumbnail for.
   * 
   * @example const { data:assetAnimatedData } = await ThumbnailsApi.assetAnimated(6768917255);
   * @exampleData { targetId: 6768917255, state: "Completed", imageUrl: null }
   * @exampleRawData { targetId: 6768917255, state: "Completed", imageUrl: null }
   */
  assetAnimated = async (assetId: number): Promise<
    { data: AssetAnimatedData, rawData: AssetAnimatedData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AssetAnimatedData>("/v1/asset-thumbnail-animated", {
        searchParams: { assetId },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data:rawData, rawData, res }
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
   * @example const { data:badgesThumbnails } = await ThumbnailsApi.badges([2124533401]);
   * @exampleData  { "2124533401": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } }
   * @exampleRawData { data: [ { targetId: 2124533401, state: "Completed", imageUrl: "https://tr.rbxcdn.com/87105a9a85ea09e7591cfdd3f0825225/150/150/Image/Png" } ] }
   */
  badges = async (badgeIds: number[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBadgesData, rawData: BadgesData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<BadgesData>("/v1/badges/icons", {
        searchParams: { badgeIds, size:"150x150", format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedBadgesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData, res }
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
   * @example const { data:bundlesThumbnails } = await ThumbnailsApi.bundles([181]);
   * @exampleData { "181": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } }
   * @exampleRawData { data: [ { targetId: 181, state: "Completed", imageUrl: "https://tr.rbxcdn.com/12ff41b547ee75865bb60d0f3ae5508b/420/420/Avatar/Png" } ] }
   */
  bundles = async (bundleIds: number[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBundlesData, rawData: BundlesData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<BundlesData>("/v1/bundles/thumbnails", {
        searchParams: { bundleIds, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedBundlesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
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
   * @example const { data:developerProductsThumbnails } = await ThumbnailsApi.developerProducts([3616425]);
   * @exampleData { "3616425": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } }
   * @exampleRawData { data: [ { targetId: 3616425, state: "Completed", imageUrl: "https://tr.rbxcdn.com/3e495c43b44b85cd3dd1afee9df3636b/420/420/Image/Png" } ] }
   */
  developerProducts = async (developerProductIds: number[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedDeveloperProductsData, rawData: DeveloperProductsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<DeveloperProductsData>("/v1/developer-products/icons", {
        searchParams: { developerProductIds, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedDeveloperProductsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
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
   * @example const { data:gamePassesThumbnails } = await ThumbnailsApi.gamePasses([9063647]);
   * @exampleData { "9063647": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } }
   * @exampleRawData { data: [ { targetId: 9063647, state: "Completed", imageUrl: "https://tr.rbxcdn.com/4464935a3f7b124ba0a315cb3ff8113d/150/150/Image/Png" } ] }
   */
  gamePasses = async (gamePassIds: number[], format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamePassesData, rawData: GamePassesData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GamePassesData>("/v1/game-passes", {
        searchParams: { gamePassIds, size:"150x150", format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedGamePassesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      
      return { data:formattedData, rawData, res }
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
   * @example const { data:gameThumbnails } = await ThumbnailsApi.gameFromThumbnailIds(1685831367, [5030792576]);
   * @exampleData { "5030792576": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } }
   * @exampleRawData { data: [ { targetId: "5030792576", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" } ] }
   */
  gameFromThumbnailIds = async (universeId: number, thumbnailIds: number[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGameFromThumbnailIdsData, rawData: GameFromThumbnailIdsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GameFromThumbnailIdsData>(`/v1/games/${universeId}/thumbnails`, {
        searchParams: { thumbnailIds, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedGameFromThumbnailIdsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
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
  gamesIcons = async (universeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesIconsData, rawData: GamesIconsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GameFromThumbnailIdsData>("/v1/games/icons", {
        searchParams: { universeIds, size, format, isCircular, returnPolicy },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedGamesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
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
   * @example const { data:gamesThumbnails } = await ThumbnailsApi.games([1685831367]);
   * @exampleData { '1685831367': { error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } }
   * @exampleRawData { data: [ { universeId: 1685831367, error: null, thumbnails: [ { targetId: 5130624799, state: "Completed", imageUrl: "https://tr.rbxcdn.com/0f512e630d474b19fa1df57c23f43e38/768/432/Image/Png" }, { targetId: "Completed", state: "Completed", imageUrl: "https://tr.rbxcdn.com/e997db8b4e41b08acb49b9d2bb021b23/768/432/Image/Png" }, { targetId: 5030792559, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b1692e3153721873906198c78ebfba91/768/432/Image/Png" }, { targetId: 5055393500, state: "Completed", imageUrl: "https://tr.rbxcdn.com/40915531d1f92e2f4307069c7c1233e3/768/432/Image/Png" } ] } ] }
   */
  games = async (universeIds: number[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesData, rawData: GamesData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GamesData>("/v1/games/multiget/thumbnails", {
        searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedGamesData = await createObjectMapByKeyWithMiddleware(rawData.data, "universeId",
        async ({ error, thumbnails }) => ({ error, thumbnails })
      )

      return { data:formattedData, rawData, res }
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
  groupsEmblems = async (groupIds: number[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGroupsEmblemsData, rawData: GroupsEmblemsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GroupsEmblemsData>("/v1/groups/icons", {
        searchParams: { groupIds, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedGroupsEmblemsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
    }, [400])
  } 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ METADATA ] //////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets thumbnail metadata.
   * @category Metadata
   * @endpoint GET /v1/metadata
   */
  metadata = async (): Promise<
    { data: MetadataData, rawData: MetadataData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<MetadataData>("/v1/metadata", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData as unknown as MetadataData, rawData, res }
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
  placesIcons = async (placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedPlacesIconsData, rawData: PlacesIconsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<PlacesIconsData>("/v1/places/gameicons", {
        searchParams: { placeIds, returnPolicy, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedPlacesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )

      return { data:formattedData, rawData, res }
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
   * @example const { data:avatarsFullThumbnails } = await ThumbnailsApi.avatarsFull([45348281], "150x150");
   * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } }
   * @exampleRawData { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://tr.rbxcdn.com/b91cd7a2d531a50be786e08c7739c56a/150/150/Avatar/Png" } ] }
   */
  avatarsFull = async (userIds: number[], size: AvatarFullSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarsFullData, rawData: AvatarsFullData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AvatarsFullData>("/v1/users/avatar", {
        searchParams: { size, format, isCircular, userIds },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedAvatarsFullData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )

      return { data: formattedData, rawData, res }
    }, [400, 403])
  }

  /**
   * Gets 3d avatar thumbnail for multiple users.
   * @category Avatar
   * @endpoint GET /v1/users/avatar-3d
   * 
   * @param userId The id of the user to get a 3d avatar thumbnail for.
   * 
   * @example const { data:avatar3dData } = await ThumbnailsApi.avatar3d(45348281);
   * @exampleData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
   * @exampleRawData { targetId: 45348281, state: "Completed", imageUrl: "https://t6.rbxcdn.com/7927ecfe11399126171f4cd2939dc511" }
   */
  avatar3d = async (userId: number): Promise<
    { data: Avatar3dData, rawData: Avatar3dData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<Avatar3dData>("/v1/users/avatar-3d", {
        searchParams: { userId },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData, rawData, res }
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
   * @example const { data:avatarsBustsThumbnails } = await ThumbnailsApi.avatarsBusts([45348281], "150x150");
   * @exampleData { "45348281": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png" } }
   * @exampleRawData { data: [ { targetId: 45348281, state: 'Completed', imageUrl: 'https://tr.rbxcdn.com/4b3c0e5b4efdda3bdfd94e77b2850ea5/150/150/AvatarBust/Png' } ] }
   */
  avatarsBusts = async (userIds: number[], size: AvatarBustSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarsBustsData, rawData: AvatarsBustsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AvatarsBustsData>("/v1/users/avatar-bust", {
        searchParams: { size, format, isCircular, userIds },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedAvatarsBustsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )

      return { data: formattedData, rawData, res }
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
   * @example const { data:avatarsHeadshotsThumbnails } = await ThumbnailsApi.avatarsHeadshots([45348281], "720x720");
   * @exampleData { "45348281": { state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } }
   * @exampleRawData { data: [ { targetId: 45348281, state: "Completed", imageUrl: "https://t0.rbxcdn.com/697567606503f6484a06e8617307d54f" } ] }
   */
  avatarsHeadshots = async (userIds: number[], size: AvatarHeadshotSize="720x720", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarsHeadshotsData, rawData: AvatarsHeadshotsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AvatarsHeadshotsData>("/v1/users/avatar-headshot", {
        searchParams: { size, format, isCircular, userIds },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedAvatarsHeadshotsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )

      return { data: formattedData, rawData, res }
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
   * @example const { data:outfit3dData } = await ThumbnailsApi.outfit3d(110540093);
   * @exampleData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
   * @exampleRawData { targetId: 110540093, state: "Completed", imageUrl: "https://t7.rbxcdn.com/24eea0d840fe712230943a3bead4659a" }
   */
  outfit3d = async (outfitId: number): Promise<
    { data: Outfit3dData, rawData: Outfit3dData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<Outfit3dData>("/v1/users/outfit-3d", {
        searchParams: { outfitId },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData, rawData, res }
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
   * @example const { data:outfitsThumbnails } = await ThumbnailsApi.outfits([110540093]);
   * @exampleData { "110540093": { state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } }
   * @exampleRawData { data: [ { targetId: 110540093, state: "Completed", imageUrl: "https://tr.rbxcdn.com/41b9a3552f17cc2d7bca01b37be25d40/420/420/Avatar/Png" } ] }
   */
  outfits = async (userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedOutfitsData, rawData: OutfitsData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<OutfitsData>("/v1/users/outfits", {
        searchParams: { userOutfitIds, size, format, isCircular },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedOutfitsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      
      return { data: formattedData, rawData, res }
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
   * const { data:thumbnails } = await ThumbnailsApi.batch([
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
  batch = async <BReq extends BatchRequest>(requests: readonly BReq[]): Promise<
    { data: Record<BReq["type"], Record<BReq["targetId"], PrettifyKeyof<BatchResponseElement>>>, rawData: BatchData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.post<BatchData>("/v1/batch", {
        body: requests,
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
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

      return { data: formattedData as Record<BReq["type"], Record<BReq["targetId"], BatchResponseElement>>, rawData, res }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const ThumbnailsApi = new ThumbnailsApiClass({}) as ApiMethods<ThumbnailsApiClass>


