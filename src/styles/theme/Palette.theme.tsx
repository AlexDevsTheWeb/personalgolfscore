export const colors = {
  primary1: '#343434',
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
};

declare module '@mui/material/styles' {
  interface Palette {
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

const defaultValues = {
  light: '#ffffff',
  dark: '#ffffff',
  contrastText: '#ffffff',
};

const palette = {
  primary: {
    ...defaultValues,
    light: colors.primary1,
    dark: colors.primary1,
    contrastText: colors.white,
    main: colors.primary1,
  },
  primary1: { ...defaultValues, main: colors.primary1 },
  primary2: { ...defaultValues, main: colors.primary2 },
  primary3: { ...defaultValues, main: colors.primary3 },
  black: { ...defaultValues, main: colors.black },
  grey1: { ...defaultValues, main: colors.grey1 },
  grey2: { ...defaultValues, main: colors.grey2 },
  grey3: { ...defaultValues, main: colors.grey3 },
  grey4: { ...defaultValues, main: colors.grey4 },
  grey5: { ...defaultValues, main: colors.grey5 },
  grey6: { ...defaultValues, main: colors.grey6 },
  white: { ...defaultValues, main: colors.white },
  success: { ...defaultValues, main: colors.success },
  warning: { ...defaultValues, main: colors.warning },
  error: { ...defaultValues, main: colors.error },
  notes: { ...defaultValues, main: colors.notes },
  behaviours: { ...defaultValues, main: colors.behaviours },

  background: {
    default: colors.grey6,
  },
};

export default palette;
