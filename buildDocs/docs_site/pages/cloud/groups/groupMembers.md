
# groupMembers
Gets join requests for a group.


## Parameters
| Name    | Type    | Description                                                                                                                                                                                                              |
| :------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupId | GroupId | The id of the group to get join requests for.                                                                                                                                                                            |
| limit   | ?       | The maximum number of group memberships to return. The service might return fewer than this value. If unspecified, at most 10 group memberships are returned. The maximum value is 100 and higher values are set to 100. |
| filter  | ?       | This field may be set in order to filter the resources returned.                                                                                                                                                         |
| cursor  | ?       | A page token, received from a previous call, to retrieve a subsequent page.                                                                                                                                              |



## Example
```js copy showLineNumbers
const { data: members } = await GroupsApi.groupMembers({ groupId: 5850082, filter: { userId: 45348281 } }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/groups/{groupId}/memberships
```
  