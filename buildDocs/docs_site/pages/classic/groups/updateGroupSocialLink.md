
# updateGroupSocialLink
Updates an existing social link.


## Parameters
| Name      | Type       | Description                                  |
| :-------- | :--------- | :------------------------------------------- |
| groupId   | Identifier | The id of the group to add a social link to. |
| newSocial | NewSocial  | The social link request data.                |



## Example
```js copy showLineNumbers
const { data: updatedSocial } = await ClassicGroupsApi.updateGroupSocialLink({
  groupId: 5850082,
  socialLinkId: addedSocial.id,
  newSocial: {
    type: "Twitch",
    title: "Follow My Twitch lol",
    url: "https://twitch.tv/fooBar",
  },
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/social-links/{socialLinkId}
```
  