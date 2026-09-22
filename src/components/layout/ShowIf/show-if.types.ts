export const BREAKPOINTS = {
  sm: 600,
  md: 900,
  lg: 1200,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export type ShowIfProps = { children: React.ReactNode } & (
  | { below: Breakpoint; above?: Breakpoint }
  | { above: Breakpoint; below?: Breakpoint }
);
