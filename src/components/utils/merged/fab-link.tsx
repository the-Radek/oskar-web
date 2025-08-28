import Link from 'next/link';
import Fab, { FabProps } from '@mui/material/Fab';
import theme from '@/theme/variables';

export default function FabLink(
  props: FabProps &
    Readonly<{
      children: React.ReactNode;
    }>
) {
  const { children, ...rest } = props;

  return (
    <Fab
      component={Link}
      target="_blank"
      size="large"
      sx={{
        backgroundColor: theme.palette.meta.main,
        color: theme.palette.meta.contrastText,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.meta.light,
        },
      }}
      {...rest}
    >
      {children}
    </Fab>
  );
}
