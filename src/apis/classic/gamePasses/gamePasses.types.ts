import { Identifier, ISODateTime } from "typeforge"
import { KeysToCamelCase } from "../../../utils/utils.types"


// GET /v1/virtual-events/create -------------------------------------------------------------------------------------
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

export type PrettifiedGamePassInfo<GamePassId extends Identifier> = KeysToCamelCase<GamePassInfo<Date, GamePassId>>
// -------------------------------------------------------------------------------------------------------------------
