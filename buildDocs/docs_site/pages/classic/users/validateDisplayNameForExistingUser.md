
# validateDisplayNameForExistingUser
Validates a display name for an existing user (NOTE: This does not change the display name).


## Parameters
| Name        | Type       | Description                       |
| :---------- | :--------- | :-------------------------------- |
| displayName | string     | The display name to be validated. |
| userId      | Identifier | The id of the existing user.      |



## Example
```js copy showLineNumbers
const { data: displayNameIsValid } = await ClassicUsersApi.validateDisplayNameForExistingUser({
  userId: 45348281,
  displayName: "Hello",
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/display-names/validate
```
  