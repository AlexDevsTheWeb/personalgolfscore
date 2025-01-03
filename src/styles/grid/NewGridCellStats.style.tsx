import { Grid as GridMui, GridProps as GridPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px !important'
})

const NewGridCellStats: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default NewGridCellStats;