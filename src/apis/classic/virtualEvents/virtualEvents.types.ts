import { NumberIsLiteral } from "../../../utils/utils.types"
import { ArrayNonEmpty, ArrayRemoveTypes, Identifier, ISODateTime, IsUnion, ObjectPrettify, UnionPrettify, UnionToArray } from "typeforge"

export type EventCategory = "contentUpdate" | "locationUpdate" | "systemUpdate" | "activity"

type EventRsvpStatus = "none" | "going" | "maybeGoing" | "notGoing"

export type EventStatus = "unpublished" | "active"

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
type ArrayOfIndices<X extends number, Result extends any[] = []> =
  NumberIsLiteral<X> extends false ? [0] :
  Result['length'] extends X ? Result
  : ArrayOfIndices<X, [...Result, Result['length']]>;

type ObjectToArray<T extends Record<string, any>> = Array<T[keyof T]>;

type ObjectValues<T> = T[keyof T]


type CreatedVirtualEvent<
  TemporalType,
  Title extends string, Description extends string,
  StartTime extends ISODateTime | Date, EndTime extends ISODateTime | Date,
  UniverseId extends Identifier, GroupId extends Identifier,
  ThumbnailIds extends Identifier[],
  PrimaryCategory extends EventCategory | undefined,
  SecondaryCategory extends EventCategory | undefined,
  // @ts-ignore | hush hush shawty
  _SecondaryCategoryLength extends number = UnionToArray<SecondaryCategory>["length"]
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
      // @ts-ignore | hush hush
      : _SecondaryCategoryLength extends 1
        ? { category: SecondaryCategory, rank: 1 }
        : null
  ], null>,

  thumbnails: ThumbnailIds["length"] extends 0 ? null : UnionPrettify<ObjectValues<{
    // @ts-ignore | hush hush shawty
    [Key in ArrayOfIndices<ThumbnailIds["length"]>[number]]: {
      // @ts-ignore | hush hush shawty
      mediaId: ThumbnailIds[Key],
      rank: Key
    }
  }>>[],

  allThumbnailsCreated: boolean
}>

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
