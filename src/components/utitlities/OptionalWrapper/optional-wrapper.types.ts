import { ComponentType, ReactNode } from 'react';

export interface OptionalWrapperProps<P = unknown> {
  enabled?: boolean;
  wrapper: ComponentType<P & { children: ReactNode }>;
  wrapperProps?: P;
  children: Readonly<ReactNode>;
}
