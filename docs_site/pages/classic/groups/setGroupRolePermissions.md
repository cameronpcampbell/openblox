
# setGroupRolePermissions
Sets permissions for a role in a group.


## Parameters
| Name        | Type                 | Description                                |
| :---------- | :------------------- | :----------------------------------------- |
| groupId     | GroupId              | The id of the group.                       |
| roleSetId   | RoleSetId            | The id of the role to set permissions for. |
| permissions | GroupRolePermissions | An object of permissions to set.           |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.setGroupRolePermissions({
  groupId: 5850082,
  roleSetId: 38353813,
  permissions: { viewStatus: true },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/roles/{roleSetId}/permissions
```
  