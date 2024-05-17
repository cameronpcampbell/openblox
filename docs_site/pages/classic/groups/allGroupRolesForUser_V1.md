
# allGroupRolesForUser_V1
Gets a list of all roles for every group that the specified user is in.


## Parameters
| Name   | Type       | Description                          |
| :----- | :--------- | :----------------------------------- |
| userId | Identifier | The id of the user to get roles for. |



## Example
```js copy showLineNumbers
const { data: allRoles } = await ClassicGroupsApi.allGroupRolesForUser_V1({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/groups/roles
```
  