import { createTheme } from '@mui/system';
import { typography } from './Typography.theme';

export const themeSystem = createTheme({
  components: {
    MuiBoxOverflow: {
      stylesOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: 'x' },
          style: {
            overflowY: 'hidden',
            overflowX: 'auto',
            [`&::-webkit-scrollbar`]: {
              height: 8,
              width: 8,
              borderRadius: 6,
              border: 'none',
            },
            [`&::-webkit-scrollbar-track`]: {
              backgroundColor: 'white',
              borderRadius: 6,
            },
            [`&::-webkit-scrollbar-thumb`]: {
              borderRadius: 6,
              height: 8,
              width: 8,
              backgroundColor: '#222',
            },
          },
        },
        {
          props: { variant: 'y' },
          style: {
            overflowY: 'auto',
            overflowX: 'hidden',
            [`&::-webkit-scrollbar`]: {
              height: 8,
              width: 8,
              borderRadius: 6,
              border: 'none',
            },
            [`&::-webkit-scrollbar-track`]: {
              backgroundColor: 'white',
              borderRadius: 6,
            },
            [`&::-webkit-scrollbar-thumb`]: {
              borderRadius: 6,
              height: 8,
              width: 8,
              backgroundColor: '#031434',
            },
          },
        },
        {
          props: { variant: 'xy' },
          style: {
            overflowY: 'auto',
            overflowX: 'auto',
            [`&::-webkit-scrollbar`]: {
              height: 8,
              width: 8,
              borderRadius: 6,
              border: 'none',
            },
            [`&::-webkit-scrollbar-track`]: {
              backgroundColor: 'white',
              borderRadius: 6,
            },
            [`&::-webkit-scrollbar-thumb`]: {
              borderRadius: 6,
              height: 8,
              width: 8,
              backgroundColor: '#031434',
            },
          },
        },
        {
          props: { variant: 'clubs' },
          style: {
            overflow: 'auto'
          }
        }
      ],
    },
    MuiSelectItem: {
      root: {
        '&.MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
          height: 400,
        },
      },
      variants: [
        {
          props: { variant: 'checkbox' },
          style: {
            padding: 0,
            ...typography.value2,
          },
        },
      ],
    },
  },
});
