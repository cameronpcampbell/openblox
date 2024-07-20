import type { Identifier, ObjectPrettify, ObjectPrettifyDeep, UnionPrettify, UnionToArray, Url } from "typeforge"

export type ThumbnailFormat = "Png" | "WebP"

export type ThumbnailReturnPolicy = "PlaceHolder" | "AutoGenerated" | "ForceAutoGenerated"

type ThumbnailVersion = UnionPrettify<"TN2" | "TN3">

export type ThumbnailData<TargetId extends Identifier | undefined = undefined> = ObjectPrettify<(
  (TargetId extends undefined ? {} : { targetId: TargetId })
  & {
    state:  "Completed" | "Pending" | "Error",
    imageUrl: Url,
    version: ThumbnailVersion
  }
)>

export type RawThumbnailsData<UserId extends Identifier> = ObjectPrettify<{
  data: ThumbnailData<UserId>[]
}>
export type PrettifiedThumbnailsData<UserId extends Identifier> = ObjectPrettify<{
  [Key in UserId]: ThumbnailData | undefined
}>

// [ ASSETS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/assets
export type AssetSize = "30x30"|"42x42"|"50x50"|"60x62"|"75x75"|"110x110"|"140x140"|"150x150"|"160x100"|"160x600"|"250x250"|"256x144"|"300x250"|"304x166"|"384x216"|"396x216"|"420x420"|"480x270"|"512x512"|"576x324"|"700x700"|"728x90"|"768x432"|"1200x80"

// GET /v1/asset-thumbnail-animated
export type AssetAnimatedThumbnailData<AssetId extends Identifier> = ObjectPrettify<{
  targetId: AssetId,
  state: "Completed" | "Pending" | "Error",
  imageUrl: string,
  version: ThumbnailVersion
}>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BUNDLES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
export type BundleSize = "150x150"|"420x420"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DEVELOPER PRODUCTS ] ////////////////////////////////////////////////////////////////////////////////////////////
export type DeveloperProductSize = "150x150"|"420x420"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
export type GameThumbnailSize = "256x144" | "384x216" | "480x270" | "576x324" | "768x432"

// GET /v1/games/multiget/thumbnails ---------------------------------------------------------------------------------
type GamesThumbnailsData = ObjectPrettify<{
  error: null,
  thumbnails: {
    targetId: number,
    state:  "Completed" | "Pending" | "Error",
    imageUrl: Url,
    version: ThumbnailVersion
  }[]
} | {
  error: {
    code: number,
    message: string,
    userFacingMessage: string,
    field: string,
    fieldData: string
  },
  thumbnails: null
}>


export type RawGamesThumbnailsData<UniverseId extends Identifier> = ObjectPrettifyDeep<{
  data: ({ universeId: UniverseId } & GamesThumbnailsData)[]
}>

export type PrettifiedGamesThumbnailsData<UniverseId extends Identifier> = ObjectPrettifyDeep<{
  [Key in UniverseId]: GamesThumbnailsData | undefined
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/icons -----------------------------------------------------------------------------------------------
export type GamesIconSize = "50x50" | "128x128" | "150x150" | "256x256" | "512x512"
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [ Group Emblem ] //////////////////////////////////////////////////////////////////////////////////////////////////
// /v1/groups/icons
export type GroupEmblemSize = "150x150"|"420x420"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ Metadata ] //////////////////////////////////////////////////////////////////////////////////////////////////////
// /v1/metadata
export type ThumbnailsMetadataData = ObjectPrettify<{
  isWebappUseCacheEnabled: boolean,
  webappCacheExpirationTimspan: string
}>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PLACES ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// /v1/places/gameicons
export type PlaceThumbnailSize = "50x50"|"128x128"|"150x150"|"256x256"|"512x512"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ AVATAR ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/avatar
export type AvatarsFullThumbnailsSize = UnionPrettify<"30x30"|"48x48"|"60x60"|"75x75"|"100x100"|"110x110"|"140x140"|"150x150"|"180x180"|"250x250"|"352x352"|"420x420"|"720x720">

// GET /v1/users/avatar-bust
export type AvatarBustThumbnailsSize = "48x48"|"50x50"|"60x60"|"75x75"|"100x100"|"150x150"|"180x180"|"352x352"|"420x420"

// GET /v1/users/avatar-headshot
export type AvatarHeadshotThumbnailsSize = "48x48"|"50x50"|"60x60"|"75x75"|"100x100"|"110x110"|"150x150"|"180x180"|"352x352"|"420x420"|"720x720"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ OUTFITS ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/outfits
export type OutfitSize = "150x150"|"420x420"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BATCH ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
export type BatchType = "Avatar"|"AvatarHeadShot"|"GameIcon"|"BadgeIcon"|"GameThumbnail"|"GamePass"|"Asset"|"BundleThumbnail"|"Outfit"|"GroupIcon"|"DeveloperProduct"|"AutoGeneratedAsset"|"AvatarBust"|"PlaceIcon"|"AutoGeneratedGameIcon"|"ForceAutoGeneratedGameIcon"

type BatchSizes = ObjectPrettify<{
  "Avatar": AvatarsFullThumbnailsSize,
  "AvatarHeadShot": AvatarHeadshotThumbnailsSize,
  "AvatarBust": AvatarBustThumbnailsSize
}>
type BatchRequestBase<Type, Size = `${number}x${number}`> = ObjectPrettify<{
  requestId?: string,
  targetId: Identifier,
  token?: string,
  alias?: string,
  type: Type,
  size: UnionPrettify<Size>,
  format: string,
  isCircular: boolean
}>

export type BatchRequest = {
  [Key in BatchType]: BatchRequestBase<Key, Key extends keyof BatchSizes ? BatchSizes[Key] : `${number}x${number}`>
}[BatchType]

export type BatchResponseElement<RequestId extends string|null = null> = ObjectPrettify<{
  requestId: NonNullable<RequestId> extends string|null ? RequestId : string|null,
  errorCode: number,
  errorMessage: string,
  targetId: number,
  state: "Completed" | "Pending" | "Error",
  imageUrl?: string,
  version?: string
}>

// POST /v1/batch
export type RawBatchThumbnailsData = ObjectPrettify<{
  data: BatchResponseElement[]
}>

export type PrettifiedBatchThumbnailsData<
  BReq extends BatchRequest,

  BReqArr extends any[] = UnionToArray<BReq>
> = ObjectPrettify<{
  [ TypeKey in BReq["type"]]: {
    // @ts-ignore | I can index `BReqArr[BReqKey]` with `type`.
    [ BReqKey in keyof BReqArr as BReqArr[BReqKey]["type"] extends TypeKey ? BReqArr[BReqKey]["targetId"] : never ]: (
      ObjectPrettify<{
        requestId: string | null,
        errorCode: number,
        errorMessage: string,
        state: "Completed" | "Pending" | "Error",
        imageUrl: Url,
        version: ThumbnailVersion
      }>
    )
  }
}>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////