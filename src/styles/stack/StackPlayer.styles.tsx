import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Stack as StackMui, StackProps as StackPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import Typography from '../typography/Typography.styles';

type StackProps = StackPropsMui & {
  name: string,
  value: string | number,
};

const StyledStack = styled(StackMui)<StackProps>(() => ({
  rowGap: 2,
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'row' : 'column',
  flexWrap: 'wrap',
  alignContent: 'space-around',
  justifyContent: useDeviceDetection().isMobile ? 'space-between' : 'center',
  alignItems: 'center',
  width: '100%'
}));

const StackPlayer: React.FC<StackProps> = props => {
  const { name, value } = props;

  return (
    <StyledStack {...props}>
      <ShotsTableHeaderStack firstRow={name} secondRow={''} />
      <Typography sx={{ fontSize: useDeviceDetection().isMobile ? '12px' : '14px', }}>
        {value}
      </Typography>
    </StyledStack>
  )
};

export default StackPlayer;