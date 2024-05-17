
# groupRoles
Gets all roles in a group.


## Parameters
| Name    | Type    | Description                           |
| :------ | :------ | :------------------------------------ |
| groupId | GroupId | The id of the group to get roles for. |



## Example
```js copy showLineNumbers
const { data: roles } = await ClassicGroupsApi.groupRoles({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/roles
```
  