import React from 'react';
import { breakpoints } from './Breakpoints.theme';
import { colors } from './Palette.theme';

export const fonts = {
  bold: 'Open Sans',
  heavy: 'Open Sans',
  light: 'Open Sans',
  medium: 'Open Sans',
  semibold: 'Open Sans',
  regular: 'Open Sans',
};

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headline1: React.CSSProperties;
    headline2: React.CSSProperties;
    headline3: React.CSSProperties;
    subheadline1: React.CSSProperties;
    subheadline2: React.CSSProperties;
    clubsTypeName: React.CSSProperties;
    mainAppTitle: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
    title5: React.CSSProperties;
    title6: React.CSSProperties;
    body: React.CSSProperties;
    bodyLink: React.CSSProperties;
    action: React.CSSProperties;
    value1: React.CSSProperties;
    value2: React.CSSProperties;
    value3: React.CSSProperties;
    value4: React.CSSProperties;
    price1: React.CSSProperties;
    price2: React.CSSProperties;
    bodyLinkTablet: React.CSSProperties;
    dateInfo: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    headline1: React.CSSProperties;
    headline2: React.CSSProperties;
    headline3: React.CSSProperties;
    subheadline1: React.CSSProperties;
    subheadline2: React.CSSProperties;
    clubsTypeName: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
    title5: React.CSSProperties;
    title6: React.CSSProperties;
    body: React.CSSProperties;
    bodyLink: React.CSSProperties;
    action: React.CSSProperties;
    value1: React.CSSProperties;
    value2: React.CSSProperties;
    value3: React.CSSProperties;
    value4: React.CSSProperties;
    price1: React.CSSProperties;
    price2: React.CSSProperties;
    bodyLinkTablet: React.CSSProperties;
    dateInfo: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headline1: true;
    headline2: true;
    headline3: true;
    headline6: true;
    subheadline1: true;
    subheadline2: true;
    mainAppTitle: true;
    clubsTypeName: true;
    title1: true;
    title2: true;
    title3: true;
    title4: true;
    title5: true;
    title6: true;
    body: true;
    bodyLink: true;
    action: true;
    value1: true;
    value2: true;
    value3: true;
    value4: true;
    caption: true;
    price1: true;
    price2: true;
    button: true;
    bodyLinkTablet: true;
    dateInfo: true;
    payment: true;
    //original to be removed
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    overline: false;
  }
}

const fontFamily = [
  fonts.regular,
  'system-ui',
  '-apple-system',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
].join(',');

const colorFont = colors.primary1;

const allVariantsCss = {
  fontFamily,
  color: colorFont,
};

export const typography = {
  fontFamily,
  allVariants: {
    color: colorFont,
  },
  headline1: {
    ...allVariantsCss,
    fontSize: '80px',
    lineHeight: '82px',
    fontFamily: fonts.light,
    fontWeight: 300,
    fontStyle: 'normal',
    letterSpacing: '-1px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '60px',
      lineHeight: 'normal',
    },
  },
  headline2: {
    ...allVariantsCss,
    fontSize: '24px',
    lineHeight: '140%',
    fontFamily: fonts.light,
    fontStyle: 'normal',
    fontWeight: 700,
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  headline3: {
    ...allVariantsCss,
    fontSize: '60px',
    lineHeight: '62px',
    fontFamily: fonts.light,
    fontStyle: 'normal',
    fontWeight: 300,
    letterSpacing: '-1px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '40px',
      lineHeight: 'normal',
    },
  },
  headline6: {
    ...allVariantsCss,
    fontSize: '16px',
    lineHeight: '120%',
    fontFamily: fonts.light,
    fontStyle: 'normal',
    fontWeight: 500,
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
      lineHeight: '120%',
    },
  },
  subheadline1: {
    ...allVariantsCss,
    fontSize: '24px',
    fontFamily: fonts.light,
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '20px',
    },
  },
  subheadline2: {
    ...allVariantsCss,
    fontSize: '20px',
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
    },
  },
  clubsTypeName: {
    ...allVariantsCss,
    fontsize: 28,
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '20px',
    },
  },
  mainAppTitle: {
    ...allVariantsCss,
    fontSize: '32px',
    lineHeight: '140%',
    fontFamily: fonts.regular,
    fontWeight: 700,
    color: colors.grey4,
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '24px',
    },
  },
  title1: {
    ...allVariantsCss,
    fontSize: '50px',
    lineHeight: '50px',
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '32px',
      lineHeight: 'normal',
    },
  },
  title2: {
    ...allVariantsCss,
    fontSize: '36px',
    lineHeight: '36px',
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '28px',
      lineHeight: 'normal',
    },
  },
  title3: {
    ...allVariantsCss,
    fontSize: '32px',
    lineHeight: '32px',
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  title4: {
    ...allVariantsCss,
    fontSize: '28px',
    lineHeight: '28px',
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '20px',
      lineHeight: 'normal',
    },
  },
  title5: {
    ...allVariantsCss,
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: fonts.medium,
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  title6: {
    ...allVariantsCss,
    fontSize: '18px',
    lineHeight: '18px',
    fontFamily: fonts.bold,
    fontStyle: 'normal',
    fontWeight: 700,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '14px',
      lineHeight: 'normal',
    },
  },
  body: {
    ...allVariantsCss,
    fontSize: '14px',
    lineHeight: '24px',
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '13px',
      lineHeight: '20px',
    },
  },
  bodyLink: {
    ...allVariantsCss,
    fontSize: '14px',
    lineHeight: '22px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
  },
  payment: {
    ...allVariantsCss,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '14px',
    lineHeight: '24px',
    fontFamily: fonts.regular,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '13px',
      lineHeight: '20px',
    },
  },
  action: {
    ...allVariantsCss,
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '14px',
      lineHeight: 'normal',
    },
  },
  value1: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '12px',
      lineHeight: 'normal',
    },
  },
  value2: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: fonts.medium,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  value3: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: fonts.regular,
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  value4: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: fonts.light,
    fontWeight: 300,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  caption: {
    ...allVariantsCss,
    fontSize: '11px',
    lineHeight: '16px',
    fontFamily: fonts.regular,
    fontWeight: 400,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '10px',
      lineHeight: 'normal',
    },
  },
  price1: {
    ...allVariantsCss,
    fontSize: '18px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: '0.26px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
    },
  },
  price2: {
    ...allVariantsCss,
    fontSize: '18px',
    fontFamily: fonts.regular,
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: '0.26px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '16px',
    },
  },
  button: {
    ...allVariantsCss,
    fontSize: '13px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    letterSpacing: '0.2px',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      fontSize: '12px',
    },
  },
  bodyLinkTablet: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '20px',
    fontFamily: fonts.bold,
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
  },
  dateInfo: {
    ...allVariantsCss,
    fontSize: '13px',
    lineHeight: '18px',
    fontFamily: fonts.bold,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: '0.2px',
  },
};
