import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import styled from 'styled-components';

interface StackProps extends StackPropsMui {
  ismobile?: boolean;
};

const StyledStack = styled(Stack)<StackProps>(() => (({
  border: '1px solid #dadada',
  borderRadius: '5px',
  padding: '15px',
  background: 'white',
  display: 'flex',
  gap: 1.125,
  width: '100%',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
})));

const StackPlayer: React.FC<StackProps> = (props) => {
  return (<StyledStack {...props}>
    {props.children}
  </StyledStack>)

}

export default StackPlayer;