
# listSortedMapItems
Lists items of a sorted map.


## Parameters
| Name        | Type       | Description                                             |
| :---------- | :--------- | :------------------------------------------------------ |
| universeId  | Identifier | The id of the universe to get the sorted map item from. |
| sortedMap   | string     | The sorted map to get the item from.                    |
| maxPageSize | ?          | The id of the item to get.                              |
| orderBy     | ?          | The order of the returned sorted map items.             |
| filter      | ?          | filter returned sorted map items.                       |



## Example
```js copy showLineNumbers
const { data: items } = await MemoryStoresApi.listSortedMapItems<Item>({
  universeId: 5243626809,
  sortedMap: "MySortedMap",
  maxPageSize: 1,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}/memory-store/sorted-maps/{sortedMap}/items
```
  