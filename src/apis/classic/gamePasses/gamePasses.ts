// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel, cloneAndMutateObject, removeNullUndefined, formDataBuilder } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedGamePassesForUniverseData, PrettifiedGamePassInfo, RawGamePassesForUniverseData, RawGamePassInfo } from "./gamePasses.types"
import type { Identifier } from "typeforge"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicGamePasses", baseUrl: "https://apis.roblox.com/game-passes" })
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
export const gamePassInfo = createApiMethod(async <GamePassId extends Identifier>(
  { gamePassId }: { gamePassId: GamePassId }
): ApiMethod<RawGamePassInfo<GamePassId>, PrettifiedGamePassInfo<GamePassId>> => ({
  method: "GET",
  path: `/v1/game-passes/${gamePassId}/product-info`,
  name: `gamePassInfo`,

  formatRawDataFn: rawData => cloneAndMutateObject(toCamel(rawData), obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })
}))


/**
 * Gets game passes for a particular universe. 
 * @endpoint GET /v1/game-passes/universes/{universeId}/creator
 * 
 * @param universeId The ID of the universe to get game passes for.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:gamePasses } = await ClassicGamePassesApi.gamePassesForUniverse({ universeId: 1685831367, limit: 1 })
 * @exampleData [{"gamePassId":11546631,"name":"Donate Pluss","description":"nulll","isForSale":true,"iconAssetId":18759297002,"placeId":4922741943,"createdTimestamp":"2020-09-01T00:15:17.79Z","updatedTimestamp":"2024-08-02T00:43:10.541Z","priceInformation":{"defaultPriceInRobux":250,"isInActivePriceOptimizationExperiment":false,"isInActiveDiscountCampaign":false,"discountPercentage":0},"productId":1084063256}]
 * @exampleRawBody {"gamePasses":[{"gamePassId":11546631,"name":"Donate Pluss","description":"nulll","isForSale":true,"iconAssetId":18759297002,"placeId":4922741943,"createdTimestamp":"2020-09-01T00:15:17.79Z","updatedTimestamp":"2024-08-02T00:43:10.541Z","priceInformation":{"defaultPriceInRobux":250,"isInActivePriceOptimizationExperiment":false,"isInActiveDiscountCampaign":false,"discountPercentage":0},"productId":1084063256}],"cursor":"id_2zwAAAXRHBJkezgCwMAc"}
 */
export const gamePassesForUniverse = createApiMethod(async (
  { universeId, limit = 10, cursor }: { universeId: Identifier, limit?: number, cursor?: string }
): ApiMethod<RawGamePassesForUniverseData, PrettifiedGamePassesForUniverseData> => ({
  method: "GET",
  path: `/v1/game-passes/universes/${universeId}/creator`,
  searchParams: { count: limit, cursor },
  name: `gamePassesForUniverse`,
  
  formatRawDataFn: ({ gamePasses }) => gamePasses,

  getCursorsFn: ({ cursor }) => [ null, cursor ]
}))


/**
 * Updates a game pass.
 * @endpoint POST /v1/game-passes/{gamePassId}/details
 * 
 * @param gamePassId The ID of the game pass to update.
 * @param name The new name for the game pass.
 * @param description The new description for the game pass.
 * @param icon The new icon for the game pass.
 * @param price The new price for the game pass.
 * @param isForSale If the game pass should be for sale.
 * 
 * @example const { data:success } = await ClassicGamePassesApi.updateGamePass({ gamePassId: 9260480, name: "Donate", icon: "./gamePassIcon.png" })
 * @exampleData true
 * @exampleRawBody ""
 */
export const updateGamePass = createApiMethod(async (
  { gamePassId, name, description, icon, price, isForSale }:
  { gamePassId: Identifier, name?: string, description?: string, icon?: string | File, price?: number, isForSale?: boolean }
): ApiMethod<"", boolean> => ({
  method: "POST",
  path: `/v1/game-passes/${gamePassId}/details`,
  formData: formDataBuilder()
    .append("Name", name)
    .append("Description", description)
    .append("Price", price?.toString())
    .append("IsForSale", isForSale ? "true" : "false")
    .append("File", typeof icon == "string" ? new File([ new Blob([ await readFile(icon) ]) ], "File") : icon),
  name: `updateGamePass`,

  formatRawDataFn: rawData => rawData === ""
}))



/**
 * Creates a game pass.
 * @endpoint POST /v1/game-passes
 * 
 * @param universeId The ID of the universe to get a game pass in.
 * @param name The name for the game pass.
 * @param description The description for the game pass.
 * @param icon The icon for the game pass.
 * 
 * @example const { data:gamePassId } = await ClassicGamePassesApi.createGamePass({
 *  universeId: 1685831367, name: "My Pass", description: "Lorem Ipsum..."
 * })
 * @exampleData 810182288
 * @exampleRawBody {"gamePassId":810182288}
 */
export const createGamePass = createApiMethod(async (
  { universeId, name, description, icon }: { universeId: Identifier, name: string, description: string, icon?: string | File }
): ApiMethod<{ gamePassId: Identifier }, Identifier> => {
  return ({
    method: "POST",
    path: `/v1/game-passes`,
    formData: formDataBuilder()
      .append("UniverseId", universeId.toString())
      .append("Name", name)
      .append("Description", description)
      .append("File", typeof icon == "string" ? new File([ new Blob([ await readFile(icon) ]) ], "File") : icon),
    name: `createGamePass`,
  
    formatRawDataFn: ({ gamePassId }) => gamePassId
  })
})