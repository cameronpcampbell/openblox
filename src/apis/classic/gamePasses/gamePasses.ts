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
 * @exampleData
 * @exampleRawBody
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