# Component pattern

`src/components/<category>/<PascalName>/`, 3-4 files, kebab-case:

- `<kebab-name>.component.tsx` — default export, the component.
- `<kebab-name>.types.ts` — named export(s), typically `<PascalName>Props`.
- `<kebab-name>.module.css` — CSS module, only if the component has styles.
- `<kebab-name>.component.test.tsx` — optional, see `.claude/testing.md`.
- `<kebab-name>.skeleton.tsx` — optional, a loading placeholder for the component, named export (e.g. `<PascalName>Skeleton`).
- `index.ts` — barrel:
  ```ts
  export { default } from './<kebab-name>.component';
  export type * from './<kebab-name>.types';
  ```
  Re-export a skeleton the same way: `export { <PascalName>Skeleton } from './<kebab-name>.skeleton';`

Rule: every file in a component folder is `<kebab>.<role>.ext`, no exceptions (main file = `.component`, never bare). Extra roles ok (`.slide.ts`, `.skeleton.tsx`), no bare `view.tsx`/`photo.tsx`. Server actions for a component: `<kebab>.actions.ts`.

Component vs route glue: a component takes data and callbacks and may hold real UI logic (hooks, scroll, paging), but knows no URLs, `params`, `notFound()`, `headers()`, `router` paths or server actions of a route. Whatever knows those is route glue, thin, in `src/app/<route>/`: bare names (`feed.tsx`, `photo.tsx`, `actions.ts`), role suffix only for secondary files (`.view.tsx`, `.skeleton.tsx`, `.module.css`). Glue passes server actions in as props. Components never import from `@/app/*`. Large UI belongs here even if used once (split into `.hooks.ts`, `.groups.ts`, ...). Examples: `GalleryFeed` + `Lightbox` here, wiring in `src/app/galerie/feed.tsx` and `[id]/photo*.tsx`. Exception: `[id]/photo*.tsx` stays in the route, it is the page for two `@modal` slots.

Import elsewhere as `@/components/<category>/<PascalName>`.

Categories in use: `auth`, `common`, `content`, `data`, `geo`, `layout`, `navigation`, `progressive`, `reactive`. Pick the closest fit or propose a new one to the user.

`'use client'` at the top of `.component.tsx` only if it uses hooks/browser APIs — otherwise leave it a server component.

## Scaffold

1. Route glue? (knows URLs, `params`, `notFound()`, `router`, route server actions) Not a component, put it in `src/app/<route>/`.
2. Category or name unclear: ask.
3. `PascalName` = component name, `kebab-name` = kebabbed. Folder `src/components/<category>/<PascalName>/`.
4. Create files, then fill in props/markup/logic per the request:

`<kebab-name>.types.ts`:
```ts
export interface <PascalName>Props {}
```

`<kebab-name>.component.tsx` (`'use client';` first line only if hooks/browser APIs):
```tsx
import type { <PascalName>Props } from './<kebab-name>.types';

export default function <PascalName>(props: <PascalName>Props) {
  return null;
}
```

`<kebab-name>.module.css` only if styled, otherwise skip and don't import it. `.skeleton.tsx` and `.component.test.tsx` only if asked. `index.ts`: barrel above.
