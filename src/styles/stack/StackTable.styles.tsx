import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Divider, Stack as StackMui, StackProps as StackPropsMui, styled } from '@mui/material';
import * as React from 'react';

type StackProps = StackPropsMui & {
  secondrow: string,
};

const StyledStack = styled(StackMui)<StackProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
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
          <Divider sx={{ margin: '0px', borderColor: theme => theme.palette.divider }} />
          : <></>
      }
    >
      {props.children}
    </StyledStack>
  )
};

export default StackTable;