
# findFriends
Gets a paginated list of all friends for the specified user.


## Parameters
| Name     | Type       | Description                                      |
| :------- | :--------- | :----------------------------------------------- |
| userId   | Identifier | The id of the user to get friends for.           |
| userSort | ?          | Specifies how to sort the returned friends.      |
| limit    | ?          | The number of results to be returned             |
| cursor   | ?          | The paging cursor for the previous or next page. |



## Example
```js copy showLineNumbers
const { data: friends } = await ClassicFriendsApi.userfollowersCount({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/friends/find
```
  