import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import * as React from 'react';
import styled from 'styled-components';

interface BoxProps extends BoxPropsMui {
  direction?: string;
};

const StyledBox = styled(Box) <BoxProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: nowrap;
  align-content: start;
  justify-content: space-between;
  align-items: stretch;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  row-gap: 8px;
  border-radius: 8px;
  -webkit-box-shadow: -1px 0px 50px -15px rgba(140, 140, 140, 0.3); 
  box-shadow: -1px 0px 50px -15px rgba(140,140,140,0.3);
 `;

const BoxGeneralShadow: React.FC<BoxProps> = props => {
  console.log(props);
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxGeneralShadow;