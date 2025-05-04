import { TableRow as TableRowMui, TableRowProps as TableRowPropsMui, styled } from "@mui/material";
import * as React from "react";

type TableRowProps = TableRowPropsMui & {};

const StyledTableRow = styled(TableRowMui)(({ theme }) => ({
  // Removed alternating background color for theme consistency
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