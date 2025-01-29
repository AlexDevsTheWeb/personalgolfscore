import { TableCell as TableCellMui, TableCellProps as TableCellPropsMui } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';

import * as React from "react";
import styled from "styled-components";

type TableCellProps = TableCellPropsMui & {
  space?: string,
  width?: number,
};

const StyledTableCell = styled(TableCellMui)<TableCellProps>((props) => ({
  border: "1px solid #999",
  width: `${props.width}px`,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: props.theme.palette.common.black,
    color: props.theme.palette.common.white,
    padding: !!props.space ? `${props.space} !important` : '0px !important',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const TableCell: React.FC<TableCellProps> = (props) => {
  return (
    <StyledTableCell {...props}>
      {props.children}
    </StyledTableCell>
  );
};

export default TableCell;