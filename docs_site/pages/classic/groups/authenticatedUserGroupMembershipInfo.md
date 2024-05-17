
# authenticatedUserGroupMembershipInfo
Gets group membership info for the currently authenticated user.


## Parameters
| Name    | Type    | Description                                     |
| :------ | :------ | :---------------------------------------------- |
| groupId | GroupId | The id of the group to get membership info for. |



## Example
```js copy showLineNumbers
const { data: membershipInfo } = await ClassicGroupsApi.authenticatedUserGroupMembershipInfo({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/membership
```
  