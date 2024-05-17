
# universeIdFromPlaceId
Gets the parent universe Id from a place Id.


## Parameters
| Name    | Type       | Description                                     |
| :------ | :--------- | :---------------------------------------------- |
| placeId | Identifier | The id of the place to get the universe id for. |



## Example
```js copy showLineNumbers
const { data: universeId } = await ClassicUniversesApi.universeIdFromPlaceId({ placeId: 16349154726 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/places/{placeId}/universe
```
  