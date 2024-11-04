import { Card as CardMui, CardProps } from "@mui/material";
import styled from "styled-components";
import useDeviceDetection from "../../../hooks/useDeviceDetection.hook";

interface IReactCardProps extends CardProps { }

const StyledCard = styled(CardMui)<IReactCardProps>(() => ({
  maxWidth: useDeviceDetection().isMobile ? '100%' : '800px',
  minWidth: useDeviceDetection().isMobile ? '100%' : '100px',
  width: useDeviceDetection().isMobile ? '100%' : 'auto'
}));

export const Card: React.FC<IReactCardProps> = props => {
  return (
    <StyledCard {...props}>
      {props.children}
    </StyledCard>
  )
}