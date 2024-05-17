
# groupJoinRequests
Gets join requests for a group.


## Parameters
| Name    | Type    | Description                                                                                                                                                                                                                |
| :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupId | GroupId | The id of the group to get join requests for.                                                                                                                                                                              |
| limit   | ?       | The maximum number of group join requests to return. The service might return fewer than this value. If unspecified, at most 10 group join requests are returned. The maximum value is 20 and higher values are set to 20. |
| filter  | ?       | This field may be set in order to filter the resources returned.                                                                                                                                                           |
| cursor  | ?       | A page token, received from a previous call, to retrieve a subsequent page.                                                                                                                                                |



## Example
```js copy showLineNumbers
const { data: joinRequests } = await GroupsApi.groupJoinRequests({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/groups/{groupId}/join-requests
```
  