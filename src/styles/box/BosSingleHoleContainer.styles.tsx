import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { IStackProps } from '@/types/props.types';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
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