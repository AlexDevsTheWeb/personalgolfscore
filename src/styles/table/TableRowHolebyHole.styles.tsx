import { TableRow as TableRowMui, TableRowProps as TableRowPropsMui } from '@mui/material';
import * as React from "react";
import styled from "styled-components";

interface TableRowProps extends TableRowPropsMui {
  value: number,
}

const StyledTableRow = styled(TableRowMui)<TableRowProps>((props) => {
  return (
    {
      backgroundColor: props.value % 2 ? 'transparent' : '#f7f7f7'
    }
  )
});

const TableRowHolebyHole: React.FC<TableRowProps> = props => {
  return (
    <StyledTableRow {...props}>
      {props.children}
    </StyledTableRow>
  )
}

export default TableRowHolebyHole;