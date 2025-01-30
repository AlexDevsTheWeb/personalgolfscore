import { createStrokesBorder, createStrokesBorderColor, createStrokesBorderRoundness, createStrokesBorderThickness } from "@/hooks/singleHoleCalculator.hook";
import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import * as React from "react";
import styled from "styled-components";

interface TypographyProps extends TypographyPropsMui {
  strokes: number,
  value: string,
}

const StyledTypography = styled(TypographyMui)<TypographyProps>((props) => {


  return (
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: '100%',
      padding: 3,
      margin: 3,
      fontSize: '18px',
      width: '30px',
      height: '30px',
      border: createStrokesBorderThickness("BIRDIE"),
      borderStyle: createStrokesBorder("BIRDIE"),
      borderRadius: createStrokesBorderRoundness("BIRDIE"),
      borderColor: createStrokesBorderColor("BIRDIE")
    })
});

const VsParTypography: React.FC<TypographyProps> = props => {

  return (
    <StyledTypography {...props} variant='headline2'>
      {props.strokes}
    </StyledTypography>
  )
}

export default VsParTypography;