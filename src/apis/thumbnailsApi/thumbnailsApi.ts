import { forEach, map } from "p-iteration"
import { UnexpectedError } from "../../errors"
import { HttpHelper, HttpHelperType } from "../../utils/httpHelper"
import { createObjectMapByKeyWithMiddleware, createSearchParams } from "../../utils"
import { HandleApiErrors } from "../../utils/handleApiErrors"
import { AssetsData, Asset3dData, AssetAnimatedData, AssetSize, AvatarBustData, AvatarBustSize, AvatarFullData, AvatarFullSize, AvatarHeadshotData, AvatarHeadshotSize, BadgesData, BundlesData, BundleSize, DeveloperProductsData, DeveloperProductSize, GamePassesData, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIdsData, ThumbnailReturnPolicy, GamesIconSize, GroupEmblemSize, MetadataData, GamesIconsData, GroupsEmblemsData, PlacesIconsData, PlaceThumbnailSize, Avatar3dData, Outfit3dData, OutfitsData, OutfitSize, BatchRequest, BatchData, FormattedAssetsData, FormattedBadgesData, FormattedBundlesData, FormattedGamePassesData, FormattedGameFromThumbnailIdsData, FormattedGamesIconsData, FormattedDeveloperProductsData, FormattedGamesData, GamesData, FormattedGroupsEmblemsData, FormattedPlacesIconsData, FormattedAvatarFullData, FormattedAvatarBustData, FormattedAvatarHeadshotData, FormattedOutfitsData, BatchResponseElement } from "./thumbnailsApiTypes"
//import { Prettify } from "dist/utils/utilityTypes"


type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export class ThumbnailsApiClass {
  baseUrl: string
  http: HttpHelperType

  constructor(cookie?:string) {
    this.baseUrl = "https://thumbnails.roblox.com"

    this.http = new HttpHelper(this.baseUrl, cookie)
  }


  // [ ASSETS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/assets
  assets = async (assetIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: AssetSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAssetsData, rawData: AssetsData }
  > => {
    try {
      const searchParams = await createSearchParams({ assetIds, returnPolicy, size, format, isCircular })

      const { data:rawData } = await this.http.get<AssetsData>(`/v1/assets?${searchParams}`)
      const formattedData: FormattedAssetsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/assets-thumbnail-3d
  asset3d = async (assetId: number): Promise<
    { data: Asset3dData, rawData: Asset3dData }
  > => {
    try {
      const { data:rawData } = await this.http.get<Asset3dData>(`/v1/assets-thumbnail-3d?assetId=${assetId}`)
      return { data:rawData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/asset-thumbnail-animated
  assetAnimated = async (assetId: number): Promise<
    { data: AssetAnimatedData, rawData: AssetAnimatedData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AssetAnimatedData>(`/v1/asset-thumbnail-animated?assetId=${assetId}`)
      return { data:rawData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ BADGES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/badges/icons
  badges = async (badgeIds: number[], format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBadgesData, rawData: BadgesData }
  > => {
    try {
      const searchParams = await createSearchParams({ badgeIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<BadgesData>(`/v1/badges/icons?${searchParams}`)
      const formattedData: FormattedBadgesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
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
  bundles = async (bundleIds: number[], size: BundleSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedBundlesData, rawData: BundlesData }
  > => {
    try {
      const searchParams = await createSearchParams({ bundleIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<BundlesData>(`/v1/bundles/thumbnails?${searchParams}`)
      const formattedData: FormattedBundlesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
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
  developerProducts = async (developerProductIds: number[], size: DeveloperProductSize="420x420", format: "Png"|"Jpeg"="Png", isCircular: boolean=false): Promise<
    { data: FormattedDeveloperProductsData, rawData: DeveloperProductsData }
  > => {
    try {
      const searchParams = await createSearchParams({ developerProductIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<DeveloperProductsData>(`/v1/developer-products/icons?${searchParams}`)
      const formattedData: FormattedDeveloperProductsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
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
  gamePasses = async (gamePassIds: number[], format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamePassesData, rawData: GamePassesData }
  > => {
    try {
      const searchParams = await createSearchParams({ gamePassIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<GamePassesData>(`/v1/game-passes?${searchParams}`)
      const formattedData: FormattedGamePassesData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
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
  gameFromThumbnailIds = async (universeId: number, thumbnailIds: number[], size:GameThumbnailSize="768x432", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGameFromThumbnailIdsData, rawData: GameFromThumbnailIdsData }
  > => {
    try {
      const searchParams = await createSearchParams({ thumbnailIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<GameFromThumbnailIdsData>(`/v1/games/${universeId}/thumbnails?${searchParams}`)
      const formattedData: FormattedGameFromThumbnailIdsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 404])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/games/icons
  gamesIcons = async (universeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: GamesIconSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesIconsData, rawData: GamesIconsData }
  > => {
    try {
      const searchParams = await createSearchParams({ universeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<GamesIconsData>(`/v1/games/icons?${searchParams}`)
      const formattedData: FormattedGamesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId",
        async ({state, imageUrl}) => ({ state, imageUrl })
      )
      return { data:formattedData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  } 

  // GET /v1/games/multiget/thumbnails
  games = async (universeIds: number[], countPerUniverse: number=10, defaults: boolean=true, size:GameThumbnailSize="768x432", format:ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGamesData, rawData: GamesData }
  > => {
    try {
      const searchParams = await createSearchParams({ universeIds, countPerUniverse, defaults, size, format, isCircular })

      const { data:rawData } = await this.http.get<GamesData>(`/v1/games/multiget/thumbnails?${searchParams}`)
      const formattedData: FormattedGamesData = await createObjectMapByKeyWithMiddleware(rawData.data, "universeId",
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
  groupsEmblems = async (groupIds: number[], size: GroupEmblemSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedGroupsEmblemsData, rawData: GroupsEmblemsData }
  > => {
    try {
      const searchParams = await createSearchParams({ groupIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<GroupsEmblemsData>(`/v1/groups/icons?${searchParams}`)
      const formattedData: FormattedGroupsEmblemsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
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
  metadata = async (): Promise<
    { data: MetadataData, rawData: MetadataData }
  > => {
    try {
      const { data:rawData } = await this.http.get<MetadataData>(`/v1/metadata`)
      return { data: rawData as unknown as MetadataData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ PLACES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/places/gameicons
  placesIcons = async (placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedPlacesIconsData, rawData: PlacesIconsData }
  > => {
    try {
      const searchParams = await createSearchParams({ placeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<PlacesIconsData>(`/v1/places/gameicons?${searchParams}`)
      const formattedData: FormattedPlacesIconsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
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
  avatarFull = async (userIds: number[], size: AvatarFullSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarFullData, rawData: AvatarFullData }
  > => {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarFullData>(`/v1/users/avatar?${searchParams}`)
      const formattedData: FormattedAvatarFullData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-3d
  avatar3d = async (userId: number): Promise<
    { data: Avatar3dData, rawData: Avatar3dData }
  > => {
    try {
      const searchParams = await createSearchParams({ userId })

      const { data:rawData } = await this.http.get<Avatar3dData>(`/v1/users/avatar-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-bust
  avatarBust = async (userIds: number[], size: AvatarBustSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarBustData, rawData: AvatarBustData }
  > => {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarBustData>(`/v1/users/avatar-bust?${searchParams}`)
      const formattedData: FormattedAvatarBustData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
      )
      return { data: formattedData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-headshot
  avatarHeadshot = async (userIds: number[], size: AvatarHeadshotSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedAvatarHeadshotData, rawData: AvatarHeadshotData }
  > => {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<AvatarHeadshotData>(`/v1/users/avatar-headshot?${searchParams}`)
      const formattedData: FormattedAvatarHeadshotData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
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
  outfit3d = async (outfitId: number): Promise<
    { data: Outfit3dData, rawData: Outfit3dData }
  > => {
    try {
      const searchParams = await createSearchParams({ outfitId })

      const { data:rawData } = await this.http.get<Outfit3dData>(`/v1/users/outfit-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/outfits
  outfits = async (userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: FormattedOutfitsData, rawData: OutfitsData }
  > => {
    try {
      const searchParams = await createSearchParams({ userOutfitIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<OutfitsData>(`/v1/users/outfits?${searchParams}`)
      const formattedData: FormattedOutfitsData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "targetId", async ({ state, imageUrl }) => ({ state, imageUrl })
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
  batch = async <BReq extends BatchRequest>(requests: readonly BReq[]): Promise<
    { data: Record<BReq["type"], Record<BReq["targetId"], Prettify<BatchResponseElement>>>, rawData: BatchData }
  > => {
    try {
      const { data:rawData } = await this.http.post<BatchData>(`/v1/batch`, requests)

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
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const ThumbnailsApi = new ThumbnailsApiClass()


