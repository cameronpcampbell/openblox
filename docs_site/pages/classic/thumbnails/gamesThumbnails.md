
# gamesThumbnails
Gets thumbnail(s) for multiple games.


## Parameters
| Name             | Type                      | Description                                                      |
| :--------------- | :------------------------ | :--------------------------------------------------------------- |
| universeIds      | ArrayNonEmpty<UniverseId> | The ids of the universe to get thumbnails for.                   |
| countPerUniverse | ?                         | The amount of thumbnails to return for each universe             |
| defaults         | ?                         | True if defaults (if any) should be returned if no media exists. |
| size             | ?                         | The thumbnails size (formatted as {width}x{height}).             |
| format           | ?                         | Specifies the format of the thumbnails.                          |
| isCircular       | ?                         | Dictates if the thumbnails should be masked by a circle.         |



## Example
```js copy showLineNumbers
const { data: gamesThumbnails } = await ClassicThumbnailsApi.gamesThumbnails({ universeIds: [1685831367] }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/games/multiget/thumbnails
```
  