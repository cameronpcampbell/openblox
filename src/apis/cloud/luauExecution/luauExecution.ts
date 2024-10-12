// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { RawExecuteLuauData, FormattedListLuauExecutionLogs, RawListLuauExecutionLogs, FormattedExecuteLuauData, LuauExecutionPathItems, RawLuauExecutionTaskData, FormattedLuauExecutionTaskData } from "./luauExecution.types"
import { readFile } from "../../../file"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "LuauExecution", baseUrl: "https://apis.roblox.com/cloud" })

const executedLuauPathRegex = /universes\/([0-9]+)\/places\/([0-9]+)\/versions\/([0-9]+)\/luau-execution-sessions\/([^/]+)\/tasks\/([^/]+)/
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const ensureScriptSource = async (script: string | Buffer) => {
  if (script instanceof Buffer) return script.toString("utf-8")

  if (script.match(/\n/) || !(script.match(/.luau?$/g))) return script
  return (await readFile(script)).toString("utf-8")
}

const combineScripts = async (scripts: ArrayNonEmptyIfConst<string | Buffer>) => {
  let combined = ""

  for (let script of scripts) combined += `(function() ${await ensureScriptSource(script)} end)(); `

  return combined
}

const addPathItemsToExecutedLuauResponse = <
  RawData extends { path: string } & Record<any, any>
>(rawData: RawData) => cloneAndMutateObject(rawData, (obj: RawData & LuauExecutionPathItems) => {
  const splitPath = executedLuauPathRegex.exec(obj.path)
  if (!splitPath) return

  obj.universeId = splitPath[1] as `${number}`
  obj.placeId = splitPath[2] as `${number}`
  obj.version = parseInt(splitPath[3] as `${number}`) as any
  obj.sessionId = splitPath[4] as string
  obj.taskId = splitPath[5] as string
}) as any
//////////////////////////////////////////////////////////////////////////////////


/**
 * Executes a roblox luau script for a given place.
 * @endpoint
 * POST /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
 * POST /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
 * 
 * @param universeId The ID of the universe to execute the script under.
 * @param placeId The ID of the place to execute the script under.
 * @param version The optional version number of the place to execute the script under.
 * @param script The script to execute.
 * 
 * @example
 * const { data:executed } = await LuauExecutionApi.executeLuau({
 *   universeId: 5795192361, placeId: 16866553538, script: `local x, y = 3, 4; return x + y`
 * })
 * @exampleData {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d","user":"45348281","state":"PROCESSING","script":"local x, y = 3, 4; return x + y","universeId":"5795192361","placeId":"16866553538","version":26,"sessionId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d","taskId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d"}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d","user":"45348281","state":"PROCESSING","script":"local x, y = 3, 4; return x + y"} 
 */
export const executeLuau = createApiMethod(async <
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined = undefined
>(
  { universeId, placeId, version, script }:
  { universeId: UniverseId, placeId: PlaceId, version?: Version, script: string | Buffer | ArrayNonEmptyIfConst<string | Buffer> }
): ApiMethod<
  RawExecuteLuauData<UniverseId, PlaceId, Version>,
  FormattedExecuteLuauData<UniverseId, PlaceId, Version>
> => ({
  method: "POST",
  path: `/v2/universes/${universeId}/places/${placeId}${
    version ? `/versions/${version}` : ""
  }/luau-execution-session-tasks`,
  body: { script: Array.isArray(script) ? await combineScripts(script) : await ensureScriptSource(script) },
  name: `executeLuau`,

  formatRawDataFn: addPathItemsToExecutedLuauResponse
}))


/**
 * Gets a luau execution task.
 * @endpoint
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks
 * 
 * @param universeId The ID of the universe to get the luau execution task from.
 * @param placeId The ID of the place to get the luau execution task from.
 * @param version The optional version number of the place to get the luau execution task for.
 * @param sessionId The ID of the session to get the luau execution task for.
 * @param taskId The ID of the task to get the luau execution task for.
 * @param view If the response should return the script source (`"FULL"`) instead of an empty string.
 * 
 * @example
 * import { pollMethod } from "openblox/helpers";
 * 
 * type Results = number[]
 * const { data:executedTask } = await pollMethod(
 *   LuauExecutionApi.luauExecutionTask<Results>({
 *    universeId: 5795192361, placeId: 16866553538, version: 26,
 *    sessionId: "67823af7-1f99-4fc5-b3bb-da7ab3456b5d", taskId: "67823af7-1f99-4fc5-b3bb-da7ab3456b5d"
 *   }),
 *   async ({ data }, stopPolling) => data.state === "COMPLETE" && stopPolling()
 * )
 * @exampleData {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d","createTime":"2024-10-01T02:31:46.304Z","updateTime":"2024-10-01T02:31:49.959Z","user":"45348281","state":"COMPLETE","script":"","output":{"results":[7]},"universeId":"5795192361","placeId":"16866553538","version":26,"sessionId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d","taskId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d"} 
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d","createTime":"2024-10-01T02:31:46.304Z","updateTime":"2024-10-01T02:31:49.959Z","user":"45348281","state":"COMPLETE","script":"","output":{"results":[7]}}
 */
export const luauExecutionTask = createApiMethod(async <Results extends any[]>(
  { universeId, placeId, version, sessionId, taskId, view }:
  { universeId: Identifier, placeId: Identifier, version?: number, sessionId: string, taskId: string, view?: "BASIC" | "FULL" }
): ApiMethod<RawLuauExecutionTaskData<Results>, FormattedLuauExecutionTaskData<Results>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/places/${placeId}${
    version ? `/versions/${version}` : ""
  }${
    sessionId ? `/luau-execution-sessions/${sessionId}/tasks/${taskId}` : `/luau-execution-session-tasks/${taskId}`
  }`,
  searchParams: { view },

  name: `getLuauExecutionTask`,

  formatRawDataFn: addPathItemsToExecutedLuauResponse
}))


/**
 * Lists luau execution logs.
 * @endpoint
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks/{taskId}/logs
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks/{taskId}/logs
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks/{taskId}/logs
 * GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks/{taskId}/logs
 * 
 * @param universeId The ID of the universe to list logs for.
 * @param placeId The ID of the place to list logs for.
 * @param version The optional version number of the place to list logs for.
 * @param sessionId The ID of the session to get logs for.
 * @param taskId The ID of the task to get logs for.
 * @param limit The maximum amount of logs to return. The service might return fewer than this value. If unspecified, at most 10000 luau execution session task logs are returned. The maximum value is 10000 and higher values are set to 10000.
 * @param cursor A page token, received from a previous call, to retrieve a subsequent page.
 * 
 * @example const { data:logs } = await LuauExecutionApi.listLuauExecutionLogs({
 *   universeId: 5795192361, placeId: 16866553538, version: 26,
 *   sessionId: "67823af7-1f99-4fc5-b3bb-da7ab3456b5d", taskId: "67823af7-1f99-4fc5-b3bb-da7ab3456b5d"
 * })
 * @exampleData [{"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/logs/1","messages":[],"universeId":"5795192361","placeId":"16866553538","version":26,"sessionId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d","taskId":"67823af7-1f99-4fc5-b3bb-da7ab3456b5d"}] 
 * @exampleRawBody {"luauExecutionSessionTaskLogs":[{"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/tasks/67823af7-1f99-4fc5-b3bb-da7ab3456b5d/logs/1","messages":[]}],"nextPageToken":""}
 */
export const listLuauExecutionLogs = createApiMethod(async <
  UniverseId extends Identifier, PlaceId extends Identifier, SessionId extends string,
  TaskId extends string, Version extends number | undefined = undefined
>(
  { universeId, placeId, version, taskId, sessionId, limit, cursor }:
  { universeId: UniverseId, placeId: PlaceId, version?: Version, taskId: TaskId, sessionId?: SessionId, limit?: number, cursor?: string }
): ApiMethod<
  RawListLuauExecutionLogs<UniverseId, PlaceId, Version, SessionId, TaskId>,
  FormattedListLuauExecutionLogs<UniverseId, PlaceId, Version, SessionId, TaskId>
> => {
  return ({
    method: "GET",
    path: `/v2/universes/${universeId}/places/${placeId}${
      version ? `/versions/${version}` : ""
    }${
      sessionId ? `/luau-execution-sessions/${sessionId}/tasks/${taskId}/logs` : `/luau-execution-session-tasks/${taskId}/logs`
    }`,
    searchParams: { maxPageSize: limit, pageToken: cursor },
    name: `listLuauExecutionLogs`,

    formatRawDataFn: ({ luauExecutionSessionTaskLogs }) => luauExecutionSessionTaskLogs.map(addPathItemsToExecutedLuauResponse),

    getCursorsFn: ({ nextPageToken }) => [ null, nextPageToken ]
  })
})