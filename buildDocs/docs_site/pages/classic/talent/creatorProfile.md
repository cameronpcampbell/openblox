
# creatorProfile
Gets profile information about someones talent hub profile.


## Parameters
| Name   | Type   | Description                                        |
| :----- | :----- | :------------------------------------------------- |
| userId | UserId | The id of the user to get verification info about. |



## Example
```js copy showLineNumbers
const { data: profile } = await ClassicTalentApi.creatorProfile({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/profile
```
  