import StackHolesPoints from "@/styles/stack/StackHolesPoints.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Box, Card, CardActionArea, CardContent, CardHeader, Grid, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const formatScoreString = (score: number): string => {
  return score > 0 ? `+${score}` : `${score}`;
};

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.25rem',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const ScoreChip = styled(Typography)<{ $isGood: boolean }>(({ theme, $isGood }) => ({
  padding: '4px 12px',
  borderRadius: '8px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: $isGood ? theme.palette.success.main : theme.palette.error.main,
}));

const PointsChip = styled(Typography)<{ $isGood: boolean }>(({ theme, $isGood }) => ({
  padding: '4px 12px',
  borderRadius: '8px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: $isGood ? theme.palette.success.main : theme.palette.error.main,
}));

const RoundsDataHeader = ({ round }: IRoundMainDataProp) => {
  const navigate = useNavigate();
  const {
    id,
    roundCourse,
    roundDate,
    roundPar,
    roundTee,
    roundPlayingHCP,
    roundHoles,
    totals,
  } = round;

  const par = Number(roundPar);
  const playingHCP = Number(roundPlayingHCP);
  const formattedDate = roundDate ? dayjs(roundDate).format('DD/MM/YYYY') : 'N/A';
  const location = window.location.pathname;

  const roundStrokes = totals?.score?.totals || 0;
  const pointsIN = totals?.points?.pointsIN || 0;
  const pointsOUT = totals?.points?.pointsOUT || 0;
  const totalPoints = pointsIN + pointsOUT;

  const overParGross = roundStrokes - (par + playingHCP);
  const overParString = formatScoreString(overParGross);
  const underPar = roundStrokes <= par + playingHCP;
  const isGoodPoints = totalPoints >= 36;

  const handleCardActionAreaClick = () => {
    if (isDashboard) {
      navigate(`/round/${id}`);
    };
  };
  const isDashboard = location === `/dashboard` || location === '/';

  return (
    <CardActionArea onClick={handleCardActionAreaClick} sx={{
      cursor: isDashboard ? 'pointer' : 'default', width: '100%'
    }}>
      <Card>
        <CardHeader 
          title={<Typography fontWeight="bold">{roundCourse}</Typography>} 
          subheader={<Typography color="text.secondary">{formattedDate}</Typography>}
        />
        <CardContent sx={{ py: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <StatBox>
                  <StatValue>{roundHoles}</StatValue>
                  <StatLabel>Holes</StatLabel>
                </StatBox>
                <StatBox>
                  <StatValue>{par}</StatValue>
                  <StatLabel>Par</StatLabel>
                </StatBox>
                <StatBox>
                  <StatValue>{playingHCP}</StatValue>
                  <StatLabel>HCP</StatLabel>
                </StatBox>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <StatLabel>STROKES</StatLabel>
                  <ScoreChip $isGood={underPar}>
                    {roundStrokes} ({overParString})
                  </ScoreChip>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'flex-start', md: 'center' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <StatLabel>POINTS</StatLabel>
                  <PointsChip $isGood={isGoodPoints}>
                    {totalPoints} pts
                  </PointsChip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default RoundsDataHeader;
