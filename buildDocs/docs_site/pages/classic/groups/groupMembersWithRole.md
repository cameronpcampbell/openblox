
# groupMembersWithRole
Gets group members that have a specified role.


## Parameters
| Name      | Type       | Description                                      |
| :-------- | :--------- | :----------------------------------------------- |
| groupId   | Identifier | The id of the group.                             |
| roleSetId | Identifier | The id of the role.                              |
| limit     | ?          | The number of results to be returned.            |
| sortOrder | ?          | The order that the results are sorted in.        |
| cursor    | ?          | The paging cursor for the previous or next page. |



## Example
```js copy showLineNumbers
const { data: membersWithRole } = await ClassicGroupsApi.groupMembersWithRole({
  groupId: 5850082,
  roleSetId: 38353811,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/roles/{roleSetId}/users
```
  