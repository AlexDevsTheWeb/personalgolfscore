import { stringAvatar } from "@/utils/user/user.utils";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import _ from "lodash";
import { useAppStore } from "@/store/zustand";

const User = () => {
  const user = useAppStore((state) => state.user);
  const { player, isLoadingPlayer: isLoading } = useAppStore();

  return (
    !!isLoading || _.isUndefined(player.photoURL)
      ?
      <Box sx={{ display: 'flex' }}>
        <IconButton size="small" sx={{ ml: 2 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: 'white' }} />
        </IconButton>
      </Box>
      : <Box sx={{ display: 'flex' }}>
        <IconButton size="small" sx={{ ml: 2 }}>
          {
            user?.photoURL === '' || _.isUndefined(player.photoURL)
              ? <Avatar alt={player.displayName ?? ''} {...stringAvatar(player.displayName ?? '')} />
              : <Avatar alt={player.displayName ?? ''} src={player.photoURL ?? undefined} />
          }
        </IconButton>
      </Box>
  )
}

export default User
