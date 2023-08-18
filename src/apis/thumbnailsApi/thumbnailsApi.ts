// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach, map } from "p-iteration"

import { HttpHelper } from "../../lib/http/httpHelper"
import { createObjectMapByKeyWithMiddleware, createSearchParams } from "../../lib/lib.utils"
import { FindSettings } from "../../lib/apis/cacheAdapters/cacheAdapters.utils"
import { ApiFuncBaseHandler as BaseHandler } from "../../lib/apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustData, AvatarBustSize, AvatarFullData, AvatarFullSize, AvatarHeadshotData, AvatarHeadshotSize, BadgesData, BundlesData, BundleSize, DeveloperProductsData, DeveloperProductSize, GamePassesData, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIdsData, ThumbnailReturnPolicy, GamesIconSize, GroupEmblemSize, MetadataData, GamesIconsData, GroupsEmblemsData, PlacesIconsData, PlaceThumbnailSize, Avatar3dData, Outfit3dData, OutfitsData, OutfitSize, BatchRequest, BatchData, FormattedAssetsData, FormattedBadgesData, FormattedBundlesData, FormattedGamePassesData, FormattedGameFromThumbnailIdsData, FormattedGamesIconsData, FormattedDeveloperProductsData, FormattedGamesData, GamesData, FormattedGroupsEmblemsData, FormattedPlacesIconsData, FormattedAvatarFullData, FormattedAvatarBustData, FormattedAvatarHeadshotData, FormattedOutfitsData, BatchResponseElement
} from "./thumbnailsApi.types"
import type { HttpHelperType } from "../../lib/http/httpHelper"
import type { PrettifyKeyof } from "../../lib/lib.types"
import type { ApiMethods } from "../../lib/apis/apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class ThumbnailsApiClass {
  baseUrl: `https://${string}`
  http: HttpHelperType
  name: string
  apiCacheMiddleware: any

  constructor(
    { cookie, apiCacheMiddleware, csrfRetries }:
    { cookie?: string, apiCacheMiddleware?: any, csrfRetries?: number }
  ) {
    this.baseUrl = "https://thumbnails.roblox.com"
    this.name = "ThumbnailsApiClass"
    this.apiCacheMiddleware = apiCacheMiddleware

    this.http = new HttpHelper({baseUrl: this.baseUrl, cookie, apiCacheMiddleware, csrfRetries})
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
   */
  assets = async (assetIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: AssetSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAssetsData, rawData: AssetsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ assetIds, returnPolicy, size, format, isCircular })

      const { data:rawData } = await this.http.get<AssetsData>(`/v1/assets?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedAssetsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
    }, [400, 403])
  }

  /**
   * Gets 3d thumbnail for an asset.
   * @category Assets
   * @endpoint GET /v1/assets-thumbnail-3d
   * 
   * @param assetId The id of the asset to get a 3d thumbnail for.
   */
  asset3d = async (assetId: number): Promise<
    { data: Asset3dData, rawData: Asset3dData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<Asset3dData>(`/v1/assets-thumbnail-3d?assetId=${assetId}`, undefined, cacheSettings)
      return { data:rawData, rawData }
    }, [400])
  }

  /**
   * Gets animated thumbnail for an asset.
   * @category Assets
   * @endpoint GET /v1/asset-thumbnail-animated
   * 
   * @param assetId The id of the asset to get an animated thumbnail for.
   */
  assetAnimated = async (assetId: number): Promise<
    { data: AssetAnimatedData, rawData: AssetAnimatedData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AssetAnimatedData>(`/v1/asset-thumbnail-animated?assetId=${assetId}`, undefined, cacheSettings)
      return { data:rawData, rawData }
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
   */
  badges = async (badgeIds: number[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBadgesData, rawData: BadgesData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ badgeIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<BadgesData>(`/v1/badges/icons?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedBadgesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  bundles = async (bundleIds: number[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBundlesData, rawData: BundlesData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ bundleIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<BundlesData>(`/v1/bundles/thumbnails?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedBundlesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  developerProducts = async (developerProductIds: number[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedDeveloperProductsData, rawData: DeveloperProductsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ developerProductIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<DeveloperProductsData>(`/v1/developer-products/icons?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedDeveloperProductsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  gamePasses = async (gamePassIds: number[], format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamePassesData, rawData: GamePassesData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ gamePassIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<GamePassesData>(`/v1/game-passes?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedGamePassesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  gameFromThumbnailIds = async (universeId: number, thumbnailIds: number[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGameFromThumbnailIdsData, rawData: GameFromThumbnailIdsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ thumbnailIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<GameFromThumbnailIdsData>(`/v1/games/${universeId}/thumbnails?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedGameFromThumbnailIdsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  gamesIcons = async (universeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesIconsData, rawData: GamesIconsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ universeIds, size, format, isCircular, returnPolicy })

      const { data:rawData } = await this.http.get<GamesIconsData>(`/v1/games/icons?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedGamesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  games = async (universeIds: number[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesData, rawData: GamesData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ universeIds, countPerUniverse, defaults, size, format, isCircular })

      const { data:rawData } = await this.http.get<GamesData>(`/v1/games/multiget/thumbnails?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedGamesData = await createObjectMapByKeyWithMiddleware(rawData.data, "universeId",
        async ({ error, thumbnails }) => ({ error, thumbnails })
      )
      return { data:formattedData, rawData }
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
   */
  groupsEmblems = async (groupIds: number[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGroupsEmblemsData, rawData: GroupsEmblemsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ groupIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<GroupsEmblemsData>(`/v1/groups/icons?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedGroupsEmblemsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
    { data: MetadataData, rawData: MetadataData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<MetadataData>(`/v1/metadata`, undefined, cacheSettings)
      return { data: rawData as unknown as MetadataData, rawData }
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
   */
  placesIcons = async (placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedPlacesIconsData, rawData: PlacesIconsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ placeIds, returnPolicy, size, format, isCircular })

      const { data:rawData } = await this.http.get<PlacesIconsData>(`/v1/places/gameicons?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedPlacesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }
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
   */
  avatarFull = async (userIds: number[], size: AvatarFullSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarFullData, rawData: AvatarFullData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarFullData>(`/v1/users/avatar?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedAvatarFullData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
    }, [400, 403])
  }

  /**
   * Gets 3d avatar thumbnail for multiple users.
   * @category Avatar
   * @endpoint GET /v1/users/avatar-3d
   * 
   * @param userId The id of the user to get a 3d avatar thumbnail for.
   */
  avatar3d = async (userId: number): Promise<
    { data: Avatar3dData, rawData: Avatar3dData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ userId })

      const { data:rawData } = await this.http.get<Avatar3dData>(`/v1/users/avatar-3d?${searchParams}`, undefined, cacheSettings)
      return { data: rawData, rawData }
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
   */
  avatarBust = async (userIds: number[], size: AvatarBustSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarBustData, rawData: AvatarBustData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarBustData>(`/v1/users/avatar-bust?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedAvatarBustData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
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
   */
  avatarHeadshot = async (userIds: number[], size: AvatarHeadshotSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarHeadshotData, rawData: AvatarHeadshotData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarHeadshotData>(`/v1/users/avatar-headshot?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedAvatarHeadshotData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
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
   */
  outfit3d = async (outfitId: number): Promise<
    { data: Outfit3dData, rawData: Outfit3dData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ outfitId })

      const { data:rawData } = await this.http.get<Outfit3dData>(`/v1/users/outfit-3d?${searchParams}`, undefined, cacheSettings)
      return { data: rawData, rawData }
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
   */
  outfits = async (userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedOutfitsData, rawData: OutfitsData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ userOutfitIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<OutfitsData>(`/v1/users/outfits?${searchParams}`, undefined, cacheSettings)
      const formattedData: FormattedOutfitsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
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
   */
  batch = async <BReq extends BatchRequest>(requests: readonly BReq[]): Promise<
    { data: Record<BReq["type"], Record<BReq["targetId"], PrettifyKeyof<BatchResponseElement>>>, rawData: BatchData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.post<BatchData>(`/v1/batch`, requests, undefined, undefined, cacheSettings)

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

      return { data: formattedData as Record<BReq["type"], Record<BReq["targetId"], BatchResponseElement>>, rawData }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const ThumbnailsApi = new ThumbnailsApiClass({}) as ApiMethods<ThumbnailsApiClass>


