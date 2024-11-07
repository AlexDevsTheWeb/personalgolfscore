import { CardContent as CardContentMui, CardContentProps } from "@mui/material";
import styled from "styled-components";

interface IReactCardProps extends CardContentProps {
  direction?: string;
}

const StyledCardContent = styled(CardContentMui)<IReactCardProps>((props) => ({
  display: 'flex',
  //flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 10,
  color: 'transparent',
  boxShadow: 'none',
  padding: '5px !important'
}));

export const HoleCardContent: React.FC<IReactCardProps> = props => {
  return (
    <StyledCardContent {...props}>
      {props.children}
    </StyledCardContent>
  )
}