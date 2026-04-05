import StackPlayerMenu from "@/styles/stack/StackPlayerMenu.styles";
import { deleteUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { stringAvatar } from "@/utils/user/user.utils";
import { Logout, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Skeleton, Tooltip } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import _ from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/zustand";
import { usePlayerStore } from "@/store/zustand";


const User = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { player, isLoading } = usePlayerStore();
  const resetUser = useUserStore((state) => state.resetUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettings = () => {
    setAnchorEl(null);
    navigate('/settings');
  }

  const handleLogout = () => {
    const auth = getAuth();

    setAnchorEl(null);
    signOut(auth).then(() => {
      deleteUserLocalStorage();
      resetUser();
    }).catch((error) => {
    });
  };

  return (
    !!isLoading || _.isUndefined(player.photoURL)
      ?
      <Box sx={{ display: 'flex' }}>
        <IconButton size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: 'white' }} />
        </IconButton>
      </Box>
      : <Box sx={{ display: 'flex' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {

              user?.photoURL === '' || _.isUndefined(player.photoURL)
                ? <Avatar alt={player.displayName}{...stringAvatar(player.displayName)} />
                : <Avatar alt={player.displayName} src={player.photoURL} />
            }
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <StackPlayerMenu name={player?.displayName} value={player?.HCP} />
          </MenuItem>

          <Divider />

          {/* Settings MenuItem */}
          <MenuItem onClick={handleSettings}
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
            <ListItemIcon sx={{ marginLeft: '-10px' }}>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          {/* Logout MenuItem */}
          <MenuItem onClick={handleLogout}
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
            <ListItemIcon sx={{ marginLeft: '-10px' }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
  )
}

export default User
