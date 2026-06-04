import { Grid as Grid2Mui, GridProps as Grid2PropsMui, styled } from '@mui/material';
import * as React from 'react';

type GridProps = Grid2PropsMui

const StyledGrid = styled(Grid2Mui)<GridProps>({})

const Grid: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default Grid;