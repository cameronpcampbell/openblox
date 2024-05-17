
# readQueueItems
Reads queue items.


## Parameters
| Name                       | Type       | Description                                                                                                                                          |
| :------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| universeId                 | Identifier | The id of the universe to read queue items from.                                                                                                     |
| queue                      | string     | Name of the Queue.                                                                                                                                   |
| limit                      | ?          | Maximum entries to read, Max 200, Default 1.                                                                                                         |
| allOrNothing               | ?          | Whether to read any items if >= count can’t be read. Default false.                                                                                  |
| invisibilityTimeoutSeconds | ?          | Invisibility timeout for items read, default 30s. This will make previously read items invisible for the provided duration in the next Read request. |



## Example
```js copy showLineNumbers
type Item = { isReal: boolean };
const {
  data: queueItems,
  response: { body },
} = await MemoryStoresApi.readQueueItems<Item>({ universeId: 5243626809, queue: "MyQueue", limit: 2 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}/memory-store/queues/{queue}/items:read
```
  