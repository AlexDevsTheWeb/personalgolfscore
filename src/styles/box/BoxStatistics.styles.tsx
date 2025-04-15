import { Box as BoxMui, BoxProps, styled } from "@mui/material";

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