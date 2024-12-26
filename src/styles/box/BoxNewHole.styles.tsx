import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';

interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack)<IStackProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  gap: useDeviceDetection().isMobile ? '10px' : '0px'
}));

const BoxNewHole: React.FC<IStackProps> = props => {
  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxNewHole;