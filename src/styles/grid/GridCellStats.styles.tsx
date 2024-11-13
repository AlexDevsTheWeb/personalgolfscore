import { Grid as GridMui, GridProps as GridPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import CompositeTypography from '../typography/CompositeTypography.styles';

type GridProps = GridPropsMui & {
  isMobile?: boolean,
  string?: string | undefined,
  value?: string | number | undefined,
}

const StyledGrid = styled(GridMui)<GridProps>({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px !important',
})

const GridCellStats: React.FC<GridProps> = props => {
  return (
    <StyledGrid {...props}>
      <CompositeTypography
        string={props.string as string}
        value={props.value as string}
      />
    </StyledGrid>
  )
};

export default GridCellStats;