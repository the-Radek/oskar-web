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

Rule: every file in a component folder is `<kebab>.<role>.ext`, no exceptions (main file = `.component`, never bare). Extra roles ok (`.slide.ts`, `.skeleton.tsx`), no bare `view.tsx`/`photo.tsx`/`actions.ts`.

Route-bound code does NOT belong here: `params`, `notFound()`, `headers()`, hardcoded route URLs, server actions for one route. Put it route-local in `src/app/<route>/`: bare names (`feed.tsx`, `photo.tsx`), role suffix only for secondary files (`.actions.ts`, `.view.tsx`, `.skeleton.tsx`, `.module.css`). Components never import from `@/app/*`. Example: generic `Lightbox` here, gallery wiring in `src/app/galerie/[id]/photo*.ts(x)`.

Import elsewhere as `@/components/<category>/<PascalName>`.

Categories in use: `auth`, `common`, `content`, `data`, `geo`, `layout`, `navigation`, `progressive`, `reactive`. Pick the closest fit or propose a new one to the user.

`'use client'` at the top of `.component.tsx` only if it uses hooks/browser APIs — otherwise leave it a server component.

Scaffold new components with the `new-component` skill instead of doing this by hand.
