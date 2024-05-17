
# operationStatus
Removes all items from every queue in a given universe.


## Parameters
| Name       | Type       | Description                                           |
| :--------- | :--------- | :---------------------------------------------------- |
| universeId | UniverseId | The id of the universe to flush all queue items from. |



## Example
```js copy showLineNumbers
const { data: operation } = await MemoryStoresApi.operationStatus({
  universeId: 5243626809,
  operation: "AAUAAAAAAADRMx55T0AKRxSgFCrSusMzqOKQNyVaQz8eMi9t-dwQwQ",
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}/memory-store/operations/{operation}
```
  