import { Grid2Props as Grid2PropsMui } from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Unstable_Grid2';
import styled from 'styled-components';
import * as React from 'react';

type Grid2Props = Grid2PropsMui

const StyledGrid2 = styled(Grid)<Grid2Props>({})

interface MyGrid2Props extends Grid2Props {
  xs?: any,
}

const Grid2: React.FC<MyGrid2Props> = props => {
  return (
    <StyledGrid2 {...props}>{props.children}</StyledGrid2>
  )
};

export default Grid2;