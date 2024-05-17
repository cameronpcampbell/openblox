
# groupInfo
Gets information about a user from their id.


## Parameters
| Name    | Type    | Description                            |
| :------ | :------ | :------------------------------------- |
| groupId | GroupId | The id of the group to get info about. |



## Example
```js copy showLineNumbers
const { data: groupInfo } = await GroupsApi.groupInfo({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/groups/{groupId}
```
  