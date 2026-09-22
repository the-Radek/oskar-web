# Testing

Vitest + React Testing Library + jsdom. Config: `vitest.config.ts`, `vitest.setup.ts` (jest-dom matchers). `@/*` alias works in tests too.

- `npm test` — run once. `npm run test:watch` — watch mode. `npm run coverage` — with coverage report (v8, text+html).
- Tests are colocated: `<name>.test.ts(x)` next to the file it covers.
- `test.globals: true` is on, so `describe`/`it`/`expect`/`vi` don't need importing, but existing tests import them explicitly anyway — keep doing that for clarity.

## What's covered

`src/lib/validators/`, `src/lib/utilities/` (fs/env mocked via `vi.mock('node:fs')` + `vi.stubEnv`), a few logic-bearing components (`Phone`, `Email`, `ShowIf` — `window.matchMedia` mocked via `vi.stubGlobal`) and the two extracted `IconSection`/`OskarCard` components.

## What's not covered (gap, not yet done)

Page components (`src/app/**/page.tsx`) and nav components (`DesktopNav`, `MobileNav`, `MenuPagination`) — need mocking `next/navigation` (`usePathname`) and rendering inside `MuiProvider`/theme for realistic styles. Worth a small `renderWithProviders` test helper if/when these get tested.

## Known bug this caught

`dateSchema.default(new Date())` in `src/lib/validators/{post,image}.ts` used to freeze `createdAt` at module-load time (zod evaluates a non-function `.default()` value once). Fixed to `.default(() => new Date())`. See `post.test.ts`'s "defaults createdAt ... on every parse" test — keep it, it's a regression guard.
