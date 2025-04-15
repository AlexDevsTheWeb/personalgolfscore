import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Grid2 as GridMui, Grid2Props as GridPropsMui, styled } from '@mui/material';
import * as React from 'react';

type GridProps = GridPropsMui

const StyledGrid = styled(GridMui)<GridProps>((props) => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  width: '100%',
  justifyContent: useDeviceDetection().isMobile ? 'space-between' : 'center',
  alignItems: 'center',
  alignContent: 'center',
  flexWrap: 'nowrap',
})));

const Grid: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>{props.children}</StyledGrid>
  )
};

export default Grid;