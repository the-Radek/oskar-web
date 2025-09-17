import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import type { HideOnScrollProps } from './hide-on-scroll.types';

export default function HideOnScroll(props: HideOnScrollProps) {
  const { children, ...otherProps } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} {...otherProps}>
      {children}
    </Slide>
  );
}
