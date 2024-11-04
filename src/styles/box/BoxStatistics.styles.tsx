import { Box as BoxMui, BoxProps } from "@mui/material";
import styled from "styled-components";

interface IReactBoxProps extends BoxProps { }

const StyledBox = styled(BoxMui)<IReactBoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

export const BoxStatistics: React.FC<IReactBoxProps> = props => {
  return (
    <StyledBox {...props}>
      {props.children}
    </StyledBox>
  )
}