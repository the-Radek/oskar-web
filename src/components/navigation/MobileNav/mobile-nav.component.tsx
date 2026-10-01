'use client';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import List from '@mui/material/List';
import routes from '@/app/routes';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import type { MobileNavProps } from './mobile-nav.types';
import HideOnScroll from '@/components/reactive/HideOnScroll';
import styles from './mobile-nav.module.css';
import ListItemButton from '@mui/material/ListItemButton';
import RouterLink from '../RouterLink';

export default function MobileNav(props: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky" {...props} sx={{ top: 0, position: 'sticky' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={open}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            disableSwipeToOpen
            slotProps={{ paper: { component: 'nav' } }}
            classes={{ paper: styles.drawer }}
          >
            <List>
              {Object.entries(routes).map(([path, route]) => {
                return (
                  <ListItem key={path} className={styles.item} disablePadding>
                    <ListItemButton
                      component={RouterLink}
                      href={path}
                      onClick={toggleDrawer(false)}
                      selected={path == pathname}
                      className={styles.link}
                    >
                      <ListItemText
                        primary={route.label}
                        slotProps={{
                          primary: {
                            variant: 'h6',
                            align: 'center',
                            sx: { fontWeight: 'inherit' },
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </SwipeableDrawer>
          <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Tábor Oskar
            {pathname in routes && pathname !== '/' && ` | ${routes[pathname].label}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
