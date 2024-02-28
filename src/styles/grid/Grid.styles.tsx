import { Grid as GridMui, GridProps as GridPropsMui } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>({})

const Grid: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default Grid;