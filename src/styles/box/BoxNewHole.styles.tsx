import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: ${props => props.isMobile ? '10px' : '10px'};
`

const BoxNewHole: React.FC<IStackProps> = props => {

  const dimensions = useDeviceDetection();

  return (
    <StyledStack {...props} isMobile={dimensions.isDesktopLarge}>
      {props.children}
    </StyledStack >
  )
};

export default BoxNewHole;