import { Paper as PaperMui, PaperProps as PaperPropsMui } from "@mui/material";
import styled from "styled-components";
import * as React from "react";

type PaperProps = PaperPropsMui & {};

const StyledPaper = styled(PaperMui) <PaperProps>`
	display: flex;
	align-items: center;
	padding: 2px 10px;
`;

const Paper: React.FC<PaperProps> = (props) => {
  return (
    <StyledPaper {...props} elevation={0}>
      {props.children}
    </StyledPaper>
  );
};

export default Paper;