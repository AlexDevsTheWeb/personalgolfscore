import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";
import _ from "lodash";

import * as React from "react";
import styled from "styled-components";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;
  width?: number | string;
}

const StyledTextField = styled(TextFieldMui)<TextFieldProps>(({ theme }) => ({
  backgroundColor: 'transparent',
}));


const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField
      error={props.error}
      {...props}
      sx={{
        width: `${props.width ? `${_.isNumber(props.width) ? `${props.width}px` : `${props.width}`}` : '170px'}`,
        backgroundColor: 'transparent'
      }}
    >
      {props.children}
    </StyledTextField>
  );
};

export default TextField;