import { Divider, Stack, Typography } from "@mui/material"
import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook"

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
        backgroundColor: '#f0f0f0',
        color: 'black',
        fontWeight: 500,
        fontSize: '14px',
        padding: '0px',
        minHeight: '50px',
        justifyContent: 'center',

        ...(useDeviceDetection().isMobile && {
          minHeight: '20px',
        }),
      }}
    >
      <Typography fontWeight={'bold'}>{firstRow}</Typography>
      {secondRow !== '' && <Typography sx={{ fontSize: '12px' }}>{secondRow}</Typography>}
    </Stack>
  )
}


export default ShotsTableHeaderStack
