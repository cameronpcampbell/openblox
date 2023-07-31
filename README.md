# Users API Examples
```ts
import { UsersApi } from "opeblox/apis"

// Display Names
await UsersApi.validateDisplayNameForNewUser("helloworld", "2023-07-27T04:14:57+0000")
await UsersApi.validateDisplayNameForExistingUser("helloworld", 45348281))
await UsersApi.setDisplayNameForAuthenticatedUser("helloworld", 45348281);

// Users
(await UsersApi.detailedUserInfo(45348281)
await UsersApi.authenticatedUserMinimalInfo()
await UsersApi.authenticatedUserAgeBracket()
(await UsersApi.authenticatedUserCountryCode()
(await UsersApi.authenticatedUserRoles()
(await UsersApi.usernamesToUsersInfo(["MightyPart"], false)
await UsersApi.userIdsToUsersInfo([45348281], false)

// Usernames
await UsersApi.usernameHistory(45348281, 50, "Desc")

// User Search
await UsersApi.search("MightyPart", 25)
```

- - -

# Thumbnails API Examples
```ts
import { ThumbnailsApi } from "openblox/apis"

await ThumbnailsApi.avatarFull([45348281], "150x150") )
await ThumbnailsApi.avatarBust([45348281], "150x150") )
await ThumbnailsApi.avatarHeadshot([45348281], "720x720")
```

- - -

# Logging In Example
```ts
import { OpenbloxClient } from "openblox"
import { AuthorizationDeniedError } from "openblox/errors"

const Authenticate = async () => {
  const client = new OpenbloxClient({
    cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|"
  })

  try {
    const { data:loggedInUser } = await client.UsersApi.authenticatedUserMinimalInfo()
    console.log(`Logged In As ${loggedInUser.name} (${loggedInUser.id})`)

  } catch (error:unknown) {
    if (error instanceof AuthorizationDeniedError) { console.log("Could not authenticate") }
    else { console.log(error) }
  }
}

Authenticate()
```




