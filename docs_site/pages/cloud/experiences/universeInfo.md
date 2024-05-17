
# universeInfo
Gets information about a universe.


## Parameters
| Name       | Type       | Description                                      |
| :--------- | :--------- | :----------------------------------------------- |
| universeId | UniverseId | The id of the universe to get information about. |



## Example
```js copy showLineNumbers
const { data: universeInfo } = await ExperiencesApi.universeInfo({ universeId: 5795192361 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}
```
  