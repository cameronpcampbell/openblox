<div align="center">

  <img src="./assets/logo.svg" height="70px" width="auto" height="auto" />

  <img height="10px" width="100%" src="./assets/invis.png" />

  A strictly typed Roblox API wrapper which supports both classic (BEDEV & BEDEV2) and OpenCloud endpoints.

  <img height="20px" width="100%" src="./assets/invis.png" />

  <div>

  [<img src="./assets/docs.svg" width="auto" height="18px" />](https:/open.blox.wiki)
  <img src="./assets/dot.svg" width="auto" height="18px" />
  [<img src="./assets/package.svg" width="auto" height="18px" />](https://www.npmjs.com/package/openblox)
  <img src="./assets/dot.svg" width="auto" height="18px" />
  [<img src="./assets/repo.svg" width="auto" height="18px" />](https://github.com/MightyPart/openblox)

  </div>

  - - -
  
</div>

<img height="20px" width="100%" src="./assets/invis.png" />

Openblox allows your typescript (and javascript) codebase to communicate with the Roblox API extemely easily.

It wraps over 100+ Roblox API endpoints, each with its own strictly typed response data. Typings were written manually as opposed to programatically generating them to ensure the strictest possible type-safety.

- Automatically handles csrf tokens.

- Prettifies / formats responses from the Roblox API to be developer friendly as possible, and to maintain a consistant (see Prettification).
- All results from Openblox methods return the underlying http response with it.

- Easily iterate over paginated endpoints (see Pagination).

- Each Openblox method utilises only one Roblox API endpoint to ensure clarity and efficiency in your codebase.

- Scarcely utilise classes to ensure treeshakability.

- - -

<img height="20px" width="100%" src="./assets/invis.png" />

<h3>Example Usage</h3>

```ts
import "dotenv/config";
import { setConfig } from "openblox/config";
import { UsersApi } from "openblox/cloud";
import { ClassicUsersApi } from "openblox/classic"; // Classic (BEDEV & BEDEV2) APIs will always be prefixed with `Classic`.

/*
Naming your Roblox Cookie environment variable `ROBLOX_COOKIE` will automatically
import it into your Openblox config, therefore voiding the need to set it in the config
manually. Similarly, naming your OpenCloud API Key environment variable `ROBLOX_CLOUD_KEY`
will also automatically import it into your Openblox config.
*/
setConfig({
  cookie: process.env.MY_ROBLOX_COOKIE,
  cloudKey: process.env.MY_ROBLOX_CLOUD_KEY
})

(async () => {

  const { data:userInfo_classic } = await ClassicUsersApi.userInfo({ userId: 45348281 })

  const { data:userInfo_cloud } = await UsersApi.userInfo({ userId: 45348281 })

})
```

See more examples [here](https://github.com/MightyPart/openblox/tree/main/examples)!

- - -

<img height="20px" width="100%" src="./assets/invis.png" />

<h3>Openblox Methods</h3>

Openblox methods all return an object containing the following
```ts
const {
  data: unknown, // The prettified / formatted data from the Roblox api endpoint (As an optimisation, prettification / formatting only happens once accessed / destructured).

  response: HttpResponse, // The http response from the Roblox api endpoint. The raw unprettified data can be accessed via `response.body`.

  cursors: { next: string, previous: string }, // Only exists on paginated endpoints. Contains the previous and next cursor.
} = OpenbloxApi.method(...)
```