import { Paper as PaperMui, PaperProps as PaperPropsMui, styled } from "@mui/material";

type PaperProps = PaperPropsMui;

const StyledPaper = styled(PaperMui)<PaperProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0px 0px 5px 0px rgba(100,100,100,0.2)',
  // border: '1px dashed #ccc',
  // borderRadius: '4px'
}));

const Paper: React.FC<PaperProps> = props => {
  return (
    <StyledPaper {...props}>
      {props.children}
    </StyledPaper>
  )
}

export default Paper;