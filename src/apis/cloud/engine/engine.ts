// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import { PrettifiedInstanceData, RawInstanceData } from "./engine.types"
import { UnionPrettify, Identifier } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Engine", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * DESCRIPTION
 * @endpoint GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId}
 * 
 * @param
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const instance = addApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string>(
  { universeId, placeId, instanceId }: { universeId: UniverseId, placeId: PlaceId, instanceId: InstanceId }
): ApiMethod<RawInstanceData<UniverseId, PlaceId, InstanceId>, PrettifiedInstanceData<UniverseId, PlaceId, InstanceId>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/places/${placeId}/instances/${instanceId}`,
  name: `instance`,

  prettifyFn: (rawData) => rawData as any
}))