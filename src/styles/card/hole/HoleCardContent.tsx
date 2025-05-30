import { CardContent as CardContentMui, CardContentProps, styled } from "@mui/material";

interface IReactCardProps extends CardContentProps {
  direction?: string;
}

const StyledCardContent = styled(CardContentMui)<IReactCardProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 5,
  color: 'transparent',
  boxShadow: 'none',
  padding: '0px !important',
}));

export const HoleCardContent: React.FC<IReactCardProps> = props => {
  return (
    <StyledCardContent {...props}>
      {props.children}
    </StyledCardContent>
  )
}