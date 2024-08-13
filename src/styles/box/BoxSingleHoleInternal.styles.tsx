import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
  width: number;
  paddingTop?: number;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: ${props => !props.isMobile ? `${props.width}%` : '100%'}; 
`

const BoxSingleHoleInternal: React.FC<IStackProps> = props => {

  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleInternal;