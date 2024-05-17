
# groupShout
Gets roles for a group.


## Parameters
| Name    | Type    | Description                                                                                                                                                                                                |
| :------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupId | GroupId | The id of the group to get roles for.                                                                                                                                                                      |
| limit   |         | The maximum number of group roles to return. The service might return fewer than this value. If unspecified, at most 10 group roles are returned. The maximum value is 20 and higher values are set to 20. |
| cursor  |         | A page token, received from a previous call, to retrieve a subsequent page.                                                                                                                                |



## Example
```js copy showLineNumbers
const { data: shout } = await GroupsApi.groupShout({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/groups/{groupId}/roles
```
  