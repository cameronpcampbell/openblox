
# placeInfo
Gets information about a universes place.


## Parameters
| Name       | Type       | Description                                            |
| :--------- | :--------- | :----------------------------------------------------- |
| universeId | UniverseId | The id of the universe to get place information about. |
| placeId    | PlaceId    | The id of the place to get information about.          |



## Example
```js copy showLineNumbers
const { data: placeInfo } = await ExperiencesApi.placeInfo({ universeId: 5795192361, placeId: 16866553538 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}/{placeId}
```
  