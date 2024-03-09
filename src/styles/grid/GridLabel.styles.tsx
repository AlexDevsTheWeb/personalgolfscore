import { Grid2Props as Grid2PropsMui } from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Unstable_Grid2';
import styled from 'styled-components';
import * as React from 'react';

type Grid2Props = Grid2PropsMui

const StyledGridLabel = styled(Grid)<Grid2Props>({})

const GridLabel: React.FC<Grid2Props> = props => {
  return (
    <StyledGridLabel {...props}>
      {props.children}
    </StyledGridLabel>
  )
};

export default GridLabel;