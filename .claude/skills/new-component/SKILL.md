---
name: new-component
description: Scaffold a new React component in src/components following this repo's fixed file pattern (folder + .component.tsx + .types.ts + optional .module.css + index.ts barrel). Use whenever asked to create/add a new component in oskar-web.
---

Full pattern reference: `.claude/components.md`.

Steps:

1. If category or name unclear, ask. Categories: `auth`, `common`, `content`, `data`, `geo`, `layout`, `navigation`, `progressive`, `reactive` (pick closest, or propose new one).
2. `PascalName` = component name, folder `src/components/<category>/<PascalName>/`. `kebab-name` = kebabbed `PascalName`.
3. Create files:

`<kebab-name>.types.ts`:
```ts
export interface <PascalName>Props {
}
```

`<kebab-name>.component.tsx` (add `'use client';` as first line only if using hooks/browser APIs):
```tsx
import type { <PascalName>Props } from './<kebab-name>.types';

export default function <PascalName>(props: <PascalName>Props) {
  return null;
}
```

`<kebab-name>.module.css` — only if styling is needed, otherwise skip and don't import it.

`index.ts`:
```ts
export { default } from './<kebab-name>.component';
export type * from './<kebab-name>.types';
```

4. Fill in the actual props/markup/logic per the request — the above is the empty skeleton.
5. Import elsewhere as `@/components/<category>/<PascalName>`.
