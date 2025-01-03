import { stringAvatar } from "@/utils/user/user.utils";
import { Logout, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Skeleton, Stack, Tooltip } from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch<any>();
  const { user, isLoading } = useSelector((store: any) => store.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    !!isLoading
      ? <Skeleton variant="circular" width={40} height={40} />
      :

      <Box>
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
              user?.photoURL === ''
                ? <Avatar alt={user?.displayName}{...stringAvatar(user?.displayName)} />
                : _.isNull(anchorEl)
                  ? <Avatar alt={user?.displayName} src={user?.photoURL} />
                  : <Avatar alt={user?.displayName}{...stringAvatar(user?.displayName)} />
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
            <Stack sx={{ gap: 1, justifyContent: 'center', alignItems: 'center' }}>
              {user?.displayName}
              {
                user?.photoURL === ''
                  ? <Avatar alt={user?.displayName}{...stringAvatar(user?.displayName)} />
                  : _.isNull(anchorEl)
                    ? <Avatar alt={user?.displayName}{...stringAvatar(user?.displayName)} />
                    : <Avatar alt={user?.displayName} src={user?.photoURL} />
              }
            </Stack>


          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>

  )
}

export default User
