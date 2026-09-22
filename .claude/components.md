# Component pattern

`src/components/<category>/<PascalName>/`, 3-4 files, kebab-case:

- `<kebab-name>.component.tsx` — default export, the component.
- `<kebab-name>.types.ts` — named export(s), typically `<PascalName>Props`.
- `<kebab-name>.module.css` — CSS module, only if the component has styles.
- `index.ts` — barrel:
  ```ts
  export { default } from './<kebab-name>.component';
  export type * from './<kebab-name>.types';
  ```

Import elsewhere as `@/components/<category>/<PascalName>`.

Categories in use: `auth`, `common`, `content`, `data`, `geo`, `layout`, `navigation`, `progressive`, `reactive`. Pick the closest fit or propose a new one to the user.

`'use client'` at the top of `.component.tsx` only if it uses hooks/browser APIs — otherwise leave it a server component.

No test files exist for components currently — don't add one unless asked.

Scaffold new components with the `new-component` skill instead of doing this by hand.
