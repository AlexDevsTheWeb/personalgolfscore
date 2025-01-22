import useDeviceDetection from "@/hooks/useDeviceDetection.hook"
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
        backgroundColor: '#f0f0f0',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '12px',
        padding: '0px',
        // minHeight: '50px',
        justifyContent: 'center',

        ...(useDeviceDetection().isMobile && {
          minHeight: '20px',
        }),
      }}
    >
      <Typography fontWeight={'bold'} sx={{ textAlign: 'center', padding: 1 }}>{firstRow}</Typography>
      {secondRow !== '' && <Typography sx={{ fontSize: useDeviceDetection().isMobile ? '10px' : '12px' }}>{secondRow}</Typography>}
    </Stack>
  )
}


export default ShotsTableHeaderStack
