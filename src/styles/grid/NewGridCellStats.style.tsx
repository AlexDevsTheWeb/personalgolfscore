import { Grid2 as GridMui, Grid2Props as GridPropsMui, styled } from '@mui/material';
import * as React from 'react';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px !important',
})

const NewGridCellStats: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default NewGridCellStats;