import { styled } from "@mui/system";
import * as React from 'react';
import useDeviceDetection from "../../hooks/useDeviceDetection.hook";

interface BoxProps {
  direction: 'horizontal' | 'vertical'
  variant: 'list' | 'table' | 'section' | 'edit' | 'page' | 'clubs';
  loading?: boolean;
  children: React.ReactNode;
  sx?: any;
  isSearch?: boolean;
  isEdit?: boolean;
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

  const isMobile = useDeviceDetection();

  console.log(isMobile)
  return <StyledBox
    {...props}
    sx={{
      width: isMobile.isMobile ? '412px' : '100%',
      overflow: isMobile.isMobile ? 'auto' : 'none'
    }}
  >
    {props.children}
  </StyledBox >;
};

export default BoxOverflow;
