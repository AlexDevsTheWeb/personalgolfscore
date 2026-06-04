import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Stack as StackMui, StackProps as StackPropsMui, styled } from '@mui/material';
import * as React from 'react';

type StackProps = StackPropsMui;

const StyledStack = styled(StackMui)<StackProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  gap: 8,
  marginTop: '0px !important',
}));

const StackNewHole: React.FC<StackProps> = props => {
  return (
    <StyledStack {...props}>{props.children}</StyledStack>
  )
};

export default StackNewHole;