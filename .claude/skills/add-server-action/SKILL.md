---
name: add-server-action
description: Add a new admin-gated mutation (server action + validator + API route) following this repo's validate-then-persist pattern. Use when asked to add a way to create/update/delete data (posts, images, or a new model) rather than just render existing data.
---

Read the root `CLAUDE.md`'s "Auth" and "Data layer" sections first for the session/role model this
builds on.

## The three pieces, using `createPost` as the reference

1. **Validator** — `src/lib/validators/<thing>.ts`, a `zod` schema, e.g. `PostSchema` in
   `src/lib/validators/post.ts`. Compose shared pieces like `dateSchema`
   (`src/lib/validators/date.ts`, string → validated `Date`) rather than re-deriving them. Nest
   input schemas the same way the action needs them combined (see `CreatePostInputSchema` in
   `src/lib/actions/post.ts`, which composes `PostSchema` + `z.array(ImageSchema)`).
2. **Server action** — `src/lib/actions/<thing>.ts`, marked `'use server'` only if it's called from a
   client component form/action (mutations reached only via API routes, like `createPost`, don't need
   the directive themselves — the route calling them is what's already a server context). The
   function takes a trusted `userId` (never trust a client-supplied one) plus the raw input, parses it
   with `<Schema>.parse(input)` **before** touching Prisma, and only then calls `prisma.<model>.create`
   (or update/delete). Never pass unparsed request data into a Prisma call.
3. **API route** (if the action is invoked over HTTP, e.g. by the harvester or a future admin UI) —
   `src/app/api/<path>/route.ts`. Pattern from `src/app/api/post/new/route.ts`:
   - `await Promise.all([req.json(), auth()])` to fetch body and session together.
   - `401` if `!session?.user?.id`.
   - `403` if `session.user.role !== Role.ADMIN` (import `Role` from `@/prisma/enums`).
   - Call the action inside `try/catch`; `400` with a logged error on failure, `201` on success.
   Follow this exact status-code sequence (401 → 403 → try/catch → 400/201) for consistency with the
   existing endpoint.

## Don't

- Don't validate inside the API route and again inside the action — validation belongs in the zod
  schema, called once from the action.
- Don't check `role` in the action — that's the route's job (the action may also be called from
  contexts that already know the caller is authorized); keep authorization at the boundary.
- Don't invent a new session mechanism — reuse `auth()` (Auth.js) for anything admin-gated. Only
  reach for `iron-session` (`src/lib/session/session.ts`) if you're deliberately working in that
  separate, currently-unused-outside-its-own-module system — check with the user first, since two
  session mechanisms already coexist and a third path would add confusion.
