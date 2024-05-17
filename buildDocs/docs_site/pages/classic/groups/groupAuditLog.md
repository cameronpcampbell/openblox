
# groupAuditLog
Gets audit log entries for a group.


## Parameters
| Name       | Type       | Description                                                                                     |
| :--------- | :--------- | :---------------------------------------------------------------------------------------------- |
| groupId    | Identifier | The id of the group.                                                                            |
| actionType | ?          | The action to filter the audit logs by. (no filter will be applied if actionType is undefined). |
| userId     | ?          | Filter for specific user by their id.                                                           |
| limit      | ?          | The number of results to be returned.                                                           |
| sortOrder  | ?          | The order that the results are sorted in.                                                       |
| cursor     | ?          | The paging cursor for the previous or next page.                                                |



## Example
```js copy showLineNumbers
const { data: auditLog } = await ClassicGroupsApi.groupAuditLog({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/audit-log
```
  