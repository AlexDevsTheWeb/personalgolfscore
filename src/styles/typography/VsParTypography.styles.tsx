import { createStrokesBorder, createStrokesBorderColor, createStrokesBorderRoundness, createStrokesBorderThickness } from "@/hooks/singleHoleCalculator.hook";
import { Box, BoxProps, Typography, Typography as TypographyMui, TypographyProps as TypographyPropsMui, styled } from "@mui/material";
import * as React from "react";

interface TypographyProps extends TypographyPropsMui {
  strokes: number,
  value: string,
  vspar: string,
}

const StyledBox = styled(Box)<BoxProps>((props) => {
  return (
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  )
})

const VsParStyledBox = styled(Box)<TypographyProps>((props) => {
  return (
    {
      width: '30px',
      height: '30px',
      border: createStrokesBorderThickness(props.value),
      borderStyle: createStrokesBorder(props.value),
      borderRadius: createStrokesBorderRoundness(props.value),
      borderColor: createStrokesBorderColor(props.value)
    }
  )
})
const StyledTypography = styled(TypographyMui)<TypographyProps>((props) => {
  return (
    {
      lineHeight: '100%',
      fontSize: '18px',
    })
});

const VsParTypography: React.FC<TypographyProps> = (props) => {
  return (
    <StyledBox>
      <VsParStyledBox {...props}>
        <StyledTypography {...props} variant='headline2'>
          {props.strokes}
        </StyledTypography>
      </VsParStyledBox>
      <Typography {...props} variant='body'>
        {props.vspar}
      </Typography>
    </StyledBox>

  )
}

export default VsParTypography;