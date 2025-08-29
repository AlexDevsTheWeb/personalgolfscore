import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import User from './User.component';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log("newValue: ", value)
    navigate(`/${newValue}`);
  };

  return (
    <>
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Dashboard"
            value="dashboard"
            icon={<DashboardIcon />}
          />
          <BottomNavigationAction
            label="Clubs"
            value="clubs"
            icon={<SportsGolfIcon />}
          />
          <BottomNavigationAction
            label="Settings"
            value="settings"
            icon={<SettingsIcon />}
          />
          <BottomNavigationAction
            label=""
            value=""
            icon={<User />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}