import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled from 'styled-components';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface IStackProps extends StackPropsMui {
  side: string;
  isMobile?: boolean;
  paddingTop?: number;
}

const StyledStack = styled(Stack)<IStackProps>((props: IStackProps) => ({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobileDevice ? 'column' : 'row',
  justifyContent: 'space-between',
  gap: 10,
  flexWrap: 'wrap',
  width: useDeviceDetection().isMobileDevice
    ? '100%'
    : props.side === 'right'
      ? '30%'
      : '70%',
}));

const BoxSingleHoleInternal: React.FC<IStackProps> = props => {

  return (
    <StyledStack {...props}>
      {props.children}
    </StyledStack >
  )
};

export default BoxSingleHoleInternal;