import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface StackProps extends StackPropsMui {
  ismobile?: boolean;
};

const StyledStack = styled(Stack) <StackProps>`
  border: 1px solid #dadada;
  border-radius: 5px;
  padding: 15px;
  background: white;
  display: flex;
  gap: 10px;
  /* flex-direction: ${props => props.ismobile ? 'column' : 'row'}; */
`;

const StackPlayer: React.FC<StackProps> = (props) => {
  const isMobile = useDeviceDetection();

  return (
    isMobile.isMobile
      ? (<StyledStack
        {...props}
        sx={{ flexDirection: 'column' }}
      >
        {props.children}
      </StyledStack>)
      :
      (<StyledStack
        {...props}
        sx={{ flexDirection: 'row' }}
      >
        {props.children}
      </StyledStack>)
  )
}

export default StackPlayer;