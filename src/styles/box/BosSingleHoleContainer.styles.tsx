import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'row' : 'column'};
  justify-content: space-between;
  gap: 10px;
`

const BoxSingleHoleContainer: React.FC<IStackProps> = props => {
  const dimensions = useDeviceDetection();

  return (
    <StyledStack {...props} isMobile={dimensions.isDesktopLarge}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleContainer;