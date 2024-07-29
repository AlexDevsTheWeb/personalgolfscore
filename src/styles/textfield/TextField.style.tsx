import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";

import * as React from "react";
import styled from "styled-components";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;
}

const StyledTextField = styled(TextFieldMui)(({ theme }) => ({
}));


const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField
      error={props.error}
      {...props}
    >
      {props.children}
    </StyledTextField>
  );
};

export default TextField;