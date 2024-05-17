
# flushAllQueues
Removes all items from every queue in a given universe.


## Parameters
| Name       | Type       | Description                                           |
| :--------- | :--------- | :---------------------------------------------------- |
| universeId | UniverseId | The id of the universe to flush all queue items from. |



## Example
```js copy showLineNumbers
const { data: createdOperation } = await MemoryStoresApi.flushAllQueues({ universeId: 5243626809 }); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v2/universes/${universeId}/memory-store:flush
```
  