
# usernamesToUsersInfo
Gets information about multiple users from their usernames.


## Parameters
| Name               | Type                    | Description                                                                                         |
| :----------------- | :---------------------- | :-------------------------------------------------------------------------------------------------- |
| usernames          | ArrayNonEmpty<Username> | The usernames of the users to get info about.                                                       |
| excludeBannedUsers | ?                       | Dictates if info about banned users should be excluded from the returned data. (defaults to false). |



## Example
```js copy showLineNumbers
const { data: usersInfo } = await ClassicUsersApi.usernamesToUsersInfo({ usernames: ["MightyPart"] }); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/usernames/users
```
  