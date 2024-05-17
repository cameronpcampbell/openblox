
# removeAllGroupWallPostMadeByUser
Removes all group wall posts made by a specific user.


## Parameters
| Name    | Type       | Description          |
| :------ | :--------- | :------------------- |
| groupId | Identifier | The id of the group. |
| userId  | Identifier | The id of the user.  |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.removeAllGroupWallPostMadeByUser({
  groupId: 5850082,
  userId: 45348281,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/wall/users/{userId}/posts
```
  