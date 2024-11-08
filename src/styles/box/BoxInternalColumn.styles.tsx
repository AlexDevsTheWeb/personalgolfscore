import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';

interface IStackProps extends StackPropsMui {
  center?: string | undefined;
}

const StyledStack = styled(Stack)<IStackProps>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  backgroundColor: props.center ? 'green' : 'transparent'
}));


const BoxInternalColumn: React.FC<IStackProps> = props => {
  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxInternalColumn;