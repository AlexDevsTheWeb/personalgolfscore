import { useAppStore } from '@/store/zustand';
import { IBasicRoundData } from '@/types/roundData.types';
import { IRoundDetails } from '@/types/roundDetails.types';
import { Box, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import RoundsButtons from './RoundsButtons.component';

interface IRoundsProps {
  rounds: IBasicRoundData[];
}

const formatScoreString = (score: number): string => {
  return score > 0 ? `+${score}` : `${score}`;
};

const RoundCompactRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const ScoreChip = styled(Typography, {
  shouldForwardProp: (prop) => prop !== '$isGood',
})<{ $isGood: boolean }>(({ theme, $isGood }) => ({
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: $isGood ? theme.palette.success.main : theme.palette.error.main,
  minWidth: '50px',
  textAlign: 'center',
}));

const PointsChip = styled(Typography, {
  shouldForwardProp: (prop) => prop !== '$isGood',
})<{ $isGood: boolean }>(({ theme, $isGood }) => ({
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: $isGood ? theme.palette.success.main : theme.palette.error.main,
  minWidth: '60px',
  textAlign: 'center',
}));

const RoundsCompactCard = ({ round }: { round: IRoundDetails; key?: number }) => {
  const navigate = useNavigate();

  const coursePar = Number(round.roundPar || 0);
  const playerHCP = Number(round.roundPlayingHCP || 0);
  const roundStrokes = round.totals?.score?.totals || 0;

  const totalPoints = round.totals?.points?.totals ?? 0;

  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParString = formatScoreString(overParGross);
  const underPar = roundStrokes <= coursePar + playerHCP;
  const isGoodPoints = totalPoints >= 36;

  const formattedDate = round.roundDate ? dayjs(round.roundDate).format('DD/MM') : 'N/A';
  const formattedYear = round.roundDate ? dayjs(round.roundDate).format('YYYY') : 'N/A';

  const handleClick = () => {
    navigate(`/round/${round.id}`);
  };

  return (
    <RoundCompactRow onClick={handleClick}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
        <Typography variant='body' fontWeight="bold">
          {formattedDate}
        </Typography>
        <Typography variant='body' fontWeight="bold">
          {formattedYear}
        </Typography>

      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 1 }}>
        <Typography variant="body" fontWeight="bold" noWrap>
          {round.roundCourse}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {round.roundHoles} holes - Par {coursePar} • HCP {playerHCP}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ScoreChip $isGood={underPar}>
          {roundStrokes} ({overParString})
        </ScoreChip>
        <PointsChip $isGood={isGoodPoints}>
          {totalPoints}pts
        </PointsChip>
      </Box>
    </RoundCompactRow>
  );
};

const Rounds = ({ rounds }: IRoundsProps) => {
  const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

  if (!!isLoadingRounds) {
    return <Spinner />
  }

  return (
    <>
      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
        border: theme => `1px solid ${theme.palette.divider}`
      }}>
        {rounds.length > 0 ? (
          rounds.map((round, index) => (
            <RoundsCompactCard key={index} round={round as IRoundDetails} />
          ))
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">No rounds yet</Typography>
          </Box>
        )}
      </Box>
      <RoundsButtons />
    </>
  );
};

export default Rounds;
