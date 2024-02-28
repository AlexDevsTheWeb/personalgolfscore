import { Stack as StackMui, StackProps as StackPropsMui } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';

type StackProps = StackPropsMui;

const StyledStack = styled(StackMui)<StackProps>(({}));

const Stack: React.FC<StackProps> = props => {
  return (
    <StyledStack {...props}>{props.children}</StyledStack>
  )
};

export default Stack;