
# userThumbnail
Gets a users avatar.


## Parameters
| Name   | Type   | Description                                  |
| :----- | :----- | :------------------------------------------- |
| userId | UserId | The id of the user to get the thumbnail for. |
| size   | ?      | The size of the thumbnail to be returned.    |
| format | ?      | The format of the thumbnail to be returned.  |
| shape  | ?      | The shape of the thumbnail to be returned.   |



## Example
```js copy showLineNumbers
const { data: userInfo } = await UsersApi.userInfo({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/users/{userId}:generateThumbnail
```
  