
# updateGroupMemberRole
Changes a members' role in a group.


## Parameters
| Name    | Type       | Description                            |
| :------ | :--------- | :------------------------------------- |
| groupId | Identifier | The id of the group                    |
| userId  | Identifier | The id of the user to change role for. |
| roleId  | Identifier | The id of the role.                    |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.updateGroupMemberRole({
  groupId: 5850082,
  userId: 2655994471,
  roleId: 38354760,
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/users/{userId}
```
  