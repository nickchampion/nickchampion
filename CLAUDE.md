# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend dev server (Nuxt)
pnpm run app

# API dev server (tsx watch)
pnpm run api

# Build frontend for Cloudflare
pnpm run app:build

# Lint all (with autofix)
pnpm run lint

# Generate OpenAPI client from schemas
pnpm run schemas

# Run all tests
npx vitest

# Run a single test file
npx vitest components/ravendb/session.spec.ts

# Type check entire workspace
npx tsc --noEmit
```

## Monorepo Structure

```
apps/
  api/          Node.js API server (handlers + manifest)
  nodevault/    Nuxt 4 frontend app (SSR, Cloudflare Workers)
components/
  api/
    client/     HTTP client (ApiClient, ApiResponse types)
    schemas/    OpenAPI document + request/response schemas
    server/     Koa server, OpenAPI routing, middleware
  configuration/
    core/       Config builder (build<T>())
    server/     Server config (reads NODEVAULT env var)
    client/     Client config (runtime config)
  context/      Context, InboundEvent, Response, Log, middy
  domain/       BaseModel, domain models, indexes
  ravendb/      Session, DocumentStore helpers
  search/       Search/query builders
  utils/        Pure utilities (string, date, math, etc.)
```

NX manages tasks. Each component and app has a `project.json`. Package aliases are declared in the root `tsconfig.json` `paths` and resolved at runtime via `tsx` (API) or `@nx/vite` tsconfig paths plugin (Nuxt).

## Path Aliases

All `@nodevault/platform.components.*` imports resolve to local `components/` directories. Never use relative paths across component boundaries — always use the alias (e.g. `@nodevault/platform.components.utils`).

## API Handler Pattern

Every API handler has this signature:

```typescript
import type { ApiHandler } from '@nodevault/platform.components.context'
import type { Response } from '@nodevault/platform.components.api.server'

export const authLogin: ApiHandler = async (context): Promise<Response> => {
  const body = context.event.payload<LoginRequest>()
  const session = context.session  // RavenDB Session, auto-committed after handler
  return context.event.response.ok({ ... })
}
```

Handlers are grouped by domain in `apps/api/handlers/` and registered in `apps/api/handlers/index.ts`. The key name **must exactly match the `operationId`** in the OpenAPI schema at `components/api/schemas/paths/`.

Handler registration flow: `manifest.ts` → `buildApiDefinitions()` → `OpenAPIBackend` → `wrapHandlersWithContextSignature()`.

## Request Lifecycle

```
Koa → Api.handleRoute()
  → OpenAPI operation match + schema validation
  → InboundEvent created from Koa context
  → Context created (RavenDB Session attached)
  → middy() wrapper:
      before: set up logging, start timer
      handler: your ApiHandler
      after: commit RavenDB session, set response headers (elapsed, CF geo)
      error: log, emit 'error', normalise to StandardResponse
  → Koa response
```

Write operations (POST/PUT/PATCH/DELETE) are retried up to 3 times on `ConcurrencyException`. GET handlers do not auto-commit the session unless `context.session.commitOnGet = true`.

## Adding a New API Endpoint

1. Add path + operationId to `components/api/schemas/paths/<domain>.ts`
2. Ensure paths file exports via named export (`export { x } from './x.js'`) — **not** `export * as x` (which adds an extra namespace layer and breaks openapi-backend's operationId lookup)
3. Add request/response schemas to `components/api/schemas/schema/`
4. Create handler in `apps/api/handlers/<domain>/`
5. Export from `apps/api/handlers/index.ts`

## Context & Response API

```typescript
// Reading the request
context.event.payload<T>()          // typed request body
context.event.query<T>()            // query params
context.event.params                // path params (set by OpenAPI match)
context.event.getQuerySettings()    // pagination/sort/filter from query

// Building responses
context.event.response.ok(data)
context.event.response.created(data)
context.event.response.notFound()
context.event.response.badRequest(errors)
context.event.response.unauthorised()
context.event.response.error(message)

// Logging (structured JSON)
context.log.info({ field: value }, 'message')
context.log.warn(...)
context.log.error(...)
```

## Domain Models

All models extend `BaseModel` from `@nodevault/platform.components.domain`:

```typescript
export class MyModel extends BaseModel {
  // BaseModel provides: id, createdAtUTC, updatedAtUTC, patch(), getIndexName()
  // Use @Collection('MyModels') decorator to set RavenDB collection
}
```

The `#index` and `#collection` fields on BaseModel are private hash fields — they are not persisted to RavenDB.

## OpenAPI Schema Conventions

- Custom AJV formats in `definition.ts`: `date-time`, `phone-number`, `coordinates`, `alpha-numeric`, `alpha-numeric-30`, `alpha-numeric-50`, `email`, `uri`
- `strict: true` is set on OpenAPIBackend — unregistered operationIds cause a hard crash on startup
- Security scheme is `jwt` (bearer token); handlers receive `context.user` and `context.authorised`

## Configuration

Server config is loaded from the `NODEVAULT` environment variable (base64-encoded JSON). Local dev overrides are read from the path in `NODEVAULT_OVERRIDES`. Config is frozen in production and test overrides are applied when `VITEST=true`.

## Date Handling

Use `@nodevault/platform.components.utils` date utilities — never import `luxon` or `dayjs` directly:

```typescript
import { nowUtcIso, formatLocalDate, isExpired, expiresInSeconds } from '@nodevault/platform.components.utils'
```

All dates stored in RavenDB and sent over the API are UTC ISO strings (`Z` suffix). Convert to local time for display only using `formatLocalDate()`.

## TypeScript

- Each component directory has its own `tsconfig.json` extending the root — this is required for VSCode to pick up errors inline
- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports
- `module: preserve` + `moduleResolution: Bundler` — always use `.js` extensions in relative imports even for `.ts` source files
