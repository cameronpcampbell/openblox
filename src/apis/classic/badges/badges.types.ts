import type { Identifier, ISODateTime, ObjectPrettify } from "typeforge"


type BadgeInfo<TemporalType, BadgeId extends Identifier = Identifier, UniverseId extends Identifier = Identifier> = ObjectPrettify<{
  id: BadgeId,
  name: string,
  description: string,
  displayName: string,
  displayDescription: string,
  enabled: boolean,
  iconImageId: Identifier,
  displayIconImageId: Identifier,
  created: TemporalType,
  updated: TemporalType,
  statistics: {
    pastDayAwardedCount: number,
    awardedCount: number,
    winRatePercentage: number,
  },
  awardingUniverse: {
    id: UniverseId,
    name: string,
    rootPlaceId: Identifier,
  },
}>


// [ Badges ] ////////////////////////////////////////////////////////////////////
// GET /v1/badges/{badgeId} -----------------------------------------------------------------------------------------

export type RawBadgeInfoData<BadgeId extends Identifier> = BadgeInfo<ISODateTime, BadgeId>

export type PrettifiedBadgeInfoData<BadgeId extends Identifier> = BadgeInfo<Date, BadgeId>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/badges && GET /v1/users/{userId}/badges --------------------------------------------
export type RawPaginatedBadgesData<UniverseId extends Identifier = Identifier> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: BadgeInfo<ISODateTime, Identifier, UniverseId>[]
}

export type PrettifiedPaginatedBadgesData<UniverseId extends Identifier = Identifier> = BadgeInfo<Date, Identifier, UniverseId>[]
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////



// [ Badge Awards ] //////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/badges/{badgeId}/awarded-date --------------------------------------------------------------
export type RawBadgeAwardedDateForUserData<BadgeId extends Identifier> = {
  badgeId: BadgeId,
  awardedDate: ISODateTime
} | ""

export type PrettifiedBadgeAwardedDateForUserData = Date | null
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/badges/awarded-dates -----------------------------------------------------------------------
export type RawBadgesAwardedDatesForUserData<BadgeId extends Identifier> = {
  data: {
    badgeId: BadgeId,
    awardedDate: ISODateTime
  }[]
}

export type PrettifiedBadgesAwardedDatesForUserData<BadgeId extends Identifier> = {
  [Key in BadgeId]: Date | undefined
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////