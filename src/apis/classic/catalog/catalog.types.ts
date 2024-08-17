// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ISODateTime, Identifier, ObjectPrettify, UnionPrettify, IsLiteral } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

export type BundleType = UnionPrettify<"BodyParts" | "Animations" | "Shoes" | "DynamicHead" | "DynamicHeadAvatar">

type SaleLocationType = UnionPrettify<"NotApplicable" | "ShopOnly" | "MyExperiencesOnly" | "ShopAndMyExperiences" | "ExperiencesById" | "ShopAndAllExperiences" | "ExperiencesDevApiOnly" | "ShopAndExperiencesById">

type OneToSeventyNine = 
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |  13 | 14 | 15 | 16 | 17 |
  18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 |
  34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 |
  50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 |
  66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79;

type ItemStatus = UnionPrettify<"New" | "Sale" | "SaleTimer">

type ItemRestriction = UnionPrettify<"ThirteenPlus" | "LimitedUnique" | "Limited" | "BuildersClub" | "TurboBuildersClub" | "OutrageousBuildersClub" | "Rthro" | "Live" | "Collectible">

// [ Bundle ] ///////////////////////////////////////////////////////////////////
type Bundle<
  TemporalType extends ISODateTime | Date, BundleId extends Identifier = Identifier, BType extends BundleType = BundleType
> = ObjectPrettify<{
  id: BundleId,
  name: string,
  description: string,
  bundleType: BType,
  items: {
    id: Identifier,
    name: string,
    type: "Asset"
  }[],
  creator: {
    id: Identifier,
    name: string,
    type: "User" | "Group",
    hasVerifiedBadge: boolean
  },
  product: {
    id: Identifier,
    type: "productType",
    isPublicDomain: boolean,
    isForSale: boolean,
    priceInRobux: number,
    isFreee: boolean,
    noPriceText: string | null
  },
  collectibleItemDetail?: {
    collectibleItemId: string,
    collectibleProductId: string,
    price: number,
    lowestPrice: number,
    lowestResalePrice: number,
    totalQuantity: number,
    unitsAvailable: number,
    saleLocation: {
      saleLocationType: SaleLocationType,
      saleLocationTypeId: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
      universeIds: Identifier[],
      enabledUniverseIds: Identifier[]
    },
    hasResellers: boolean,
    saleStatus: "Invalid" | "Draft" | "OffSale" | "OnSale" | "PendingSale",
    quantityLimitPerUser: number | null,
    offSaleDeadLine: TemporalType | null,
    collectableItemType: "Invalid" | "Limited" | "NonLimited",
    lowestAvailableResaleProductId: Identifier | null,
    lowestAvailableResaleItemInstanceId: Identifier | null,
    resaleRestriction: "Invalid" | "None" | "Disabled"
  }
}>

export type RawBundle<BundleId extends Identifier = Identifier, BType extends BundleType = BundleType> = Bundle<ISODateTime, BundleId, BType>

export type PrettifiedBundle<BundleId extends Identifier = Identifier, BType extends BundleType = BundleType> = Bundle<Date, BundleId, BType>

export type RawPaginatedBundlesData<BundleId extends Identifier = Identifier, Type extends BundleType = BundleType> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: RawBundle<BundleId, Type>[]
}


export type MinimalBundle<Type extends BundleType> = ObjectPrettify<{
  id: Identifier,
  name: string,
  bundleType: Type,
  creator: {
    id: Identifier,
    name: string,
    type: "User" | "Group",
    hasVerifiedBadge: boolean
  }
}>

export type RawPaginatedMinimalBundleData<Type extends BundleType> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: MinimalBundle<Type>[]
}
//////////////////////////////////////////////////////////////////////////////////


// [ Favorites ] ////////////////////////////////////////////////////////////////
// GET /v1/favorites/users/{userId}/assets/{assetId}/favorite ---------------------------------------------------------
type AssetFavoritesCountData<TemporalType extends ISODateTime | Date, UserId extends Identifier, AssetId extends Identifier> = ObjectPrettify<{
  assetId: AssetId,
  userId: UserId,
  created: TemporalType
}>

export type RawAssetFavoritesCountData<UserId extends Identifier, AssetId extends Identifier> =
  AssetFavoritesCountData<ISODateTime, UserId, AssetId>

export type PrettifiedAssetFavoritesCountData<UserId extends Identifier, AssetId extends Identifier> =
  AssetFavoritesCountData<Date, UserId, AssetId>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/favorites/users/{userId}/bundles/{bundleId}/favorite ------------------------------------------------------
type BundleFavoritesCountData<TemporalType extends ISODateTime | Date, UserId extends Identifier, BundleId extends Identifier> = ObjectPrettify<{
  bundleId: BundleId,
  userId: UserId,
  created: TemporalType
}>

export type RawBundleFavoritesCountData<UserId extends Identifier, BundleId extends Identifier> =
  BundleFavoritesCountData<ISODateTime, UserId, BundleId>

export type PrettifiedBundleFavoritesCountData<UserId extends Identifier, BundleId extends Identifier> =
  BundleFavoritesCountData<Date, UserId, BundleId>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/favorites/users/{userId}/favorites/{bundleType}/bundles ---------------------------------------------------
export type RawAuthedUserFavoritedBundlesOfTypeData<Type extends BundleType> = {
  favorites: RawBundle<Identifier, Type>[],
  moreFavorites: boolean,
  nextCursor: null | string,
  previousCursor: null
}
// -------------------------------------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////


// [ Catalog ] //////////////////////////////////////////////////////////////////
export type BatchBundle<TemporalType extends ISODateTime | Date, BundleId extends Identifier> = ObjectPrettify<{
  id: BundleId,
  itemType: "Bundle",
  bundleType: 1 | 2 | 3 | 4 | 5,
  name: string,
  description: string,
  productId: Identifier,
  itemStatus: ItemStatus[],
  itemRestrictions: ItemRestriction[],
  creatorHasVerifiedBadge: boolean,
  creatorType: "User" | "Group",
  creatorTargetId: Identifier,
  creatorName: string,
  price: number,
  lowestPrice: number,
  lowestResalePrice: number,
  unitsAvailableForConsumption: number,
  purchaseCount: number,
  offSaleDeadline: TemporalType | Date,
  collectibleItemId?: string,
  totalQuanity?: number,
  saleLocationType?: SaleLocationType,
  hasResellers?: boolean
}>

type BatchAsset<TemporalType extends ISODateTime | Date, AssetId extends Identifier> = ObjectPrettify<{
  id: AssetId,
  itemType: "Asset",
  assetType: OneToSeventyNine,
  name: string,
  description: string,
  productId: Identifier,
  itemStatus: ItemStatus[],
  itemRestrictions: ItemRestriction[],
  creatorHasVerifiedBadge: boolean,
  creatorType: "User" | "Group",
  creatorTargetId: Identifier,
  creatorName: string,
  priceStatus: string,
  purchaseCount: number,
  favoriteCount: number,
  offSaleDeadline?: TemporalType | null,
  saleLocationType?: SaleLocationType,
  isOffSale?: boolean
}>

export type RawCatalogBatchInfoData<
  AssetId extends Identifier, BundleId extends Identifier,

  _AssetType = IsLiteral<AssetId> extends true ? BatchAsset<ISODateTime, AssetId> : null,
  _BundleType = IsLiteral<BundleId> extends true ? BatchBundle<ISODateTime, BundleId> : null
> = {
  data: Exclude<_AssetType | _BundleType, null>[]
}

export type PrettifiedCatalogBatchInfoData<
  AssetId extends Identifier, BundleId extends Identifier,

  _AssetType = IsLiteral<AssetId> extends true ? BatchAsset<Date, AssetId> : null,
  _BundleType = IsLiteral<BundleId> extends true ? BatchBundle<Date, BundleId> : null
> = Exclude<_AssetType | _BundleType, null>[]
/////////////////////////////////////////////////////////////////////////////////