# nickchampion.me

An NX monorepo powering [nickchampion.me](https://www.nickchampion.me) — a personal profile and CV site — backed by a shared REST API and a set of platform components.

---

## Apps

### `apps/api` — REST API

Node.js API server built on Koa with OpenAPI v3 validation via `openapi-backend`. Runs locally with `tsx watch` and deploys to [Fly.io](https://fly.io) as a Docker container (`lhr` region).

**Stack:** Node.js · Koa · openapi-backend · RavenDB · TypeScript

**Dev server:** `pnpm run api` → `http://api.nodevault.local:9002`

#### Endpoints

| Domain | Description |
|--------|-------------|
| `auth` | Magic-link login, registration, token verification |
| `blog` | Blog menu + articles, proxied from Strapi |
| `comms` | Contact form submissions |
| `system` | Health check (`ping`) |

#### Auth flow

Magic-link, no passwords:

1. `POST /auth/login` — looks up user by email, generates an encrypted token stored as a `LoginToken` document (10-minute TTL via RavenDB `@expires`), renders the login email, and sends it via Resend.
2. User clicks the link → `POST /auth/verify` — decrypts the code, validates the `LoginToken`, marks it used, and returns a signed JWT + user/account payload.

#### Handler pattern

```typescript
export const authLogin: ApiHandler = async (context): Promise<Response> => {
  const { email } = context.event.payload as LoginRequestSchema
  // ...
  return context.event.response.ok()
}
```

Handlers are registered by name in `apps/api/handlers/index.ts` — the key **must exactly match the `operationId`** in the OpenAPI schema. The middy middleware lifecycle auto-commits the RavenDB session after each handler.

#### Request lifecycle

```
Koa → OpenAPI route match + schema validation
  → InboundEvent + Context created (RavenDB Session attached)
  → middy middleware:
      before:  logging, timer
      handler: ApiHandler
      after:   commit session, set response headers
      error:   normalise to StandardResponse
  → Koa response
```

---

### `apps/nickchampion` — Personal profile site

Nuxt 4 (`compatibilityVersion: 4`) SSR app deployed to Cloudflare Workers via the `cloudflare_module` preset. Light-only UI (sky/slate colour scheme) with forced light mode — dark mode is disabled at the CSS level regardless of system preference.

**Stack:** Nuxt 4 · Vue 3 · Nuxt UI · Tailwind CSS · TypeScript

**Dev server:** `pnpm run app` → `http://www.nickchampion.local:9003`

#### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — intro, key strengths, technical expertise, current project, recent roles |
| `/cv` | Full CV — career history, education, notable achievements |
| `/nodevault` | Project showcase for [NodeVault](https://www.nodevault.cloud) — a personal knowledge vault with semantic search, built as a separate project |

#### Notes

- No auth — fully public, no admin section
- Dark mode disabled: `@variant dark` redefined to `never-dark` in CSS, plus `.dark` CSS variable block overridden to light values in `app/assets/css/main.css`

---

## Components (shared libraries)

| Package alias | Path | Purpose |
|---------------|------|---------|
| `@platform/components.api` | `components/api` | Koa server, OpenAPI routing, middy middleware, handler types |
| `@platform/components.configuration` | `components/configuration` | Config builder (`build<T>()`) |
| `@platform/components.context` | `components/context` | `Context`, `InboundEvent`, `Response`, `Log`, middy wrappers |
| `@platform/components.contracts` | `components/contracts` | OpenAPI document, request/response schemas, domain models |
| `@platform/components.ravendb` | `components/ravendb` | `Session` wrapper, document store helpers, search utilities |
| `@platform/components.search` | `components/search` | Search/query builders |
| `@platform/components.utils` | `components/utils` | Pure utilities — date, string, math (no Node.js-specific APIs) |
| `@platform/components.utils.server` | `components/utils-server` | Server-only utilities — crypto, encoding, JWT |
| `@platform/integrations.resend` | `integrations/resend` | Resend email client — `createResendClient`, `sendEmail` |
| `@platform/integrations.strapi` | `integrations/strapi` | Strapi CMS client (blog content) |
| `@platform/integrations.cloudflare` | `integrations/cloudflare` | Cloudflare Workers helpers |

---

## Development

```bash
# Install dependencies
pnpm install

# Start servers (separate terminals)
pnpm run api   # API on :9002
pnpm run app   # Nuxt on :9003

# Type check everything
npx tsc --noEmit

# Run tests
npx vitest

# Lint with autofix
pnpm run lint

# Regenerate OpenAPI client types from schemas
pnpm run schemas
```

### Local hosts

Add to `/etc/hosts`:

```
127.0.0.1  api.nodevault.local
127.0.0.1  www.nickchampion.local
```

### Configuration

Server config is passed as a base64-encoded JSON string in the `NODEVAULT` environment variable. Local overrides are read from the path in `NODEVAULT_OVERRIDES`. See `components/configuration/configuration.ts` for the full config schema.

---

## Deployment

| App | Platform | Command |
|-----|----------|---------|
| `apps/api` | Fly.io (Docker, `lhr`) | `fly deploy` from `apps/api/` |
| `apps/nickchampion` | Cloudflare Workers | build then `wrangler deploy` from `apps/nickchampion/` |
