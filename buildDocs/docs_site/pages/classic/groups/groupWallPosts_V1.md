
# groupWallPosts_V1
Gets a list of group wall posts.


## Parameters
| Name      | Type       | Description                                      |
| :-------- | :--------- | :----------------------------------------------- |
| groupId   | Identifier | The id of the group to get wall posts for.       |
| limit     | ?          | The number of results to be returned.            |
| sortOrder | ?          | The order that the results are sorted in.        |
| cursor    | ?          | The paging cursor for the previous or next page. |



## Example
```js copy showLineNumbers
const { data: wallPosts } = await ClassicGroupsApi.groupWallPosts_V1({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/wall/posts
```
  