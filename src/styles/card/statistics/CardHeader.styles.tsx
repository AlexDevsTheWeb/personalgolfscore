import { CardHeader as CardHeaderMui, CardHeaderProps } from "@mui/material";
import styled from "styled-components";

interface IReactCardHeaderProps extends CardHeaderProps { }

const StyledCardHeader = styled(CardHeaderMui)<IReactCardHeaderProps>(() => ({
  backgroundColor: '#cfcfcf',
  color: 'black',
  fontSize: '20px',
  fontWeight: 'bold'
}));

export const CardHeader: React.FC<IReactCardHeaderProps> = props => {
  return (
    <StyledCardHeader {...props} titleTypographyProps={{ fontSize: '20px', color: 'black' }}>

      {props.children}
    </StyledCardHeader>
  )
}