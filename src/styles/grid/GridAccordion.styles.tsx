import { Grid2 as Grid2Mui, Grid2Props as Grid2PropsMui, styled } from "@mui/material";
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