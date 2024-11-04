import { TableCell as TableCellMui, TableCellProps as TableCellPropsMui } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';

import * as React from "react";
import styled from "styled-components";

type TableCellProps = TableCellPropsMui & {};

const StyledTableCell = styled(TableCellMui)(({ theme }) => ({
  border: "1px solid #999",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "1px solid #fff"
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