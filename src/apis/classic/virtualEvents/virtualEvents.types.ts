import type { ArrayRemoveTypes, Identifier, ISODateTime, ObjectPrettify, UnionPrettify } from "typeforge"

type ObjectValues<Obj extends Record<any, any>> = UnionPrettify<Obj[keyof Obj]>

export type EventCategory = "contentUpdate" | "locationUpdate" | "systemUpdate" | "activity"

type EventRsvpStatus = "none" | "going" | "maybeGoing" | "notGoing"

export type EventStatus = "unpublished" | "active"

export type Or<T, U> = T extends false ? U extends false ? false : true : true;

export type VirtualEvent<
  TemporalType, EventId extends Identifier = Identifier,
  HostId extends Identifier = Identifier, HostType extends "user" | "group" = "user" | "group"
> = ObjectPrettify<{
  id: EventId,
  title: string,
  displayTitle: string | null,
  description: string,
  displayDescription: string | null,
  eventTime: {
      startUtc: TemporalType,
      endUtc: TemporalType
  },
  host: {
      hostName: string,
      hasVerifiedBadge: boolean,
      hostType: HostType,
      hostId: HostId
  },
  universeId: Identifier,
  eventStatus: EventStatus,
  createdUtc: TemporalType,
  updatedUtc: TemporalType,
  eventCategories: [
    { category: EventCategory, rank: 0 },
    { category: EventCategory, rank: 1 }
  ] | null,
  thumbnails: {
    mediaId: Identifier,
    rank: number
  }[],
  allThumbnailsCreated: boolean,
  userRsvpStatus: EventRsvpStatus 
}>


// GET /v1/virtual-events/{eventId} ----------------------------------------------------------------------------------
export type RawVirtualEventsData<EventId extends Identifier> = VirtualEvent<ISODateTime, EventId>

export type PrettifiedVirtualEventsData<EventId extends Identifier> = VirtualEvent<Date, EventId>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/virtual-events/{eventId}/rsvps ----------------------------------------------------------------------------
export type PrettifiedRsvpsData = {
  userId: Identifier,
  rsvpStatus: EventRsvpStatus,
  shouldSeeNotificationUpsellModel: boolean
}[]

export type RawRsvpsData = {
  nextPageCursor: string,
  previousPageCursor: string,
  data: PrettifiedRsvpsData
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/virtual-events/{eventId}/rsvps/counters -------------------------------------------------------------------
export type PrettifiedRsvpCountersData = {
  [Status in EventRsvpStatus]: number
}

export type RawRsvpCountersData = {
  counters: PrettifiedRsvpCountersData
}
// -------------------------------------------------------------------------------------------------------------------


// GET GET /v1/virtual-events/permissions ----------------------------------------------------------------------------
export type AuthenticatedUserEventPermissionsForHostData = {
  maxPermissionLevel: "view" | "edit"
}
// -------------------------------------------------------------------------------------------------------------------


// GET GET /v1/virtual-events/permissions ----------------------------------------------------------------------------
export type PrettifiedAuthenticatedUserEventsData<GroupId extends Identifier> = VirtualEvent<Date, Identifier, GroupId, "group">[]

export type RawAuthenticatedUserEventsData<GroupId extends Identifier> = {
  nextPageCursor: string,
  previousPageCursor: string,
  data: VirtualEvent<ISODateTime, Identifier, GroupId, "group">[]
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/virtual-events/create -------------------------------------------------------------------------------------
type CreatedVirtualEvent<
  TemporalType,
  Title extends string, Description extends string,
  StartTime extends ISODateTime | Date, EndTime extends ISODateTime | Date,
  UniverseId extends Identifier, GroupId extends Identifier,
  ThumbnailIds extends Identifier[],
  PrimaryCategory extends EventCategory | undefined,
  SecondaryCategory extends EventCategory | undefined
> = ObjectPrettify<{
  id: Identifier,
  title: Title,
  displayTitle: string | null,
  description: Description,
  displayDescription: string | null,
  eventTime: {
      startUtc: StartTime,
      endUtc: EndTime
  },
  host: {
      hostName: string,
      hasVerifiedBadge: boolean,
      hostType: "group",
      hostId: GroupId
  },
  universeId: UniverseId,
  eventStatus: "unpublished",
  createdUtc: TemporalType,
  updatedUtc: TemporalType,

  eventCategories: PrimaryCategory extends undefined ? null : ArrayRemoveTypes<[
    { category: PrimaryCategory, rank: 0 },

    SecondaryCategory extends undefined
      ? null
      : { category: SecondaryCategory, rank: 1 }
  ], null>,

  thumbnails: ThumbnailIds["length"] extends 0 ? null : UnionPrettify<ObjectValues<{

    [Idx in keyof ArrayIndicesOnly<ThumbnailIds>]: {
      mediaId: ThumbnailIds[Idx],
      rank: Idx
    }
  }>>[],

  allThumbnailsCreated: boolean
}>


type ArrayNonIntegerKeys =  
"length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "includes" | "flatMap" | "flat" | "at" | typeof Symbol.iterator | typeof Symbol.unscopables | number

type ArrayIndicesOnly<Arr extends any[]> = Omit<Arr, ArrayNonIntegerKeys>

export type RawCreatedVirtualEvent<
  Title extends string, Description extends string,
  StartTime extends ISODateTime | Date, EndTime extends ISODateTime | Date,
  UniverseId extends Identifier, GroupId extends Identifier,
  ThumbnailIds extends Identifier[],
  PrimaryCategory extends EventCategory | undefined,
  SecondaryCategory extends EventCategory  | undefined
// @ts-ignore | hush hush shawty
> = CreatedVirtualEvent<
  ISODateTime, Title, Description, StartTime, EndTime, UniverseId, GroupId, ThumbnailIds, PrimaryCategory, SecondaryCategory
>

export type PrettifiedCreatedVirtualEvent<
  Title extends string, Description extends string,
  UniverseId extends Identifier, GroupId extends Identifier,
  ThumbnailIds extends Identifier[],
  PrimaryCategory extends EventCategory | undefined,
  SecondaryCategory extends EventCategory  | undefined
// @ts-ignore | hush hush shawty
> = CreatedVirtualEvent<
  Date, Title, Description, Date, Date, UniverseId, GroupId, ThumbnailIds, PrimaryCategory, SecondaryCategory
>
// -------------------------------------------------------------------------------------------------------------------
