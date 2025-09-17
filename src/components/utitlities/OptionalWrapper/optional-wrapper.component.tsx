/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { OptionalWrapperProps } from './optional-wrapper.types';

export default function OptionalWrapper<P = {}>(props: OptionalWrapperProps<P>) {
  const { enabled = true, wrapper: Wrapper, wrapperProps, children } = props;

  if (!enabled) return <>{children}</>;
  return <Wrapper {...(wrapperProps as P)}>{children}</Wrapper>;
}
