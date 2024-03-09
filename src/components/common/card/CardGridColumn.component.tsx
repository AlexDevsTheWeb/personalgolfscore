import * as React from 'react';
import { GridLabel } from '../../../styles';

type Props = {
  children: React.ReactNode;
  spacing?: number
}

const CardGridColumn: React.FC<Props> = props => {
  return (
    <GridLabel sx={{ p: 0, m: 0 }}>
      {props.children}
    </GridLabel>
  )
}

export default CardGridColumn;