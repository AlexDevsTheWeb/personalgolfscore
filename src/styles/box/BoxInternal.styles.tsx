import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';

interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack)<IStackProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 10,

}));


const BoxInternal: React.FC<IStackProps> = props => {
  return (
    <StyledStack {...props} >
      {props.children}
    </StyledStack >
  )
};

export default BoxInternal;