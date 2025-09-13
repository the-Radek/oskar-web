import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import List from '@mui/material/List';
import routes from '@/app/routes';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import HideOnScroll from '@/components/widgets/reactive/hide-on-scroll';
import ListLink from '@/components/widgets/link/list-link';

export default function MobileNav() {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky">
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
            sx={(theme) => ({
              '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              },
            })}
          >
            <nav>
              <List sx={{ width: 250 }}>
                {Object.entries(routes).map(([path, route], index) => {
                  const active = path == currentPath;
                  return (
                    <Fragment key={path}>
                      {index > 0 && <Divider component="li" variant="middle" />}
                      <ListItem disablePadding>
                        <ListLink href={path} active={active} onClick={toggleDrawer(false)}>
                          <ListItemText
                            disableTypography
                            primary={route.label}
                            sx={(theme) => ({
                              fontWeight: active ? theme.typography.fontWeightBold : null,
                              fontSize: active ? '1.2rem' : '1.1rem',
                              textAlign: 'center',
                            })}
                          />
                        </ListLink>
                      </ListItem>
                    </Fragment>
                  );
                })}
              </List>
            </nav>
          </SwipeableDrawer>
          <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Tábor Oskar
            {currentPath in routes && currentPath !== '/' && ` | ${routes[currentPath].label}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
