import { TableRow as TableRowMui, TableRowProps as TableRowPropsMui, styled } from "@mui/material";
import * as React from "react";
import palette from "../theme/Palette.theme";

type TableRowProps = TableRowPropsMui & {};

const StyledTableRow = styled(TableRowMui)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: palette.grey5.main,
  },
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