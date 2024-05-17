
# userInfo
Gets information about a user from their id.


## Parameters
| Name   | Type   | Description                                    |
| :----- | :----- | :--------------------------------------------- |
| userId | UserId | The id of the user to get detailed info about. |



## Example
```js copy showLineNumbers
const { data: userInfo } = await UsersApi.userInfo({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/users/{userId}
```
  