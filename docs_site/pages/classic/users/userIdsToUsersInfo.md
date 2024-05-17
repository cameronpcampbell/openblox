
# userIdsToUsersInfo
Gets information about multiple users from their ids.


## Parameters
| Name               | Type                  | Description                                                                                         |
| :----------------- | :-------------------- | :-------------------------------------------------------------------------------------------------- |
| userIds            | ArrayNonEmpty<UserId> | The ids of the users to get info about.                                                             |
| excludeBannedUsers | ?                     | Dictates if info about banned users should be excluded from the returned data. (defaults to false). |



## Example
```js copy showLineNumbers
const { data: usersInfo } = await ClassicUsersApi.userIdsToUsersInfo({ userIds: [45348281] }); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/users
```
  