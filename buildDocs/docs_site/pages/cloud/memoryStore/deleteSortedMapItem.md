
# deleteSortedMapItem
Deletes a sorted map item.


## Parameters
| Name       | Type       | Description                                             |
| :--------- | :--------- | :------------------------------------------------------ |
| universeId | Identifier | The id of the universe to get the sorted map item from. |
| sortedMap  | string     | The sorted map to get the item from.                    |
| itemId     | string     | The id of the item to update.                           |
| etag       | ?          | Server generated id for conditional delete.             |



## Example
```js copy showLineNumbers
await MemoryStoresApi.deleteSortedMapItem({ universeId: 5243626809, sortedMap: "MySortedMap", itemId: "Testing1234" }); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items/{itemId}
```
  