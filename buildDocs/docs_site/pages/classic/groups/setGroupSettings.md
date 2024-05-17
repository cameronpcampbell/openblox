
# setGroupSettings
Sets settings for a group.


## Parameters
| Name        | Type              | Description                     |
| :---------- | :---------------- | :------------------------------ |
| groupId     | Identifier        | The id of the group.            |
| newSettings | GroupSettingsData | The new settings for the group. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.setGroupSettings({
  groupId: 5850082,
  newSettings: {
    isApprovalRequired: true,
    isBuildersClubRequired: false,
    areEnemiesAllowed: true,
    areGroupFundsVisible: false,
    areGroupGamesVisible: true,
    isGroupNameChangeEnabled: true,
  },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/settings
```
  