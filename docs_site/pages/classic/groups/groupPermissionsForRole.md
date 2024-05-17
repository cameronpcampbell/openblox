
# groupPermissionsForRole
Gets permissions for a role in a group.


## Parameters
| Name      | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| groupId   | GroupId   | The id of the group.                       |
| roleSetId | RoleSetId | The id of the role to get permissions for. |



## Example
```js copy showLineNumbers
const { data: rolePerms } = await ClassicGroupsApi.groupPermissionsForRole({ groupId: 5850082, roleSetId: 38353814 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/roles/{roleSetId}/permissions
```
  