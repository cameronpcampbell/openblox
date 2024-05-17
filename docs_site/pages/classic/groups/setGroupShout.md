
# setGroupShout
Sets group shout (status).


## Parameters
| Name    | Type       | Description                               |
| :------ | :--------- | :---------------------------------------- |
| groupId | Identifier | The id of the group to set the shout for. |
| message |            | The content of the new shout.             |



## Example
```js copy showLineNumbers
const { data: newShout } = await ClassicGroupsApi.setGroupShout({ groupId: 5850082, newShout: "Hello World!" }); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/status
```
  