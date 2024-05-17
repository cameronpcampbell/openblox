
# groupSocialLinks
Gets socials links for a group.


## Parameters
| Name    | Type       | Description                                  |
| :------ | :--------- | :------------------------------------------- |
| groupId | Identifier | The id of the group to get social links for. |



## Example
```js copy showLineNumbers
const { rawBody: socials } = await ClassicGroupsApi.groupSocialLinks(5850082); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/social-links
```
  