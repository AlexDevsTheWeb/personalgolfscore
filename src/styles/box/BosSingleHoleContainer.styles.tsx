import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { styled } from '@mui/material';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';

interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack)<IStackProps>(() => ({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobileDevice ? 'column' : 'row',
  justifyContent: 'space-between',
  gap: 10
}));

const BoxSingleHoleContainer: React.FC<IStackProps> = props => {

  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleContainer;