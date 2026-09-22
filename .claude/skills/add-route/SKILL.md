---
name: add-route
description: Scaffold a new top-level marketing route under src/app/ following this repo's route-per-feature convention, and wire it into the nav and (if needed) next.config.ts redirects. Use when asked to add a new page/section to the Tábor Oskar site.
---

Read the root `CLAUDE.md`'s "Route-per-feature content convention" section first — this skill fills
in the how, that file states the what.

## Files a new route needs

For a route at `src/app/<route>/`:

1. **`metadata.json`** — `{ "title": "..." }`. Czech title as it should appear in the nav and `<title>`.
   Example: `src/app/kontakty/metadata.json`.
2. **`page.tsx`** — imports the JSON as `metadataJson` and re-exports it as `export const metadata:
   Metadata = metadataJson`. See `src/app/kontakty/page.tsx` for the simplest real example (MUI
   components directly, a `page.module.css` for the couple of layout classes that aren't MUI's job,
   `appConfig` from `../app.config.json` for cross-route data like map links).
3. **Register it in `src/app/routes.ts`**: import the route's `metadata.json`, add a
   `'/<route>': { label: metadataJson.title }` entry. This is what drives `DesktopNav`/`MobileNav` —
   skipping this step means the page exists but has no nav link.

Optional, only if the route needs them:

- **`page.assets.ts`** — re-export local images by name (`export { default as X } from
  '@/assets/...'`) so `page.tsx` does `import * as assets from './page.assets'` instead of long
  relative image imports. See `src/app/pro-zajemce/page.assets.ts`.
- **`page.config.json`** — larger structured content, especially when the route is parameterized.
  `taborova-hra/[year]/page.config.json` is a `year → { title, description, image }` map read via
  `generateStaticParams`/`notFound()` for invalid years (see that route's `page.tsx` for the
  `assertValidYear` pattern). For a non-dynamic route, `page.config.json` can just be a flat content
  object instead of a year map — see `pro-zajemce/pred-odjezdem/page.config.json`.
- **`redirect.ts`** — export a `Redirect` (`from 'next/dist/lib/load-custom-routes'`) with
  `source`/`destination`/`permanent`. Declaring it here does **not** register it — you must also add
  it to the array in `next.config.ts`'s `redirects()`. Use this when a route needs a canonical
  redirect target (e.g. `/taborova-hra` → the latest year, computed from `page.config.json`'s keys —
  see `taborova-hra/redirect.ts`) or when the "route" is actually external (e.g. `/prihlaska` →
  a Google Form, declared inline in `next.config.ts` rather than as its own `redirect.ts` since
  there's no corresponding `src/app/` folder).
- **`layout.tsx`** — only if content should wrap a dynamic sub-route, e.g.
  `taborova-hra/layout.tsx` wraps every `[year]` page with a shared static explainer section.

## Styling and content

- Prefer MUI components (`Typography`, `Card`, `Accordion`, …) directly in `page.tsx`; reach for
  `page.module.css` only for layout/spacing MUI doesn't give you a prop for (grid of cards, custom
  spacing) — see `add-component` skill for the same decision applied to components.
  Wrap page body copy in `<Typography align="justify">`; use `<section aria-label="...">` (English,
  short, kebab/space-free identifier) to segment content — every existing page does this for a11y
  landmarks, keep it consistent.
- All visible copy is Czech. Keep `aria-label`s in English (matches existing routes).
- Internal links use `RouterLink` (`@/components/navigation/RouterLink`), not a bare `<a>` or MUI
  `Link` — it marks the active route via `aria-current` from `usePathname()`.
