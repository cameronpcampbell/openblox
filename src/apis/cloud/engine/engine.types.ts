// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ObjectEither, ObjectPrettify } from "typeforge"

type LowercaseFirstLetter<S extends string> =
S extends `${infer First}${infer Rest}`
? `${Lowercase<First>}${Rest}`
: S;
type KeysToCamelCase<Obj> = ObjectPrettify<{
  [Key in keyof Obj as LowercaseFirstLetter<string &Key>]: (
    Obj[Key] extends Array<any> ? Obj[Key]
    : Obj[Key] extends {} ? KeysToCamelCase< Obj[Key]>
    : Obj[Key]
  )
}>
//////////////////////////////////////////////////////////////////////////////////


export type LongRunningOperation<Path extends string, Response> = ObjectEither<{
  path: Path,
  done: false
}, {
  path: Path,
  done: true,
  response: Response
}>

// [ Instance ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v2/universes/{universeId}/places/{placeId}/instances/{instanceId} --------------------------------------------
export type RawInstanceData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = LongRunningOperation<
  `universes/${UniverseId}/places/${PlaceId}/instances/${InstanceId}/operations/d7bb3b1d-e259-410a-9f00-6dc3bc9f4cd8`, 
  {
    "@type": "type.googleapis.com/roblox.open_cloud.cloud.v2.Instance",
    path: `universes/${UniverseId}/places/${PlaceId}/instances/${"root" extends InstanceId ? string : InstanceId}`,
    hasChildren: boolean,
    engineInstance: {
      Id: "root" extends InstanceId ? string : InstanceId,
      Parent: string,
      Name: string,
      Details: {}
    }
  }
>

export type PrettifiedInstanceData<UniverseId extends Identifier, PlaceId extends Identifier, InstanceId extends string> = (
  KeysToCamelCase<RawInstanceData<UniverseId, PlaceId, InstanceId>>
)
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
