import type { } from '@mui/x-date-pickers/themeAugmentation';

import { Components, Theme } from '@mui/material';
import { fonts } from './Typography.theme';

import { breakpoints } from './Breakpoints.theme';

const components: Components<Omit<Theme, 'components'>> = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 0,
        paddingRight: 0,
        [`@media (min-width:${breakpoints.values.sm}px)`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'text' },
        style: {
          webkitTextDecoration: 'none',
          textDecoration: 'none',
          backgroundColor: 'transparent',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
              webkitTextDecoration: 'none',
              textDecoration: 'none',
            },
          },
        },
      },
      {
        props: { variant: 'link' },
        style: {
          textTransform: 'none',
          webkitTextDecoration: 'none',
          textDecoration: 'none',
          padding: 5,
          margin: 5,
          backgroundColor: 'transparent',

          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
              webkitTextDecoration: 'none',
              textTransform: 'none',
              textDecoration: 'none',
              textUnderlineOffset: '5px',
            },
          },
        },
      },
      {
        props: { variant: 'linkDark' },
        style: {
          padding: 0,
          webkitTextDecoration: 'underline',
          textDecoration: 'underline',
          textUnderlineOffset: '5px',
          backgroundColor: 'transparent',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
              webkitTextDecoration: 'underline',
              textDecoration: 'underline',
              textUnderlineOffset: '5px',
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            '& .MuiButton-startIcon': {
              width: '24px',
              height: '24px',
            },
          },
        },
      },
      {
        props: { variant: 'home' },
        style: {
          background: 'white',
          justifyContent: 'flex-start',
          textDecoration: 'none',
          paddingLeft: '16px',
          paddingRight: '16px',
          textTransform: 'none',
          gap: '12px',
          height: '56px',
          '@media(hover: hover)': {
            '&:hover': {
              background: 'white',
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '50px',
            '& .MuiButton-startIcon': {
              width: '24px',
              height: '24px',
            },
          },
        },
      },
      {
        props: { variant: 'outlined' },
        // Make the entire style value a function
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
          padding: '13px 32px',
          height: '56px',
          borderColor: theme.palette.primary.main, // Access theme directly
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.white.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
            minWidth: '100%',
            width: '100%',
          },
        }),
      },
      {
        props: { variant: 'contained' },
        // Make the style a function to access the theme
        style: ({ theme }: { theme: Theme }) => ({
          justifyContent: 'center',
          padding: '13px 32px',
          lineHeight: 0,
          height: '50px',
          marginTop: '10px',
          // Set background based on theme mode
          // Use primary.main for light, maybe a grey for dark? Example: grey[700] or a custom grey
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey4.main : theme.palette.primary.main,
          // Ensure text color contrasts well with the background
          color: theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.grey4.main : theme.palette.primary.main),
          '@media(hover: hover)': {
            '&:hover': {
              // Adjust hover based on theme mode if needed
              // Example: use grey3 for dark hover, primary2 for light hover
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey3.main : theme.palette.primary2.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
            lineHeight: 0,
            minWidth: '100%',
            width: '100%',
          },
        }),
      },
      {
        props: { variant: 'roundDetails' },
        style: {
          color: '#000'
        }
      },
      {
        props: { variant: 'underline' },
        style: {
          justifyContent: 'flex-start',
          padding: 0,
          lineHeight: 0,
          textDecoration: 'underline',
          textUnderlineOffset: 5,
          background: 'transparent',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
              textUnderlineOffset: 5,
            },
          },
          [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
            backgroundColor: 'transparent',
            '@media(hover: hover)': {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        fontSize: '13px',
        letterSpacing: 0.2,
        fontFamily: fonts.bold,
        fontWeight: '700',
        textTransform: 'uppercase',
        padding: '13px 32px',
        '@media(hover: hover)': ({ theme }: { theme: Theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        }),
        startIcon: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '17px',
        fontFamily: fonts.bold,
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ ownerState, theme }: { ownerState: any, theme: Theme }) => ({
        letterSpacing: '0.2px',
        ...(ownerState.shrink // Use theme object for colors here
          ? {
            fontWeight: '400',
            color: theme.palette.grey2.main, // Use theme from outer scope
            '&.Mui-focused': {
              color: `${ownerState.error ? theme.palette.error.main : theme.palette.primary.main}`,
            },
            borderColor: theme.palette.primary.main,
          } // End of shrink styles object
          : {
            // Styles when not shrunk
            fontFamily: fonts.medium,
            fontWeight: '600',
            fontSize: '13px',
            color: theme.palette.primary.main,
            transform: 'translate(12px, 19px)',
          }), // End of ternary operator spread
      }), // End of root style object
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '11px',
        letterSpacing: '0.2px',
        color: theme.palette.primary.main,
      }),
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        padding: '2px',
        marginRight: '16px',
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      root: {
        top: 5,
      },
      paper: ({ theme }: { theme: Theme }) => ({
        boxShadow: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        borderColor: theme.palette.primary.main, // Also use theme here
        paddingTop: '8px',
        paddingBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
      }),

    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        '@media(hover: hover)': {
          '&:hover': {
            background: '',
          },
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        background: 'inherit',
        '@media(hover: hover)': {
          '&:hover': {
            background: 'inherit',
          },
          '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:active': {
            backgroundColor: 'inherit',
          },
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
      }),
    }
  },
  MuiAccordionSummary: {
    styleOverrides: {
      // Use theme variable for background // Or another suitable grey
      root: ({ theme }) => ({ backgroundColor: theme.palette.background.paper }) // Or another suitable grey
    }
  },
  MuiList: {
    styleOverrides: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        '&::-webkit-scrollbar': {
          height: '8px',
          width: '8px',
          borderRadius: '6px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: (theme: Theme) => theme.palette.background.default, // Use theme background
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          height: '8px',
          width: '8px',
          backgroundColor: (theme: Theme) => theme.palette.primary.main, // Use theme primary
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        marginRight: 0,
        minWidth: 10,
        justifyContent: 'center',
        [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
          '& svg': {
            width: 24,
            height: 24,
          },
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '@media(hover: hover)': {
          ':hover': {
            background: 'transparent',
          },
        },
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        '@media(hover: hover)': {
          '& :hover': {
            background: 'white',
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '&::-webkit-scrollbar': {
          height: '8px',
          width: '8px',
          borderRadius: '6px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default, // Use theme background
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          height: '8px',
          width: '8px',
          backgroundColor: theme.palette.primary.main, // Use theme primary
        },
      }),
    },
    variants: [
      {
        props: { variant: 'light' },
        style: ({ theme }: { theme: Theme }) => ({
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${theme.palette.primary.main}`,
          padding: '10px 12px',
          background: 'inherit',
          height: '56px',
          marginTop: '41px',
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '48px',
            marginTop: '30px',
            svg: {
              width: '16px',
              height: '16px',
            },
          },
        }),
      },
      {
        props: { variant: 'clubsLoft' },
        style: {
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      },
      {
        props: { variant: 'clubs' },
        style: {
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          padding: 0,
          backgroundColor: 'transparent',
          border: 'none'
        }
      },
      {
        props: { variant: 'clubsHeader' },
        style: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          backgroundColor: 'transparent',
          border: 'none',
          marginTop: 10,
          marginBottom: 10,
        }
      },
      {
        props: { variant: 'confirm' },
        style: {
          borderRadius: '0px',
          minWidth: 668,
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            minWidth: 400,
          },
        },
      },
      {
        props: { variant: 'dialog' },
        style: {
          borderRadius: '0px',
          minWidth: 668,
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            minWidth: 520,
          },
        },
      },
      {
        props: { variant: 'uploadFileDialog' },
        style: {
          borderRadius: '0px',
          minWidth: 668,
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            width: 605,
          },
        },
      },
      {
        props: { variant: 'service' },
        style: {},
      },
      {
        props: { variant: 'payment' },
        style: {
          padding: '30px',
          paddingBottom: '0px',
          paddingTop: '0px',
          justifyContent: 'space-between',
          display: 'flex',
          borderRadius: '4px',
        },
      },
    ],
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.grey6.main,
        height: 88,
        '&.MuiDialogContent': {
          paddingTop: 32,
        },
        [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
          height: 54,
          '&.MuiDialogContent': {
            paddingTop: 32,
          },
          svg: {
            width: 24,
            height: 24,
          },
        },
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        margin: 32,
        padding: 0,
        [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
          margin: 25,
        },
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '0px 32px 32px 32px',
        padding: 0,
        gap: 2,
        [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
          margin: '0px 25px 25px 25px',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        '&::placeholder': {
          color: (theme: Theme) => theme.palette.primary.main,
        },
      },
      root: {
        '&.Mui-focused>.MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
        },
        '.MuiOutlinedInput-notchedOutline': ({ theme }: { theme: Theme }) => ({
          border: `1px solid ${theme.palette.grey4.main}`,
        }),
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 0,
        marginRight: 0,
      },
    },

    defaultProps: {
      disableFocusRipple: true,
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        position: 'static',
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        marginTop: 18,
        marginBottom: 20,
      },
      separator: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 4.5,
        marginRight: 4.5,
        width: 10,
        height: 10,
        [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
          marginLeft: 4.5,
          marginRight: 4.5,
          width: 24,
          height: 24,
        },
      },
    },
  },


  //#region Table
  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        //boxShadow: '50px 10px 8px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {},
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.grey6.main,
        color: theme.palette.primary1.main,
      }),
    },
  },

  //  root: ({ theme }: { theme: Theme }) => ({
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: 10,

        fontSize: 13,
        border: 0,

        [`&.MuiTableCell-head`]: {
          textTransform: 'uppercase',
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
    },
    variants: [
      {
        props: { variant: 'red' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.redDim.main,
          color: 'black',
          fontWeight: 500,
          fontSize: 16
        }),
      },
      {
        props: { variant: 'yellow' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.yellowDim.main,
          color: 'black',
          fontWeight: 500,
          fontSize: 16
        }),
      },
      {
        props: {
          variant: 'green'
        },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.greenDim.main,
          color: 'black',
          fontWeight: 500,
          fontSize: 16
        }),
      },
      {
        props: {
          variant: 'putt'
        },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.whiteDim.main,
          color: 'black',
          fontWeight: 500,
          fontSize: 16
        })
      },
    ]
  },
  MuiTableFooter: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: theme.palette.grey5.main,
      }),
    },
  },

  MuiGrid: {
    styleOverrides: {
      container: {
        marginTop: 0,
      },
      item: {
        display: 'flex',
        flexDirection: 'row',
        rowGap: 2,
        columnGap: 20,
        flexWrap: 'wrap',
        alignContent: 'space-between',
        justifyContent: 'space-between',
      },
      root: {
        paddingTop: 0,
      },
    },
  },
  MuiGrid2: {
    styleOverrides: {
      root: ({ ownerState }) =>
        ownerState.container === true && ({
          flexWrap: 'nowrap',
          gap: 5
        })
    }
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: { theme: Theme }) => ({
        display: 'flex',
        borderRadius: '4px',
        background: theme.palette.grey5.main,
        padding: '8px',
        color: theme.palette.primary.main,
        textEdge: 'cap',
        leadingTrim: 'both',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '15px',
        letterSpacing: '0.2px',
      }),
    },
  },
}


export default components;
