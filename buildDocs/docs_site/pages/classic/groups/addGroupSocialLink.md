
# addGroupSocialLink
Adds a new social link to a group.


## Parameters
| Name    | Type       | Description                                  |
| :------ | :--------- | :------------------------------------------- |
| groupId | Identifier | The id of the group to add a social link to. |
| request |            | The social link request data.                |



## Example
```js copy showLineNumbers
const { data: addedSocial } = await ClassicGroupsApi.addGroupSocialLink({
  groupId: 5850082,
  newSocial: {
    type: "Twitch",
    title: "Follow My Twitch",
    url: "twitch.tv/fooBar",
  },
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/social-links
```
  