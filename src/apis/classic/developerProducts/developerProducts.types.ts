import type { Identifier, ISODateTime, ObjectPrettify, ObjectKeysToCamelCase } from "typeforge"


// GET /v1/developer-products/{developerProductId} -------------------------------------------------------------------
export type RawDeveloperProductInfoData<DeveloperProductId extends Identifier> = {
  id: Identifier,
  productTypeId: number,
  isPublicDomain: boolean,
  isForSale: boolean,
  priceInRobux: number,
  premiumPriceInRobux: number | null,
  robloxProductId: null | Identifier,
  targetId: DeveloperProductId,
  assetTypeId: Identifier | null,
  creatorId: Identifier,
  assetGenres: number,
  assetCategories: number,
  affiliateFeePercentage: null | number,
  isNew: boolean,
  created: ISODateTime,
  updated: ISODateTime,
}

export type PrettifiedDeveloperProductInfoData<DeveloperProductId extends Identifier> = ObjectPrettify<
  { productId: Identifier } & Omit<RawDeveloperProductInfoData<DeveloperProductId>, "id">
>
// -------------------------------------------------------------------------------------------------------------------


/* GET /v1/universes/{universeId}/developerproducts
   POST /v1/universes/{universeId}/developerproducts -------------------------------------------------------------- */
export type RawMinimalDeveloperProductData = {
  id: Identifier,
  name: string,
  Description: string | null,
  shopId: Identifier,
  iconImageAssetId: Identifier,
}

export type PrettifiedMinimalDeveloperProductData = ObjectKeysToCamelCase<RawMinimalDeveloperProductData>
// -------------------------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------------------------
export type RawDeveloperProductCreatorDetails = {
  DisplayName: string,
  DisplayDescription: string | null,
  DisplayIconImageAssetId: Identifier,
  PriceInformation: {
    defaultPriceInRobux: number,
    isInActivePriceOptimizationExperiment: boolean,
  },
  TargetId: Identifier,
  ProductType: "Developer Product",
  AssetId: Identifier,
  ProductId: Identifier,
  Name: string,
  Description: string | null,
  AssetTypeId: Identifier,
  Creator: {
    Id: Identifier,
    Name: string | null,
    CreatorType: "User" | "Group" | null,
    CreatorTargetId: Identifier,
  },
  IconImageAssetId: Identifier,
  Created: ISODateTime,
  Updated: ISODateTime,
  PriceInRobux: number | null,
  PremiumPriceInRobux: number | null,
  PriceInTickets: number | null,
  IsNew: boolean,
  IsForSale: boolean,
  IsPublicDomain: boolean,
  IsLimited: boolean,
  IsLimitedUnique: boolean,
  Remaining: number | null,
  Sales: number | null,
  MinimumMembershipLevel: number,
}

export type PrettifiedDeveloperProductCreatorDetails = ObjectKeysToCamelCase<RawDeveloperProductCreatorDetails>
// -------------------------------------------------------------------------------------------------------------------

