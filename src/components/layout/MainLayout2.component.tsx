import SvgIcon, { default as MenuIcon } from '@mui/icons-material/Menu';
import { ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { TLinkSidebar } from '../../types/general.types';
import links from '../../utils/links/links.utils';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography sx={{ my: 2 }}>
        Personal Golf Scorer
      </Typography>
      <Divider />
      <List>
        {links.map((link: TLinkSidebar, index: number) => {
          return (
            <ListItem key={index} disablePadding sx={{ display: 'flex' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
                href={link.link}

              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}
                >
                  <SvgIcon component={link.icon} inheritViewBox />
                </ListItemIcon>
                <ListItemText primary={link.name} />
                {/* <Typography>{link.name}</Typography> */}

              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ml: '5px', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#ffffff' }}
          >
            Personal Golf Score
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <List sx={{ display: 'flex' }}>
              {links.map((link: TLinkSidebar, index: number) => {
                return (
                  <ListItem key={index} disablePadding sx={{ display: 'flex' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        px: 2.5,
                      }}
                      href={link.link}

                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: '#ffffff !important',
                          justifyContent: 'center',
                          marginRight: '10px'
                        }}
                      >
                        <SvgIcon component={link.icon} inheritViewBox />
                      </ListItemIcon>
                      <Typography sx={{ color: '#ffffff' }}>{link.name}</Typography>

                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box >
  );
}