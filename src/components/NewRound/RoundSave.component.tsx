import { Box, Button } from "@mui/material";

const RoundSave = () => {
  const handleClick = () => { console.log("saving a round of golf...") };

  console.log("eliminiamo solo round save")

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button variant='contained' onClick={handleClick}>Save all holes</Button>
    </Box>
  )
}

export default RoundSave
