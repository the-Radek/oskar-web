'use client';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Fab, { FabProps } from '@mui/material/Fab';
import Box from '@mui/material/Box';

function FabLink(
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
      sx={(theme) => ({
        backgroundColor: theme.palette.meta.main,
        color: theme.palette.meta.contrastText,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.meta.light,
        },
      })}
      {...rest}
    >
      {children}
    </Fab>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component={'footer'}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.footer,
      })}
    >
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <Box
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacing(2),
        })}
      >
        <FabLink href="https://www.facebook.com/taborOskar.cz" aria-label="facebook">
          <FacebookIcon />
        </FabLink>
        <FabLink href="https://www.instagram.com/tabor_oskar/" aria-label="instagram">
          <InstagramIcon />
        </FabLink>
      </Box>
    </Box>
  );
}
