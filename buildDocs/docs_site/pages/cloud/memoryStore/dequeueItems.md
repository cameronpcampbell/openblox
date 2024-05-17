
# dequeueItems
Dequeues queue items.


## Parameters
| Name       | Type       | Description                                                                                                   |
| :--------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| universeId | Identifier | The id of the universe to remove queue items from.                                                            |
| queue      | string     | Name of the Queue.                                                                                            |
| readId     | string     | ID returned from a previous Read Queue call. It will discard all items that were read from the previous call. |



## Example
```js copy showLineNumbers
await MemoryStoresApi.dequeueItems({
  universeId: 5243626809,
  queue: "MyQueue",
  readId: "5cfc27af46da4cf08b41aa9a3d78a75e",
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v2/universes/{universeId}/memory-store/queues/{queue}/items:discard
```
  