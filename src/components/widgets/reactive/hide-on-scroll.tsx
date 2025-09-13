import { ReactElement } from 'react';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function HideOnScroll({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
