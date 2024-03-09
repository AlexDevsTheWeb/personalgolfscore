import * as React from 'react';
import { Grid2, Paper } from '../../../styles';

type Props = {
  title: string;
  width: number;
  children: React.ReactNode;
  notitle?: boolean;
}

const CardGrid: React.FC<Props> = props => {
  return (<Grid2 container spacing={0} sx={{ m: 0, display: 'flex', gap: 5, flexWrap: 'no-wrap' }}  >
    <Paper variant='light' sx={{ width: '100%' }} >
      <Grid2 container width={'100%'}>
        {props.children}
      </Grid2>
    </Paper>
  </Grid2>)
}

export default CardGrid;