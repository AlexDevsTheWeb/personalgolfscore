import { TLinkSidebar } from '@/types/general.types';
import { IMainLayoutProps } from '@/types/props.types';
import links from '@/utils/links/links.utils';
import { deleteUserLocalStorage, readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import Logout from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import Settings from '@mui/icons-material/Settings';
import SvgIcon from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ListItemIcon, ListItemText, Typography, Breadcrumbs, Link, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getAuth, signOut } from 'firebase/auth';
import _ from 'lodash';
import * as React from 'react';
import { Outlet, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import ThemeSwitcher from '../common/ThemeSwitcher.component';
import Footer from './Footer.component';
import { useAppStore } from '@/store/zustand';
import { SnackbarProvider } from '@/components/Admin/SnackbarProvider.component';

const collapsedWidth = 57;
const drawerWidth = 240;

export default function DrawerAppBar(_props: IMainLayoutProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
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
    setDrawerOpen((prevState) => !prevState);
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
      console.error('Logout error:', error);
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
      { label: 'Home', path: '/dashboard', icon: <HomeIcon fontSize="small" /> },
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
    } else if (path === '/simulator') {
      breadcrumbs.push({ label: 'HCP Simulator', path: '/simulator' });
    } else if (path === '/handicap-history') {
      breadcrumbs.push({ label: 'Handicap History', path: '/handicap-history' });
    } else if (path.startsWith('/round/')) {
      if (roundDetailsData?.roundCourse) {
        breadcrumbs.push({ label: 'All Rounds', path: '/all-rounds' });
        breadcrumbs.push({ label: roundDetailsData.roundCourse, path });
      } else {
        breadcrumbs.push({ label: 'All Rounds', path: '/all-rounds' });
        breadcrumbs.push({ label: 'Loading...', path });
      }
    } else if (path === '/admin/courses') {
      breadcrumbs.push({ label: 'Admin', path: '/admin/courses' });
    } else if (path === '/admin/users') {
      breadcrumbs.push({ label: 'Admin', path: '/admin/users' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: drawerOpen ? 'flex-start' : 'center',
          px: drawerOpen ? 1.5 : 1,
          minHeight: 64,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: 'hidden', minHeight: 0 }}>
        <List sx={{ overflowY: 'auto', height: '100%' }}>
          {links.filter((l) => l.show === true).map((link: TLinkSidebar, index: number) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={link.link}
                onClick={drawerOpen ? handleDrawerToggle : undefined}
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    mr: drawerOpen ? 1.5 : 'auto',
                  }}
                >
                  <SvgIcon component={link.icon} inheritViewBox />
                </ListItemIcon>
                <ListItemText
                  primary={link.name}
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {player?.isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />
              {drawerOpen && (
                <ListItem disablePadding sx={{ px: 2.5, py: 0.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Admin
                  </Typography>
                </ListItem>
              )}
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={RouterLink}
                  to="/admin/courses"
                  onClick={drawerOpen ? handleDrawerToggle : undefined}
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: drawerOpen ? 1.5 : 'auto',
                    }}
                  >
                    <SvgIcon component={GolfCourseIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary="Courses" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={RouterLink}
                  to="/admin/users"
                  onClick={drawerOpen ? handleDrawerToggle : undefined}
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: drawerOpen ? 1.5 : 'auto',
                    }}
                  >
                    <SvgIcon component={PeopleIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary="Users" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: drawerOpen ? 'space-between' : 'center',
          px: drawerOpen ? 1.5 : 0.5,
          py: drawerOpen ? 1.5 : 1,
        }}
      >
        {drawerOpen ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
              <Avatar
                sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.875rem' }}
                alt={player?.displayName ?? ''}
                src={player?.photoURL || undefined}
              >
                {player?.displayName ? `${player.displayName[0]}${player.displayName.split(' ')[1]?.[0] ?? ''}`.toUpperCase() : '?'}
              </Avatar>
              <Box>
                <Typography noWrap sx={{ fontSize: '0.875rem' }}>
                  {player?.displayName ?? ''}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <IconButton size="small" component={RouterLink} to="/settings">
                    <Settings fontSize="small" />
                  </IconButton>
                  <ThemeSwitcher />
                </Box>
              </Box>
            </Box>
            <IconButton size="small" onClick={handleLogout}>
              <Logout fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.75rem' }}
            alt={player?.displayName ?? ''}
            src={player?.photoURL || undefined}
          >
            {player?.displayName ? `${player.displayName[0]}${player.displayName.split(' ')[1]?.[0] ?? ''}`.toUpperCase() : '?'}
          </Avatar>
        )}
      </Box>
    </Box>
  );

  return (
    <SnackbarProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerOpen ? drawerWidth : collapsedWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: drawerOpen
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
            '& .MuiDrawer-paper': {
              width: drawerOpen ? drawerWidth : collapsedWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: drawerOpen
                  ? theme.transitions.duration.enteringScreen
                  : theme.transitions.duration.leavingScreen,
              }),
              overflowX: 'hidden',
              overflowY: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, height: '100vh' }}>
          <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 500, mb: 0.5 }}>
              PGS
            </Typography>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return isLast ? (
                    <Typography key={crumb.path} color="text.primary" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                      {crumb.label}
                    </Typography>
                  ) : (
                    <Link
                      key={crumb.path}
                      component={RouterLink}
                      to={crumb.path}
                      color="inherit"
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}
                    >
                      {crumb.icon}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            )}
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </SnackbarProvider>
  );
}
