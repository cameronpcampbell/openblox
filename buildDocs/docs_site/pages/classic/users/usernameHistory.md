
# usernameHistory
Gets a users previous usernames.


## Parameters
| Name      | Type       | Description                                         |
| :-------- | :--------- | :-------------------------------------------------- |
| userId    | Identifier | The id of the user to get the username history for. |
| limit     | ?          | The number of results to be returned.               |
| sortOrder | ?          | The order that the results are sorted in.           |
| cursor    | ?          | The paging cursor for the previous or next page.    |



## Example
```js copy showLineNumbers
const { data: previousUsernames } = await ClassicUsersApi.usernameHistory({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/username-history
```
  