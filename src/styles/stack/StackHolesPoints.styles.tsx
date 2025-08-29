import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
import { IBasicRoundData } from '@/types/roundData.types';
import { Stack as StackMui, StackProps, StackProps as StackPropsMui, Typography, styled } from '@mui/material';
import * as React from 'react';

type StackHolesPointsProps = StackPropsMui & {
  round: Pick<IBasicRoundData, 'roundPar' | 'roundPlayingHCP' | 'totals'>;
};

const StyledStack = styled(StackMui)<StackProps>(() => ({
  rowGap: 2,
  minWidth: '120px'
}));

const formatScoreString = (score: number): string => {
  return score > 0 ? `+${score}` : `${score}`;
};

const StackHolesPoints: React.FC<StackHolesPointsProps> = React.memo((props) => {
  const { round, ...restProps } = props;
  const coursePar = Number(round?.roundPar || 0);
  const playerHCP = Number(round?.roundPlayingHCP || 0);
  const roundStrokes = round?.totals?.score?.totals || 0;

  // Calculations
  const overParNet = roundStrokes - coursePar;
  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParNetString = formatScoreString(overParNet);
  const overParGrossString = formatScoreString(overParGross);
  const underPar = roundStrokes <= coursePar + playerHCP;
  return (
    <StyledStack {...restProps}>
      <ShotsTableHeaderStack firstRow={''} secondRow={'TOT | NET | GROSS | POINTS'} />
      <Typography
        fontWeight={'bold'}
        sx={{
          backgroundColor: theme => underPar ? theme.palette.success.main : theme.palette.error.main,
          padding: '2px !important',
          textAlign: 'center'
        }}
      >
        {`${roundStrokes} | ${overParNetString} | ${overParGrossString} | ${round.totals.points.totals}`}
      </Typography>
    </StyledStack>
  );
});

export default StackHolesPoints;