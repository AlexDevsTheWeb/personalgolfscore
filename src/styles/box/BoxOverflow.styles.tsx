import { styled } from "@mui/system";
import * as React from 'react';

interface BoxProps {
  direction: 'horizontal' | 'vertical'
  variant: 'list' | 'table' | 'section' | 'edit' | 'page';
  loading?: boolean;
  children: React.ReactNode;
  sx?: any;
  isSearch?: boolean
  isEdit?: boolean
};

const StyledBox = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'sx' && prop !== 'isEdit',
  name: 'MuiBoxOverflowNew',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root
  ]
})<BoxProps>({});

const BoxOverflow: React.FC<BoxProps> = props => {
  return <StyledBox {...props}>{props.children}</StyledBox>;
};

export default BoxOverflow;
