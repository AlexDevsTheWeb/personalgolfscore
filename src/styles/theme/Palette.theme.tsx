import { PaletteColor, PaletteColorOptions } from "@mui/material";

export const lightColors = {
  menubar: '#28768b', // Softer teal-blue to match dark theme's warmer approach
  primary1: '#2d3748', // Warmer dark grey instead of harsh black
  primary2: '#28768b', // Consistent with menubar color
  primary3: '#718096', // Warmer muted text color
  black: '#2d3748', // Warmer black equivalent
  grey1: '#28768b', // Warmer muted text
  grey2: '#a0aec0', // Softer intermediate grey
  grey3: '#e2e8f0', // Softer border grey
  grey4: '#28768b', // Light border grey
  grey5: '#f7fafc', // Very light background with warmth
  grey6: '#f2f2f2', // Pure white for contrast where needed
  white: '#d2d2d2', // Soft off-white as default 'white'
  success: '#38a169', // Warmer success green
  warning: '#d69e2e', // Warmer amber warning
  error: '#e53e3e', // Softer red error
  notes: '#fefcbf', // Warmer light yellow
  behaviours: '#bee3f8', // Softer light blue
  overMid: '#c6f6d5', // Softer light green
  underMid: '#fed7d7', // Softer light red
}

// export const darkColors = {
//   menubar: '#4a90a4', // Softer teal-blue, less harsh than pure blue
//   primary1: '#e8f4f8', // Softer white with slight blue tint
//   primary2: '#6bb6ff', // Brighter, friendlier blue with better contrast
//   primary3: '#9ca3af', // Warmer grey for muted text
//   black: '#e8f4f8', // Softer white equivalent
//   grey1: '#9ca3af', // Warmer muted text color
//   grey2: '#6b7280', // Medium grey with warmth
//   grey3: '#4b5563', // Darker grey with better contrast
//   grey4: '#374151', // Rich dark grey for borders
//   grey5: '#1f2937', // Warmer dark background (not pure black)
//   grey6: '#111827', // Main background - dark but not harsh
//   white: '#111827', // Dark background equivalent
//   success: '#10b981', // Modern emerald green
//   warning: '#f59e0b', // Warmer amber warning
//   error: '#ef4444', // Softer red, less aggressive
//   notes: '#92400e', // Warmer dark amber for notes
//   behaviours: '#1e40af', // Rich navy blue for behaviors
//   overMid: '#065f46', // Rich dark green
//   underMid: '#991b1b', // Rich dark red
// };
export const darkColors = {
  menubar: '#38bdf8', // A brighter, more vibrant blue for accents
  primary1: '#f8fafc', // A clean, near-white for primary text
  primary2: '#0ea5e9', // A slightly darker blue for primary actions
  primary3: '#94a3b8', // A lighter grey for secondary text
  black: '#ffffff',     // Pure white for high contrast text on dark backgrounds
  grey1: '#cbd5e1', // Lighter grey for text
  grey2: '#94a3b8', // Medium grey for text and secondary elements
  grey3: '#475569', // A darker grey for borders and dividers
  grey4: '#334155', // A dark grey for UI elements like input backgrounds
  grey5: '#1e293b', // The "paper" or card background color
  grey6: '#0f172a', // The main, darkest background color
  white: '#0f172a', // Should be the same as the main background
  success: '#22c55e', // A vibrant green
  warning: '#f59e0b', // A warm amber/orange
  error: '#ef4444', // A clear but not overly harsh red
  notes: '#a16207', // A darker yellow/brown for notes background
  behaviours: '#3b82f6', // A solid blue for specific UI elements
  overMid: '#166534', // A deep green
  underMid: '#991b1b', // A deep red
};

// Store main hex codes for custom "dim" colors
const DIM_COLORS_MAIN = {
  greenDim: '#82b38b',
  redDim: '#cf8484',
  red2Dim: '#985353',
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
    // overMid and underMid are not standard PaletteColor properties.
    // If needed, they should be accessed via a custom theme structure.
  },
  behaviours: {
    main: lightColors.behaviours
  },
  background: {
    default: lightColors.white, // Use soft off-white for main background
    paper: lightColors.grey5,   // Use very light warm background for cards/papers
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