import { TableCell as TableCellMui, TableCellProps as TableCellPropsMui, styled } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import * as React from "react";

type TableCellProps = TableCellPropsMui & {
  space?: string,
  width?: number,
};

const StyledTableCell = styled(TableCellMui)<TableCellProps>(({ theme, ...props }) => ({
  border: `1px solid ${theme.palette.divider}`, // Use theme divider color for border
  width: `${props.width}px`,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey5.main, // Use a theme grey for header background
    color: theme.palette.getContrastText(theme.palette.grey5.main), // Use contrast text for header
    padding: props.space ? `${props.space} !important` : '0px !important', // Simplified padding check
  },
  padding: '2px 10px !important',
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