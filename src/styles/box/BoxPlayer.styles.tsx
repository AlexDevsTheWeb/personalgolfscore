import { StackProps as StackPropsMui } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import * as React from 'react';

type StackProps = StackPropsMui;

const StyledStack = styled(Stack)<StackProps>({});

const StackPlayer: React.FC<StackProps> = props => {
  return (
    <StyledStack
      border={"1px solid #dadada"}
      borderRadius={"5px"}
      p={"15px"}
      sx={{ background: "white", minHeight: "180px", ...props.sx }}
      {...props}
    >{props.children}</StyledStack>
  )
};

export default StackPlayer;