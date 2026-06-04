import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { Card as CardMui, CardProps, styled } from "@mui/material";

interface IReactCardProps extends CardProps { }

const StyledCard = styled(CardMui)<IReactCardProps>(({ theme }) => ({
  maxWidth: useDeviceDetection().isMobile ? '100%' : '100%',
  minWidth: useDeviceDetection().isMobile ? '100%' : '100px',
  width: useDeviceDetection().isMobile ? '100%' : 'auto',
  boxShadow: 'none',
  backgroundColor: 'transparent', // Keep background transparent or use theme.palette.background.paper if needed
  // border: `1px solid ${theme.palette.divider}`, // Use theme divider color
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