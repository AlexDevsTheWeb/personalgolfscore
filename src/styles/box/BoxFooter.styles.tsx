import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { styled } from '@mui/material';
import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';

interface BoxProps extends BoxPropsMui { };

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  width: '100%',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  padding: '10px 0px',
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: '20px'
}));

const BoxFooter: React.FC<BoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxFooter
