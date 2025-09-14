/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';

interface Props<P = {}> {
  enabled?: boolean;
  wrapper: ComponentType<P & { children: ReactNode }>;
  wrapperProps?: P;
}

type OptionalWrapperProps<P = {}> = PropsWithChildren<Props<P>>;

export function OptionalWrapper<P = {}>(props: OptionalWrapperProps<P>) {
  const { enabled = true, wrapper: Wrapper, wrapperProps, children } = props;

  if (!enabled) return <>{children}</>;
  return <Wrapper {...(wrapperProps as P)}>{children}</Wrapper>;
}
