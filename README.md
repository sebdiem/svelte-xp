## Architecture

There are two running backend processes: django and sveltekit.

In this experiment sveltekit is used with SSR as a backend serving all html
views whereas django is used as an API only backend.

The chosen setup is back and front served at the same URL.
`nginx` is used as a reverse proxy which dispatches the HTTP requests to either the api backend or the front backend.

The sveltekit backend can issue requests to the API backend during SSR to
hydrate the page with data.

## Authentication

Session based cookies are used for auth. When posting valid credentials to
api/auth/login, the django backend creates a session and sends back a session
cookie to the browser. The cookie is attached to the common domain for back and
front.

All POST endpoints on the API are protected by csrf. To get a valid CSRF token,
the frontend must post to set_csrf_token. This triggers the creation of a CSRF
token sent by cookie. The frontend can read this cookie with javascript
(because it is hosted on the same domain) and send it in every request as a
header together with the CSRF cookie. The fact that the javascript code managed to read the cookie to create the header serves as a proof that the request is from the same domain.
