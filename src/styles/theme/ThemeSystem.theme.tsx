import { ThemeOptions } from '@mui/material/styles';
import { typography } from './Typography.theme';

export const systemComponentOptions: ThemeOptions['components'] = {
  MuiMenuItem: {
    variants: [
      {
        props: { className: 'variant-checkbox' },
        style: {
          padding: 0,
          ...typography.value2,
        },
      },
    ],
  },
};
