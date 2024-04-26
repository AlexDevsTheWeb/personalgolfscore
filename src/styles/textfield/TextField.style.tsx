import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";

import styled from "styled-components";
import * as React from "react";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;

}

const StyledTextField = styled(TextFieldMui)(({ theme }) => ({
}));


const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField {...props} >
      {props.children}
    </StyledTextField>
  );
};

export default TextField;