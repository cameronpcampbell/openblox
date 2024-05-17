
# groupsThatUsersFriendsAreIn
Gets a list of all groups the specified users' friends are in.


## Parameters
| Name   | Type       | Description                                   |
| :----- | :--------- | :-------------------------------------------- |
| userId | Identifier | The id of the user to get friends groups for. |



## Example
```js copy showLineNumbers
const { data: groupsThatUsersFriendsAreIn } = await ClassicGroupsApi.groupsThatUsersFriendsAreIn({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/friends/groups/roles
```
  