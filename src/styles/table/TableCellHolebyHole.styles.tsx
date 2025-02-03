import { TableCell as TableCellMui, TableCellProps as TableCellPropsMui } from '@mui/material';
import * as React from "react";
import styled from "styled-components";

interface TableCellProps extends TableCellPropsMui {
  width?: number
}

const StyledTableCell = styled(TableCellMui)<TableCellProps>((props) => {
  return (
    {
      padding: '2px 10px',
      align: 'center',
      textAlign: 'center',
      width: props.width ? `${props.width}px` : 'auto',
    })
});

const TableCellHolebyHole: React.FC<TableCellProps> = props => {

  return (
    <StyledTableCell {...props}>
      {props.children}
    </StyledTableCell>
  )
}

export default TableCellHolebyHole;