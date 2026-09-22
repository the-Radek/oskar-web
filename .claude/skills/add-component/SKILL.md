---
name: add-component
description: Create a new component under src/components/ following this repo's folder shape and choosing between MUI-wrapping, CSS Modules, or both. Use when asked to add or extract a new UI component in the Next.js app (not the harvester).
---

## Folder shape

Every component gets its own folder under the role-based directory it belongs to
(`auth/`, `common/`, `data/`, `geo/`, `layout/`, `navigation/`, `progressive/`, `reactive/` — pick by
what the component *does*, not what feature it's for):

```
src/components/<Role>/<Name>/
  <name>.component.tsx   # default export, the component itself
  <name>.module.css       # only if it needs styles beyond MUI's props — many components skip this
  <name>.types.ts          # only if it takes props beyond trivial ReactNode children — many skip this
  index.ts                 # barrel: `export { default } from './<name>.component'`
                            # + `export type * from './<name>.types'` if types.ts exists
```

`<name>` is kebab-case matching the folder's PascalCase name (`GoogleButton/google-button.component.tsx`).
Other code imports the component via the folder, never the file directly:
`import Email from '@/components/data/Email'` (resolves through `index.ts`), not
`'@/components/data/Email/email.component'`.

## Styling: MUI vs CSS Modules vs both

Both approaches are in active use — match whichever the surrounding code already does, and within a
new component:

- **Thin wrapper around one MUI primitive** (e.g. `Email` wraps `@mui/material/Link` +
  `EmailIcon` + `IconTooltip` to add domain meaning) → no CSS Modules file at all, just compose MUI
  components and pass `sx`/MUI props.
- **Needs layout MUI doesn't give a prop for** (custom grid, spacing, an indicator bar) → add
  `<name>.module.css` and apply classes with `clsx(styles.root, styles[variant], className)` —
  always accept and forward an incoming `className` prop this way (see `Surface`) so callers can
  extend styling from outside.
- Variant props map 1:1 to CSS classes of the same name (`styles[variant]` in `Surface`) rather than
  a switch statement — follow that pattern for similar variant-driven components.

## Client vs server

Components are server components by default (no directive). Add `'use client'` at the top **only**
when the component actually needs it — a browser-only hook (`useMediaQuery`, `usePathname`) or event
handlers. `Header` and `DesktopNav` both need it for exactly this reason; most components (`Email`,
`Surface`, `DefinitionList`) don't and stay server components.

## Props typing

For simple components, inline the props type in the `.component.tsx` file or skip a dedicated type
entirely. Reach for a MUI-style polymorphic `<Name>Props<RootComponent>` (`OverrideProps` +
`TypeMap`, see `surface.types.ts`) only when the component itself accepts a `component` prop to swap
its root element — most components don't need this ceremony, don't add it speculatively.
