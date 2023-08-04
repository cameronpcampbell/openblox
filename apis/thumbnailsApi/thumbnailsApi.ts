import { forEach, map } from "p-iteration"
import { UnexpectedError } from "../../errors"
import { HttpHelper, HttpHelperType } from "../../httpHelper"
import { CreateObjectMapByKeyWithMiddleware, createSearchParams } from "../../utils"
import { HandleApiErrors } from "../handleApiErrors"
import { AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustData, AvatarBustSize, AvatarFullData, AvatarFullSize, AvatarHeadshotData, AvatarHeadshotSize, RawAssetsData, RawAsset3dData, RawAssetAnimatedData, RawAvatarBustData, RawAvatarFullData, RawAvatarHeadshotData, BadgesData, RawBadgesData, BundlesData, RawBundlesData, BundleSize, DeveloperProductsData, RawDeveloperProductsData, DeveloperProductSize, RawGamePassesData, GamePassesData, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIdsData, RawGameFromThumbnailIdsData, ThumbnailReturnPolicy, GamesIconSize, GamesData, RawGamesData, GroupEmblemSize, MetadataData, RawMetadataData, GamesIconsData, RawGamesIconsData, GroupsEmblemsData, RawGroupsEmblemsData, PlacesIconsData, RawPlacesIconsData, PlaceThumbnailSize, Avatar3dData, RawAvatar3dData, RawOutfit3dData, Outfit3dData, OutfitsData, RawOutfitsData, OutfitSize, BatchRequest, BatchData, RawBatchData } from "./thumbnailsApiTypes"

export class ThumbnailsApiClass {
  baseUrl: string
  http: HttpHelperType

  constructor(cookie?:string) {
    this.baseUrl = "https://thumbnails.roblox.com"

    this.http = new HttpHelper(this.baseUrl, cookie)
  }


  // [ ASSETS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/assets
  async assets(assetIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: AssetSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: AssetsData, rawData: RawAssetsData }
  > {
    try {
      const searchParams = await createSearchParams({ assetIds, returnPolicy, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawAssetsData>(`/v1/assets?${searchParams}`)
      const formattedData: AssetsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/assets-thumbnail-3d
  async asset3d(assetId: number): Promise<
    { data: Asset3dData, rawData: RawAsset3dData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAsset3dData>(`/v1/assets-thumbnail-3d?assetId=${assetId}`)
      return { data:rawData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/asset-thumbnail-animated
  async assetAnimated(assetId: number): Promise<
    { data: AssetAnimatedData, rawData: RawAssetAnimatedData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAssetAnimatedData>(`/v1/asset-thumbnail-animated?assetId=${assetId}`)
      return { data:rawData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ BADGES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/badges/icons
  async badges(badgeIds: number[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: BadgesData, rawData: RawBadgesData }
  > {
    try {
      const searchParams = await createSearchParams({ badgeIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<RawBadgesData>(`/v1/badges/icons?${searchParams}`)
      const formattedData: BadgesData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ BUNDLES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/bundles/thumbnails
  async bundles(bundleIds: number[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: BundlesData, rawData: RawBundlesData }
  > {
    try {
      const searchParams = await createSearchParams({ bundleIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawBundlesData>(`/v1/bundles/thumbnails?${searchParams}`)
      const formattedData: BundlesData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ DEVELOPER PRODUCTS ] ////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/developer-products/icons
  async developerProducts(developerProductIds: number[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: DeveloperProductsData, rawData: RawDeveloperProductsData }
  > {
    try {
      const searchParams = await createSearchParams({ developerProductIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawDeveloperProductsData>(`/v1/developer-products/icons?${searchParams}`)
      const formattedData: DeveloperProductsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ GAME PASSES ] ///////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/game-passes
  async gamePasses(gamePassIds: number[], format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: GamePassesData, rawData: RawGamePassesData }
  > {
    try {
      const searchParams = await createSearchParams({ gamePassIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<RawGamePassesData>(`/v1/game-passes?${searchParams}`)
      const formattedData: GamePassesData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ GAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/games/{universeId}/thumbnails
  async gameFromThumbnailIds(universeId: number, thumbnailIds: number[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: GameFromThumbnailIdsData, rawData: RawGameFromThumbnailIdsData }
  > {
    try {
      const searchParams = await createSearchParams({ thumbnailIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGameFromThumbnailIdsData>(`/v1/games/${universeId}/thumbnails?${searchParams}`)
      const formattedData: GameFromThumbnailIdsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 404])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/games/icons
  async gamesIcons(universeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: GamesIconsData, rawData: RawGamesIconsData }
  > {
    try {
      const searchParams = await createSearchParams({ universeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGamesIconsData>(`/v1/games/icons?${searchParams}`)
      const formattedData: GamesIconsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  } 

  // GET /v1/games/multiget/thumbnails
  async games(universeIds: number[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: GamesData, rawData: RawGamesData }
  > {
    try {
      const searchParams = await createSearchParams({ universeIds, countPerUniverse, defaults, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGamesData>(`/v1/games/multiget/thumbnails?${searchParams}`)
      const formattedData: GamesData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "universeId",
        async ({ error, thumbnails }) => ({ error, thumbnails })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  } 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ GROUP EMBLEM ] //////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/groups/icons
  async groupsEmblems(groupIds: number[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: GroupsEmblemsData, rawData: RawGroupsEmblemsData }
  > {
    try {
      const searchParams = await createSearchParams({ groupIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGroupsEmblemsData>(`/v1/groups/icons?${searchParams}`)
      const formattedData: GroupsEmblemsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  } 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ METADATA ] //////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/metadata
  async metadata(): Promise<
    { data: MetadataData, rawData: RawMetadataData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawMetadataData>(`/v1/metadata`)
      return { data: rawData as unknown as MetadataData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ PLACES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/places/gameicons
  async placesIcons(placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: PlacesIconsData, rawData: RawPlacesIconsData }
  > {
    try {
      const searchParams = await createSearchParams({ placeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawPlacesIconsData>(`/v1/places/gameicons?${searchParams}`)
      const formattedData: PlacesIconsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  // [ AVATAR ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/avatar
  async avatarFull(userIds: number[], size: AvatarFullSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: AvatarFullData, rawData: RawAvatarFullData }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarFullData>(`/v1/users/avatar?${searchParams}`)
      const formattedData: AvatarFullData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-3d
  async avatar3d(userId: number): Promise<
    { data: Avatar3dData, rawData: RawAvatar3dData }
  > {
    try {
      const searchParams = await createSearchParams({ userId })

      const { data:rawData } = await this.http.get<RawAvatar3dData>(`/v1/users/avatar-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-bust
  async avatarBust(userIds: number[], size: AvatarBustSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: AvatarBustData, rawData: RawAvatarBustData }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarBustData>(`/v1/users/avatar-bust?${searchParams}`)
      const formattedData: AvatarBustData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-headshot
  async avatarHeadshot(userIds: number[], size: AvatarHeadshotSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: AvatarHeadshotData, rawData: RawAvatarHeadshotData }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarHeadshotData>(`/v1/users/avatar-headshot?${searchParams}`)
      const formattedData: AvatarHeadshotData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ OUTFITS ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/outfit-3d
  async outfit3d(outfitId: number): Promise<
    { data: Outfit3dData, rawData: RawOutfit3dData }
  > {
    try {
      const searchParams = await createSearchParams({ outfitId })

      const { data:rawData } = await this.http.get<RawOutfit3dData>(`/v1/users/outfit-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/outfits
  async outfits(userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: OutfitsData, rawData: RawOutfitsData }
  > {
    try {
      const searchParams = await createSearchParams({ userOutfitIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawOutfitsData>(`/v1/users/outfits?${searchParams}`)
      const formattedData: OutfitsData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
        async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ BATCH ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // POST /v1/batch
  async batch(requests: BatchRequest[]): Promise<
    { data: BatchData, rawData: RawBatchData }
  > {
    try {
      const { data:rawData } = await this.http.post<RawBatchData>(`/v1/batch`, requests)

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

      return { data: formattedData as BatchData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const ThumbnailsApi = new ThumbnailsApiClass()