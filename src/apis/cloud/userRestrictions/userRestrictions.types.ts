import { Identifier, ISODateTime, ObjectPrettify } from "typeforge";

type UserRestrictionsData<
  TemporalType,
  UniverseId extends Identifier, UserId extends Identifier, PlaceId extends Identifier | undefined = undefined,

  UpdatedData extends UpdateUserRestrictionsData = UpdateUserRestrictionsData,
  _GameJoinRestriction extends UpdatedData["gameJoinRestriction"] = UpdatedData["gameJoinRestriction"]
> = {
  path: (
    PlaceId extends Identifier ? `universes/${UniverseId}/places/${PlaceId}/user-restrictions/${UserId}`
    : `universes/${UniverseId}/user-restrictions/${UserId}`
  ),
  user: `users/${UserId}`,

  gameJoinRestriction: {
    active: _GameJoinRestriction["active"],
    startTime: TemporalType,
    duration: _GameJoinRestriction["duration"],
    privateReason: _GameJoinRestriction["privateReason"],
    displayReason: _GameJoinRestriction["displayReason"],
    excludeAltAccounts: _GameJoinRestriction["excludeAltAccounts"],
    inherited: boolean
  }
}

export type RawUserRestrictionsData<
  UniverseId extends Identifier, UserId extends Identifier,
  PlaceId extends Identifier | undefined = undefined,
  UpdatedData extends UpdateUserRestrictionsData = UpdateUserRestrictionsData,
> = UserRestrictionsData<ISODateTime, UniverseId, UserId, PlaceId, UpdatedData>

export type PrettifiedUserRestrictionsData<
  UniverseId extends Identifier, UserId extends Identifier,
  PlaceId extends Identifier | undefined = undefined,
  UpdatedData extends UpdateUserRestrictionsData = UpdateUserRestrictionsData,
> = UserRestrictionsData<Date, UniverseId, UserId, PlaceId, UpdatedData>


/* PATCH /v2/universes/{universe}/user-restrictions/{user-restriction}
   PATCH /v2/universes/{universeId}/places/{placeId}/user-restrictions/{userId --------------------------------- */
export type UpdateUserRestrictionsData = {
  gameJoinRestriction: {
    active: boolean,
    duration: `${number}s`,
    privateReason: string,
    displayReason: string,
    excludeAltAccounts: boolean,
  }
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/standard-datastores ----------------------------------------------------------------
type RestrictionLogEntry<TemporalType, UserId extends Identifier = Identifier, PlaceId extends Identifier = Identifier> = ObjectPrettify<{
  user: `users/${UserId}`,
  place: `${PlaceId}`,
  moderator: {
    robloxUser: `${Identifier}`
  },
  createTime: TemporalType,
  active: boolean,
  startTime: TemporalType,
  duration: `${number}s`,
  privateReason: string,
  displayReason: string,
  excludeAltAccounts: boolean
}>

export type RawListRestrictionLogsData<UserId extends Identifier = Identifier, PlaceId extends Identifier = Identifier> = {
  logs: RestrictionLogEntry<ISODateTime, UserId, PlaceId>[],
  nextPageToken: string
}

export type PrettifiedListRestrictionLogsData<UserId extends Identifier = Identifier, PlaceId extends Identifier = Identifier> = (
  RestrictionLogEntry<Date, UserId, PlaceId>[]
)
// -------------------------------------------------------------------------------------------------------------------