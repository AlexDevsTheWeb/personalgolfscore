import { Typography } from '@/styles/index';
import FmdBadTwoToneIcon from '@mui/icons-material/FmdBadTwoTone';
import { Box, BoxProps, Button, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyRounds = () => {
  const navigate = useNavigate();

  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  const EmptyRoundsBox = styled(Box)<BoxProps>((props) => (({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    gap: 10,
    backgroundColor: '#ededed',
    borderRadius: 5
  })));

  return (
    <EmptyRoundsBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: 5 }}>
        <FmdBadTwoToneIcon sx={{ width: 150, height: 150, color: '#840000b3' }} />
        <Stack sx={{ gap: 1 }}>
          <Typography variant="warning">no rounds found</Typography>
          <Typography>try adding your first golf round</Typography>
          <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>

      </Box>
    </EmptyRoundsBox>
  )
}

export default EmptyRounds
