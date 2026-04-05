import { TLinkSidebar } from '@/types/general.types';
import { IBoxProps, IMainLayoutProps } from '@/types/props.types';
import links from '@/utils/links/links.utils';
import { deleteUserLocalStorage, readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SvgIcon, { default as MenuIcon } from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ListItemIcon, ListItemText, styled, Typography, Breadcrumbs, Link } from '@mui/material';
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
import { Outlet, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import ThemeSwitcher from '../common/ThemeSwitcher.component';
import Footer from './Footer.component';
import User from './User.component';
import { useAppStore } from '@/store/zustand';

export default function DrawerAppBar(props: IMainLayoutProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const uid = readUserLocalStorage();
  const auth = getAuth();
  const player = useAppStore((state) => state.player);
  const setIsLoading = useAppStore((state) => state.setIsLoadingControls);
  const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
  const resetUser = useAppStore((state) => state.resetUser);
  const navigate = useNavigate();
  const location = useLocation();
  const roundDetailsData = useAppStore((state) => state.roundDetailsData);

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

  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    interface BreadcrumbItem {
      label: string;
      path: string;
      icon?: React.ReactNode;
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/dashboard', icon: <HomeIcon fontSize="small" /> }
    ];

    if (path === '/dashboard' || path === '/') {
      return [];
    }

    if (path === '/clubs') {
      breadcrumbs.push({ label: 'Clubs', path: '/clubs' });
    } else if (path === '/all-rounds') {
      breadcrumbs.push({ label: 'All Rounds', path: '/all-rounds' });
    } else if (path === '/addNewRound') {
      breadcrumbs.push({ label: 'Add Round', path: '/addNewRound' });
    } else if (path === '/statistics') {
      breadcrumbs.push({ label: 'Statistics', path: '/statistics' });
    } else if (path === '/settings') {
      breadcrumbs.push({ label: 'Settings', path: '/settings' });
    } else if (path.startsWith('/round/')) {
      breadcrumbs.push({ label: 'All Rounds', path: '/all-rounds' });
      const courseName = roundDetailsData?.roundCourse || 'Round Details';
      breadcrumbs.push({ label: courseName, path: path });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

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
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mb: 1, display: { xs: 'none', md: 'block' } }}
            >
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return isLast ? (
                  <Typography key={crumb.path} color="text.primary" fontWeight="bold">
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={crumb.path}
                    component={RouterLink}
                    to={crumb.path}
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    {crumb.icon}
                    {crumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          )}
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