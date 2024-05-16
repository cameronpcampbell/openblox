// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import type { UpdateUniverse_NewData, PrettifiedPlaceInfoData, PrettifiedUniverseInfoData, PrettifiedUpdateUniverseData, RawPlaceInfoData, RawUniverseInfoData, RawUpdateUniverseData, UpdatePlace_NewData, RawUpdatePlaceData, PrettifiedUpdatePlaceData } from "./experiences.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Experiences", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const objectToFieldMask = (o: Record<any, any>) => {
  if (!o || typeof o !== 'object') return [];

  const paths = [];
  const stack = [{ obj: o, path: [] }] as [{ obj: typeof o, path: [] }];

  while (stack.length > 0) {
    const { obj, path } = stack.pop() as any as { obj: typeof o, path: [] };

    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        stack.push({ obj: obj[key], path: [...path, key] as any });
      }
    } else {
      paths.push(path);
    }
  }

  return paths.map(path => path.join(".")).join(",")
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a universe.
 * @endpoint GET /v2/universes/{universeId}
 * 
 * @param universeId The id of the universe to get information about.
 * 
 * @example const { data:universeInfo } = await ExperiencesApi.universeInfo({ universeId: 5795192361 });
 * @exampleData {"path":"universes/5795192361","createTime":"2024-03-25T10:42:46.360Z","updateTime":"2024-03-25T10:42:46.360Z","displayName":"MightyPart's Place Number: 201","description":"","user":"users/45348281","visibility":"PRIVATE","voiceChatEnabled":false,"ageRating":"AGE_RATING_UNSPECIFIED","desktopEnabled":true,"mobileEnabled":true,"tabletEnabled":true,"consoleEnabled":false,"vrEnabled":true}
 * @exampleRawBody {"path":"universes/5795192361","createTime":"2024-03-25T10:42:46.360Z","updateTime":"2024-03-25T10:42:46.360Z","displayName":"MightyPart's Place Number: 201","description":"","user":"users/45348281","visibility":"PRIVATE","voiceChatEnabled":false,"ageRating":"AGE_RATING_UNSPECIFIED","desktopEnabled":true,"mobileEnabled":true,"tabletEnabled":true,"consoleEnabled":false,"vrEnabled":true}
 */
export const universeInfo = addApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: UniverseId }
): ApiMethod<RawUniverseInfoData<UniverseId>, PrettifiedUniverseInfoData<UniverseId>> => ({
  path: `/v2/universes/${universeId}`,
  method: "GET",
  name: "universeInfo",

  prettifyFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Updates a universes information.
 * @endpoint PATCH /v2/universes/{universeId}
 * 
 * @param universeId The id of the universe to update.
 * @param newData the updated universe information.
 * 
 * @example
 * const { data:updatedData } = await ExperiencesApi.updateUniverse({
     universeId: 5795192361, newData: { displayName: "Lorem Ipsum", visibility: "PRIVATE" }
   })
 * @exampleData {"path":"universes/5795192361","createTime":"2024-03-25T10:42:46.360Z","updateTime":"2024-03-25T10:42:46.360Z","displayName":"MightyPart's Place Number: 201","description":"","user":"users/45348281","visibility":"PRIVATE","voiceChatEnabled":false,"ageRating":"AGE_RATING_UNSPECIFIED","desktopEnabled":true,"mobileEnabled":true,"tabletEnabled":true,"consoleEnabled":false,"vrEnabled":true}
 * @exampleRawBody {"path":"universes/5795192361","createTime":"2024-03-25T10:42:46.360Z","updateTime":"2024-03-25T10:42:46.360Z","displayName":"MightyPart's Place Number: 201","description":"","user":"users/45348281","visibility":"PRIVATE","voiceChatEnabled":false,"ageRating":"AGE_RATING_UNSPECIFIED","desktopEnabled":true,"mobileEnabled":true,"tabletEnabled":true,"consoleEnabled":false,"vrEnabled":true}
 */
export const updateUniverse = addApiMethod(async <UniverseId extends Identifier, const NewData extends UpdateUniverse_NewData>(
  { universeId, newData }: { universeId: UniverseId, newData: NewData }
): ApiMethod<RawUpdateUniverseData<UniverseId, NewData>, PrettifiedUpdateUniverseData<UniverseId, NewData>> => ({
  path: `/v2/universes/${universeId}`,
  method: "PATCH",
  searchParams: { updateMask: objectToFieldMask(newData) },
  body: newData,
  name: "updateUniverse",

  prettifyFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  }) as any
}))


/**
 * Restarts all currently running servers for a given universe. Used for releasing experience updates.
 * @category Users
 * @endpoint GET /v2/universes/{universeId}
 * 
 * @param universeId The id of the universe to restart servers for.
 * 
 * @example await ExperiencesApi.restartUniverseServers({ universeId: 5795192361 });
 * @exampleData {}
 * @exampleRawBody {}
 */
export const restartUniverseServers = addApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: UniverseId }
): ApiMethod<{}> => ({
  path: `/v2/universes/${universeId}:restartServers`,
  method: "POST",
  name: "restartUniverseServers",
  body: {}
}))


/**
 * Gets information about a universes place.
 * @endpoint GET /v2/universes/{universeId}/{placeId}
 * 
 * @param universeId The id of the universe to get place information about.
 * @param placeId The id of the place to get information about.
 * 
 * @example const { data:placeInfo } = await ExperiencesApi.placeInfo({ universeId: 5795192361, placeId: 16866553538 })
 * @exampleData {"path":"universes/5795192361/places/16866553538","createTime":"2024-03-25T10:42:46.297Z","updateTime":"2024-03-26T16:50:19.023Z","displayName":"MightyPart's Place Number: 201","description":"","serverSize":50}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538","createTime":"2024-03-25T10:42:46.297Z","updateTime":"2024-03-26T16:50:19.023Z","displayName":"MightyPart's Place Number: 201","description":"","serverSize":50}
 */
export const placeInfo = addApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier>(
  { universeId, placeId: PlaceId }: { universeId: UniverseId, placeId: PlaceId }
): ApiMethod<RawPlaceInfoData<UniverseId, PlaceId>, PrettifiedPlaceInfoData<UniverseId, PlaceId>> => ({
  path: `/v2/universes/${universeId}/places/${PlaceId}`,
  method: "GET",
  name: "placeInfo",

  prettifyFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Updates a places information.
 * @endpoint PATCH /v2/universes/{universeId}/places/{PlaceId}
 * 
 * @param universeId The id of the universe to update place information for.
 * @param placeId The id of the place to update.
 * @param newData the updated place information.
 * 
 * @example
 * const { data:updatedInfo } = await ExperiencesApi.updatePlace({
     universeId: 5795192361, placeId: 16866553538, newData: { displayName: "Hello World" }
   })
 * @exampleData {"path":"universes/5795192361/places/16866553538","createTime":"2024-03-25T10:42:46.297Z","updateTime":"2024-05-13T10:21:20.247Z","displayName":"Hello World","description":"","serverSize":50}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538","createTime":"2024-03-25T10:42:46.297Z","updateTime":"2024-05-13T10:21:20.247157600Z","displayName":"Hello World","description":"","serverSize":50}
 */
export const updatePlace = addApiMethod(async <UniverseId extends Identifier, PlaceId extends Identifier, const NewData extends UpdatePlace_NewData>(
  { universeId, placeId: PlaceId, newData }: { universeId: UniverseId, placeId: PlaceId, newData: NewData }
): ApiMethod<RawUpdatePlaceData<UniverseId, PlaceId, NewData>, PrettifiedUpdatePlaceData<UniverseId, PlaceId, NewData>> => ({
  path: `/v2/universes/${universeId}/places/${PlaceId}`,
  searchParams: { updateMask: objectToFieldMask(newData) },
  method: "PATCH",
  body: newData,
  name: "updatePlace",

  prettifyFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  }) as any
}))