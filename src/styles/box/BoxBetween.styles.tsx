import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface BoxProps extends BoxPropsMui {
};

const StyledBox = styled(Box)<BoxProps>(() => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  gap: 2,
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center'
})))

const BoxBetween: React.FC<BoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxBetween
