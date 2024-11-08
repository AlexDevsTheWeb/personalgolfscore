import { CardHeader as CardHeaderMui, CardHeaderProps } from "@mui/material";
import styled from "styled-components";

interface IReactCardHeaderProps extends CardHeaderProps { }

const StyledCardHeader = styled(CardHeaderMui)<IReactCardHeaderProps>(() => ({
  backgroundColor: 'black',
  padding: '8px'

}));

export const HoleCardHeader: React.FC<IReactCardHeaderProps> = props => {
  return (
    <StyledCardHeader {...props} titleTypographyProps={{ fontSize: '14px', color: '#ffffff', textTransform: 'uppercase' }}>
      {props.children}
    </StyledCardHeader>
  )
}