# Classic Users API Examples
```ts
// Account Information
await ClassicUsersApi.authenticatedUserBirthdate();
await ClassicUsersApi.authenticatedUserDescription();
await ClassicUsersApi.authenticatedUserGender();

// Display Names
await ClassicUsersApi.validateDisplayNameForNewUser("helloworld", "2023-07-27T04:14:57+0000");
await ClassicUsersApi.validateDisplayNameForExistingUser("helloworld", 45348281);
await ClassicUsersApi.authenticatedUserSetDisplayName("helloworld", 45348281);

// Users
await ClassicUsersApi.userInfo(45348281);
await ClassicUsersApi.authenticatedUserMinimalInfo();
await ClassicUsersApi.authenticatedUserAgeBracket();
await ClassicUsersApi.authenticatedUserCountryCode();
await ClassicUsersApi.authenticatedUserRoles();
await ClassicUsersApi.usernamesToUsersInfo(["MightyPart"], false);
await ClassicUsersApi.userIdsToUsersInfo([45348281], false);

// Usernames
await ClassicUsersApi.usernameHistory(45348281, 50, "Desc");

// User Search
await ClassicUsersApi.userSearch("MightyPart", 25);
```

- - -

# Classic Thumbnails API Examples
```ts
// Assets
await ClassicThumbnailsApi.assetsThumbnails([7229442422], "PlaceHolder", "420x420");
await ClassicThumbnailsApi.asset3dThumbnail(6768917255);
await ClassicThumbnailsApi.assetAnimatedThumbnail(6768917255);

// Badges
await ClassicThumbnailsApi.badgesThumbnails([2124533401]);

// Bundles
await ClassicThumbnailsApi.bundlesThumbnails([181]);

// Developer Products
await ClassicThumbnailsApi.developerProductsThumbnails([3616425]);

// Game Passes
await ClassicThumbnailsApi.gamePassesThumbnails([9063647]);

// Games
await ClassicThumbnailsApi.gameThumbnailsFromIds(1685831367, [5030792576, 5030792559]);
await ClassicThumbnailsApi.gamesIcons([1685831367]);
await ClassicThumbnailsApi.gamesThumbnails([1685831367]);

// Group Emblem
await ClassicThumbnailsApi.groupsEmblems([5850082]);

// Metadata
await ClassicThumbnailsApi.thumbnailsMetadata();

// Places
await ClassicThumbnailsApi.placesIcons([4922741943]);

// Avatar
await ClassicThumbnailsApi.avatarsFullThumbnails([45348281], "150x150");
await ClassicThumbnailsApi.avatar3dThumbnail(45348281);
await ClassicThumbnailsApi.avatarsBustsThumbnails([45348281], "150x150");
await ClassicThumbnailsApi.avatarsHeadshotsThumbnails([45348281], "720x720");

// Outfits
await ClassicThumbnailsApi.outfit3dThumbnail(110540093);
await ClassicThumbnailsApi.outfitsThumbnails([110540093]);

// Batch
await ClassicThumbnailsApi.batchThumbnails([
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

# Classic Groups API Examples
```ts
// Groups
const { data:groupInfo } = await ClassicGroupsApi.groupInfo(5850082)
const { data:groupAuditLogs } = await ClassicGroupsApi.groupAuditLog(5850082, "AcceptAllyRequest", undefined, 10, "Desc")
const { data:nameHistory } = await ClassicGroupsApi.groupNameHistory(5850082)
const { data:settings } = await ClassicGroupsApi.groupSettings(5850082)
const { data:success } = await ClassicGroupsApi.setGroupSettings(5850082, {
  isApprovalRequired: true,
  isBuildersClubRequired: false,
  areEnemiesAllowed: true,
  areGroupFundsVisible: false,
  areGroupGamesVisible: true,
  isGroupNameChangeEnabled: true
})
const { data:configMetadata } = await ClassicGroupsApi.groupConfigMetadata()
const { data:metadata } = await ClassicGroupsApi.groupsMetadata()
const { data:policyInfo } = await ClassicGroupsApi.groupPolicyInfo([5850082])
const { data:newDescription } = await ClassicGroupsApi.setGroupDescription(5850082, "Hello World!")
const { data:success } = await setGroupShout(5850082, "Hello World!")
const { data:success } = await ClassicGroupsApi.setGroupIcon(5850082, fs.readFileSync("./newGroupIcon.png"))

// Membership
const { data:success } = await ClassicGroupsApi.batchDeclineGroupJoinRequests(5850082, [2655994471])
const { data:joinRequests } = await ClassicGroupsApi.groupJoinRequests(5850082)
const { data:success } = await ClassicGroupsApi.batchAcceptGroupJoinRequests(5850082, [2655994471])
const { data:success } = await ClassicGroupsApi.declineGroupJoinRequest(5850082, 2655994471)
const { data:joinRequest } = await ClassicGroupsApi.groupJoinRequestForUser(5850082, 2655994471)
const { data:success } = await ClassicGroupsApi.acceptGroupJoinRequest(5850082, 2655994471)
const { data:membershipInfo } = await ClassicGroupsApi.authenticatedUserGroupMembershipInfo(5850082)
const { data:roles } = await ClassicGroupsApi.allRolesForGroup(5850082)
const { rawData:membersWithRole } = await ClassicGroupsApi.groupMembersWithRole(5850082, 38353811)
const { data:members } = await ClassicGroupsApi.groupMembers(5850082)
const { data:pendingGroups } = await ClassicGroupsApi.authenticatedUserPendingGroups()
const { data:groupsThatUsersFriendsAreIn } = await ClassicGroupsApi.groupsThatUsersFriendsAreIn(45348281)
const { data:groups } = await ClassicGroupsApi.allGroupRolesForUser_V1(45348281)
const { data:success } = await ClassicGroupsApi.removeGroupMember(5850082, 2655994471)
const { data:success } = await ClassicGroupsApi.updateGroupMemberRole(5850082, 2655994471, 38354760)

// Revenue
const { data:payoutRestrictions } = await ClassicGroupsApi.groupPayoutRestrictions(5850082)
const { data:payouts } = await ClassicGroupsApi.groupPayouts(5850082)

// Relationships
const { data:relationships } = await ClassicGroupsApi.groupRelationships(5850082, "Allies", 0, 1)
const { data:success } = await ClassicGroupsApi.batchDeclineGroupRelationshipRequests(5850082, "Allies", [15842838])
const { data:relationshipRequests } = await ClassicGroupsApi.groupRelationshipRequests(5850082, "Allies", 0, 1)
const { data:success } = await ClassicGroupsApi.batchAcceptGroupRelationshipRequests(5850082, "Allies", [15842838])
const { data:success } = await ClassicGroupsApi.removeGroupRelationship(5850082, "Allies", 15842838)
const { data:success } = await ClassicGroupsApi.requestGroupRelationship(5850082, "Allies", 15842838)
const { data:success } = await ClassicGroupsApi.declineGroupRelationshipRequest(5850082, "Allies", 15842838)
const { data:success } = await ClassicGroupsApi.acceptGroupRelationshipRequest(5850082, "Allies", 15842838)

// Permissions
const { data:rolePerms } = await ClassicGroupsApi.groupPermissionsForRole(5850082, 38353814)
const { data:success } = await ClassicGroupsApi.setGroupRolePermissions(5850082, 38353814, { ViewStatus: false })
const { data:rolePerms } = await ClassicGroupsApi.groupRolePermissions(5850082, 38353814)
const { data:allPerms } = await ClassicGroupsApi.groupPermissionsForAllRoles(5850082)

// Social Links
const { rawData:socials } = await ClassicGroupsApi.groupSocialLinks(5850082)
const { data:addedSocial } = await ClassicGroupsApi.addGroupSocialLink(5850082, {
  type: "Twitch",
  title: "Follow My Twitch",
  url: "twitch.tv/fooBar"
})
const { rawData:success } = await ClassicGroupsApi.removeGroupSocialLink(5850082, 10791942)
const { data:success } = await ClassicGroupsApi.updateGroupSocialLink(5850082, 10792025, {
  type: "Twitch",
  title: "Join Today!",
  url: "twitch.tv/barFoo"
})

// Wall
const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V1(5850082)
const { data } = await ClassicGroupsApi.authenticatedUserSubscribeToGroupWallNotificationEvents(5850082)
const { data:success } = await ClassicGroupsApi.removeGroupWallPost(5850082, 2727146317)
const { data:success } = await ClassicGroupsApi.removeAllGroupWallPostMadeByUser(5850082, 45348281)

// Group Search
const { data:results } = await ClassicGroupsApi.groupSearch("MightyPart Games")
const { data:results } = await ClassicGroupsApi.groupLookupSearch("MightyPart Games")
const { data:searchMetadata } = await ClassicGroupsApi.groupSearchMetadata()

// Roles
const { data:roles } = await ClassicGroupsApi.groupRolesFromIds([38353811])

// Primary Group
const { rawData:primaryGroup } = await ClassicGroupsApi.primaryGroupForUser(45348281)
const { data:success } = await ClassicGroupsApi.authenticatedUserRemovePrimaryGroup()
const { data:success } = await ClassicGroupsApi.authenticatedUserSetPrimaryGroup(5850082)

// Role Sets
const { data:updatedRole } = await ClassicGroupsApi.updateRoleSet(5850082, 38353813, {
  name: "Mighty Member",
  description: "A regular group member.",
  rank: 2
})

// Groups V2
const { rawData:groups } = await ClassicGroupsApi.groupIdsToGroupsInfo([5850082])
const { data:groups } = await ClassicGroupsApi.allGroupRolesForUser_v2(45348281)

// Wall V2
const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V2(5850082)
```

- - -

# Classic Subscriptions Api

```ts
const { data:newSubscription } = await ClassicSubscriptionsApi.createSubscription(
  4383627529, "Amazing Subscription", "Lorem Ipsum",
  "Currency", "$14.99"
)

const { data:success } = await ClassicSubscriptionsApi.setSubscriptionIcon(
  4383627529, "2129699544299733115", 45348281, fs.readFileSync("./newGroupIcon.png")
)

const { rawBody:subscriptions } = await ClassicSubscriptionsApi.subscriptionsForUniverse(4383627529)

const { data:subscription } = await ClassicSubscriptionsApi.subscriptionInfo(4383627529, "6209937874256396403")

const { data:tiers } = await ClassicSubscriptionsApi.subscriptionsPriceTiersForUniverse(4383627529)

const { data:perms } = await ClassicSubscriptionsApi.authenticatedUserSubscriptionsPermissionsForUniverse(4383627529)
```

- - - 

# Cloud Standard Datastores Api Examples

```ts
const { data:datastores } = await StandardDatastoresApi.listStandardDatastores(5097539509)

const { data:keys } = await StandardDatastoresApi.standardDatastoreKeys(5097539509, "InventoryStore")

type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
const { data:entryInfo } = await StandardDatastoresApi.standardDatastoreEntry<InventorySchema>(5097539509, "InventoryStore",  "user/45348281")

type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
const { data:response } = await StandardDatastoresApi.setStandardDatastoreEntry<InventorySchema>(
  5097539509, "InventoryStore",  "user/45348281",      // universeId, datastoreName, entryKey
  { Gold: 6 },                                         // the new data (MUST CONFORM TO `InventorySchema`)
  { entryUserIds: [ 45348281 ] }                       // extra optional settings
)

await StandardDatastoresApi.deleteStandardDatastoreEntry(5097539509, "InventoryStore",  "user/45348281")

const { data:incrementedEntry } = await StandardDatastoresApi.incrementStandardDatastoreEntry(
  5097539509, "InventoryStore",  "user/45348281", // universeId, datastoreName, entryKey
  1,                                              // incrementBy
  { entryUserIds: [ 45348281 ] }                  // extra optional settings
)

type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
const { data:entryVersion } = await StandardDatastoresApi.standardDatastoreEntryVersion<InventorySchema>(
  5097539509, "InventoryStore",  "user/45348281",    // universeId, datastoreName, entryKey
  "08DBB6A47FDE6132.0000000022.08DBB88134CB805D.01"  // versionId
)

const { data:versions } = await StandardDatastoresApi.listStandardDatastoreEntryVersions(
  5097539509, "InventoryStore",  "user/45348281", // universeId, datastoreName, entryKey
  { sortOrder: "Ascending" },                     // extra optional settings
)
```

- - -

# Cloud Ordered Datastores Api Examples

```ts
const { data:createdEntry } = await OrderedDatastoresApi.createOrderedDatastoreEntry(
  5097539509, "PointsStore", "global",
  "45348281", 54
)

const { data:entry } = await OrderedDatastoresApi.orderedDatastoreEntry(5097539509, "PointsStore", "global", "45348281")

const { data:success } = await OrderedDatastoresApi.deleteOrderedDatastoreEntry( 5097539509, "PointsStore", "global", "45348281")

const { data:updatedEntry } = await OrderedDatastoresApi.updateOrderedDatastoreEntry(
  5097539509, "PointsStore", "global",
  "45348281", 58
)

const { data:incrementedEntry } = await OrderedDatastoresApi.incrementOrderedDatastoreEntry(
   5097539509, "PointsStore", "global",
  "45348281", 12
)
```

- - -

# Cloud Inventory Api Examples
```ts
const { data:inventoryItems } = await CloudInventoryApi.inventoryItemsForUser(45348281, 3, {
  privateServers: true,
  gamePasses: true
})
```

- - -

# Cloud Groups Api Examples
```ts
const { data:groupInfo } = await GroupsApi.groupInfo(5850082)

const { data:memberships } = await GroupsApi.groupMemberships("-", 1, { userIds: [45348281] })

const { data:roles } = await GroupsApi.groupRoles(5850082, 1)

const { data:shout } = await GroupsApi.groupShout(5850082)
```

- - -

# Cloud Messaging Api

Openblox (Typescript) Code - Sending A Message
```ts
type Message = { targetId: number, reason: string };
await MessagingApi.publishMessage<Message>(
  5097539509, "kickPlr",
  { targetId: 45348281, reason: "You smell kinda funny." } // This is automatically encoded into a string.
);
```

Roblox Luau Code - Recieving The Message Above
```lua
local MessagingService = game:GetService("MessagingService")
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

MessagingService:SubscribeAsync("kickPlr", function(msg)
  local data = HttpService:JSONDecode(msg.Data)
  local targetId, reason = data.targetId, data.reason
  
  local plr = Players:GetPlayerByUserId(targetId)
  if not plr then return end
  plr:Kick(`You have been kicked for reason "{reason}"`)
end)
```

- - -

# Logging In Example
```ts
import "dotenv/config"
import { setOpenbloxConfig, RobloSecurityCookie } from "openblox/config";
import { ClassicUsersApi } from "openblox/apis/classic";

// Creates an authenticated openblox client from a `.ROBLOSECURITY` cookie.
setOpenbloxConfig({
  cookie: process.env.ROBLOX_COOKIE as RobloSecurityCookie,
});

const Authenticate = async () => {
  try {
    // Gets info about the currently logged in user.
    const { data:loggedInUser } = await ClassicUsersApi.authenticatedUserInfo();
    console.log(`Successfully Logged In As ${loggedInUser.name} (${loggedInUser.id}).`);
    
  // If could not login.
  } catch (error: any) {
    if (error?.name == "AuthorizationDeniedError") { console.log("Could not authenticate!") }
    else { console.log(error) };
  };
};

Authenticate();
```

- - -

# OpenCloud Example

```ts
import "dotenv/config"
import { setConfig } from "openblox/config";
import { GroupsApi } from "openblox/apis/cloud";

setConfig({
  cloudKey: process.env.ROBLOX_CLOUD_KEY
});

const Main = async () => {
  const { data:groupInfo } = await GroupsApi.groupInfo(5850082)
  console.log(groupInfo)
};

Main();
```

- - -

# Redis Caching
Openblox has in built support for caching. With caching, the results from specific wrapper functions are stored. This means that when you use one of these wrapper functions again it uses the stored result instead of sending a request to the Roblox API endpoint again. This can help against being throttled in a way that does not abuse the Roblox API or violate the Roblox TOS.

Caching can be enabled via the `setOpenbloxConfig` function.

The example below demonstrates how caching works (it also assumes the cache is empty before it is ran):

```ts
import "dotenv/config"
import { setOpenbloxConfig, cacheKeyBuildFunctions, type RobloSecurityCookie } from "openblox/config";
import { RedisCacheAdapter, RedisConnectionUrl } from "openblox/cacheAdapters/redis"
import { ClassicUsersApi } from "openblox/apis/classic";

setOpenbloxConfig({
  cookie: process.env.ROBLOX_COOKIE as RobloSecurityCookie,

  caching: {
    // The prefix to use for all keys for cached api data (optional).
    keyPrefix: "openblox",

    // If enabled then the formatted data (the "data" property returned by all api wrapper functions) will be cached as well as the raw data (response body).
    formattedDataIsCached: true,

    // The function to use to build the cache key (defaults to "cacheKeyBuildFunctions.md5" if this property is omitted).
    keyBuildFn: cacheKeyBuildFunctions.md5,

    adapters: {
      // creates a new redis cache with the alias (key) "myRedisCache". Alias's can be set to anything.
      myRedisCache: RedisCacheAdapter({
        // Specifies the redis db to connect to.
        connectionUrl: process.env.REDIS_URL as RedisConnectionUrl,
        
        // The wrapper functions to enable caching for (below only the `ClassicUsersApi` is specified to be cached).
        included: {
          ClassicUsersApi: { lifetime: 500 }
        }
      })
    }
  }
});

const Main = async () => {
  const { cache:wasCached } = await ClassicUsersApi.usernameHistory(45348281)
  console.log(wasCached) // should log `MISS`

  const { cache:wasCached2 } = await ClassicUsersApi.usernameHistory(45348281)
  console.log(wasCached2) // should log `HIT`
};

Main();
```

- - -

# Using Paginated Endpoints Example

The below example iterates through all pages of the username history for the user with the id `45348281` and adds all of the past usernames to an array called `usernameHistory`

```ts
import { ClassicUsersApi } from "openblox/apis/classic";
import { Paginate } from "openblox/interfaces";

const Main = async () => {
  const paginated = Paginate(ClassicUsersApi.usernameHistory)(45348281, 100, "Desc");
  const usernameHistory: string[] = [];
  for await (const { data } of paginated) usernameHistory.push(...data);

  console.log(usernameHistory); // should log `[ "NamelessGuy2005", "parrrty" ]`
};

Main();
```

- - -

# Error Handling

For error handling the `ApiError()` function can be used. This function is passed an error and returns the errors name if said error is any of the Openblox api errors (`ThrottledError`, `AuthorizationDeniedError`, `InvalidRequestDataError`). If the error isnt an Openblox api error then it returns false.

Example:
```ts
import { ClassicUsersApi } from "openblox/apis/classic";
import { ApiError } from "openblox/errors";

const Main = async () => {
  try {
    const { data } = await ClassicUsersApi.authenticatedUserInfo();
    console.log(data);
  
  } catch (error: any) {
    if (await ApiError(error)) console.log(error);
  };
};

Main();
```
