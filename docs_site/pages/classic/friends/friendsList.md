
# friendsList
Gets friends for a specified user.


## Parameters
| Name     | Type       | Description                                 |
| :------- | :--------- | :------------------------------------------ |
| userId   | Identifier | The id of the user to get friends for.      |
| userSort | ?          | Specifies how to sort the returned friends. |



## Example
```js copy showLineNumbers
const { data: friends } = await ClassicFriendsApi.friendsList({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/friends
```
  