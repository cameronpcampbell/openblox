
# removeGroupWallPost
Removes a group wall post.


## Parameters
| Name       | Type       | Description                            |
| :--------- | :--------- | :------------------------------------- |
| groupId    | Identifier | The id of the group.                   |
| wallPostId | Identifier | The id of the wall post to be removed. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.removeGroupWallPost({ groupId: 5850082, wallPostId: 2727146317 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/wall/posts/{wallPostId}
```
  