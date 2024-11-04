import { Grid as GridMui, GridProps as GridPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>({
  width: '33%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center', gap: '10px'
})

const GridCross: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default GridCross;