# Users API Examples
```ts
// Account Information
await UsersApi.authenticatedUserBirthdate();
await UsersApi.authenticatedUserDescription();
await UsersApi.authenticatedUserGender();

// Display Names
await UsersApi.validateDisplayNameForNewUser("helloworld", "2023-07-27T04:14:57+0000");
await UsersApi.validateDisplayNameForExistingUser("helloworld", 45348281);
await UsersApi.setDisplayNameForAuthenticatedUser("helloworld", 45348281);

// Users
await UsersApi.detailedUserInfo(45348281);
await UsersApi.authenticatedUserMinimalInfo();
await UsersApi.authenticatedUserAgeBracket();
await UsersApi.authenticatedUserCountryCode();
await UsersApi.authenticatedUserRoles();
await UsersApi.usernamesToUsersInfo(["MightyPart"], false);
await UsersApi.userIdsToUsersInfo([45348281], false);

// Usernames
await UsersApi.usernameHistory(45348281, 50, "Desc");

// User Search
await UsersApi.search("MightyPart", 25);
```

- - -

# Thumbnails API Examples
```ts
// Assets
await ThumbnailsApi.assets([7229442422], "PlaceHolder", "420x420");
await ThumbnailsApi.asset3d(6768917255);
await ThumbnailsApi.assetAnimated(6768917255);

// Badges
await ThumbnailsApi.badges([2124533401]);

// Bundles
await ThumbnailsApi.bundles([181]);

// Developer Products
await ThumbnailsApi.developerProducts([3616425]);

// Game Passes
await ThumbnailsApi.gamePasses([9063647]);

// Games
await ThumbnailsApi.gameFromThumbnailIds(1685831367, [5030792576, 5030792559]);
await ThumbnailsApi.gamesIcons([1685831367]);
await ThumbnailsApi.games([1685831367]);

// Group Emblem
await ThumbnailsApi.groupsEmblems([5850082]);

// Metadata
await ThumbnailsApi.metadata();

// Places
await ThumbnailsApi.placesIcons([4922741943]);

// Avatar
await ThumbnailsApi.avatarFull([45348281], "150x150");
await ThumbnailsApi.avatar3d(45348281);
await ThumbnailsApi.avatarBust([45348281], "150x150");
await ThumbnailsApi.avatarHeadshot([45348281], "720x720");

// Outfits
await ThumbnailsApi.outfit3d(110540093);
await ThumbnailsApi.outfits([110540093]);

// Batch
await ThumbnailsApi.batch([
  {
    type: "AvatarHeadShot",
    targetId: 45348281,
    size: "720x720",
    format: "Png",
    isCircular: false
  },
  {
    type: "Avatar",
    targetId: 45348281,
    size: "420x420",
    format: "Png",
    isCircular: false
  },
  {
    type: "AvatarBust",
    targetId: 45348281,
    size: "420x420",
    format: "Png",
    isCircular: false
  }
]);
```

- - -

# Logging In Example
```ts
import { OpenbloxClient } from "openblox";
import { AuthorizationDeniedError } from "openblox/errors";

const Authenticate = async () => {
  // Creates an authenticated openblox client from a .ROBLOSECURITY cookie
  const client = new OpenbloxClient({
    cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|"
  });

  try {
    const { data:loggedInUser } = await client.apis.UsersApi.authenticatedUserMinimalInfo();
    console.log(`Successfully Logged In As ${loggedInUser.name} (${loggedInUser.id}).`);
  
  } catch (error:any) {
    if (error?.name == "AuthorizationDeniedError") { console.log("Could not authenticate!") }
    else { console.log(error) };
  }
}

Authenticate();
```

- - -

# Using Paginated Endpoints Example

The below example iterates through all pages of the username history for the user with the id `45348281` and adds all of the past usernames to an array called `usernameHistory`

```ts
import { UsersApi } from "openblox/apis";
import { Paginate } from "openblox/interfaces";

const paginated = Paginate(UsersApi.usernameHistory)(45348281, 100, "Desc");
const usernameHistory: string[] = [];
for await (const { data } of paginated) usernameHistory.push(...data);
```

- - -

# Error Handling

For error handling the `ApiError()` function can be used. This function is passed an error and returns the errors name if said error is any of the Openblox api errors (`ThrottledError`, `AuthorizationDeniedError`, `InvalidRequestDataError`). If the error isnt an Openblox api error then it returns false.

Example:
```ts
try {
  const { data } = await UsersApi.authenticatedUserMinimalInfo();
  console.log(data);

} catch (error:any) {
  if (await ApiError(error)) console.log(error);
};
```
