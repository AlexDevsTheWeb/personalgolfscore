import { PaletteColor, PaletteColorOptions } from "@mui/material";

// Professional monochrome light theme - neutral gray with subtle blue accent
export const lightColors = {
  menubar: '#5c6b7a', // Muted blue-gray for AppBar
  primary1: '#1a1a1a', // Near black for primary text
  primary2: '#5c6b7a', // Subtle blue-gray for primary actions
  primary3: '#666666', // Neutral gray for secondary text
  black: '#1a1a1a', // Near black
  grey1: '#5c6b7a', // Muted text
  grey2: '#999999', // Medium gray for text
  grey3: '#e0e0e0', // Light gray for borders
  grey4: '#cccccc', // Lighter border
  grey5: '#f5f5f5', // Light background
  grey6: '#ffffff', // White for contrast
  white: '#ffffff', // White
  success: '#4a9f6e', // Muted green
  warning: '#c9a227', // Muted amber
  error: '#c94040', // Muted red
  notes: '#f5f5e0', // Subtle yellow
  behaviours: '#a0b0c0', // Subtle blue-gray
  overMid: '#c8e6c9', // Very subtle green
  underMid: '#ffcdd2', // Very subtle red
}

// Professional monochrome dark theme - neutral gray with subtle blue accent
export const darkColors = {
  menubar: '#5c6b7a', // Muted blue-gray for AppBar (same as light)
  primary1: '#e5e5e5', // Near white for primary text
  primary2: '#6b8caa', // Muted blue-gray for primary actions
  primary3: '#999999', // Medium gray for secondary text
  black: '#ffffff', // White for high contrast
  grey1: '#a0a0a0', // Light gray for text
  grey2: '#808080', // Medium gray
  grey3: '#4a4a4a', // Dark gray for borders
  grey4: '#3a3a3a', // Dark gray for UI elements
  grey5: '#262626', // Dark gray for paper/card
  grey6: '#1a1a1a', // Dark background
  white: '#1a1a1a', // Dark background equivalent
  success: '#4a9f6e', // Muted green (same as light)
  warning: '#c9a227', // Muted amber (same as light)
  error: '#c94040', // Muted red (same as light)
  notes: '#3d3d30', // Subtle dark yellow
  behaviours: '#4a5560', // Subtle blue-gray
  overMid: '#1b3d1b', // Very subtle dark green
  underMid: '#3d1b1b', // Very subtle dark red
};

// Dim colors for score display - subtle/muted versions
const DIM_COLORS_MAIN = {
  greenDim: '#a5d6a7', // Subtle muted green
  redDim: '#ef9a9a',   // Subtle muted red
  red2Dim: '#e57373', // Slightly darker muted red
  yellowDim: '#fff59d', // Subtle muted yellow
  whiteDim: '#f0f0f0'  // Light gray
};

declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
    primary1: PaletteColor;
    primary2: PaletteColor;
    primary3: PaletteColor;
    black: PaletteColor;
    grey1: PaletteColor;
    grey2: PaletteColor;
    grey3: PaletteColor;
    grey4: PaletteColor;
    grey5: PaletteColor;
    grey6: PaletteColor;
    white: PaletteColor;
    notes: PaletteColor;
    behaviours: PaletteColor;
    redDim: PaletteColor;
    red2Dim: PaletteColor;
    greenDim: PaletteColor;
    yellowDim: PaletteColor;
    whiteDim: PaletteColor;
  }

  interface PaletteOptions {
    primary1?: PaletteColorOptions;
    primary2?: PaletteColorOptions;
    primary3?: PaletteColorOptions;
    black?: PaletteColorOptions;
    grey1?: PaletteColorOptions;
    grey2?: PaletteColorOptions;
    grey3?: PaletteColorOptions;
    grey4?: PaletteColorOptions;
    grey5?: PaletteColorOptions;
    grey6?: PaletteColorOptions;
    white?: PaletteColorOptions;
    notes?: PaletteColorOptions;
    behaviours?: PaletteColorOptions;
    redDim?: PaletteColorOptions;
    red2Dim?: PaletteColorOptions;
    greenDim?: PaletteColorOptions;
    yellowDim?: PaletteColorOptions;
    whiteDim?: PaletteColorOptions;
  }
}

export const lightPalette = {
  primary: {
    main: lightColors.menubar,
    light: lightColors.primary2,
    dark: lightColors.primary2,
    contrastText: lightColors.white,
  },
  primary1: { main: lightColors.primary1 },
  primary2: { main: lightColors.primary2 },
  primary3: { main: lightColors.primary3 },
  black: { main: lightColors.black },
  grey1: { main: lightColors.grey1 },
  grey2: { main: lightColors.grey2 },
  grey3: { main: lightColors.grey3 },
  grey4: { main: lightColors.grey4 },
  grey5: { main: lightColors.grey5 },
  grey6: { main: lightColors.grey6 },
  white: { main: lightColors.white },
  success: { main: lightColors.success },
  warning: { main: lightColors.warning },
  error: { main: lightColors.error },
  redDim: {
    main: DIM_COLORS_MAIN.redDim,
  },
  red2Dim: {
    main: DIM_COLORS_MAIN.red2Dim,
  },
  greenDim: {
    main: DIM_COLORS_MAIN.greenDim,
  },
  yellowDim: {
    main: DIM_COLORS_MAIN.yellowDim,
  },
  whiteDim: {
    main: DIM_COLORS_MAIN.whiteDim,
  },
  notes: {
    main: lightColors.notes,
  },
  behaviours: {
    main: lightColors.behaviours
  },
  background: {
    default: lightColors.grey5,
    paper: lightColors.grey6,
  },
  text: {
    primary: lightColors.primary1,
    secondary: lightColors.grey2,
    disabled: lightColors.grey3,
  },
}

export const darkPalette = {
  primary: {
    main: darkColors.menubar,
    light: darkColors.primary2,
    dark: darkColors.primary2,
    contrastText: darkColors.black,
  },
  primary1: { main: darkColors.primary1 },
  primary2: { main: darkColors.primary2 },
  primary3: { main: darkColors.primary3 },
  black: { main: darkColors.black },
  grey1: { main: darkColors.grey1 },
  grey2: { main: darkColors.grey2 },
  grey3: { main: darkColors.grey3 },
  grey4: { main: darkColors.grey4 },
  grey5: { main: darkColors.grey5 },
  grey6: { main: darkColors.grey6 },
  white: { main: darkColors.white },
  success: { main: darkColors.success },
  warning: { main: darkColors.warning },
  error: { main: darkColors.error },
  redDim: {
    main: DIM_COLORS_MAIN.redDim,
  },
  red2Dim: {
    main: DIM_COLORS_MAIN.red2Dim,
  },
  greenDim: {
    main: DIM_COLORS_MAIN.greenDim,
  },
  yellowDim: {
    main: DIM_COLORS_MAIN.yellowDim,
  },
  whiteDim: {
    main: DIM_COLORS_MAIN.whiteDim,
  },
  notes: {
    main: darkColors.notes,
  },
  behaviours: {
    main: darkColors.behaviours
  },
  background: {
    default: darkColors.grey6,
    paper: darkColors.grey5,
  },
  text: {
    primary: darkColors.primary1,
    secondary: darkColors.grey2,
    disabled: darkColors.grey3,
  },
};
