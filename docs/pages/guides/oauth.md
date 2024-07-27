# OAuth

Openblox does not have support for Roblox's OAuth Authorization flow. This is because there are already existing OAuth libraries, and web frameworks with their own way for handling OAuth.

Howvever, Openblox does support some OAuth endpoints, such as [retrieving user information from an access token](/cloud/oauth/userInfo).

If you are looking for an incredibly simple OAuth library then [Arctic](https://arcticjs.dev) is a good option.

Here is a simple OAuth application using Arctic and [`Bun.serve`](https://bun.sh/docs/api/http).

```ts showLineNumbers copy
// [ Modules ] ///////////////////////////////////////////////////////////////////
import "dotenv/config";
import { OAuthApi } from "openblox/cloud";
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const CLIENT_ID = process.env.ROBLOX_CLIENT_ID as string // Make sure `ROBLOX_CLIENT_ID` is in your environment!
const CLIENT_SECRET = process.env.ROBLOX_CLIENT_SECRET as string // Make sure `ROBLOX_CLIENT_SECRET` is in your environment!

const PORT = 3000
const REDIRECT_PATH = `/oauth/roblox/callback`
const REDIRECT_URI = `http://localhost:${PORT}${REDIRECT_PATH}` // Make sure this redirect uri is whitelisted in your Oauth app!

const STATE_COOKIE_NAME = "oauth.roblox.state"
const VERIFIER_COOKIE_NAME = "oauth.roblox.verifier"
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const createCookie = (
  name: string, value: string,
  options: { secure?: boolean, path?: string, httpOnly?: boolean, maxAge?: number }
) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.maxAge) cookieString += `; max-age=${options.maxAge}`
  if (options.path) cookieString += `; path=${options.path}`
  if (options.secure) cookieString += '; secure'
  if (options.httpOnly) cookieString += '; httponly'
  return cookieString
}

const createCookieDeletion = (name: string) => `${name}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`

const parseCookies = (cookieHeader?: string | null): Record<string, string> => {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies

  cookieHeader.split('; ').forEach(pair => {
    const [key, ...values] = pair.split('=')
    if (!key || !values) return

    const value = values.join('=')
    cookies[key.trim()] = value.trim()
  })

  return cookies;
}
//////////////////////////////////////////////////////////////////////////////////


;(async () => {
  const { Roblox, generateState, generateCodeVerifier } = await import("arctic")
  const roblox = new Roblox(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  Bun.serve({
    async fetch({ url:reqUrl, headers:reqHeaders }: Request) {
      const { pathname, searchParams } = new URL(reqUrl)

      console.log(`Requesting \`${pathname}\``)

      // Decides which page to return where each case is a different page.
      switch (pathname) {

        case "/oauth/roblox": {
          try {
            const state = generateState();
            const codeVerifier = generateCodeVerifier();
            const scopes = ["openid", "profile"];
            const authUrl = await roblox.createAuthorizationURL(state, codeVerifier, { scopes });

            const stateCookie = createCookie(STATE_COOKIE_NAME, state, {
              secure: false,
              path: "/",
              httpOnly: true,
              maxAge: 60 * 10 // 10 minutes.
            })

            const codeVerifierCookie = createCookie(VERIFIER_COOKIE_NAME, codeVerifier, {
              secure: false,
              path: "/",
              httpOnly: true,
              maxAge: 60 * 10 // 10 minutes.
            })

            const resHeaders = new Headers()
            resHeaders.append("Location", authUrl.toString())
            resHeaders.append("Set-Cookie", stateCookie)
            resHeaders.append("Set-Cookie", codeVerifierCookie )
            return new Response(null, { status: 302, headers: resHeaders })

          } catch (e) {
            console.log(e)
            return new Response("An unexpected error occurred!", { status: 500 })
          }
        }

        case REDIRECT_PATH: {
          try {
            const resHeaders = new Headers()
            resHeaders.append("Set-Cookie", createCookieDeletion(STATE_COOKIE_NAME))
            resHeaders.append("Set-Cookie", createCookieDeletion(VERIFIER_COOKIE_NAME))

            const codeParam = searchParams.get("code"), stateParam = searchParams.get("state")
            if (!codeParam || !stateParam)
              return new Response("ERROR 422: Missing `code` and or `state` search parameters!", { status: 422, headers: resHeaders })

            const cookies = parseCookies(reqHeaders.get("cookie"))
            const stateCookie = cookies[STATE_COOKIE_NAME], codeVerifierCookie = cookies[VERIFIER_COOKIE_NAME]
            if (!stateCookie || !codeVerifierCookie)
              return new Response("ERROR 422: Missing code verifier and or state cookie.", { status: 422, headers: resHeaders })

            // Validates the authorization.
            if (codeParam === null || stateCookie === null || stateParam !== stateCookie || codeVerifierCookie === null)
              return new Response("ERROR 400: Invalid request!", { status: 400, headers: resHeaders })

            const tokens = await roblox.validateAuthorizationCode(codeParam, codeVerifierCookie)
            const accessToken = tokens.accessToken
            const accessTokenExpiresAt = tokens.accessTokenExpiresAt
            const refreshToken = tokens.refreshToken

            const { data:userInfo } = await OAuthApi.userInfo.bind({ oauthToken: accessToken })()

            return new Response(JSON.stringify(userInfo, null, 4), { headers: resHeaders })

          } catch (e) {
            console.log(e)
            return new Response("An unexpected error occurred!", { status: 500 })
          }
        }

      }
      
      return new Response("ERROR 404: Page not found!", { status: 404 })
    },
    port: PORT
  })

  console.log(`now serving at :${PORT}`)
})();
```
