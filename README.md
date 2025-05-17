<div align="center">

  <img src="https://github.com/MightyPart/openblox/blob/main/assets/logo.svg" height="70px" width="auto" height="auto" />

  <img height="10px" width="100%" src="https://github.com/MightyPart/openblox/blob/main/assets/invis.png" />


  <div>

  <a href="https://open.blox.wiki" rel="noopener noreferrer" target="_blank"><img src="https://github.com/MightyPart/openblox/blob/main/assets/docs.svg" width="auto" height="18px" /></a>
  <img src="https://github.com/MightyPart/openblox/blob/main/assets/dot.svg" width="auto" height="18px" />
  <a href="https://www.npmjs.com/package/openblox" rel="noopener noreferrer" target="_blank"><img src="https://github.com/MightyPart/openblox/blob/main/assets/package.svg" width="auto" height="18px" /></a>
  <img src="https://github.com/MightyPart/openblox/blob/main/assets/dot.svg" width="auto" height="18px" />
  <a href="https://github.com/MightyPart/openblox" rel="noopener noreferrer" target="_blank"><img src="https://github.com/MightyPart/openblox/blob/main/assets/repo.svg" width="auto" height="18px" /></a>

  </div>

  A strictly typed Roblox API wrapper which supports both classic and OpenCloud endpoints.

  - - -
  
</div>

<img height="0px" width="100%" src="https://github.com/MightyPart/openblox/blob/main/assets/invis.png" />

Openblox allows your typescript (and javascript) codebase to communicate with the Roblox API extemely easily.

It wraps over 100+ Roblox API endpoints, each with its own strictly typed response data. Typings were written manually as opposed to programatically generating them to ensure the strictest possible type-safety.

- Automatically handles csrf tokens.

- Prettifies / formats responses from the Roblox API to be developer friendly as possible, and to maintain a consistant (see Prettification).
- All results from Openblox methods return the underlying http response with it.

- Easily iterate over paginated endpoints (see Pagination).

- Each Openblox method utilises only one Roblox API endpoint to ensure clarity and efficiency in your codebase.

- Scarcely utilise classes to allow for treeshaking.

- - -

<img height="0px" width="100%" src="./assets/invis.png" />

<h3>Example Usage</h3>

```ts
import "dotenv/config";
import { setDefaultOpenbloxConfig, createOpenbloxConfig } from "openblox/config";
import { UsersApi } from "openblox/cloud";
import { ClassicUsersApi } from "openblox/classic"; // Classic (BEDEV & BEDEV2) APIs will always be prefixed with `Classic`.

/*
Naming your Roblox Cookie environment variable `ROBLOX_COOKIE` will automatically
import it into your Openblox config, therefore voiding the need to set it in the config
manually. Similarly, naming your OpenCloud API Key environment variable `ROBLOX_CLOUD_KEY`
will also automatically import it into your Openblox config.
*/
setDefaultOpenbloxConfig(
    createOpenbloxConfig({
        cookie: process.env.ROBLOX_COOKIE as any,
        cloudKey: process.env.CLOUD_KEY as any
    })
)

(async () => {

  const { data:userInfo_classic } = await ClassicUsersApi.userInfo({ userId: 45348281 })

  const { data:userInfo_cloud } = await UsersApi.userInfo({ userId: 45348281 })

})
```

See more examples [here](https://github.com/MightyPart/openblox/tree/main/examples)!

- - -

<img height="0px" width="100%" src="./assets/invis.png" />

<h3>Openblox Methods</h3>

Openblox methods all return an object containing the following
```ts
const {
  data: unknown, // The prettified / formatted data from the Roblox api endpoint (As an optimisation, prettification / formatting only happens once accessed / destructured).

  response: HttpResponse, // The http response from the Roblox api endpoint. The raw unprettified data can be accessed via `response.body`.

  cursors: { next: string, previous: string }, // Only exists on paginated endpoints. Contains the previous and next cursor.
} = OpenbloxApi.method(...)
```

- - -

<picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/MightyPart/openblox/blob/main/assets/metrik_white.svg" width="auto" height="35px" />
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/MightyPart/openblox/blob/main/assets/metrik_black.svg" width="auto" height="35px" />
      <img alt="Sponsored by Metrik" src="https://github.com/MightyPart/openblox/blob/main/assets/metrik_black.svg" width="auto" height="35px" />
    </picture>
