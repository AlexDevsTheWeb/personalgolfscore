import { CardContent as CardContentMui, CardContentProps } from "@mui/material";
import styled from "styled-components";
import useDeviceDetection from "../../../hooks/useDeviceDetection.hook";

interface IReactCardProps extends CardContentProps {
  direction?: string;
}

const StyledCardContent = styled(CardContentMui)<IReactCardProps>((props) => ({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  justifyContent: 'space-around',
  gap: 10,
  color: 'transparent',
  boxShadow: 'none',
  padding: '8px !important'
}));

export const HoleCardContent: React.FC<IReactCardProps> = props => {
  return (
    <StyledCardContent {...props}>
      {props.children}
    </StyledCardContent>
  )
}