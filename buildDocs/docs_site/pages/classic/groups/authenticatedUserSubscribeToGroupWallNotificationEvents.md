
# authenticatedUserSubscribeToGroupWallNotificationEvents
(THIS ENDPOINT PROBABLY DOESN'T WORK). Subscribes the authenticated user to notifications of group wall events.


## Parameters
| Name    | Type       | Description          |
| :------ | :--------- | :------------------- |
| groupId | Identifier | The id of the group. |



## Example
```js copy showLineNumbers
const { data } = await ClassicGroupsApi.authenticatedUserSubscribeToGroupWallNotificationEvents({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/wall/posts/subscribe
```
  