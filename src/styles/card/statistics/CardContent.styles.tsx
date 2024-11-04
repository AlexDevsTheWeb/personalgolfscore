import { CardContent as CardContentMui, CardContentProps } from "@mui/material";
import styled from "styled-components";
import useDeviceDetection from "../../../hooks/useDeviceDetection.hook";

interface IReactCardProps extends CardContentProps {
  direction?: string;
}

const StyledCardContent = styled(CardContentMui)<IReactCardProps>((props) => ({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : props.direction === 'row' ? 'row' : 'column',
  justifyContent: 'space-around',
  gap: 1,
  backgroundColor: '#aaa',
  color: 'white'
}));

export const CardContent: React.FC<IReactCardProps> = props => {
  return (
    <StyledCardContent {...props}>
      {props.children}
    </StyledCardContent>
  )
}