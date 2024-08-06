import type { Identifier, ObjectPrettify } from "typeforge";
import { KeysToCamelCase } from "../../../utils/utils.types";


// [ Users ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/universes ----------------------------------------------------------------------------------
export type RawUniverseFollowingsForUserData<UserId extends Identifier> = ObjectPrettify<{
  universeId: Identifier,
  userId: UserId
}>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/universes/{universeId}/status --------------------------------------------------------------
export type RawUniverseFollowingStatusForUserData<UniverseId extends Identifier, UserId extends Identifier> = {
  UniverseId: UniverseId,
  UserId: UserId,
  CanFollow: boolean,
  IsFollowing: boolean,
  FollowingCountByType: number,
  FollowingLimitByType: number,
}

export type PrettifiedUniverseFollowingStatusForUserData<UniverseId extends Identifier, UserId extends Identifier> = ObjectPrettify<
  KeysToCamelCase<RawUniverseFollowingStatusForUserData<UniverseId, UserId>>
>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////