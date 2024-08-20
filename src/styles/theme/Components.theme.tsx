import type { } from '@mui/x-date-pickers/themeAugmentation';

import { Components, Theme } from '@mui/material';
import { fonts } from './Typography.theme';

import { breakpoints } from './Breakpoints.theme';
import palette from './Palette.theme';

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
        style: {
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
          padding: '13px 32px',
          height: '56px',
          borderColor: palette.primary.main,
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: palette.primary.main,
              color: palette.white.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
          },
        },
      },
      {
        props: { variant: 'contained' },
        style: {
          justifyContent: 'center',
          padding: '13px 32px',
          lineHeight: 0,
          height: '56px',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: palette.primary2.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
            lineHeight: 0,
            '@media(hover: hover)': {
              '&:hover': {
                backgroundColor: palette.primary2.main,
              },
            },
          },
        },
      },
      {
        props: { variant: 'outlinedDark' },
        style: {
          justifyContent: 'flex-start',
          padding: '13px 32px',
          lineHeight: 0,
          height: '56px',
          background: palette.grey6.main,
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: palette.grey6.main,
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '42px',
            padding: '13px 22px',
            lineHeight: 0,
            backgroundColor: palette.grey6.main,
            '@media(hover: hover)': {
              '&:hover': {
                backgroundColor: palette.grey6.main,
              },
            },
          },
        },
      },
      {
        props: { variant: 'upload' },
        style: {
          borderStyle: 'dashed',
          color: `${palette.grey3.main}`,
          borderWidth: '2px',
          width: '14.375rem',
          height: '14rem',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
            height: '12.5rem',
            width: '12.5rem',
            padding: '13px 22px',
          },
        },
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
        '@media(hover: hover)': {
          '&:hover': {
            backgroundColor: palette.primary.main,
          },
        },
      },
      startIcon: {
        marginLeft: 0,
        marginRight: 0,
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
  // MuiTextField: {
  //   variants: [
  //     {
  //       props: { variant: 'filled' },
  //       style: {
  //         height: 56,
  //         cursor: 'pointer',
  //         '@media(hover: hover)': {
  //           '&:hover': {
  //             cursor: 'pointer',
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   styleOverrides: {
  //     root: {
  //       backgroundColor: palette.white.main,
  //       borderRadius: 4,
  //       [`& .Mui-error`]: {
  //         '@media(hover: hover)': {
  //           ':hover': {
  //             borderColor: palette.error.main,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   defaultProps: {
  //     FormHelperTextProps: {
  //       style: {
  //         marginTop: 20,
  //         marginLeft: 0,
  //         marginRight: 0,
  //         width: '380px',
  //         color: palette.error.main,
  //         fontWeight: 700,
  //         fontSize: 12,
  //         [`@media (minWidth:${breakpoints.values.lg - 1}px)`]: {
  //           fontSize: 13,
  //           width: '380px',
  //         },
  //       },
  //     },
  //   },
  // },
  // MuiFilledInput: {
  //   styleOverrides: {
  //     root: {
  //       fontWeight: 600,
  //       fontSize: 13,
  //       letterSpacing: '0.2px',
  //       backgroundColor: palette.white.main,
  //       color: palette.primary.main,
  //       fontFamily: fonts.medium,
  //       height: '100%',
  //       border: `1px solid ${palette.grey4.main}`,
  //       borderRadius: '4px',
  //       '&:before': {
  //         borderBottom: 'none',
  //         borderBottomStyle: 'none',
  //       },
  //       '&:after': {
  //         borderBottom: 'none',
  //         borderBottomStyle: 'none',
  //       },
  //       '@media(hover: hover)': {
  //         '&:hover': {
  //           backgroundColor: palette.white.main,
  //           border: `1px solid ${palette.grey2.main}`,
  //         },
  //         '&:hover&:before': {
  //           borderBottom: 'none',
  //           borderBottomStyle: 'none',
  //         },
  //         '&:hover&.Mui-disabled': {
  //           backgroundColor: palette.grey4.main,
  //         },
  //       },
  //       '&.Mui-focused': {
  //         backgroundColor: palette.white.main,
  //         border: `1px solid ${palette.primary.main}`,
  //       },
  //       '&.Mui-focused&.Mui-disabled': {
  //         backgroundColor: palette.grey4.main,
  //       },
  //       '&.Mui-disabled&:before': {
  //         border: 'none',
  //       },
  //       '&.Mui-error': {
  //         border: `1px solid ${palette.error.main}`,
  //       },

  //     },
  //   },
  // },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        letterSpacing: '0.2px',
        ...(ownerState.shrink
          ? {
            fontWeight: '400',
            color: palette.grey2.main,
            '&.Mui-focused': {
              color: `${ownerState.error ? palette.error.main : palette.primary.main
                }`,
              borderColor: palette.primary.main,
            },
          }
          : {
            fontFamily: fonts.medium,
            fontWeight: '600',
            fontSize: '13px',
            color: palette.primary.main,
            transform: 'translate(12px, 19px)',
          }),
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: () => ({
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '11px',
        letterSpacing: '0.2px',
        color: palette.primary.main,
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
      paper: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: palette.primary.main,
        paddingTop: '8px',
        paddingBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
      },
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
      root: {
        boxShadow: 'none',
        border: '1px solid #ddd',
      }
    }
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        backgroundColor: '#f5f5f5'
      }
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
          backgroundColor: 'white',
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          height: '8px',
          width: '8px',
          backgroundColor: palette.primary.main,
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
      root: {
        '&::-webkit-scrollbar': {
          height: '8px',
          width: '8px',
          borderRadius: '6px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'white',
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          height: '8px',
          width: '8px',
          backgroundColor: palette.primary.main,
        },
      },
    },
    variants: [
      {
        props: { variant: 'light' },
        style: {
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${palette.primary.main}`,
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
        },
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
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.grey6.main,
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
      },
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
          color: palette.primary.main,
        },
      },
      root: {
        '&.Mui-focused>.MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
        },
        '.MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${palette.grey4.main}`,
        },
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
      root: {
        backgroundColor: palette.grey6.main,
        color: palette.primary1.main,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,

        fontSize: 14,
        border: 0,

        [`&.MuiTableCell-head`]: {
          textTransform: 'uppercase',
          paddingTop: 10,
          paddingRight: 0,
          paddingBottom: 10,
          paddingLeft: 0,
        },
      },
    },
    variants: [
      { props: { variant: 'red' }, style: { backgroundColor: '#cf8484', color: 'black', fontWeight: 700, fontSize: 20 } },
      { props: { variant: 'yellow' }, style: { backgroundColor: '#faf099', color: 'black', fontWeight: 700, fontSize: 20 } },
      { props: { variant: 'green' }, style: { backgroundColor: '#82b38b', color: 'black', fontWeight: 700, fontSize: 20 } }
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
      root: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: palette.grey5.main,
      },
    },
  },

  //#endregion Table
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
      tooltip: {
        display: 'flex',
        borderRadius: '4px',
        background: palette.grey5.main,
        padding: '8px',
        color: palette.primary.main,
        textEdge: 'cap',
        leadingTrim: 'both',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '15px',
        letterSpacing: '0.2px',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        maxWidth: '100%',
        background: palette.grey6.main,
        border: '1px solid #ccc',
        borderRadius: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        // boxShadow: 'none',
      }
    },
    variants: [
      {
        props: { variant: 'player' },
        style: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#f5f5f5',
          borderRadius: 0,
          padding: 10,
          width: '48%',
          [`@media (max-width:${breakpoints.values.md - 1}px)`]: {
            flexDirection: 'row',
            width: '100%',
          },
        },
      },
      {
        props: { variant: 'roundHead' },
        style: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          borderBottom: 'none',
          backgroundColor: '#f5f5f5',
          borderRadius: 0,
          padding: 10,
          width: '48%'
        },
      },
      {
        props: { variant: 'clubs' },
        style: {
          width: '48%',
          [`@media (max-width:${breakpoints.values.lg}px)`]: {
            maxWidth: '100%',
            width: 500,
          },
          [`@media (max-width:${breakpoints.values.sm}px)`]: {
            maxWidth: '100%',
            width: 363,
          },
        }
      },
      {
        props: { variant: 'disabled' },
        style: {
          width: '48%',
          backgroundColor: 'transparent',
          flexDirection: 'row',
          border: '2px solid red',
          [`@media (max-width:${breakpoints.values.lg}px)`]: {
            maxWidth: '100%',
            width: 500,
          },
          [`@media (max-width:${breakpoints.values.sm}px)`]: {
            maxWidth: '100%',
            width: 363,
          },
        }
      }
    ],
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        width: '50%',
        height: '200px',
      }
    },

  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        width: '50%',
        padding: '4px 8px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }
    }
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 4,
        justifyContent: 'space-between'
      }
    }
  },
};

export default components;
