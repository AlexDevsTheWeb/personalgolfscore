import { selectCurrentUserThemePreference } from "@/features/user/user.slice";
import { ThemeProvider as StyledComponentsThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline as MuiCssBaseline, StyledEngineProvider } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';
import deepmerge from "deepmerge";
import React from "react";
import { useSelector } from "react-redux";
import { breakpoints } from "../../src/styles/theme/Breakpoints.theme";
import components from "./theme/Components.theme";
import { darkPalette, lightPalette } from "./theme/Palette.theme";
import { OptionsDatepicker } from "./theme/ThemeStyle.theme";
import { systemComponentOptions } from "./theme/ThemeSystem.theme";
import { typography } from "./theme/Typography.theme";

const ThemeSetup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentThemeMode = useSelector(selectCurrentUserThemePreference);
  const theme = React.useMemo(
    () => {
      const selectedPalette = currentThemeMode === 'light' ? lightPalette : darkPalette;
      return createTheme({
        palette: { mode: currentThemeMode, ...selectedPalette },
        typography,
        breakpoints,
        components: deepmerge(components || {}, systemComponentOptions || {}),
        datepicker: OptionsDatepicker.Margin,
      })
    },
    [currentThemeMode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <MuiCssBaseline />
        <StyledComponentsThemeProvider theme={theme}>
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeSetup;