import { Grid2 as GridMui, Grid2Props as GridPropsMui, styled } from '@mui/material';
import * as React from 'react';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>({
  width: '33%',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
})

const GridCross: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default GridCross;