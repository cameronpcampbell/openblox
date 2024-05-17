
# groupJoinRequestInfo
Gets a join request for a user.


## Parameters
| Name    | Type       | Description          |
| :------ | :--------- | :------------------- |
| groupId | Identifier | The id of the group. |
| userId  | UserId     | The id of the user.  |



## Example
```js copy showLineNumbers
const { data: joinRequest } = await ClassicGroupsApi.groupJoinRequestInfo({ groupId: 5850082, userId: 2655994471 }); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v1/groups/{groupId}/join-requests/users/${userId}
```
  