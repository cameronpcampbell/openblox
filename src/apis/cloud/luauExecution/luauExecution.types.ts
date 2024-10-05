import type { Identifier, ISODateTime, ObjectEither, ObjectPrettify, Prettify, UnionPrettify } from "typeforge"

type LuauExecutionState = UnionPrettify<"STATE_UNSPECIFIED" | "QUEUED" | "PROCESSING" | "CANCELLED" | "COMPLETE" | "FAILED">

type LuauExecutionError = UnionPrettify<"ERROR_CODE_UNSPECIFIED" | "SCRIPT_ERROR" | "DEADLINE_EXCEEDED" | "OUTPUT_SIZE_LIMIT_EXCEEDED" | "INTERNAL_ERROR">

export type LuauExecutionPathItems<
  UniverseId extends Identifier = Identifier, PlaceId extends Identifier = Identifier, Version extends number | undefined = number | undefined
> = {
  universeId: UniverseId,
  placeId: PlaceId,
  version: Version extends undefined ? number : Version,
  sessionId: string,
  taskId: string
}

/*
  POST /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks
  POST /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks
*/
export type RawExecuteLuauData<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined
> = {
  path: `/v2/universes/${UniverseId}/places/${PlaceId}${
    Version extends number ? `/versions/${Version}` : ""
  }/luau-execution-sessions/${string}/tasks/${string}`,
  user: Identifier,
  state: LuauExecutionState,
  script: string
}

export type FormattedExecuteLuauData<
  UniverseId extends Identifier, PlaceId extends Identifier, Version extends number | undefined
> = RawExecuteLuauData<UniverseId, PlaceId, Version> & LuauExecutionPathItems<UniverseId, PlaceId, Version>
// -------------------------------------------------------------------------------------------------------------------


/*
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-session-tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-session-tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/luau-execution-sessions/{sessionId}/tasks
  GET /cloud/v2/universes/{universeId}/places/{placeId}/versions/{version}/luau-execution-sessions/{sessionId}/tasks
*/
export type RawLuauExecutionTaskData<
  Results extends any[] = any[]
> = {
  path: `/v2/universes/${Identifier}/places/${Identifier}${
     `/versions/${number}` | ""
  }/luau-execution-sessions/${string}/tasks/${string}`,
  createTime: ISODateTime,
  updateTime: ISODateTime,
  user: Identifier,
  state: LuauExecutionState,
  script: string,
} & ObjectEither<
  {
    error: {
      code: LuauExecutionError,
      message: "string"
    }
  },
  {
    output: {
      results: Prettify<Results>
    }
  }
>

export type FormattedLuauExecutionTaskData<
  Results extends any[] = any[]
> = RawLuauExecutionTaskData<Results> & LuauExecutionPathItems
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
> = ObjectPrettify<({
  path: `universes/${UniverseId}/places/${PlaceId}${
    Version extends number ? `/versions/${Version}` : ""
  }/luau-execution-sessions/${SessionId}/tasks/${TaskId}/logs/1`,
  messages: any[],
} & LuauExecutionPathItems)>[]
// -------------------------------------------------------------------------------------------------------------------