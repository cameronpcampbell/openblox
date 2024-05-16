import { ArrayPrettify, ISODateTime, ObjectPrettify, ObjectPrettifyDeep, Prettify } from "typeforge"
import { Identifier } from "../../../utils/utils.types"

type ConstructItemConfig<ItemValue> = {
  value: ItemValue,
  ttl: `${number}s`,
  numericSortKey?: number,
  stringSortKey?: string
} & ({
  numericSortKey?: number,
  stringSortKey?: undefined
} | {
  stringSortKey?: string
  numericSortKey?: undefined,
})

type SortedMapItemData<
  ItemValue, DateTimeType,
  UniverseId extends Identifier = Identifier,
  Id extends string = string
> = {
  path: `cloud/v2/universes/${UniverseId}/memory-store/sorted-maps/MySortedMap/items`,
  value: Prettify<ItemValue>,
  etag: `${number}`,
  expireTime: DateTimeType,
  id: Id,
  numericSortKey?: number,
  stringSortKey?: string
}

export type RawSortedMapItemData<ItemValue> = SortedMapItemData<ItemValue, ISODateTime>
export type PrettifiedSortedMapItemData<ItemValue> = SortedMapItemData<ItemValue, Date>

export type Operation<UniverseId extends Identifier> = {
  path: `cloud/v2/universes/${UniverseId}/operations/AAEAAAAAAAAWybZqxIMligayfdeM29NTh2SOUhyvJzzeaycAZviqVg`,
  done: null | true
}

// GET /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items -----------------------------------------
export type RawListSortedMapItemsData = {
  items: ObjectPrettify<RawSortedMapItemData<any>>[],
  nextPageToken?: string
}

export type PrettifiedListSortedMapItemsData = ArrayPrettify<Array<ObjectPrettify<PrettifiedSortedMapItemData<any>>>>
// -------------------------------------------------------------------------------------------------------------------


// POST /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items ----------------------------------------
export type CreateSortedMapItem_ConstructItemConfig<ItemValue> = { id: string } & ConstructItemConfig<ItemValue>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{item} --------------------------------
export type UpdateSortedMapItem_ConstructItemConfig<ItemValue> = ConstructItemConfig<ItemValue>

export type RawUpdateSortedMapItem<ItemValue> = Omit<RawSortedMapItemData<ItemValue>, "id">

export type PrettifiedUpdateSortedMapItem<ItemValue> = Omit<PrettifiedSortedMapItemData<ItemValue>, "id">
// -------------------------------------------------------------------------------------------------------------------

// POST /v2/universes/${universeId}/memory-store/queues/${queue}/items:add -------------------------------------------
export type EnqueueItem_ConstructItemConfig<ItemValue> = { name: string, value: ItemValue, ttl: `${number}${string}`, priority?: number }

export type EnqueueItemData<ItemValue> = {
  path: `cloud/v2/universes/${Identifier}/memory-store/queues/${string}/items:add`,
  data: {
    name: string,
    value: ItemValue
  },
  priority: number
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/universes/{universeId}/memory-store/queues/{queue}/items:read ---------------------------------------------
type ReadQueueItemData<ItemValue> = {
  name: string,
  value: ItemValue
}

export type RawReadQueueItemsData<ItemValue> = ObjectPrettifyDeep<{
  data: ReadQueueItemData<ItemValue>[],
  id: string
}>

export type PrettifiedReadQueueItemsData<ItemValue> = ObjectPrettifyDeep<{
  items: ReadQueueItemData<ItemValue>[],
  readId: string
}>
// -------------------------------------------------------------------------------------------------------------------


// POST /v2/universes/${universeId}/memory-store:flush ---------------------------------------------------------------
export type RawFlushAllQueuesData<UniverseId extends Identifier> = {
  path: `cloud/v2/universes/${UniverseId}/operations/${string}`,
  done: null | true
}

export type PrettifiedFlushAllQueuesData<UniverseId extends Identifier> = {
  path: `cloud/v2/universes/${UniverseId}/operations/${string}`,
  done: boolean,
  id: string
}
// -------------------------------------------------------------------------------------------------------------------