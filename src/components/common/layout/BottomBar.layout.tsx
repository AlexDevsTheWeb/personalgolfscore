import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { TLinkSidebar } from '../../../types/general.types';
import links from '../../../utils/links/links.utils'

export default function BottomBar(props: any) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }} {...props}>
      {props.children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ position: 'sticky', bottom: 0, zIndex: 200 }}
      >


        {/* <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}

        {
          links.map((link: TLinkSidebar, index: number) => {
            return (
              <BottomNavigationAction label={link.name} icon={link.icon} />
            );
          })}


      </BottomNavigation>
    </Box>
  );
}