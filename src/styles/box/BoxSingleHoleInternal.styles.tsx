import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
  paddingTop?: number;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'row' : 'row'};
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  width: ${props => props.isMobile
    ? props.paddingTop
      ? '30%'
      : '70%'
    : '100%'
  }; 
`

const BoxSingleHoleInternal: React.FC<IStackProps> = props => {

  const dimensions = useDeviceDetection();
  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleInternal;