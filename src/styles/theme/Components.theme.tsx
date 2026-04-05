import type { } from '@mui/x-date-pickers/themeAugmentation';

import { Components, Theme } from '@mui/material';
import { GridProps } from '@mui/material/Grid';
import { InputLabelProps } from '@mui/material/InputLabel';
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
          borderRadius: '4px',
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
          borderRadius: '4px',
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
          borderRadius: '4px',
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
        style: ({ theme }: { theme: Theme }) => ({
          background: theme.palette.background.paper,
          justifyContent: 'flex-start',
          textDecoration: 'none',
          paddingLeft: '16px',
          paddingRight: '16px',
          textTransform: 'none',
          gap: '12px',
          height: '56px',
          borderRadius: '4px',
          boxShadow: 'none',
          '@media(hover: hover)': {
            '&:hover': {
              background: theme.palette.background.paper,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '50px',
            '& .MuiButton-startIcon': {
              width: '24px',
              height: '24px',
            },
          },
        }),
      },
      {
        props: { variant: 'outlined' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
          padding: '13px 32px',
          height: '40px',
          marginTop: '10px',
          borderRadius: '4px',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.grey3.main : theme.palette.grey4.main,
          color: theme.palette.primary.main,
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey4.main : theme.palette.grey3.main,
              borderColor: theme.palette.primary.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
            minWidth: '100%',
            width: '100%',
            textAlign: 'center',
            justifycontent: 'center'
          },
        }),
      },
      {
        props: { variant: 'contained' },
        style: ({ theme }: { theme: Theme }) => ({
          justifyContent: 'center',
          padding: '10px 18px',
          lineHeight: 0,
          margin: '0px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          marginLeft: '0px !important',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            minWidth: '100%',
            width: '100%',
          },
        }),
      },
      {
        props: { variant: 'roundDetails' },
        style: {
          color: '#000',
          borderRadius: '4px',
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
          borderRadius: '4px',
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
        fontSize: '14px',
        fontFamily: fonts.bold,
        fontWeight: '500',
        padding: '10px 20px',
        borderRadius: '4px',
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
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '17px',
        fontFamily: fonts.bold,
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ ownerState, theme }: {
        ownerState: InputLabelProps & {
          shrink?: boolean;
        }; theme: Theme
      }) => ({
        letterSpacing: '0',
        ...(ownerState.shrink
          ? {
            fontWeight: '400',
            color: theme.palette.grey2.main,
            '&.Mui-focused': {
              color: `${ownerState.error ? theme.palette.error.main : theme.palette.primary.main}`,
            },
            borderColor: theme.palette.primary.main,
          }
          : {
            fontFamily: fonts.medium,
            fontWeight: '500',
            fontSize: '14px',
            color: theme.palette.text.secondary,
            transform: 'translate(12px, 19px)',
          }),
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        letterSpacing: '0',
        color: theme.palette.text.secondary,
      }),
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        padding: '4px',
        marginRight: '12px',
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      root: {
        top: 5,
      },
      paper: ({ theme }: { theme: Theme }) => ({
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${theme.palette.grey3.main}`,
        borderRadius: '4px',
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
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: '4px',
        margin: '2px 4px',
        '@media(hover: hover)': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:active': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        boxShadow: 'none',
        border: `1px solid ${theme.palette.grey3.main}`,
        borderRadius: '4px',
      }),
    }
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({ 
        backgroundColor: theme.palette.background.paper,
        borderRadius: '4px',
      })
    }
  },
  MuiList: {
    styleOverrides: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        '&::-webkit-scrollbar': {
          height: '6px',
          width: '6px',
          borderRadius: '4px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: (theme: Theme) => theme.palette.background.default,
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
          height: '6px',
          width: '6px',
          backgroundColor: (theme: Theme) => theme.palette.grey3.main,
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
        borderRadius: '4px',
        '@media(hover: hover)': {
          '&:hover': {
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
        borderRadius: '4px',
        '@media(hover: hover)': ({ theme }: { theme: Theme }) => ({
          '&:hover': {
            background: theme.palette.background.paper,
          },
        }),
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '&::-webkit-scrollbar': {
          height: '6px',
          width: '6px',
          borderRadius: '4px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
          height: '6px',
          width: '6px',
          backgroundColor: theme.palette.grey3.main,
        },
      }),
    },
    variants: [
      {
        props: { variant: 'light' },
        style: ({ theme }: { theme: Theme }) => ({
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${theme.palette.grey3.main}`,
          borderRadius: '4px',
          padding: '10px 12px',
          background: 'inherit',
          height: '56px',
          marginTop: '41px',
          boxShadow: 'none',
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
          border: 'none',
          boxShadow: 'none',
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
          boxShadow: 'none',
          marginTop: 10,
          marginBottom: 10,
        }
      },
      {
        props: { variant: 'confirm' },
        style: {
          borderRadius: '4px',
          minWidth: 668,
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            minWidth: 400,
          },
        },
      },
      {
        props: { variant: 'dialog' },
        style: {
          borderRadius: '4px',
          minWidth: 668,
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            minWidth: 520,
          },
        },
      },
      {
        props: { variant: 'uploadFileDialog' },
        style: {
          borderRadius: '4px',
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
        backgroundColor: theme.palette.background.paper,
        height: 88,
        borderRadius: '4px 4px 0 0',
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
        borderRadius: '4px',
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
        borderRadius: '0 0 4px 4px',
        [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
          margin: '0px 25px 25px 25px',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: ({ theme }: { theme: Theme }) => ({
        '&::placeholder': {
          color: theme.palette.text.secondary,
          opacity: 0.7,
        },
      }),
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: '4px',
        '&.Mui-focused > .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
        },
        '.MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${theme.palette.grey3.main}`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 4,
        marginRight: 0,
        borderRadius: '4px',
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
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        position: 'static',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        marginTop: 8,
        marginBottom: 8,
      },
      separator: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        color: 'inherit',
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderRadius: '4px',
        border: `1px solid`,
        borderColor: 'grey.300',
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {},
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
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: 8,
        fontSize: 13,
        border: 0,
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        borderRadius: '4px',

        [`&.MuiTableCell-head`]: {
          textTransform: 'none',
          fontWeight: 600,
          paddingTop: 6,
          paddingRight: 8,
          paddingBottom: 6,
          paddingLeft: 8,
        },
      },
    },
    variants: [
      {
        props: { variant: 'red' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.redDim.main,
          color: theme.palette.text.primary,
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '4px',
        }),
      },
      {
        props: { variant: 'yellow' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.yellowDim.main,
          color: theme.palette.text.primary,
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '4px',
        }),
      },
      {
        props: { variant: 'green' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.greenDim.main,
          color: theme.palette.text.primary,
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '4px',
        }),
      },
      {
        props: { variant: 'putt' },
        style: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.whiteDim.main,
          color: theme.palette.text.primary,
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '4px',
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
        backgroundColor: theme.palette.grey3.main,
      }),
    },
  },

  MuiGrid: {
    styleOverrides: {
      root: ({ ownerState, theme }: { ownerState: GridProps; theme: Theme }) => ({
        paddingTop: 0,
        ...(ownerState.container && {
          marginTop: 0,
        }),
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }: { theme: Theme }) => ({
        display: 'flex',
        borderRadius: '4px',
        backgroundColor: theme.palette.grey5.main,
        padding: '6px 10px',
        color: theme.palette.text.primary,
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '14px',
        letterSpacing: '0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }),
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.grey5.main,
        color: theme.palette.text.primary,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }),
    },
  },
}


export default components;
