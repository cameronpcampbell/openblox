
# groupGuestRolePermissions
Gets permissions for the guest role of a group.


## Parameters
| Name    | Type    | Description          |
| :------ | :------ | :------------------- |
| groupId | GroupId | The id of the group. |



## Example
```js copy showLineNumbers
const { data: rolePerms } = await ClassicGroupsApi.groupGuestRolePermissions({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/roles/guest/permissions
```
  