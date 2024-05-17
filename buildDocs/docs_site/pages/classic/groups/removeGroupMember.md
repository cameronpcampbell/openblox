
# removeGroupMember
Removes a user from a group.


## Parameters
| Name    | Type       | Description                                  |
| :------ | :--------- | :------------------------------------------- |
| groupId | Identifier | The id of the group to remove the user from. |
| userId  | Identifier | The id of the user to be removed.            |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.removeGroupMember({ groupId: 5850082, userId: 2655994471 }); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v1/groups/{groupId}/users/{userId}
```
  