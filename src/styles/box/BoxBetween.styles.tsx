import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import styled from 'styled-components';

interface BoxProps extends BoxPropsMui { };

const StyledBox = styled(Box)<BoxProps>((props) => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  gap: 20,
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  width: '100%'
})))

const BoxBetween: React.FC<BoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxBetween
