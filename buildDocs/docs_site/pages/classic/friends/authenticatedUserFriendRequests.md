
# authenticatedUserFriendRequests
Gets friends requests sent to the authenticated user.


## Parameters
| Name      | Type  | Description |
| :-------- | :---- | :---------- |
| limit     | ?     | limit       |
| sortOrder | ?     | sortOrder   |
| cursor    | ?     | cursor      |



## Example
```js copy showLineNumbers
const { data: requests } = await ClassicFriendsApi.authenticatedUserFriendRequests({ limit: 10 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/my/friends/requests
```
  