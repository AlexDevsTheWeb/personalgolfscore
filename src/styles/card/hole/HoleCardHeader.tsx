import { CardHeader as CardHeaderMui, CardHeaderProps, styled } from "@mui/material";

interface IReactCardHeaderProps extends CardHeaderProps { }

const StyledCardHeader = styled(CardHeaderMui)<IReactCardHeaderProps>(() => ({
  backgroundColor: 'black',
  padding: '8px'

}));

export const HoleCardHeader: React.FC<IReactCardHeaderProps> = props => {
  return (
    <StyledCardHeader {...props} titleTypographyProps={{ fontSize: '14px', textTransform: 'uppercase' }}>
      {props.children}
    </StyledCardHeader>
  )
}