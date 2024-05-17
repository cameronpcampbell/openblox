
# setGroupIcon
Sets group icon.


## Parameters
| Name    | Type           | Description                              |
| :------ | :------------- | :--------------------------------------- |
| groupId | Identifier     | The id of the group to set the icon for. |
| newIcon | string \| File | The new icon for the group.              |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.setGroupIcon({ groupId: 5850082, newIcon: "./newGroupIcon.png" }); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/status
```
  