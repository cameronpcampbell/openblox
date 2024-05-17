
# updateUniverse
Updates a universes information.


## Parameters
| Name       | Type       | Description                       |
| :--------- | :--------- | :-------------------------------- |
| universeId | UniverseId | The id of the universe to update. |
| newData    | NewData    | the updated universe information. |



## Example
```js copy showLineNumbers
const { data: updatedData } = await ExperiencesApi.updateUniverse({
  universeId: 5795192361,
  newData: { displayName: "Lorem Ipsum", visibility: "PRIVATE" },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v2/universes/{universeId}
```
  