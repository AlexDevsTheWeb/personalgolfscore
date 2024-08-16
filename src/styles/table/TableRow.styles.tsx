import { TableRow as TableRowMui, TableRowProps as TableRowPropsMui } from "@mui/material";
import styled from "styled-components";
import * as React from "react";
import palette from "../theme/Palette.theme";

type TableRowProps = TableRowPropsMui & {};

const StyledTableRow = styled(TableRowMui)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: palette.grey5.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
  },
}));

const TableRow: React.FC<TableRowProps> = (props) => {
  return (
    <StyledTableRow {...props}>
      {props.children}
    </StyledTableRow>
  );
};

export default TableRow;