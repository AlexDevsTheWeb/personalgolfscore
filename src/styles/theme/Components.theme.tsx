import type { } from '@mui/x-date-pickers/themeAugmentation';

import { Components, Theme } from '@mui/material';
import { fonts, typography } from './Typography.theme';

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
          justifyContent: 'flex-start',
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
  MuiTextField: {
    variants: [
      {
        props: { variant: 'filled' },
        style: {
          height: 56,
          cursor: 'pointer',
          '@media(hover: hover)': {
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        backgroundColor: palette.white.main,
        borderRadius: 4,
        [`& .Mui-error`]: {
          '@media(hover: hover)': {
            ':hover': {
              borderColor: palette.error.main,
            },
          },
        },
      },
    },
    defaultProps: {
      FormHelperTextProps: {
        style: {
          marginTop: 20,
          marginLeft: 0,
          marginRight: 0,
          width: '380px',
          color: palette.error.main,
          fontWeight: 700,
          fontSize: 12,
          [`@media (minWidth:${breakpoints.values.lg - 1}px)`]: {
            fontSize: 13,
            width: '380px',
          },
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.2px',
        backgroundColor: palette.white.main,
        color: palette.primary.main,
        fontFamily: fonts.medium,
        height: '100%',
        border: `1px solid ${palette.grey4.main}`,
        borderRadius: '4px',
        '&:before': {
          borderBottom: 'none',
          borderBottomStyle: 'none',
        },
        '&:after': {
          borderBottom: 'none',
          borderBottomStyle: 'none',
        },
        '@media(hover: hover)': {
          '&:hover': {
            backgroundColor: palette.white.main,
            border: `1px solid ${palette.grey2.main}`,
          },
          '&:hover&:before': {
            borderBottom: 'none',
            borderBottomStyle: 'none',
          },
          '&:hover&.Mui-disabled': {
            backgroundColor: palette.grey4.main,
          },
        },
        '&.Mui-focused': {
          backgroundColor: palette.white.main,
          border: `1px solid ${palette.primary.main}`,
        },
        '&.Mui-focused&.Mui-disabled': {
          backgroundColor: palette.grey4.main,
        },
        '&.Mui-disabled&:before': {
          border: 'none',
        },
        '&.Mui-error': {
          border: `1px solid ${palette.error.main}`,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        letterSpacing: '0.2px',
        ...(ownerState.shrink
          ? {
            fontWeight: '400',
            fontSize: '11px',
            color: palette.grey2.main,
            '&.Mui-focused': {
              color: `${ownerState.error ? palette.error.main : palette.primary.main
                }`,
              borderColor: palette.primary.main,
            },

            transform: 'translate(12px, 7px)',
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
      }
    }
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        paddingTop: 20,
        backgroundColor: "#ff0099",
        border: "3px solid #000"
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

  //#region CALENDARS
  // MuiCalendarOrClockPicker: {
  //   styleOverrides: {
  //     root: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           width: 340,
  //           '&.MuiCalendarOrClockPicker-root > div': {
  //             width: '340px',
  //           },
  //           border: `1px solid ${palette.primary.main}`,
  //           borderRadius: '5px',
  //           '@media(hover: hover)': {
  //             '&:hover': {
  //               borderColor: palette.grey3.main,
  //             },
  //           },
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 368,
  //             '&.MuiCalendarOrClockPicker-root > div': {
  //               width: '568px',
  //             },
  //           },
  //         }
  //         : {
  //           width: 230,
  //           '&.MuiCalendarOrClockPicker-root > div': {
  //             width: '230px',
  //           },
  //           border: `1px solid ${palette.primary.main}`,
  //           borderRadius: '5px',
  //           '@media(hover: hover)': {
  //             '&:hover': {
  //               borderColor: palette.grey3.main,
  //             },
  //           },
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 300,
  //             '&.MuiCalendarOrClockPicker-root > div': {
  //               width: '300px',
  //             },
  //           },
  //         },
  //   },
  // },
  MuiPickersPopper: {
    styleOverrides: {
      paper: ({ theme }) =>
        theme.datepicker === 'margin'
          ? {
            width: 340,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 368,
            },
          }
          : {
            width: 230,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 300,
            },
          },
    },
  },
  // MuiCalendarPicker: {
  //   styleOverrides: {
  //     root: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           width: 340,
  //           margin: 0,
  //           padding: 16,
  //           overflow: 'hidden',
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 368,
  //           },
  //         }
  //         : {
  //           width: 230,
  //           margin: 0,
  //           padding: 16,
  //           overflow: 'hidden',
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 300,
  //           },
  //         },
  //   },
  // },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.datepicker === 'margin'
          ? {
            width: 308,
            display: 'flex',
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 0,
            marginBottom: 16,
            maxHeight: 22.17,
            minHeight: 22.17,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 336,
            },
          }
          : {
            width: 198,
            display: 'flex',
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 0,
            marginBottom: 16,
            maxHeight: 22.17,
            minHeight: 22.17,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 268,
            },
          },
    },
  },
  // MuiDatePicker: {
  //   styleOverrides: {},
  // },
  // MuiDayPicker: {
  //   styleOverrides: {
  //     header: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           width: 308,
  //           height: 26,
  //           background: palette.grey6.main,
  //           fontSize: 13,
  //           gap: 14.33,
  //           fontWeight: 700,
  //           justifyContent: 'space-around',
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 336,
  //             fontSize: 16,
  //             height: 26,
  //             gap: 16,
  //           },
  //         }
  //         : {
  //           width: 198,
  //           height: 24,
  //           background: palette.grey6.main,
  //           fontWeight: 700,
  //           justifyContent: 'space-around',

  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 268,
  //             height: 26,
  //           },
  //         },
  //     weekDayLabel: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           ...typography.value1,
  //           fontSize: 13,
  //           fontWeight: 700,
  //         }
  //         : {
  //           ...typography.value1,
  //           fontSize: 10,
  //           fontWeight: 700,
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             fontSize: 13,
  //           },
  //         },
  //     weekContainer: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           width: 308,
  //           height: 30,
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 336,
  //             height: 30,
  //           },
  //         }
  //         : {
  //           width: 198,
  //           height: 30,
  //           display: 'flex',
  //           justifyContent: 'space-around',
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             width: 268,
  //             height: 30,
  //           },
  //         },
  //     slideTransition: ({ theme }: any) =>
  //       theme.datepicker === 'margin'
  //         ? {
  //           minHeight: 194,
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             minHeight: 194,
  //           },
  //         }
  //         : {
  //           minHeight: 194,
  //           [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
  //             minHeight: 194,
  //           },
  //         },
  //   },
  // },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.datepicker === 'margin'
          ? {
            width: 30,
            height: 30,
            fontSize: '12px !important',
            margin: 0,
            fontWeight: 700,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 32,
              height: 32,
              fontSize: '13px !important',
              padding: 10,
            },
          }
          : {
            width: 24,
            height: 24,
            fontSize: '12px !important',
            fontWeight: 700,
            [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
              width: 32,
              height: 32,
              fontSize: '13px !important',
              padding: 10,
            },
            '&.MuiPickersDay-dayOutsideMonth': {
              color: palette.grey3.main,
            },
          },
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: {
        width: 15,
      },
      button: {
        width: 22.17,
        height: 22.17,
        '& svg': {
          width: 22.17,
          height: 22.17,
        },
      },
    },
  },
  //#endregion CALENDARS

  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: 0,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        transform: `translate(12px, 20px)`,
      },
    },
  },
  MuiPagination: {
    styleOverrides: {
      root: {},
      ul: {
        display: 'flex',
        justifyContent: 'space-between',
        [`& li:not(:first-of-type, :last-child)`]: {
          width: 13,
          textAlign: 'center',
          marginLeft: 8,
          marginRight: 8,
        },
        [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
          [`& li:not(:first-of-type, :last-child)`]: {
            width: 13,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
          },
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        textDecoration: 'none',
        textUnderlineOffset: 0.5,
        ...typography.value3,
        minWidth: 0,
        height: 0,
        padding: 0,
        margin: 0,
        [`& li:fist-of-type`]: {
          minWidth: 30,
        },
        [`&.Mui-selected`]: {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
          textUnderlineOffset: 5,
          fontWeight: 900,
        },
        '@media(hover: hover)': {
          '&.Mui-selected:hover': {
            textDecoration: 'underline',
            backgroundColor: 'transparent',
            fontWeight: 900,
          },
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'transparent',
            fontWeight: 900,
          },
        },
        [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {},
      },
      icon: {
        backgroundColor: 'white',
        borderRadius: '100%',
        borderColor: palette.grey5.main,
        borderStyle: 'solid',
        borderWidth: '1px',
        color: palette.primary.main,
        margin: 0,
        width: 30,
        height: 30,
        padding: 4,
        [`&.Mui-disabled`]: {
          opacity: 1,
        },
        [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
          width: 48,
          height: 48,
        },
      },
    },
  },
  //#endregion Pagination

  //#region Stepper

  MuiStepper: {
    styleOverrides: {
      root: {
        width: 408,
        height: 58,
        marginTop: 20,
        marginBottom: 20,
        [`@media (min-width:${breakpoints.values.lg - 1}px)`]: {
          width: 429,
          height: 62,
        },
        [`&.Mui-active`]: {
          fontSize: 50,
          color: '#ff0099',
        },
      },
    },
  },
  MuiStepButton: {
    styleOverrides: {
      root: {
        justifyContent: 'center',
        padding: 0,
        margin: 0,
      },
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        width: 30,
        height: 30,
        fill: palette.white.main,
        border: `2px solid ${palette.grey4.main}`,
        borderRadius: '100%',
        zIndex: 10,
        '&.Mui-completed': {
          fontSize: 12,
          lineHeight: 2,
          fontWeight: 600,
          color: 'white',
        },
        '&.Mui-active': {
          fill: palette.primary.main,
        },
        '&.Mui-active>text': {
          fill: palette.white.main,
        },
      },
      text: {
        fill: palette.primary.main,
        fontWeight: 600,
        fontSize: 12,
      },
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      root: {},
      label: {
        ...typography.value2,
        [`&.MuiStepLabel-alternativeLabel`]: {
          marginTop: 8,
        },
      },
      iconContainer: {
        padding: 0,
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      root: {
        margin: 0,
        paddingLeft: 0,
        padding: 0,
        top: 18,
        backgroundColor: palette.grey6.main,
        zIndex: 0,
        left: 'calc(-75% + 18px)',
        right: 'calc(50% + 12px)',
      },
      alternativeLabel: {
        marginTop: 0,
      },
    },
  },
  //#endregion Stepper

  MuiFormGroup: {
    styleOverrides: {
      root: {
        flexDirection: 'row',
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
  MuiSwitch: {
    styleOverrides: {
      root: {
        height: 24,
        padding: 0,
        width: 51,
        borderRadius: 20,
        marginLeft: 10,
        '&.Mui-checked': {
          background: 'white',
          border: '1px solid red',
        },
      },
      thumb: {
        width: 18,
        height: 18,
        padding: 0.6,
        background: palette.primary.main,
      },
      track: {
        background: palette.grey3.main,
        '&.Mui-checked': {
          background: 'white',
          border: '1px solid red',
        },
      },
      switchBase: {
        padding: 3,
        '&.Mui-checked': {
          transform: 'translateX(28px)',
        },
        '&.Mui-checked+.MuiSwitch-track': {
          background: 'white',
          borderRadius: 20,
          border: `1px solid ${palette.primary.main}`,
        },
      },
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
          width: '48%'
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
  MuiTypography: {
    styleOverrides: {
      root: {

      }
    }
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
