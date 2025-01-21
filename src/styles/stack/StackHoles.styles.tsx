import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
import { Stack as StackMui, StackProps as StackPropsMui, Typography } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

type StackProps = StackPropsMui & {
  name: string,
  value?: string | number,
  scoreValue?: {
    score: number,
    overParNetString: string,
    overParGrossString: string
  },
  underPar?: boolean
};

const StyledStack = styled(StackMui)<StackProps>(() => ({
  rowGap: 2,
}));

const StackHoles: React.FC<StackProps> = props => {

  const { name, value, underPar, scoreValue } = props;

  return (
    <StyledStack {...props}>
      <ShotsTableHeaderStack firstRow={name} secondRow={name === 'Score' ? 'TOT | NET | GROSS' : ''} />
      {
        name === 'Score'
          ? <Typography
            fontWeight={'bold'}
            sx={{
              backgroundColor: !!underPar ? '#82b38b' : '#cf8484',
              padding: '5px !important',
              textAlign: 'center'
            }}
          >
            {`${scoreValue?.score} | ${scoreValue?.overParNetString} | ${scoreValue?.overParGrossString}`}
          </Typography>
          :
          <Typography
            sx={{ padding: '5px !important', textAlign: 'center' }}
          >
            {value}
          </Typography>
      }
    </StyledStack>
  )
};

export default StackHoles;