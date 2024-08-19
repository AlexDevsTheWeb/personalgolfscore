import { useMediaQuery, useTheme } from '@mui/material';

const useDeviceDetection = () => {
  const theme = useTheme();

  const devices = {
    isDesktopLarge: useMediaQuery(theme.breakpoints.up("xl")),
    isDesktopSmall: useMediaQuery(theme.breakpoints.between("lg", "xl")),
    isTabletLandScape: useMediaQuery(theme.breakpoints.between("md", "lg")),
    isTabletPortrait: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isMobile: useMediaQuery(theme.breakpoints.down("md")),
    isPhone: useMediaQuery(theme.breakpoints.down("sm")),
  };

  return {
    ...devices,
    isMobileDevice:
      devices.isMobile || devices.isTabletPortrait || devices.isTabletLandScape,
    isVerticalScreen: devices.isMobile || devices.isTabletPortrait,
  };
};

export default useDeviceDetection;