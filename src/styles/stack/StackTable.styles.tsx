import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Divider, Stack as StackMui, StackProps as StackPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

type StackProps = StackPropsMui & {
  secondrow: string,
};

const StyledStack = styled(StackMui)<StackProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  backgroundColor: '#f0f0f0',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '0px',
  justifyContent: 'center',
  ...(useDeviceDetection().isMobile && {
    minHeight: '20px',
  }),
}));

const StackTable: React.FC<StackProps> = props => {


  return (
    <StyledStack
      {...props}
      divider={
        props.secondrow !== '' ?
          <Divider sx={{ margin: '0px' }} />
          : <></>
      }
    >
      {props.children}
    </StyledStack>
  )
};

export default StackTable;