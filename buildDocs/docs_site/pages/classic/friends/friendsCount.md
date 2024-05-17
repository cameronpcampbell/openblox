
# friendsCount
Gets friends count for a specified user.


## Parameters
| Name   | Type       | Description                            |
| :----- | :--------- | :------------------------------------- |
| userId | Identifier | The id of the user to get friends for. |



## Example
```js copy showLineNumbers
const { data: count } = await ClassicFriendsApi.friendsCount({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/friends/count
```
  