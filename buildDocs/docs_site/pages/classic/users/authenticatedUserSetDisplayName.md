
# authenticatedUserSetDisplayName
Sets the display name for the currently authenticated user.


## Parameters
| Name           | Type       | Description                                                                              |
| :------------- | :--------- | :--------------------------------------------------------------------------------------- |
| newDisplayName | string     | The new display name for the authenticated user.                                         |
| userId         | Identifier | The id of the currently authenticated user (the endpoint requires this for some reason). |



## Example
```js copy showLineNumbers
const { data: displayNameUpdated } = await ClassicUsersApi.authenticatedUserSetDisplayName({
  userId: 45348281,
  newDisplayName: "LoremIpsum",
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/users/{userId}/display-names
```
  