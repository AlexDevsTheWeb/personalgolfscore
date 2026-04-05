import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
import { IBasicRoundData } from '@/types/roundData.types';
import { Box, Stack as StackMui, StackProps, StackProps as StackPropsMui, Typography, styled } from '@mui/material';
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
  
  const pointsIN = round?.totals?.points?.pointsIN || 0;
  const pointsOUT = round?.totals?.points?.pointsOUT || 0;
  const totalPoints = pointsIN + pointsOUT;

  // Calculations
  const overParNet = roundStrokes - coursePar;
  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParNetString = formatScoreString(overParNet);
  const overParGrossString = formatScoreString(overParGross);
  const underPar = roundStrokes <= coursePar + playerHCP;
  const isGoodPoints = totalPoints >= 36;

  return (
    <StyledStack {...restProps}>
      <ShotsTableHeaderStack firstRow={''} secondRow={'TOT | NET | GROSS'} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          fontWeight={'bold'}
          sx={{
            backgroundColor: theme => underPar ? theme.palette.success.main : theme.palette.error.main,
            padding: '2px !important',
            textAlign: 'center',
            color: 'white'
          }}
        >
          {`${roundStrokes} | ${overParNetString} | ${overParGrossString}`}
        </Typography>
        
        <Typography
          fontWeight={'bold'}
          sx={{
            backgroundColor: theme => isGoodPoints ? theme.palette.success.main : theme.palette.error.main,
            padding: '2px !important',
            textAlign: 'center',
            color: 'white'
          }}
        >
          {`${totalPoints} pts`}
        </Typography>
      </Box>
    </StyledStack>
  );
});

export default StackHolesPoints;
