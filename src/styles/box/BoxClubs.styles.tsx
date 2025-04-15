import { styled } from '@mui/material';
import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import * as React from 'react';

type BoxProps = BoxPropsMui;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: start;
  justify-content: space-between;
  align-items: stretch;
  gap: 10px;
`;

const BoxClubs: React.FC<BoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxClubs;