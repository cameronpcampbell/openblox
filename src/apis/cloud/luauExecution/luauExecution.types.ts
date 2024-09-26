import { Identifier, ISODateTime, UnionPrettify } from "typeforge"

type LuauExecutionState = UnionPrettify<"STATE_UNSPECIFIED" | "QUEUED" | "PROCESSING" | "CANCELLED" | "COMPLETE" | "FAILED">

type LuauExecutionError = UnionPrettify<"ERROR_CODE_UNSPECIFIED" | "SCRIPT_ERROR" | "DEADLINE_EXCEEDED" | "OUTPUT_SIZE_LIMIT_EXCEEDED" | "INTERNAL_ERROR">

/*
  POST /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks
*/
export type ExecuteLuauData<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined
> = {
  path: `/v2/universes/${UniverseId}/places/${PlaceId}${
    Version extends number ? `/versions/${Version}` : ""
  }/luau-execution-sessions/${string}/tasks/${string}`,
  user: Identifier,
  state: LuauExecutionState,
  script: string
}
// -------------------------------------------------------------------------------------------------------------------


/*
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks
*/
export type LuauExecutionTaskData<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined
> = {
  path: `/v2/universes/${UniverseId}/places/${PlaceId}${
    Version extends number ? `/versions/${Version}` : ""
  }/luau-execution-sessions/${string}/tasks/${string}`,
  createTime: ISODateTime,
  updateTime: ISODateTime,
  user: Identifier,
  state: LuauExecutionState,
  script: string,
  output: {
    result: any
  }
}
// -------------------------------------------------------------------------------------------------------------------


/*
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks/{taskId}/logs
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks/{taskId}/logs
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks/{taskId}/logs
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks/{taskId}/logs
*/
export type RawListLuauExecutionLogs<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined,
  SessionId extends string, TaskId extends string
> = {
  luauExecutionSessionTaskLogs: [
    {
      path: `universes/${UniverseId}/places/${PlaceId}${
        Version extends number ? `/versions/${Version}` : ""
      }/luau-execution-sessions/${SessionId}/tasks/${TaskId}/logs/1`,
      messages: any[],
    }
  ],
  nextPageToken: string,
}

export type FormattedListLuauExecutionLogs<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined,
  SessionId extends string, TaskId extends string
> = {
  path: `universes/${UniverseId}/places/${PlaceId}${
    Version extends number ? `/versions/${Version}` : ""
  }/luau-execution-sessions/${SessionId}/tasks/${TaskId}/logs/1`,
  messages: any[],
}[]
// -------------------------------------------------------------------------------------------------------------------