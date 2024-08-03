// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
import type { UpdateUniverse_NewData, PrettifiedPlaceInfoData, PrettifiedUniverseInfoData, PrettifiedUpdateUniverseData, RawPlaceInfoData, RawUniverseInfoData, RawUpdateUniverseData, UpdatePlace_NewData, RawUpdatePlaceData, PrettifiedUpdatePlaceData } from "./experiences.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ name: "Experiences", baseUrl: "https://apis.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
function isPlaceFileBufferXml(buffer: Buffer): boolean {
  const bufferContent = buffer.toString('utf-8'); // Convert buffer to UTF-8 string
  const trimmedContent = bufferContent.trim(); // Trim any leading/trailing whitespace

  return !trimmedContent.includes("�")
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a universe.
 * @endpoint GET /cloud/v2/universes/{universeId}
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
  path: `/cloud/v2/universes/${universeId}`,
  method: "GET",
  name: "universeInfo",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Updates a universes information.
 * @endpoint PATCH /cloud/v2/universes/{universeId}
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
  path: `/cloud/v2/universes/${universeId}`,
  method: "PATCH",
  body: newData,
  applyFieldMask: true,
  name: "updateUniverse",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  }) as any
}))


/**
 * Restarts all currently running servers for a given universe. Used for releasing experience updates.
 * @category Users
 * @endpoint GET /cloud/v2/universes/{universeId}
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
  path: `/cloud/v2/universes/${universeId}:restartServers`,
  method: "POST",
  name: "restartUniverseServers",
  body: {}
}))


/**
 * Gets information about a universes place.
 * @endpoint GET /cloud/v2/universes/{universeId}/{placeId}
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
  path: `/cloud/v2/universes/${universeId}/places/${PlaceId}`,
  method: "GET",
  name: "placeInfo",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Updates a places information.
 * @endpoint PATCH /cloud/v2/universes/{universeId}/places/{PlaceId}
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
  { universeId, placeId, newData }: { universeId: UniverseId, placeId: PlaceId, newData: NewData }
): ApiMethod<RawUpdatePlaceData<UniverseId, PlaceId, NewData>, PrettifiedUpdatePlaceData<UniverseId, PlaceId, NewData>> => ({
  path: `/cloud/v2/universes/${universeId}/places/${placeId}`,
  method: "PATCH",
  body: newData,
  applyFieldMask: true,
  name: "updatePlace",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  }) as any
}))

/**
 * Publishes a place file (.rbxl or .rbxlx) to a specific place.
 * @endpoint POST /universes/v1/{universeId}/places/{placeId}/versions
 * 
 * @param universeId The ID of the universe the publish the place file to.
 * @param placeId The ID of the place to publish the place file to.
 * @param versionType The version type to publish with.
 * @param placeFile Either a string or a buffer of the place file. (Using a string is recommended).
 * 
 * @example
 * const { data:newVersion } = await ExperiencesApi.publishPlace({
     universeId: 5795192361, placeId: 16866553538, versionType: "Published", placeFile: "./place.rbxlx"
   })
 * @exampleData 26
 * @exampleRawBody { "versionNumber": 26 }
 */
export const publishPlace = addApiMethod(async (
  { universeId, placeId, versionType, placeFile }:
  {
    universeId: Identifier, placeId: Identifier,
    versionType: "Saved" | "Published", placeFile: Buffer | string
  }
): ApiMethod<{ versionNumber: number }, number> => {
  let contentType

  if (typeof placeFile == "string") {
    contentType = placeFile.endsWith(".rbxl") ? "application/octet-stream" : "application/xml" 
    placeFile = await readFile(placeFile)

  } else {
    contentType = isPlaceFileBufferXml(placeFile) ? "application/xml" : "application/octet-stream"
  }

  return ({
    method: "POST",
    path: `/universes/v1/${universeId}/places/${placeId}/versions`,
    searchParams: { versionType },
    headers: {
      "Content-Type": contentType,
    },
    body: placeFile,
    name: `publishPlace`,

    formatRawDataFn: ({ versionNumber }) => versionNumber
  })
})
