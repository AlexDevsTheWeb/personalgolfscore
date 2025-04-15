import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { Typography } from '@/styles/index';
import FmdBadTwoToneIcon from '@mui/icons-material/FmdBadTwoTone';
import { Box, BoxProps, Button, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyRounds = () => {
  const navigate = useNavigate();

  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  return (
    <EmptyRoundsBox>
      <InternalBox>
        <FmdBadTwoToneIcon sx={{ width: useDeviceDetection().isMobile ? 100 : 150, height: useDeviceDetection().isMobile ? 100 : 150, color: '#840000b3' }} />
        <Stack sx={{ gap: 1, textAlign: useDeviceDetection().isMobile ? 'center' : 'left', }}>
          <Typography variant="warning">no rounds found</Typography>
          <Typography>try adding your first golf round</Typography>
          <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        </Stack>
      </InternalBox>

      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>

      </Box>
    </EmptyRoundsBox>
  )
}

export default EmptyRounds

const EmptyRoundsBox = styled(Box)<BoxProps>((props) => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'row' : 'column',
  justifyContent: useDeviceDetection().isMobile ? 'center' : 'space-between',
  flexWrap: 'nowrap',
  alignContent: 'center',
  alignItems: 'center',
  padding: '20px',
  width: '100%',
  gap: 10,
  backgroundColor: '#ededed',
  borderRadius: 5
})));

const InternalBox = styled(Box)<BoxProps>((props) => (({
  display: 'flex',
  flexDirection: useDeviceDetection().isMobile ? 'column' : 'row',
  justifyContent: useDeviceDetection().isMobile ? 'center' : 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  gap: 5
})));
