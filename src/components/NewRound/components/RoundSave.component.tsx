import { Box, Button } from "@mui/material";

const RoundSave = () => {


  const handleClick = () => {

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button variant='contained' onClick={handleClick}>Save all holes</Button>
    </Box>
  )
}

export default RoundSave
