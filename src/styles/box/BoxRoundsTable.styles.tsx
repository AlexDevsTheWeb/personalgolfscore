import { Box, styled, Typography } from '@mui/material';

interface IBoxRoundTablesProps {
  netScore: number,
  grossScore: number,
}

const StyledBox = styled(Box)<IBoxRoundTablesProps>((props: IBoxRoundTablesProps) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  gap: 1,
  width: '100%',
}));

const BoxRoundsTable: React.FC<IBoxRoundTablesProps> = props => {

  const netScoreBackground = props.netScore > 0 ? '#cf8484' : props.netScore === 0 ? 'transparent' : '#82b38b';
  const grossScoreBackground = props.grossScore > 0 ? '#cf8484' : props.grossScore === 0 ? 'transparent' : '#82b38b';

  return (
    <StyledBox {...props}>
      <Box sx={{ width: '100%', backgroundColor: netScoreBackground }}>
        <Typography fontWeight={'bold'}>{props.netScore}</Typography>
      </Box>
      <Box sx={{ width: '100%', backgroundColor: grossScoreBackground }}>
        <Typography fontWeight={'bold'}>{props.grossScore}</Typography>
      </Box>
    </StyledBox>
  )
};

export default BoxRoundsTable;