import type { OptionalWrapperProps } from './optional-wrapper.types';

export default function OptionalWrapper<P = unknown>(props: OptionalWrapperProps<P>) {
  const { enabled = true, wrapper: Wrapper, wrapperProps, children } = props;

  if (!enabled) return <>{children}</>;
  return <Wrapper {...(wrapperProps as P)}>{children}</Wrapper>;
}
