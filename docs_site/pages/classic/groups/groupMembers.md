
# groupMembers
Gets a page of members of a group.


## Parameters
| Name      | Type       | Description                                      |
| :-------- | :--------- | :----------------------------------------------- |
| groupId   | Identifier | The id of the group.                             |
| limit     | ?          | The number of results to be returned.            |
| sortOrder | ?          | The order that the results are sorted in.        |
| cursor    | ?          | The paging cursor for the previous or next page. |



## Example
```js copy showLineNumbers
const { data: members } = await ClassicGroupsApi.groupMembers({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/users
```
  