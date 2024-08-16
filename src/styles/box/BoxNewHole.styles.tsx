import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  justify-content: space-between;
  padding: ${props => props.isMobile ? '10px 0px' : '10px 0px'};
  gap: ${props => props.isMobile ? '10px' : '0px'};
`

const BoxNewHole: React.FC<IStackProps> = props => {

  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxNewHole;