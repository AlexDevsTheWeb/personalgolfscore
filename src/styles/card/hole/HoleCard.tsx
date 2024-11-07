import { Card as CardMui, CardProps } from "@mui/material";
import styled from "styled-components";
import useDeviceDetection from "../../../hooks/useDeviceDetection.hook";

interface IReactCardProps extends CardProps { }

const StyledCard = styled(CardMui)<IReactCardProps>(() => ({
  maxWidth: useDeviceDetection().isMobile ? '100%' : '100%',
  minWidth: useDeviceDetection().isMobile ? '100%' : '100px',
  width: useDeviceDetection().isMobile ? '100%' : 'auto',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  border: '1px solid #ddd',
  display: 'flex',
  flexDirection: 'column',
}));

export const HoleCard: React.FC<IReactCardProps> = props => {
  return (
    <StyledCard {...props} >
      {props.children}
    </StyledCard>
  )
}