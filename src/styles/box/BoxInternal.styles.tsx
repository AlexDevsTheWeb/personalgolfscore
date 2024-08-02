import { useMediaQuery } from '@mui/material';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack) <IStackProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BoxInternal: React.FC<IStackProps> = props => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledStack {...props} isMobile={isMobile}>
      {props.children}
    </StyledStack >
  )
};

export default BoxInternal;