import type { Identifier, ObjectPrettify, StringIsLiteral } from "typeforge";


export type UserRestrictionsData<
  UniverseId extends Identifier, UserId extends Identifier, PlaceId extends Identifier | undefined = undefined
> = {
  path: (
    PlaceId extends Identifier ? `universes/${UniverseId}/places/${PlaceId}/user-restrictions/${UserId}`
    : `universes/${UniverseId}/user-restrictions/${UserId}`
  ),
  user: `users/${UserId}`,
  gameJoinRestriction: {
    active: boolean,
    startTime: string,
    duration?: `${number}s`,
    privateReason: string,
    displayReason: string,
    excludeAltAccounts: boolean,
    inherited: boolean
  }
}


/* PATCH /v2/universes/{universe}/user-restrictions/{user-restriction}
   PATCH /v2/universes/{universeId}/places/{placeId}/user-restrictions/{userId --------------------------------- */
export type UpdateUserRestrictionsData = {
  gameJoinRestriction: {
    active: boolean,
    duration?: `${number}s`,
    privateReason: string,
    displayReason: string,
    excludeAltAccounts: boolean,
  }
}



export type UpdateRestrictionsForUserData<
   UniverseId extends Identifier, UserId extends Identifier, PlaceId extends Identifier | undefined = undefined,
 
   UpdatedData extends UpdateUserRestrictionsData = UpdateUserRestrictionsData,

   _GameJoinRestriction extends UpdatedData["gameJoinRestriction"] = UpdatedData["gameJoinRestriction"],
   _Active = _GameJoinRestriction["active"], _Duration = _GameJoinRestriction["duration"]
 > = {
   path: (
     PlaceId extends Identifier ? `universes/${UniverseId}/places/${PlaceId}/user-restrictions/${UserId}`
     : `universes/${UniverseId}/user-restrictions/${UserId}`
   ),
   user: `users/${UserId}`,
 
   gameJoinRestriction: {
    [Key in keyof Omit<{
      active: _Active,
      startTime: string,
      duration: _Duration,
      privateReason: _GameJoinRestriction["privateReason"],
      displayReason: _GameJoinRestriction["displayReason"],
      excludeAltAccounts: _GameJoinRestriction["excludeAltAccounts"],
      inherited: boolean
    }, StringIsLiteral<_Duration> extends true ? "" : "duration">]: Omit<{
      active: _Active,
      startTime: string,
      duration: _Duration,
      privateReason: _GameJoinRestriction["privateReason"],
      displayReason: _GameJoinRestriction["displayReason"],
      excludeAltAccounts: _GameJoinRestriction["excludeAltAccounts"],
      inherited: boolean
    }, StringIsLiteral<_Duration> extends true ? "" : "duration">[Key]
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
  logs: RestrictionLogEntry<string, UserId, PlaceId>[],
  nextPageToken: string
}

export type PrettifiedListRestrictionLogsData<UserId extends Identifier = Identifier, PlaceId extends Identifier = Identifier> = (
  RestrictionLogEntry<Date, UserId, PlaceId>[]
)
// -------------------------------------------------------------------------------------------------------------------