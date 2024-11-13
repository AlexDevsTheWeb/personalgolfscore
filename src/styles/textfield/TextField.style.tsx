import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";
import _ from "lodash";
import useDeviceDetection from "../../hooks/useDeviceDetection.hook";

import * as React from "react";
import styled from "styled-components";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;
  width?: number | string;
}

const StyledTextField = styled(TextFieldMui)<TextFieldProps>((props) => ({
  backgroundColor: 'transparent',
  width: props.width ?
    `${_.isNumber(props.width)
      ? `${props.width}px`
      : `${props.width}`}`
    : useDeviceDetection().isMobile ? '31%' : '150px',



}));

console.log("xxx");
const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField
      id={props.name}
      variant='filled'
      error={props.error}
      {...props}
    >
      {props.children}
    </StyledTextField>
  );
};

export default TextField;