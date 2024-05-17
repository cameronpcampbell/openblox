
# groupPermissionsForAllRoles
Gets permissions for all roles in a group.


## Parameters
| Name    | Type    | Description          |
| :------ | :------ | :------------------- |
| groupId | GroupId | The id of the group. |



## Example
```js copy showLineNumbers
const { data: allPerms } = await ClassicGroupsApi.groupPermissionsForAllRoles({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/roles/permissions
```
  