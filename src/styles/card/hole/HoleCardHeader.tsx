import { CardHeader as CardHeaderMui, CardHeaderProps, styled } from "@mui/material";

interface IReactCardHeaderProps extends CardHeaderProps { }

const StyledCardHeader = styled(CardHeaderMui)<IReactCardHeaderProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey4.main, // Use a theme grey color
  color: theme.palette.getContrastText(theme.palette.grey4.main), // Ensure text contrasts with background
  padding: '8px', // Added padding back for spacing
}));

export const HoleCardHeader: React.FC<IReactCardHeaderProps> = props => {
  return (
    <StyledCardHeader
      {...props}
      slotProps={{ title: { fontSize: '16px', color: 'inherit' } }}

    >
      {props.children}
    </StyledCardHeader>
  )
}