// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel, cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import { PrettifiedGamePassInfo, RawGamePassInfo } from "./gamePasses.types"
import { Identifier } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicGamePasses", baseUrl: "https://apis.roblox.com/game-passes" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a game pass.
 * @endpoint GET /v1/game-passes/{gamePassId}/product-info
 * 
 * @param gamePassId The ID of the game pass to get information about.
 * 
 * @example const { data:gamePassInfo } = await ClassicGamePassesApi.gamePassInfo({ gamePassId: 9260480 })
 * @exampleData "targetId":9260480,"productType":"Game Pass","assetId":0,"productId":979386303,"name":"Donate","description":"null","assetTypeId":0,"creator":{"id":1536374574,"name":"MightyPart Games","creatorType":"Group","creatorTargetId":5850082},"iconImageAssetId":5316458121,"created":"2020-05-01T15:05:21.543Z","updated":"2020-07-09T13:08:21.133Z","priceInRobux":15,"priceInTickets":null,"sales":6,"isNew":false,"isForSale":true,"isPublicDomain":false,"isLimited":false,"isLimitedUnique":false,"remaining":null,"minimumMembershipLevel":0} 
 * @exampleRawBody {"TargetId":9260480,"ProductType":"Game Pass","AssetId":0,"ProductId":979386303,"Name":"Donate","Description":"null","AssetTypeId":0,"Creator":{"Id":1536374574,"Name":"MightyPart Games","CreatorType":"Group","CreatorTargetId":5850082},"IconImageAssetId":5316458121,"Created":"2020-05-01T15:05:21.543Z","Updated":"2020-07-09T13:08:21.133Z","PriceInRobux":15,"PriceInTickets":null,"Sales":6,"IsNew":false,"IsForSale":true,"IsPublicDomain":false,"IsLimited":false,"IsLimitedUnique":false,"Remaining":null,"MinimumMembershipLevel":0}
 */
export const gamePassInfo = addApiMethod(async <GamePassId extends Identifier>(
  { gamePassId }: { gamePassId: GamePassId }
): ApiMethod<RawGamePassInfo<GamePassId>, PrettifiedGamePassInfo<GamePassId>> => ({
  method: "GET",
  path: `/v1/game-passes/${gamePassId}/product-info`,
  name: `gamePassInfo`,

  prettifyFn: rawData => cloneAndMutateObject(toCamel(rawData), obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })
}))