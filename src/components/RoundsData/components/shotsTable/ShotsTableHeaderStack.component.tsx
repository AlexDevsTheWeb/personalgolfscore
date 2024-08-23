import { Divider, Stack, Typography } from "@mui/material"

interface IShotsTableHeaderStack {
  firstRow: string,
  secondRow: string,
}

const ShotsTableHeaderStack = ({ firstRow, secondRow }: IShotsTableHeaderStack) => {
  return (
    <Stack
      divider={
        secondRow !== '' ? <Divider sx={{ margin: '2px' }} /> : <></>
      }
      sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center' }}
    >
      <Typography fontWeight={'bold'}>{firstRow}</Typography>
      {secondRow !== '' && <Typography>{secondRow}</Typography>}
    </Stack>
  )
}

export default ShotsTableHeaderStack
