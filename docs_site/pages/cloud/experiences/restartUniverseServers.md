
# restartUniverseServers
Restarts all currently running servers for a given universe. Used for releasing experience updates.


## Parameters
| Name       | Type       | Description                                    |
| :--------- | :--------- | :--------------------------------------------- |
| universeId | UniverseId | The id of the universe to restart servers for. |



## Example
```js copy showLineNumbers
await ExperiencesApi.restartUniverseServers({ universeId: 5795192361 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/universes/{universeId}
```
  