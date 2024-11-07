import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";

import * as React from "react";
import styled from "styled-components";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;
  width?: number;
}

const StyledTextField = styled(TextFieldMui)(({ theme }) => ({
}));


const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField
      error={props.error}
      {...props}
      sx={{
        width: `${props.width ? `${props.width}px` : '170px'}`
      }}
    >
      {props.children}
    </StyledTextField>
  );
};

export default TextField;