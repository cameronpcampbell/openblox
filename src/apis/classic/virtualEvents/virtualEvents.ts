// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ISODateTime, IsUnion, ObjectEither } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { AuthenticatedUserEventPermissionsForHostData, EventCategory, EventStatus, Or, PrettifiedAuthenticatedUserEventsData, PrettifiedCreatedVirtualEvent, PrettifiedRsvpCountersData, PrettifiedRsvpsData, PrettifiedVirtualEventsData, RawAuthenticatedUserEventsData, RawCreatedVirtualEvent, RawRsvpCountersData, RawRsvpsData, RawVirtualEventsData, VirtualEvent } from "./virtualEvents.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicVirtualEventsApi", baseUrl: "https://apis.roblox.com/virtual-events" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const prettifyEvent = (event: VirtualEvent<ISODateTime | Date>) => {
  const eventTime = event.eventTime
  eventTime.startUtc = new Date(eventTime.startUtc)
  eventTime.endUtc = new Date(eventTime.endUtc)

  event.createdUtc = new Date(event.createdUtc)
  event.updatedUtc = new Date(event.updatedUtc)

  return event as any
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about an event.
 * @endpoint GET /v1/virtual-events/{eventId}
 * 
 * @param eventId The ID of the event to get information for.
 * 
 * @example const { data:eventInfo } = await ClassicVirtualEventsApi.eventInfo({ eventId: "5904751593700196492" })
 * @exampleData {"id":"5904751593700196492","title":"My Cool Event Of Epic Awesomeness","displayTitle":"My Cool Event Of Epic Awesomeness","description":"hello","displayDescription":"hello","eventTime":{"startUtc":"2024-07-12T19:18:00.000Z","endUtc":"2024-07-13T20:30:00.000Z"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-12T19:01:41.661Z","updatedUtc":"2024-07-13T20:29:50.734Z","eventCategories":[{"category":"activity","rank":0},{"category":"systemUpdate","rank":1}],"thumbnails":[{"mediaId":18459197740,"rank":0}],"allThumbnailsCreated":false,"userRsvpStatus":"going"}
 * @exampleRawBody {"id":"5904751593700196492","title":"My Cool Event Of Epic Awesomeness","displayTitle":"My Cool Event Of Epic Awesomeness","description":"hello","displayDescription":"hello","eventTime":{"startUtc":"2024-07-12T19:18:00.000Z","endUtc":"2024-07-13T20:30:00.000Z"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-12T19:01:41.661Z","updatedUtc":"2024-07-13T20:29:50.734Z","eventCategories":[{"category":"activity","rank":0},{"category":"systemUpdate","rank":1}],"thumbnails":[{"mediaId":18459197740,"rank":0}],"allThumbnailsCreated":false,"userRsvpStatus":"going"}
 */
export const eventInfo = createApiMethod(async <EventId extends Identifier>(
  { eventId }: { eventId: Identifier }
): ApiMethod<RawVirtualEventsData<EventId>, PrettifiedVirtualEventsData<EventId>> => ({
  path: `/v1/virtual-events/${eventId}`,
  method: "GET",
  name: "eventInfo",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, prettifyEvent as any)
}))


/**
 * Creates a virtual event.
 * @endpoint POST /v1/virtual-events/create
 * 
 * @param title The title of the event.
 * @param description The description of the event.
 * @param startTime The start time of the event.
 * @param endTime The end time of the event.
 * @param universeId The ID of the universe to create the event in.
 * @param groupId The ID of the group to create the event in. The universe must be owned by this group.
 * @param primaryCategory The primary purpose/category of this event.
 * @param secondaryCategory The secondary purpose/category of this event.
 * @param thumbnailIds An array of thumbnailIds to be used for this event.
 * 
 * @example
 * const { data:createdEvent } = await ClassicVirtualEventsApi.createEvent({
     title: "Event Name", description: "Description",
     startTime: "2024-08-14T00:46:54.000Z", endTime: "2024-08-14T01:46:54.000Z",
     universeId: 6255645791, groupId: 15842838,
     primaryCategory: "contentUpdate", secondaryCategory: "activity"
   })
 * @exampleData {"id":"6533473338141704368","title":"Event Name","displayTitle":null,"description":"Description","displayDescription":null,"eventTime":{"startUtc":"2024-08-14T00:46:54.000Z","endUtc":"2024-08-14T01:46:54.000Z"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"unpublished","createdUtc":"2024-07-14T00:35:35.487Z","updatedUtc":"2024-07-14T00:35:35.487Z","eventCategories":[{"category":"contentUpdate","rank":0},{"category":"activity","rank":1}],"thumbnails":null,"allThumbnailsCreated":false}
 * @exampleRawBody {"id":"6533473338141704368","title":"Event Name","displayTitle":null,"description":"Description","displayDescription":null,"eventTime":{"startUtc":"2024-08-14T00:46:54+00:00","endUtc":"2024-08-14T01:46:54+00:00"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"unpublished","createdUtc":"2024-07-14T00:35:35.487+00:00","updatedUtc":"2024-07-14T00:35:35.487+00:00","eventCategories":[{"category":"contentUpdate","rank":0},{"category":"activity","rank":1}],"thumbnails":null,"allThumbnailsCreated":false}
 */
export const createEvent = createApiMethod(async <
  Title extends string, Description extends string,
  StartTime extends ISODateTime | Date, EndTime extends ISODateTime | Date,
  UniverseId extends Identifier, GroupId extends Identifier,
  SecondaryCategory extends PrimaryCategory extends undefined ? EventCategory : IsUnion<PrimaryCategory> extends true ? EventCategory : Exclude<EventCategory, PrimaryCategory>,
  PrimaryCategory extends EventCategory | undefined = undefined,
  const ThumbnailIds extends Identifier[] = [],
>(
  { title, description, startTime, endTime, universeId, groupId, primaryCategory, secondaryCategory, thumbnailIds }:
  {
    title: Title, description: Description, startTime: StartTime, endTime: EndTime, universeId: UniverseId, groupId: GroupId,
    thumbnailIds?: ThumbnailIds, primaryCategory?: PrimaryCategory, secondaryCategory?: SecondaryCategory
  }
): ApiMethod<
  RawCreatedVirtualEvent<Title, Description, StartTime, EndTime, UniverseId, GroupId, ThumbnailIds, PrimaryCategory, SecondaryCategory>,
  PrettifiedCreatedVirtualEvent<Title, Description, UniverseId, GroupId, ThumbnailIds, PrimaryCategory, SecondaryCategory>
> => ({
  method: "POST",
  path: `/v1/virtual-events/create`,
  name: `createEvent`,
  body: {
    title, description,
    eventTime: { startTime, endTime },
    universeId, groupId,
    eventCategories: primaryCategory && [
      { category: primaryCategory, rank: 0 },
      secondaryCategory && { category: secondaryCategory, rank: 1 }
    ].filter(e => e),
    thumbnails: thumbnailIds ? thumbnailIds.map((mediaId, rank) => ({ mediaId, rank })) : undefined
  },

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, prettifyEvent as any)
}))

/**
 * DESCRIPTION
 * @endpoint REST /...
 * 
 * @param
 * 
 * @example
 * const { data:updatedEvent } = await ClassicVirtualEventsApi.updateEvent({
     eventId: "7512531542949494927", title: "Event Name", description: "Description",
     startTime: "2024-08-14T00:46:54.000Z", endTime: "2024-08-14T01:46:54.000Z",
     primaryCategory: "contentUpdate", secondaryCategory: "locationUpdate"
   })
 * @exampleData {"isUpdated":true,"thumbnailsUpdated":false,"categoriesUpdated":true}
 * @exampleRawBody {"isUpdated":true,"thumbnailsUpdated":false,"categoriesUpdated":true}
 */



export const updateEvent = createApiMethod(async <
  SecondaryCategory extends (PrimaryCategory extends undefined
    ? undefined
    : Exclude<EventCategory, PrimaryCategory>
  ),
  PrimaryCategory extends EventCategory | undefined = undefined,
  const ThumbnailIds extends Identifier[] = [],

  _IsCategoriesUpdated extends boolean = Or<PrimaryCategory extends undefined ? false : true, SecondaryCategory extends undefined ? false : true>,

  _ThunbnailsUpdated extends boolean = ThumbnailIds["length"] extends 0 ? false : true
>(
  { eventId, title, description, startTime, endTime, thumbnailIds, primaryCategory, secondaryCategory }:
  {
    eventId: Identifier, title?: string, description?: string, startTime?: ISODateTime | Date, endTime?: ISODateTime | Date,
    thumbnailIds?: ThumbnailIds, primaryCategory?: PrimaryCategory, secondaryCategory?: SecondaryCategory
  }
): ApiMethod<{ isUpdated: true, thumbnailsUpdated: _ThunbnailsUpdated, categoriesUpdated: _IsCategoriesUpdated }> => ({
  method: "PATCH",
  path: `/v1/virtual-events/${eventId}`,
  name: `updateEvent`,
  
  body: {
    title, description,
    eventTime: { startTime, endTime },
    eventCategories: primaryCategory && [
      { category: primaryCategory, rank: 0 },
      secondaryCategory && { category: secondaryCategory, rank: 1 }
    ].filter(e => e),
    thumbnails: thumbnailIds ? thumbnailIds.map((mediaId, rank) => ({ mediaId, rank })) : undefined
  },
}))


/**
 * Publishes an event.
 * @endpoint POST /v1/virtual-events/{eventId}/status
 * 
 * @param eventId The ID of the event to update status for.
 * 
 * @example const { data:success } = await ClassicVirtualEventsApi.publishEvent({ eventId: "6533473338141704368" })
 * @exampleData { isUpdated: true }
 * @exampleRawBody true
 */
export const publishEvent = createApiMethod(async (
  { eventId }: { eventId: Identifier }
): ApiMethod<{ isUpdated: boolean }, boolean> => ({
  method: "PATCH",
  path: `/v1/virtual-events/${eventId}/status`,
  name: `publishEvent`,
  body: { eventStatus: "active" },

  formatRawDataFn: ({ isUpdated }) => isUpdated
}))


/**
 * Gets rsvps for an event.
 * @endpoint GET /v1/virtual-events/{eventId}/rsvps
 * 
* @param eventId The ID of the event to get rsvps for.
 * 
 * @example const { data:rsvps } = await ClassicVirtualEventsApi.eventRsvps({ eventId: "5904751593700196492" })
 * @exampleData [{"userId":45348281,"rsvpStatus":"going","shouldSeeNotificationsUpsellModal":false}]
 * @exampleRawBody {"nextPageCursor":"","previousPageCursor":"","data":[{"userId":45348281,"rsvpStatus":"going","shouldSeeNotificationsUpsellModal":false}]}
 */
export const eventRsvps = createApiMethod(async (
  { eventId, limit, cursor }: { eventId: Identifier, limit?: 25, cursor?: string }
): ApiMethod<RawRsvpsData, PrettifiedRsvpsData> => ({
  method: "GET",
  path: `/v1/virtual-events/${eventId}/rsvps`,
  searchParams: { limit, cursor },
  name: `eventRsvpCounters`,

  formatRawDataFn: ({ data }) => data 
}))


/**
 * Gets rsvp counters for an event.
 * @endpoint GET /v1/virtual-events/{eventId}/rsvps/counters
 * 
* @param eventId The ID of the event to get rsvp counters for.
 * 
 * @example const { data:counters } = await ClassicVirtualEventsApi.eventRsvpCounters({ eventId: "5904751593700196492" })
 * @exampleData {"none":0,"going":1,"maybeGoing":0,"notGoing":0}
 * @exampleRawBody {"counters":{"none":0,"going":1,"maybeGoing":0,"notGoing":0}}
 */
export const eventRsvpCounters = createApiMethod(async (
  { eventId }: { eventId: Identifier }
): ApiMethod<RawRsvpCountersData, PrettifiedRsvpCountersData> => ({
  method: "GET",
  path: `/v1/virtual-events/${eventId}/rsvps/counters`,
  name: `eventRsvpCounters`,

  formatRawDataFn: ({ counters }) => counters 
}))


/**
 * Gets permissions for all events created by either a user or a group.
 * @endpoint GET /v1/virtual-events/permissions
 * 
 * @param userId Define a userId to get permissions for all events created by the user.
 * @param groupId Define a groupId to get permissions for all events created by the group.
 * 
 * @example const { data:permissions } = await ClassicVirtualEventsApi.authenticatedUserEventPermissionsForHost({ groupId: 15842838 })
 * @exampleData {"maxPermissionLevel":"edit"}
 * @exampleRawBody {"maxPermissionLevel":"edit"}
 */
export const authenticatedUserEventPermissionsForHost = createApiMethod(async (
  { userId, groupId }: ObjectEither<{ userId: Identifier }, { groupId: Identifier }>
): ApiMethod<AuthenticatedUserEventPermissionsForHostData> => ({
  method: "GET",
  path: `/v1/virtual-events/permissions`,
  searchParams: { hostId: userId || groupId, hostType: userId ? "user" : "group" },
  name: `authenticatedUserEventPermissionsForHost`,
}))



/**
 * Gets events that the authenticated user has edit access to from a group.
 * @endpoint GET /v1/virtual-events/my-events
 * 
 * @param groupId The ID of the group to get events from.
 * @param filterBy Filter the events by different criterias.
 * @param sortOrder The order that the results are sorted in.
 * @param sortBy The criteria used to sort the results.
 * @param fromUtc Only include events during or after a specific time.
 * @param limit The number of results to be returned.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:myEvents } = await ClassicVirtualEventsApi.authenticatedUserEvents({ groupId: 15842838 })
 * @exampleData [{"id":"5904751593700196492","title":"My Cool Event Of Epic Awesomeness","displayTitle":null,"description":"hello","displayDescription":null,"eventTime":{"startUtc":"2024-07-12T19:18:00.000Z","endUtc":"2024-07-13T20:30:00.000Z"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-12T19:01:41.661Z","updatedUtc":"2024-07-13T20:29:50.734Z","eventCategories":null,"thumbnails":[{"mediaId":18459197740,"rank":0}],"allThumbnailsCreated":false},{"id":"3425484122702479513","title":"Test","displayTitle":null,"description":"lol","displayDescription":null,"eventTime":{"startUtc":"2024-07-13T21:27:32.656Z","endUtc":"2024-07-13T22:27:32.656Z"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-13T20:27:52.493Z","updatedUtc":"2024-07-13T20:27:52.967Z","eventCategories":null,"thumbnails":null,"allThumbnailsCreated":false}]
 * @exampleRawBody {"nextPageCursor":"","previousPageCursor":"","data":[{"id":"5904751593700196492","title":"My Cool Event Of Epic Awesomeness","displayTitle":null,"description":"hello","displayDescription":null,"eventTime":{"startUtc":"2024-07-12T19:18:00+00:00","endUtc":"2024-07-13T20:30:00+00:00"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-12T19:01:41.661+00:00","updatedUtc":"2024-07-13T20:29:50.734+00:00","eventCategories":null,"thumbnails":[{"mediaId":18459197740,"rank":0}],"allThumbnailsCreated":false},{"id":"3425484122702479513","title":"Test","displayTitle":null,"description":"lol","displayDescription":null,"eventTime":{"startUtc":"2024-07-13T21:27:32.656+00:00","endUtc":"2024-07-13T22:27:32.656+00:00"},"host":{"hostName":"Bloxfolio","hasVerifiedBadge":false,"hostType":"group","hostId":15842838},"universeId":6255645791,"eventStatus":"active","createdUtc":"2024-07-13T20:27:52.493+00:00","updatedUtc":"2024-07-13T20:27:52.967+00:00","eventCategories":null,"thumbnails":null,"allThumbnailsCreated":false}]}
 */
export const authenticatedUserEvents = createApiMethod(async <GroupId extends Identifier>(
  { groupId, filterBy, sortOrder, sortBy, fromUtc, limit, cursor }:
  {
    groupId: GroupId, filterBy?: "upcoming" | "past" | "drafts", sortOrder?: "desc" | "asc",
    sortBy?: "startUtc" | "createdUtc", fromUtc?: Date | ISODateTime, limit?: number, cursor?: number
  }
): ApiMethod<RawAuthenticatedUserEventsData<GroupId>, PrettifiedAuthenticatedUserEventsData<GroupId>> => ({
  method: "GET",
  path: `/v1/virtual-events/my-events`,
  searchParams: { groupId, filterBy, sortOrder, sortBy, fromUtc, limit, cursor },
  name: `authenticatedUserEvents`,

  formatRawDataFn: ({ data }) => data.map(event => cloneAndMutateObject(event, prettifyEvent as any))
}))