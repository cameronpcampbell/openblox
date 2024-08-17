import type { Identifier, ObjectEither, ObjectPrettify, ObjectKeysToCamelCase } from "typeforge"
import type { LongRunningOperation } from "../../../apis/apis.types";


type InstanceDetails = ObjectEither<
  {
    Folder: {}
  },
  ObjectEither<
    {
      LocalScript: {
        Enabled: boolean,
        RunContext: "Legacy" | "Server" | "Client" | "Plugin",
        Source: string
      },
    },
    ObjectEither<
      {
        ModuleScript: {
          Source: string
        }
      },
      ObjectEither<
        {
          Script: {
            Enabled: boolean,
            RunContext: "Legacy" | "Server" | "Client" | "Plugin",
            Source: string
          }
        },
        {}
      >
    >
  >
>


// [ Instance ] /////////////////////////////////////////////////////////////////////////////////////////////////////
type RawInstance<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = ObjectPrettify<{
  path: `universes/${UniverseId}/places/${PlaceId}/instances/${"root" extends InstanceId ? string : InstanceId}`,
  hasChildren: boolean,
  engineInstance: {
    Id: "root" extends InstanceId ? string : InstanceId,
    Parent: string,
    Name: string,
    Details: InstanceDetails
  }
}>

type PrettifiedInstance<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = ObjectPrettify<{
  path: `universes/${UniverseId}/places/${PlaceId}/instances/${"root" extends InstanceId ? string : InstanceId}`,
  hasChildren: boolean,
  engineInstance: {
    id: "root" extends InstanceId ? string : InstanceId,
    parent: string,
    name: string,
    details: ObjectKeysToCamelCase<InstanceDetails>
  }
}>

// GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId} --------------------------------------------
export type RawInstanceData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = LongRunningOperation<
  `universes/${UniverseId}/places/${PlaceId}/instances/${InstanceId}/operations/${string}`, 
  { "@type": "type.googleapis.com/roblox.open_cloud.cloud.v2.Instance" }
  & RawInstance<UniverseId, PlaceId, InstanceId>
>

export type PrettifiedInstanceData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = LongRunningOperation<
  `universes/${UniverseId}/places/${PlaceId}/instances/${InstanceId}/operations/${string}`, 
  { "@type": "type.googleapis.com/roblox.open_cloud.cloud.v2.Instance" }
  & PrettifiedInstance<UniverseId, PlaceId, InstanceId>
>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId}:listChildren -------------------------------
type InstanceChildrenData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string, Instances> = LongRunningOperation<
  `universes/${UniverseId}/places/${PlaceId}/instances/${InstanceId}/operations/${string}`, 
  {
    "@type": "type.googleapis.com/roblox.open_cloud.cloud.v2.ListInstanceChildrenResponsee",
    instances: Instances[],
    nextPageToken: string
  }
>

export type RawInstanceChildrenData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = (
  InstanceChildrenData<UniverseId, PlaceId, InstanceId, RawInstance<UniverseId, PlaceId, InstanceId>>
)

export type PrettifiedInstanceChildrenData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = (
  InstanceChildrenData<UniverseId, PlaceId, InstanceId, PrettifiedInstance<UniverseId, PlaceId, InstanceId>>
)
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v2/universes/{universe}/places/{place}/instances/{instance} ------------------------------------------------
export type UpdateInstance_NewData = {
  name?: string
  parent?: string,
} & ObjectEither<
  {
    folder: {}
  },
  ObjectEither<
    {
      localScript: {
        enabled?: boolean,
        runContext?: "Legacy" | "Server" | "Client" | "Plugin",
        source?: string
      },
    },
    ObjectEither<
      {
        moduleScript: {
          source?: string
        }
      },
      {
        script: {
          enabled?: boolean,
          runContext?: "Legacy" | "Server" | "Client" | "Plugin",
          source?: string
        }
      }
    >
  >
>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
