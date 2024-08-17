import type { Identifier, ISODateTime, ObjectPrettify, ObjectKeysToCamelCase } from "typeforge"


// GET /v1/game-passes/{gamePassId}/product-info ---------------------------------------------------------------------
type GamePassInfo<TemporalType extends ISODateTime | Date, GamePassId extends Identifier> = {
  TargetId: GamePassId,
  ProductType: "Game Pass",
  AssetId: Identifier,
  ProductId: Identifier,
  Name: string,
  Description: string,
  AssetTypeId: Identifier,
  Creator: {
    Id: Identifier,
    Name: string,
    CreatorType: "User" | "Group",
    CreatorTargetId: Identifier
  },
  IconImageAssetId: Identifier,
  Created: TemporalType,
  Updated: TemporalType,
  PriceInRobux: number,
  PriceInTickets: number | null,
  Sales: number,
  IsNew: boolean,
  IsForSale: boolean,
  IsPublicDomain: boolean,
  IsLimited: boolean,
  IsLimitedUnique: boolean,
  Remaining: number | null,
  MinimumMembershipLevel: number,
}

export type RawGamePassInfo<GamePassId extends Identifier> = GamePassInfo<ISODateTime, GamePassId>

export type PrettifiedGamePassInfo<GamePassId extends Identifier> = ObjectPrettify<ObjectKeysToCamelCase<GamePassInfo<Date, GamePassId>> & {}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/game-passes/universes/${universeId}/creator ---------------------------------------------------------------
export type PrettifiedGamePassesForUniverseData = {
  gamePassId: Identifier,
  name: string,
  description: string,
  isForSale: boolean,
  iconAssetId: Identifier,
  placeId: Identifier,
  createdTimestamp: ISODateTime,
  updatedTimestamp: ISODateTime,
  priceInformation: {
    defaultPriceInRobux: number,
    isInActivePriceOptimizationExperiment: boolean,
    isInActiveDiscountCampaign: boolean,
    discountPercentage: number,
  },
  productId: Identifier
}[]

export type RawGamePassesForUniverseData = {
  gamePasses: PrettifiedGamePassesForUniverseData,
  cursor: string | null
}
// -------------------------------------------------------------------------------------------------------------------
