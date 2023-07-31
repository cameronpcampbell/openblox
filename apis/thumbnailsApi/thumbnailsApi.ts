import { forEach, map } from "p-iteration"
import { UnexpectedError } from "../../errors"
import { HttpHelper, HttpHelperType } from "../../httpHelper"
import { CreateObjectMapByKeyWithMiddleware, createSearchParams } from "../../utils"
import { HandleApiErrors } from "../handleApiErrors"
import { Assets, Asset3d, AssetAnimated, AssetSize, AvatarBust, AvatarBustSize, AvatarFull, AvatarFullSize, AvatarHeadshot, AvatarHeadshotSize, RawAssets, RawAsset3d, RawAssetAnimated, RawAvatarBust, RawAvatarFull, RawAvatarHeadshot, Badges, RawBadges, Bundles, RawBundles, BundleSize, DeveloperProducts, RawDeveloperProducts, DeveloperProductSize, RawGamePasses, GamePasses, ThumbnailFormat, GameThumbnailSize, GameFromThumbnailIds, RawGameFromThumbnailIds, ThumbnailReturnPolicy, GamesIconSize, Games, RawGames, GroupEmblemSize, Metadata, RawMetadata, GamesIcons, RawGamesIcons, GroupsEmblems, RawGroupsEmblems, PlacesIcons, RawPlacesIcons, PlaceThumbnailSize, Avatar3d, RawAvatar3d, RawOutfit3d, Outfit3d, Outfits, RawOutfits, OutfitSize, BatchRequest, Batch, RawBatch } from "./thumbnailsApiTypes"

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
    { data: Assets, rawData: RawAssets }
  > {
    try {
      const searchParams = await createSearchParams({ assetIds, returnPolicy, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawAssets>(`/v1/assets?${searchParams}`)
      const formattedData: Assets = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Asset3d, rawData: RawAsset3d }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAsset3d>(`/v1/assets-thumbnail-3d?assetId=${assetId}`)
      return { data:rawData, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/asset-thumbnail-animated
  async assetAnimated(assetId: number): Promise<
    { data: AssetAnimated, rawData: RawAssetAnimated }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAssetAnimated>(`/v1/asset-thumbnail-animated?assetId=${assetId}`)
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
    { data: Badges, rawData: RawBadges }
  > {
    try {
      const searchParams = await createSearchParams({ badgeIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<RawBadges>(`/v1/badges/icons?${searchParams}`)
      const formattedData: Badges = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Bundles, rawData: RawBundles }
  > {
    try {
      const searchParams = await createSearchParams({ bundleIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawBundles>(`/v1/bundles/thumbnails?${searchParams}`)
      const formattedData: Bundles = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: DeveloperProducts, rawData: RawDeveloperProducts }
  > {
    try {
      const searchParams = await createSearchParams({ developerProductIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawDeveloperProducts>(`/v1/developer-products/icons?${searchParams}`)
      const formattedData: DeveloperProducts = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: GamePasses, rawData: RawGamePasses }
  > {
    try {
      const searchParams = await createSearchParams({ gamePassIds, size:"150x150", format, isCircular })

      const { data:rawData } = await this.http.get<RawGamePasses>(`/v1/game-passes?${searchParams}`)
      const formattedData: GamePasses = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: GameFromThumbnailIds, rawData: RawGameFromThumbnailIds }
  > {
    try {
      const searchParams = await createSearchParams({ thumbnailIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGameFromThumbnailIds>(`/v1/games/${universeId}/thumbnails?${searchParams}`)
      const formattedData: GameFromThumbnailIds = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: GamesIcons, rawData: RawGamesIcons }
  > {
    try {
      const searchParams = await createSearchParams({ universeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGamesIcons>(`/v1/games/icons?${searchParams}`)
      const formattedData: GamesIcons = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Games, rawData: RawGames }
  > {
    try {
      const searchParams = await createSearchParams({ universeIds, countPerUniverse, defaults, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGames>(`/v1/games/multiget/thumbnails?${searchParams}`)
      const formattedData: Games = await CreateObjectMapByKeyWithMiddleware(rawData.data, "universeId",
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
    { data: GroupsEmblems, rawData: RawGroupsEmblems }
  > {
    try {
      const searchParams = await createSearchParams({ groupIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawGroupsEmblems>(`/v1/groups/icons?${searchParams}`)
      const formattedData: GroupsEmblems = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Metadata, rawData: RawMetadata }
  > {
    try {
      const { data:rawData } = await this.http.get<RawMetadata>(`/v1/metadata`)
      return { data: rawData as unknown as Metadata, rawData }

    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ PLACES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/places/gameicons
  async placesIcons(placeIds: number[], returnPolicy: ThumbnailReturnPolicy="PlaceHolder", size: PlaceThumbnailSize="512x512", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: PlacesIcons, rawData: RawPlacesIcons }
  > {
    try {
      const searchParams = await createSearchParams({ placeIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawPlacesIcons>(`/v1/places/gameicons?${searchParams}`)
      const formattedData: PlacesIcons = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: AvatarFull, rawData: RawAvatarFull }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarFull>(`/v1/users/avatar?${searchParams}`)
      const formattedData: AvatarFull = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Avatar3d, rawData: RawAvatar3d }
  > {
    try {
      const searchParams = await createSearchParams({ userId })

      const { data:rawData } = await this.http.get<RawAvatar3d>(`/v1/users/avatar-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/avatar-bust
  async avatarBust(userIds: number[], size: AvatarBustSize, format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: AvatarBust, rawData: RawAvatarBust }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarBust>(`/v1/users/avatar-bust?${searchParams}`)
      const formattedData: AvatarBust = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: AvatarHeadshot, rawData: RawAvatarHeadshot }
  > {
    try {
      const searchParams = await createSearchParams({ size, format, isCircular, userIds })

      const { data:rawData } = await this.http.get<RawAvatarHeadshot>(`/v1/users/avatar-headshot?${searchParams}`)
      const formattedData: AvatarHeadshot = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Outfit3d, rawData: RawOutfit3d }
  > {
    try {
      const searchParams = await createSearchParams({ outfitId })

      const { data:rawData } = await this.http.get<RawOutfit3d>(`/v1/users/outfit-3d?${searchParams}`)
      return { data: rawData, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/outfits
  async outfits(userOutfitIds: number[], size: OutfitSize="420x420", format: ThumbnailFormat="Png", isCircular: boolean=false): Promise<
    { data: Outfits, rawData: RawOutfits }
  > {
    try {
      const searchParams = await createSearchParams({ userOutfitIds, size, format, isCircular })

      const { data:rawData } = await this.http.get<RawOutfits>(`/v1/users/outfits?${searchParams}`)
      const formattedData: Outfits = await CreateObjectMapByKeyWithMiddleware(rawData.data, "targetId",
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
    { data: Batch, rawData: RawBatch }
  > {
    try {
      const { data:rawData } = await this.http.post<RawBatch>(`/v1/batch`, requests)

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

      return { data: formattedData as Batch, rawData }
      
    } catch (error:unknown) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const ThumbnailsApi = new ThumbnailsApiClass()