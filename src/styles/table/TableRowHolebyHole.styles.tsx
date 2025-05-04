import { TableRow as TableRowMui, TableRowProps as TableRowPropsMui, styled } from '@mui/material';
import * as React from "react";
interface TableRowProps extends TableRowPropsMui {
  value: number,
}

const StyledTableRow = styled(TableRowMui)<TableRowProps>(({ theme, value }) => {
  return ({
    // Use a subtle theme color for alternating rows, works in light/dark
    backgroundColor: value % 2 === 0 ? theme.palette.action.hover : 'transparent',
  });
});

const TableRowHolebyHole: React.FC<TableRowProps> = props => {
  return (
    <StyledTableRow {...props}>
      {props.children}
    </StyledTableRow>
  )
}

export default TableRowHolebyHole;