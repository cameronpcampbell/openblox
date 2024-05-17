
# removeGroupSocialLink
Removes an existing social link from a group.


## Parameters
| Name         | Type       | Description                                  |
| :----------- | :--------- | :------------------------------------------- |
| groupId      | Identifier | The id of the group to add a social link to. |
| socialLinkId | Identifier | The id of the social link to remove.         |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.removeGroupSocialLink({ groupId: 5850082, socialLinkId: 10792025 }); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v1/groups/{groupId}/social-links/{socialLinkId}
```
  