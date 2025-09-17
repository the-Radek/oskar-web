/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentType, ReactNode } from 'react';

export interface OptionalWrapperProps<P = {}> {
  enabled?: boolean;
  wrapper: ComponentType<P & { children: ReactNode }>;
  wrapperProps?: P;
  children: Readonly<ReactNode>;
}
