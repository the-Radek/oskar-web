import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import routes from './routes';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import HideOnScroll from '@/components/utils/reactive/hide-on-scroll';
import ListLink from '@/components/utils/merged/list-link';

export default function MobileNav() {
  const currentPath = usePathname();
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle(document.title);
  }, [currentPath]);

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
                {routes.map((x, index) => {
                  const active = x.path == currentPath;
                  return (
                    <Fragment key={x.path}>
                      {index > 0 && <Divider component="li" variant="middle" />}
                      <ListItem disablePadding>
                        <ListLink href={x.path} active={active} onClick={toggleDrawer(false)}>
                          <ListItemText
                            disableTypography
                            primary={x.label}
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
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
