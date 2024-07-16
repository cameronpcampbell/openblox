# Rebinding Credentials

Normally, requests will use a `cookie` and `cloudKey` defined in the config (or automatically inferred from the environment variables).

```ts
setConfig({
  cookie: process.env.MY_ROBLOX_COOKIE,
  cloudKey: process.env.MY_ROBLOX_CLOUD_KEY
})
```

However, you may want to make requests via a different `cookie` and or `cloudKey`, or maybe you want to use an `oauthToken` with your request instead. This can be done by using the `.bind` method on any Openblox wrapper method.

```ts
const { data:classicUserInfo } = await ClassicUsersApi.userInfo.bind({ cookie: "SENSITIVE_INFO" })({ userId: 45348281 })

const { data:cloudUserInfo } = await UsersApi.userInfo.bind({ cloudKey: "SENSITIVE_INFO" })({ userId: 45348281 })

const { data:oauthUserInfo } = await OAuthApi.userInfo.bind({ oauthToken: "SENSITIVE_INFO" })()
```

You can also Assign the rebound Openblox method to a variable - this makes it easier to use the same rebound Openblox method for multiple requests.

```ts
const Rebound_ClassicUsersApi_userInfo = ClassicUsersApi.userInfo.bind({ cookie: "SENSITIVE_INFO" })
const Rebound_UsersApi_userInfo = UsersApi.userInfo.bind({ cloudKey: "SENSITIVE_INFO" })
const Rebound_OAuthApi_userInfo = OAuthApi.userInfo.bind({ oauthToken: "SENSITIVE_INFO" })

const { data:classicUserInfo } = Rebound_ClassicUsersApi_userInfo({ userId: 45348281 })
const { data:cloudUserInfo } = Rebound_UsersApi_userInfo({ userId: 45348281 })
const { data:oauthUserInfo } = Rebound_OAuthApi_userInfo()
```