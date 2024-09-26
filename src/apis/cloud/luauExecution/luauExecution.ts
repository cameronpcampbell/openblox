// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { ExecuteLuauData, FormattedListLuauExecutionLogs, RawListLuauExecutionLogs } from "./luauExecution.types"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ name: "LuauExecution", baseUrl: "https://apis.roblox.com/cloud" })
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
 * @exampleData {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/31710728-48c7-4447-ae13-f30c7a38bf42/tasks/31710728-48c7-4447-ae13-f30c7a38bf42","user":"45348281","state":"PROCESSING","script":"local x, y = 3, 4; return x + y"}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/31710728-48c7-4447-ae13-f30c7a38bf42/tasks/31710728-48c7-4447-ae13-f30c7a38bf42","user":"45348281","state":"PROCESSING","script":"local x, y = 3, 4; return x + y"}
 */
export const executeLuau = addApiMethod(async <
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined = undefined
>(
  { universeId, placeId, version, script }:
  { universeId: UniverseId, placeId: PlaceId, version?: Version, script: string | Buffer | ArrayNonEmptyIfConst<string | Buffer> }
): ApiMethod<ExecuteLuauData<UniverseId, PlaceId, Version>> => ({
  method: "POST",
  path: `/v2/universes/${universeId}/places/${placeId}${
    version ? `/versions/${version}` : ""
  }/luau-execution-session-tasks`,
  body: { script: Array.isArray(script) ? await combineScripts(script) : await ensureScriptSource(script) },
  name: `executeLuau`,
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
 * // This example exponentially polls until the task is complete.
 * 
 * import { poll } from "openblox/helpers";
 * 
 * let task
 * await poll(LuauExecutionApi.luauExecutionTask, {
 *   universeId: 5795192361, placeId: 16866553538, version: 26,
 *   sessionId: "66d01389-6bac-4d6e-8414-ec9d5dab8297", taskId: "66d01389-6bac-4d6e-8414-ec9d5dab8297"
 * }, async ({ data }, stopPolling) => {
 *   if (data.state !== "COMPLETE") return
 *   task = data
 *   stopPolling()
 * })
 * @exampleData {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/66d01389-6bac-4d6e-8414-ec9d5dab8297/tasks/66d01389-6bac-4d6e-8414-ec9d5dab8297","createTime":"2024-09-26T09:34:09.014Z","updateTime":"2024-09-26T09:34:12.360Z","user":"45348281","state":"COMPLETE","script":"","output":{"results":[7]}}
 * @exampleRawBody {"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/66d01389-6bac-4d6e-8414-ec9d5dab8297/tasks/66d01389-6bac-4d6e-8414-ec9d5dab8297","createTime":"2024-09-26T09:34:09.014Z","updateTime":"2024-09-26T09:34:12.360Z","user":"45348281","state":"COMPLETE","script":"","output":{"results":[7]}}
 */
export const luauExecutionTask = addApiMethod(async <
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined = undefined
>(
  { universeId, placeId, version, sessionId, taskId, view }:
  { universeId: UniverseId, placeId: PlaceId, version?: Version, sessionId: string, taskId: string, view?: "BASIC" | "FULL" }
): ApiMethod<ExecuteLuauData<UniverseId, PlaceId, Version>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/places/${placeId}${
    version ? `/versions/${version}` : ""
  }${
    sessionId ? `/luau-execution-sessions/${sessionId}/tasks/${taskId}` : `/luau-execution-session-tasks/${taskId}`
  }`,
  searchParams: { view },

  name: `getLuauExecutionTask`,
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
 *   sessionId: "31710728-48c7-4447-ae13-f30c7a38bf42", taskId: "31710728-48c7-4447-ae13-f30c7a38bf42"
 * })
 * @exampleData [{"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/66d01389-6bac-4d6e-8414-ec9d5dab8297/tasks/66d01389-6bac-4d6e-8414-ec9d5dab8297/logs/1","messages":[]}]
 * @exampleRawBody {"luauExecutionSessionTaskLogs":[{"path":"universes/5795192361/places/16866553538/versions/26/luau-execution-sessions/66d01389-6bac-4d6e-8414-ec9d5dab8297/tasks/66d01389-6bac-4d6e-8414-ec9d5dab8297/logs/1","messages":[]}],"nextPageToken":""}
 */
export const listLuauExecutionLogs = addApiMethod(async <
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

    formatRawDataFn: ({ luauExecutionSessionTaskLogs }) => luauExecutionSessionTaskLogs,

    getCursorsFn: ({ nextPageToken }) => [ null, nextPageToken ]
  })
})