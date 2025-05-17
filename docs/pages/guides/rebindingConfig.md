# Rebinding Config

Normally, requests will use the default config set via `setDefaultOpenbloxConfig()`. However, you may want to make requests via a different config. This can be done by using the `.bind` method on any Openblox wrapper method.

```ts showLineNumbers copy
const { data:classicUserInfo } = await ClassicUsersApi.userInfo.bind(createOpenbloxConfig({ cookie: "SENSITIVE_INFO" }))({ userId: 45348281 })

const { data:cloudUserInfo } = await UsersApi.userInfo.bind(createOpenbloxConfig({ cloudKey: "SENSITIVE_INFO" }))({ userId: 45348281 })

const { data:oauthUserInfo } = await OAuthApi.userInfo.bind(createOpenbloxConfig({ oauthToken: "SENSITIVE_INFO" }))()
```

You can also Assign the rebound Openblox method to a variable - this makes it easier to use the same rebounded method for multiple requests.

```ts showLineNumbers copy
const Rebound_ClassicUsersApi_userInfo = ClassicUsersApi.userInfo.bind(createOpenbloxConfig({ cookie: "SENSITIVE_INFO" }))
const Rebound_UsersApi_userInfo = UsersApi.userInfo.bind(createOpenbloxConfig({ cloudKey: "SENSITIVE_INFO" }))
const Rebound_OAuthApi_userInfo = OAuthApi.userInfo.bind(createOpenbloxConfig({ oauthToken: "SENSITIVE_INFO" }))

const { data:classicUserInfo } = Rebound_ClassicUsersApi_userInfo({ userId: 45348281 })
const { data:cloudUserInfo } = Rebound_UsersApi_userInfo({ userId: 45348281 })
const { data:oauthUserInfo } = Rebound_OAuthApi_userInfo()
```
