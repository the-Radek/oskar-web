import Slide, { SlideProps } from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export type HideOnScrollProps = SlideProps;

export default function HideOnScroll(props: HideOnScrollProps) {
  const { children, ...otherProps } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} {...otherProps}>
      {children}
    </Slide>
  );
}
