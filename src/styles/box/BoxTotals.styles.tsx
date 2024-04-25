import { BoxProps as BoxPropsMui } from '@mui/material/Box';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import * as React from 'react';

type BoxProps = BoxPropsMui;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: start;
  justify-content: space-between;
  align-items: stretch;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
`;

const BoxNewRound: React.FC<BoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxNewRound;