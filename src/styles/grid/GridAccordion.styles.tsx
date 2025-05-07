import { Grid as Grid2Mui, GridProps as Grid2PropsMui, styled } from "@mui/material";
import React from "react";

type GridProps = Grid2PropsMui & {}

const StyledGrid = styled(Grid2Mui)<GridProps>((props) => ({
  display: 'flex',
  justifyContent: 'space-around'
}));

const GridAccordion: React.FC<GridProps> = (props) => {
  return (<StyledGrid container spacing={1} {...props}>
    {props.children}
  </StyledGrid>);
}

export default GridAccordion