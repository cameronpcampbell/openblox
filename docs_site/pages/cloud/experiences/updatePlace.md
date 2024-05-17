
# updatePlace
Updates a places information.


## Parameters
| Name       | Type       | Description                                             |
| :--------- | :--------- | :------------------------------------------------------ |
| universeId | UniverseId | The id of the universe to update place information for. |
| placeId    | PlaceId    | The id of the place to update.                          |
| newData    | NewData    | the updated place information.                          |



## Example
```js copy showLineNumbers
const { data: updatedInfo } = await ExperiencesApi.updatePlace({
  universeId: 5795192361,
  placeId: 16866553538,
  newData: { displayName: "Hello World" },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v2/universes/{universeId}/places/{PlaceId}
```
  