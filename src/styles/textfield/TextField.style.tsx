import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from "@mui/material";

import _ from "lodash";
import * as React from "react";
import styled from "styled-components";
import useDeviceDetection from "../../hooks/useDeviceDetection.hook";

type TextFieldProps = TextFieldPropsMui & {
  error?: boolean;
  width?: number | string;
}

const StyledTextField = styled(TextFieldMui)<TextFieldProps>((props) => ({
  backgroundColor: 'transparent',
  width: props.width
    ? `${_.isNumber(props.width)
      ? `${props.width}px`
      : `${props.width}`}`
    : useDeviceDetection().isMobile
      ? '48%'
      : props.name === 'roundCourse'
        ? '300px'
        : '100px',
  padding: '2px !important',
  paddingTop: '0px !important'
}));

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