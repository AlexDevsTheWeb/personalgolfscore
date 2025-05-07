import { PaletteColor, PaletteColorOptions } from "@mui/material";

export const lightColors = {
  menubar: '#3c699e', // Correct GitHub Accent Blue
  primary1: '#1f2328', // GitHub Primary Text
  primary2: '#3c699e', // Correct GitHub Accent Blue
  primary3: '#656d76', // GitHub Muted Text
  black: '#1f2328', // GitHub Primary Text (as black equivalent)
  grey1: '#656d76', // GitHub Muted Text
  grey2: '#8c959f', // GitHub Intermediate Grey
  grey3: '#d0d7de', // GitHub Border Grey (lighter)
  grey4: '#d0d7de', // GitHub Border Grey
  grey5: '#f6f8fa', // GitHub Subtle Background
  grey6: '#ffffff', // GitHub Default Background
  white: '#ffffff', // GitHub Default Background (as white equivalent)
  success: '#1a7f37', // GitHub Success Green
  warning: '#9a6700', // GitHub Attention Yellow/Orange
  error: '#d1242f', // GitHub Danger Red
  notes: '#fff8c5', // Light yellow - adjust as needed
  behaviours: '#ddf4ff', // Light blue - adjust as needed
  overMid: '#dafbe1', // Light green - adjust as needed
  underMid: '#ffebe9', // Light red - adjust as needed
}

export const darkColors = {
  menubar: '#3b7dc9', // GitHub Dark Accent Blue
  primary1: '#e6edf3', // GitHub Dark Primary Text
  primary2: '#58a6ff', // GitHub Dark Accent Blue (can adjust)
  primary3: '#7d8590', // GitHub Dark Muted Text
  black: '#e6edf3', // GitHub Dark Primary Text (as black equivalent)
  grey1: '#7d8590', // GitHub Dark Muted Text
  grey2: '#6e7681', // GitHub Dark Intermediate Grey
  grey3: '#484f58', // GitHub Dark Border Grey (lighter)
  grey4: '#30363d', // GitHub Dark Border Grey
  grey5: '#161b22', // GitHub Dark Subtle Background
  grey6: '#0d1117', // GitHub Dark Default Background
  white: '#0d1117', // GitHub Dark Default Background (as white equivalent)
  success: '#3fb950', // GitHub Dark Success Green
  warning: '#d29922', // GitHub Dark Attention Yellow/Orange
  error: '#f85149', // GitHub Dark Danger Red
  notes: '#4d4400', // Dark yellow - adjust as needed
  behaviours: '#103d60', // Dark blue - adjust as needed
  overMid: '#104d20', // Dark green - adjust as needed
  underMid: '#631710', // Dark red - adjust as needed
};

// Store main hex codes for custom "dim" colors
const DIM_COLORS_MAIN = {
  greenDim: '#82b38b',
  redDim: '#cf8484',
  yellowDim: '#faf099',
  whiteDim: '#f0f0f0'
  // Removed generic light, dark, contrastText to avoid issues when spreading
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
    greenDim?: PaletteColorOptions;
    yellowDim?: PaletteColorOptions;
    whiteDim?: PaletteColorOptions;
  }

}

export const lightPalette = {
  primary: {
    main: lightColors.menubar,
    light: lightColors.primary1,
    dark: lightColors.primary1,
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
    // overMid and underMid are not standard PaletteColor properties.
    // If needed, they should be accessed via a custom theme structure.
  },
  behaviours: {
    main: lightColors.behaviours
  },
  background: {
    default: lightColors.grey6,
    paper: lightColors.white,
  },
  text: {
    primary: lightColors.primary1,
    secondary: lightColors.grey1,
    disabled: lightColors.grey3,
  },
}
export const darkPalette = {
  primary: {
    main: darkColors.menubar,
    light: darkColors.primary2,
    dark: darkColors.primary2,
    contrastText: darkColors.black, // Text on primary background
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
    // overMid and underMid are not standard PaletteColor properties.
  },
  behaviours: {
    main: darkColors.behaviours
  },
  background: {
    default: darkColors.grey6, // Dark background
    paper: darkColors.grey5,   // Paper background (slightly lighter)
  },
  text: {
    primary: darkColors.primary1,
    secondary: darkColors.grey1,
    disabled: darkColors.grey3,
  },
};