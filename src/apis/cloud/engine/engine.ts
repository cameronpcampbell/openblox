// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel, toPascal } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedInstanceChildrenData, PrettifiedInstanceData, RawInstanceChildrenData, RawInstanceData, UpdateInstance_NewData } from "./engine.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Engine", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets an Instance.
 * @endpoint GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId}
 * 
 * @param universeId The ID of the universe to get the Instance from.
 * @param placeId The ID of the place to get the Instance from.
 * @param instanceId The ID of the Instance to get.
 * 
 * @example const { data:instance } = await EngineApi.instanceInfo({ universeId: 5795192361, placeId: 16866553538, instanceId: "root" })
 * @exampleData {"path":"universes/5795192361/places/16866553538/instances/root/operations/2ae28479-2d4f-4725-99e6-123cb44b5193","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.Instance","path":"universes/5795192361/places/16866553538/instances/78c032f0-6e1a-1015-0691-6a1600000001","hasChildren":true,"engineInstance":{"id":"78c032f0-6e1a-1015-0691-6a1600000001","parent":"","name":"Game","details":{}}}}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/instances/root/operations/2ae28479-2d4f-4725-99e6-123cb44b5193","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.Instance","path":"universes/5795192361/places/16866553538/instances/78c032f0-6e1a-1015-0691-6a1600000001","hasChildren":true,"engineInstance":{"Id":"78c032f0-6e1a-1015-0691-6a1600000001","Parent":"","Name":"Game","Details":{}}}}
 */
export const instanceInfo = createApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string>(
  { universeId, placeId, instanceId }: { universeId: UniverseId, placeId: PlaceId, instanceId: InstanceId }
): ApiMethod<RawInstanceData<UniverseId, PlaceId, InstanceId>, PrettifiedInstanceData<UniverseId, PlaceId, InstanceId>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/places/${placeId}/instances/${instanceId}`,
  name: `instanceInfo`,

  formatRawDataFn: (rawData) => {
    const response = rawData.response
    if (!response) return rawData

    const engineInstance = rawData.response.engineInstance

    return { ...rawData, response: { ...response, engineInstance: toCamel(engineInstance) } }
  }
}))


/**
 * Gets children for an Instance.
 * @endpoint GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId}:listChildren
 * 
 * @param universeId The ID of the universe to get the Instance children from.
 * @param placeId The ID of the place to get the Instance children from.
 * @param instanceId The ID of the Instance to get children for.
 * @param limit The maximum number of child instance to return. The service may return fewer than this value. If unspecified, at most 200 children will be returned. The maximum value is 200; values above 200 will be coerced to 200.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:children } = await EngineApi.instanceChildren({ universeId: 5795192361, placeId: 16866553538, instanceId: "root" })
 * @exampleData {"path":"universes/5795192361/places/16866553538/instances/root/operations/1a9a74a7-c687-492d-8035-759b29295867","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.ListInstanceChildrenResponse","instances":[{"path":"universes/5795192361/places/16866553538/instances/44b188da-ce63-2b47-02e9-c68d004815fc","hasChildren":true,"engineInstance":{"id":"44b188da-ce63-2b47-02e9-c68d004815fc","parent":"649b6a4b-51bf-b866-0691-76d800000001","name":"Workspace","details":{}}}],"nextPageToken":""}}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/instances/root/operations/1a9a74a7-c687-492d-8035-759b29295867","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.ListInstanceChildrenResponse","instances":[{"path":"universes/5795192361/places/16866553538/instances/44b188da-ce63-2b47-02e9-c68d004815fc","hasChildren":true,"engineInstance":{"Id":"44b188da-ce63-2b47-02e9-c68d004815fc","Parent":"649b6a4b-51bf-b866-0691-76d800000001","Name":"Workspace","Details":{}}}],"nextPageToken":""}}
 */
export const instanceChildren = createApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string>(
  { universeId, placeId, instanceId, limit, cursor }:
  { universeId: UniverseId, placeId: PlaceId, instanceId: InstanceId, limit?: number, cursor?: string }
): ApiMethod<RawInstanceChildrenData<UniverseId, PlaceId, InstanceId>, PrettifiedInstanceChildrenData<UniverseId, PlaceId, InstanceId>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/places/${placeId}/instances/${instanceId}:listChildren`,
  searchParams: { maxPageSize: limit, pageToken: cursor },
  name: `instanceChildren`,

  getCursorsFn: ({ response }) => {
    if (!response) return [ null, null ]
    return [ null, response.nextPageToken ]
  },

  formatRawDataFn: (rawData) => {
    const response = rawData.response
    if (!response) return rawData

    const prettifiedInstances = response.instances.map(inst => toCamel(inst)) as any

    return { ...rawData, response: { ...response, instances: prettifiedInstances } }
  }
}))



/**
 * Updates an Instance.
 * @endpoint PATCH /v2/universes/{universe}/places/{place}/instances/{instance}
 * 
 * @param universeId The ID of the universe to get the Instance from.
 * @param placeId The ID of the place to get the Instance from.
 * @param instanceId The ID of the Instance to get.
 * @param newData The new data to apply to the Instance.
 * 
 * @example
 * const { data:updatedInstance } = await EngineApi.updateInstance({
     universeId: 5795192361, placeId: 16866553538, instanceId: "4b70b051-16c0-dede-0691-7e9e00004e03", newData: {
       script: {
         source: "-- editing a script via typescript :)"
       }
     }
   })
 * @exampleData {"path":"universes/5795192361/places/16866553538/instances/4b70b051-16c0-dede-0691-7e9e00004e03/operations/7a865423-3566-4377-8b9e-ffd831341399","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.Instance","path":"universes/5795192361/places/16866553538/instances/4b70b051-16c0-dede-0691-7e9e00004e03","hasChildren":false,"engineInstance":{"id":"4b70b051-16c0-dede-0691-7e9e00004e03","parent":"44b188da-ce63-2b47-02e9-c68d004815fc","name":"Script","details":{"script":{"enabled":true,"runContext":"Legacy","source":"-- editing a script via typescript :)"}}}}}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/instances/4b70b051-16c0-dede-0691-7e9e00004e03/operations/7a865423-3566-4377-8b9e-ffd831341399","done":true,"response":{"@type":"type.googleapis.com/roblox.open_cloud.cloud.v2.Instance","path":"universes/5795192361/places/16866553538/instances/4b70b051-16c0-dede-0691-7e9e00004e03","hasChildren":false,"engineInstance":{"Id":"4b70b051-16c0-dede-0691-7e9e00004e03","Parent":"44b188da-ce63-2b47-02e9-c68d004815fc","Name":"Script","Details":{"Script":{"Enabled":true,"RunContext":"Legacy","Source":"-- editing a script via typescript :)"}}}}}
 */
export const updateInstance = createApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string>(
  { universeId, placeId, instanceId, newData }:
  {
    universeId: UniverseId, placeId: PlaceId, instanceId: InstanceId,
    newData: UpdateInstance_NewData
  }
): ApiMethod<RawInstanceData<UniverseId, PlaceId, InstanceId>, PrettifiedInstanceData<UniverseId, PlaceId, InstanceId>> => {
  const { Name, Parent, ...details } = toPascal(newData) as any

  return ({
    method: "PATCH",
    path: `/v2/universes/${universeId}/places/${placeId}/instances/${instanceId}`,
    body: { engineInstance: { Name, Parent, Details: { ...details } } },
    applyFieldMask: true,
    name: `updateInstance`,

    formatRawDataFn: (rawData) => {
      const response = rawData.response
      if (!response) return rawData
  
      const engineInstance = rawData.response.engineInstance
  
      return { ...rawData, response: { ...response, engineInstance: toCamel(engineInstance) } }
    }
  })
})