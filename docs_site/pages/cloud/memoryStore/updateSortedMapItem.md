
# updateSortedMapItem
Updates a sorted map item.


## Parameters
| Name            | Type                                               | Description                                                                           |
| :-------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------ |
| universeId      | Identifier                                         | The id of the universe to get the sorted map item from.                               |
| sortedMap       | string                                             | The sorted map to get the item from.                                                  |
| itemId          | string                                             | The id of the item to update.                                                         |
| updatedItemData | UpdateSortedMapItem_ConstructItemConfig<ItemValue> | The data to update the sorted map item with.                                          |
| allowMissing    | ?                                                  | If set to true, and the item is not found, a new item will be created. Default false. |



## Example
```js copy showLineNumbers
type Item = { isReal: boolean };
const { data: updatedItem } = await MemoryStoresApi.updateSortedMapItem<Item>({
  universeId: 5243626809,
  sortedMap: "MySortedMap",
  itemId: "Testing123",
  updatedItemData: { value: { isReal: true }, ttl: "300s", numericSortKey: 1 },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{itemId}
```
  