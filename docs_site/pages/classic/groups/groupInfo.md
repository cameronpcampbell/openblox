
# groupInfo
Gets information about a group.


## Parameters
| Name    | Type    | Description          |
| :------ | :------ | :------------------- |
| groupId | GroupId | The id of the group. |



## Example
```js copy showLineNumbers
const { data: groupInfo } = await ClassicGroupsApi.groupInfo({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}
```
  