import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
import { Stack as StackMui, StackProps as StackPropsMui, Typography, styled } from '@mui/material';
import * as React from 'react';

type StackProps = StackPropsMui & {
  round: any
};

const StyledStack = styled(StackMui)<StackProps>(() => ({
  rowGap: 2,
}));

const StackHolesPoints: React.FC<StackProps> = props => {

  const { general: { coursePar, playerHCP }, totals } = props.round;

  const roundStrokes = totals.score.totals;
  const overParNet = roundStrokes - coursePar;
  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParNetString = overParNet > 0 ? `+${overParNet}` : `${overParNet}`;
  const overParGrossString = overParGross > 0 ? `+${overParGross}` : `${overParGross}`;
  const underPar = roundStrokes <= coursePar + playerHCP;

  return (
    <StyledStack {...props}>
      <ShotsTableHeaderStack firstRow={'Score'} secondRow={'TOT | NET | GROSS'} />
      <Typography
        fontWeight={'bold'}
        sx={{
          backgroundColor: !!underPar ? '#82b38b' : '#cf8484',
          padding: '2px !important',
          textAlign: 'center'
        }}
      >
        {`${roundStrokes} | ${overParNetString} | ${overParGrossString}`}
      </Typography>
    </StyledStack>
  )
};

export default StackHolesPoints;