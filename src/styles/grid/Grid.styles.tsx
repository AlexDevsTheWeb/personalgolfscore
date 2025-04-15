import { Grid2 as Grid2Mui, Grid2Props as Grid2PropsMui, styled } from '@mui/material';
import * as React from 'react';

type GridProps = Grid2PropsMui

const StyledGrid = styled(Grid2Mui)<GridProps>({})

const Grid: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default Grid;