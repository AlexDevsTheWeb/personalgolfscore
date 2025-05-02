// import { colors } from "@mui/material";


// export const colors = {
//   menubar: '#000000',
//   primary1: '#494949',
//   primary2: '#091f5a',
//   primary3: '#7888a5',
//   black: '#111111',
//   grey1: '#626262',
//   grey2: '#979797',
//   grey3: '#b4b4b4',
//   grey4: '#dbdce0',
//   grey5: '#e9eaed',
//   grey6: '#f7f8f9',
//   white: '#ffffff',
//   success: '#55a63a',
//   warning: '#da9d00',
//   error: '#902727',
//   notes: '#f0f5af',
//   behaviours: '#cbe3ff',
//   overMid: '#078800',
//   underMid: '#f25448'
// };

export const lightColors = {
  menubar: '#000000',
  primary1: '#494949',
  primary2: '#091f5a',
  primary3: '#7888a5',
  black: '#111111',
  grey1: '#626262',
  grey2: '#979797',
  grey3: '#b4b4b4',
  grey4: '#dbdce0',
  grey5: '#e9eaed',
  grey6: '#f7f8f9',
  white: '#ffffff',
  success: '#55a63a',
  warning: '#da9d00',
  error: '#902727',
  notes: '#f0f5af',
  behaviours: '#cbe3ff',
  overMid: '#078800',
  underMid: '#f25448'
}

export const darkColors = {
  menubar: '#bbdefb', // Lighter blue for dark mode primary
  primary1: '#e0e0e0', // Light grey text for dark mode
  primary2: '#90caf9', // Lighter accent blue
  primary3: '#a6a6a6', // Lighter grey accent
  black: '#ffffff', // White becomes the "black" equivalent
  grey1: '#bdbdbd',
  grey2: '#9e9e9e',
  grey3: '#757575',
  grey4: '#424242', // Darker grey for borders/dividers
  grey5: '#303030', // Darker grey for backgrounds
  grey6: '#212121', // Very dark grey for main background
  white: '#121212', // Dark becomes the "white" equivalent
  success: '#81c784', // Lighter success green
  warning: '#ffb74d', // Lighter warning orange
  error: '#e57373', // Lighter error red
  notes: '#424242', // Darker notes background
  behaviours: '#1e88e5', // Adjust behavior color if needed
  overMid: '#a5d6a7', // Lighter green
  underMid: '#ef9a9a' // Lighter red
};

const defaultValues = {
  light: '#ffffff',
  dark: '#ffffff',
  contrastText: '#ffffff',
};

declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
    primary1: Palette['primary'];
    primary2: Palette['secondary'];
    primary3: Palette['secondary'];
    black: Palette['secondary'];
    grey1: Palette['secondary'];
    grey2: Palette['secondary'];
    grey3: Palette['secondary'];
    grey4: Palette['secondary'];
    grey5: Palette['secondary'];
    grey6: Palette['secondary'];
    white: Palette['secondary'];
    notes: Palette['secondary'];
    behaviours: Palette['secondary'];
  }

  interface PaletteOptions {
    primary1: Palette['primary'];
    primary2: Palette['secondary'];
    primary3: Palette['secondary'];
    black: Palette['secondary'];
    grey1: Palette['secondary'];
    grey2: Palette['secondary'];
    grey3: Palette['secondary'];
    grey4: Palette['secondary'];
    grey5: Palette['secondary'];
    grey6: Palette['secondary'];
    white: Palette['secondary'];
    notes: Palette['secondary'];
    behaviours: Palette['secondary'];
  }

}

export const lightPalette = {
  primary: {
    ...defaultValues,
    light: lightColors.primary1,
    dark: lightColors.primary1,
    contrastText: lightColors.white,
    main: lightColors.menubar,
    menubar: lightColors.menubar,
  },
  primary1: { ...defaultValues, main: lightColors.primary1 },
  primary2: { ...defaultValues, main: lightColors.primary2 },
  primary3: { ...defaultValues, main: lightColors.primary3 },
  black: { ...defaultValues, main: lightColors.black },
  grey1: { ...defaultValues, main: lightColors.grey1 },
  grey2: { ...defaultValues, main: lightColors.grey2 },
  grey3: { ...defaultValues, main: lightColors.grey3 },
  grey4: { ...defaultValues, main: lightColors.grey4 },
  grey5: { ...defaultValues, main: lightColors.grey5 },
  grey6: { ...defaultValues, main: lightColors.grey6 },
  white: { ...defaultValues, main: lightColors.white },
  success: { ...defaultValues, main: lightColors.success },
  warning: { ...defaultValues, main: lightColors.warning },
  error: { ...defaultValues, main: lightColors.error },
  notes: {
    ...defaultValues,
    main: lightColors.notes,
    overMid: lightColors.overMid,
    underMid: lightColors.underMid,
  },
  behaviours: {
    ...defaultValues,
    main: lightColors.behaviours
  },

  background: {
    default: lightColors.grey6,
    paper: lightColors.white,
  },
  text: {
    primary: lightColors.primary1, // Main text
    secondary: lightColors.grey1,  // Secondary text
    disabled: lightColors.grey3, // Disabled text
  },
}
export const darkPalette = {
  primary: {
    ...defaultValues,
    light: darkColors.primary2,
    dark: darkColors.primary2,
    contrastText: darkColors.black, // Text on primary background
    main: darkColors.menubar,
  },
  primary1: { ...defaultValues, main: darkColors.primary1 },
  primary2: { ...defaultValues, main: darkColors.primary2 },
  primary3: { ...defaultValues, main: darkColors.primary3 },
  black: { ...defaultValues, main: darkColors.black },
  grey1: { ...defaultValues, main: darkColors.grey1 },
  grey2: { ...defaultValues, main: darkColors.grey2 },
  grey3: { ...defaultValues, main: darkColors.grey3 },
  grey4: { ...defaultValues, main: darkColors.grey4 },
  grey5: { ...defaultValues, main: darkColors.grey5 },
  grey6: { ...defaultValues, main: darkColors.grey6 },
  white: { ...defaultValues, main: darkColors.white },
  success: { ...defaultValues, main: darkColors.success },
  warning: { ...defaultValues, main: darkColors.warning },
  error: { ...defaultValues, main: darkColors.error },
  notes: { ...defaultValues, main: darkColors.notes, overMid: darkColors.overMid, underMid: darkColors.underMid },
  behaviours: { ...defaultValues, main: darkColors.behaviours },
  background: {
    default: darkColors.grey6, // Dark background
    paper: darkColors.grey5,   // Paper background (slightly lighter)
  },
  text: {
    primary: darkColors.primary1, // Main text (light)
    secondary: darkColors.grey1,  // Secondary text (lighter grey)
    disabled: darkColors.grey3, // Disabled text
  },
};