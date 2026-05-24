## ADDED Requirements

### Requirement: Endpoint location and method support

A Next.js Route Handler SHALL be exposed at `app/api/instagram/route.js` serving `GET /api/instagram`. `OPTIONS` SHALL be supported for CORS preflight. Any other HTTP method SHALL return HTTP 405. The legacy `api/instagram.js` Vercel function SHALL be removed.

#### Scenario: GET is accepted
- **WHEN** a client sends `GET /api/instagram`
- **THEN** the response status is 200, 502, or 500 (per the rules below) and never 405

#### Scenario: POST is rejected
- **WHEN** a client sends `POST /api/instagram`
- **THEN** the response status is 405

#### Scenario: OPTIONS returns 204
- **WHEN** a client sends `OPTIONS /api/instagram`
- **THEN** the response status is 204 and includes `Access-Control-Allow-Methods: GET, OPTIONS` and `Access-Control-Max-Age: 86400`

### Requirement: Stable JSON response shape

Every non-405 response SHALL be `Content-Type: application/json` with a body matching the shape `{ configured: boolean, posts: Array<{ id: string, src: string, permalink: string, caption: string, mediaType: string }>, error?: string, message?: string }`. Field names and casing SHALL match the existing client (`src/components/Instagram.jsx`).

#### Scenario: Unconfigured server reports cleanly
- **WHEN** `INSTAGRAM_ACCESS_TOKEN` or `INSTAGRAM_BUSINESS_ACCOUNT_ID` is missing
- **THEN** the response is HTTP 200 with body `{ "configured": false, "posts": [], "message": "<setup hint>" }`

#### Scenario: Successful upstream returns normalized posts
- **WHEN** the Instagram Graph API returns valid media for the configured account
- **THEN** the response is HTTP 200 with `configured: true` and `posts` is an array of objects each containing the keys `id`, `src` (non-empty string), `permalink` (non-empty string), `caption` (string ≤ 200 chars), and `mediaType`

#### Scenario: Upstream error is surfaced as 502
- **WHEN** the Instagram Graph API responds with an error or non-2xx status
- **THEN** the response is HTTP 502 with `{ "configured": true, "posts": [], "error": "<message>" }`

#### Scenario: Unexpected exception is surfaced as 500
- **WHEN** the handler throws an unexpected exception (e.g., network failure)
- **THEN** the response is HTTP 500 with `{ "configured": true, "posts": [], "error": "<message>" }`

### Requirement: CORS allow-list via `ALLOWED_CORS_ORIGINS`

The handler SHALL parse `ALLOWED_CORS_ORIGINS` as a comma-separated list. For requests whose `Origin` header is in the list, the response SHALL include `Access-Control-Allow-Origin: <origin>` and `Vary: Origin`. Origins not in the list SHALL receive no `Access-Control-Allow-Origin` header. Same-origin requests SHALL succeed regardless of this list.

#### Scenario: Allowed origin gets CORS headers
- **WHEN** `ALLOWED_CORS_ORIGINS="https://www.example.com"` is set and a request arrives with `Origin: https://www.example.com`
- **THEN** the response includes `Access-Control-Allow-Origin: https://www.example.com` and `Vary: Origin`

#### Scenario: Disallowed origin omits CORS headers
- **WHEN** `ALLOWED_CORS_ORIGINS="https://www.example.com"` is set and a request arrives with `Origin: https://evil.example`
- **THEN** the response has no `Access-Control-Allow-Origin` header

### Requirement: Successful responses set cache headers

Successful (HTTP 200) responses SHALL include `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600` so that the Vercel edge cache can serve the feed for 30 minutes with a 1-hour SWR window. Error responses (4xx/5xx) SHALL NOT set this cache header.

#### Scenario: Cache header on success
- **WHEN** the handler returns a 200 response
- **THEN** the response includes `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600`

#### Scenario: No cache on error
- **WHEN** the handler returns a 502 or 500 response
- **THEN** the response does not include the long `s-maxage` cache directive

### Requirement: Graph API request shape

The handler SHALL request `https://graph.facebook.com/v21.0/<INSTAGRAM_BUSINESS_ACCOUNT_ID>/media` with query params `fields=id,media_type,media_url,permalink,thumbnail_url,caption,timestamp`, `access_token=<INSTAGRAM_ACCESS_TOKEN>`, and `limit=9`. For `VIDEO` posts the response `src` SHALL prefer `thumbnail_url`; for other types it SHALL prefer `media_url`. Posts missing both `src` and `permalink` SHALL be filtered out.

#### Scenario: Video post uses thumbnail
- **WHEN** the Graph API returns a media object with `media_type: "VIDEO"`, `thumbnail_url: "https://t.example/thumb.jpg"`, and `media_url: "https://v.example/vid.mp4"`
- **THEN** the corresponding `posts[]` entry has `src: "https://t.example/thumb.jpg"` and `mediaType: "VIDEO"`

#### Scenario: Posts missing critical fields are dropped
- **WHEN** the Graph API returns one item with neither `media_url` nor `thumbnail_url`
- **THEN** that item is not present in the `posts` array of the response
