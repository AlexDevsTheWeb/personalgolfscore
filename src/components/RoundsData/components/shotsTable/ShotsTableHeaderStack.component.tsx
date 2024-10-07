import { Divider, Stack, Typography } from "@mui/material"

interface IShotsTableHeaderStack {
  firstRow: string,
  secondRow: string,
}

const ShotsTableHeaderStack = ({ firstRow, secondRow }: IShotsTableHeaderStack) => {
  return (
    <Stack
      divider={
        secondRow !== '' ?
          <Divider sx={{ margin: '2px' }} />
          : <></>
      }
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'center',
        backgroundColor: '#cccccc',
        color: 'black',
        fontWeight: 500,
        fontSize: 16,
        padding: '10px',
      }}
    >
      <Typography fontWeight={'bold'}>{firstRow}</Typography>
      {secondRow !== '' && <Typography>{secondRow}</Typography>}
    </Stack>
  )
}


export default ShotsTableHeaderStack
