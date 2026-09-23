# Testing

[Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), config in `vitest.config.ts` / `vitest.setup.ts`.

## Running

- `npm test` - run once.
- `npm run test:watch` - watch mode.
- `npm run coverage` - with a coverage report (text + html, in `coverage/`).
- `npm run typecheck` / `npm run lint` - not tests, but run alongside them in CI.

## Conventions

- Tests are colocated: `<name>.test.ts(x)` next to the file it covers, not in a separate `__tests__` folder.
- `@/*` path alias works in tests same as in the app.
- Mock `node:fs` and `process.env` for anything touching secrets/config (see `src/lib/utilities/*.test.ts`).
- Mock `window.matchMedia` via `vi.stubGlobal` for viewport-dependent components (see `ShowIf`'s test).
