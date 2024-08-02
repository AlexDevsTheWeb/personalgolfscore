import { useMediaQuery } from '@mui/material';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
  width: number;
  paddingTop?: number
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props => props.isMobile ? '0px' : '10px'};
  gap: 10px;
  width: ${props => !props.isMobile ? `${props.width}%` : '100%'}; 
  padding-top: ${props => props.paddingTop ? `${props.paddingTop}px` : '0px'}; 
`

const BoxSingleHoleInternal: React.FC<IStackProps> = props => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledStack {...props} isMobile={isMobile}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleInternal;