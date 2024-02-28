import React from 'react'
import Typography from '../../../styles/typography/Typography.styles';
import { Grid2 } from '../../../styles';

type Props = {
  direction: "row" | "column";
  label?: string | null;
  required?: boolean;
  //name?: keyof TFormStateSlice;
  component?: React.ReactNode;
  value?: string;
  separator?: ":" | ";";
  editable?: boolean;
  disabled?: boolean;
  width?: number;
  section?: "add" | "edit;"
  sx: any;
};

const CardGridRow: React.FC<Props> = (props) => {
  return (
    <Grid2
      xs={!!props.width ? props.width : 12}
      direction={props.direction}
      alignItems={"center"}
      sx={{ p: 0, opacity: !!props.disabled ? 0.2 : 1, mb: 1.5 }}
    >
      <Grid2 xs={12}>
        <Typography
          variant="body"
          sx={{ mb: 0.525 }}
        >
          {props.label} {!!props.required ? "*" : ""}
          {props.separator}
        </Typography>
      </Grid2>
      <Grid2 container xs={12} minHeight={30}>
        <Typography variant="body">{props.value}</Typography>
      </Grid2>
    </Grid2>
  )
}

export default CardGridRow
