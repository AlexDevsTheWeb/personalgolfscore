import { TLinkSidebar } from '@/types/general.types';
import { IBoxProps, IMainLayoutProps } from '@/types/props.types';
import links from '@/utils/links/links.utils';
import { deleteUserLocalStorage, readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SvgIcon, { default as MenuIcon } from '@mui/icons-material/Menu';
import { ListItemIcon, ListItemText, styled, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import { getAuth, signOut } from 'firebase/auth';
import _ from 'lodash';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../common/ThemeSwitcher.component';
import Footer from './Footer.component';
import User from './User.component';
import { usePlayerStore } from '@/store/zustand';
import { useControlsStore } from '@/store/zustand';
import { useUserStore } from '@/store/zustand';

export default function DrawerAppBar(props: IMainLayoutProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const uid = readUserLocalStorage();
  const auth = getAuth();
  const player = usePlayerStore((state) => state.player);
  const setIsLoading = useControlsStore((state) => state.setIsLoading);
  const getPlayerDetails = usePlayerStore((state) => state.getPlayerDetails);
  const resetUser = useUserStore((state) => state.resetUser);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (uid && (_.isUndefined(player) || _.isEmpty(player))) {
      if (auth) {
        setIsLoading(true);
        getPlayerDetails(uid);
        setIsLoading(false);
      }
    }
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      deleteUserLocalStorage();
      resetUser();
      navigate('/login');
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {/* User Info in Drawer Header */}
      <Typography variant="headline6" sx={{ my: 2, color: 'text.primary' }}>
        {player?.displayName ? player.displayName.split(' ')[0] : 'Menu'}
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
                    marginRight: '10px',
                    color: 'text.primary'
                  }}
                >
                  <SvgIcon component={link.icon} inheritViewBox />
                </ListItemIcon>
                <ListItemText primary={link.name} sx={{ color: 'text.primary' }} /> {/* Use standard primary text color */}

              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider sx={{ my: 1 }} />
        {/* User Profile Link/Display */}
        <ListItem disablePadding>
          <ListItemButton href="/settings"> {/* Or handle navigation via onClick */}
            <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', marginRight: '10px', color: 'text.primary' }}>
              {player?.photoURL ? <Avatar src={player.photoURL} sx={{ width: 24, height: 24 }} /> : <AccountCircleIcon />}
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: 'text.primary' }} />
          </ListItemButton>
        </ListItem>
        {/* Theme Switcher in Drawer */}
        <ListItem sx={{ justifyContent: 'center', display: 'flex', py: 1 }}>
          <ThemeSwitcher />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: 'text.primary', justifyContent: 'center' }}>Logout</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <BoxFooter>
      <Box>
        {/* CssBaseline is already applied in ThemeSetup, no need to repeat here */}
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
              variant="mainAppTitle"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              color="inherit"
            >
              PGS
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

                            justifyContent: 'center',
                            marginRight: '10px',
                            color: 'inherit'
                          }}
                        >
                          <SvgIcon component={link.icon} inheritViewBox />
                        </ListItemIcon>
                        <Typography>{link.name}</Typography>

                      </ListItemButton>
                    </ListItem>
                  );
                })}
                <ThemeSwitcher />
                <User />
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
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 1, width: '100%' }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </BoxFooter>
  );
}

const StyledBox = styled(Box)<IBoxProps>((props) => (({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', height: '100vh'
})));

const BoxFooter: React.FC<IBoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};