import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface BoxProps extends BoxPropsMui {
  vertical?: boolean
};

const StyledBox = styled(Box)<BoxProps>((props) => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile || !!props.vertical ? 'column' : 'row',
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
