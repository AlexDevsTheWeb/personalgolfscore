import useDeviceDetection from '@/hooks/useDeviceDetection.hook'
import { RootState } from '@/store/store'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const DistancesTotals: React.FC = () => {

  const { player: { golfBag } } = useSelector((store: RootState) => store.player);

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography>Distances</Typography>
      {
        !useDeviceDetection().isMobile
          ? (<TableContainer component={Paper}>
            <Table sx={{ widht: '100%', overflow: 'hidden' }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    Driver
                  </TableCell>
                  <TableCell align='center'>
                    Driver
                  </TableCell>
                  <TableCell align='center'>
                    Driver
                  </TableCell>
                  <TableCell align='center'>
                    Driver
                  </TableCell>
                  <TableCell align='center'>
                    Driver
                  </TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'>
                    250
                  </TableCell>
                  <TableCell align='center'>
                    250
                  </TableCell>
                  <TableCell align='center'>
                    250
                  </TableCell>
                  <TableCell align='center'>
                    250
                  </TableCell>
                  <TableCell align='center'>
                    250
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>)
          : null
      }
    </Stack>
  )
}

export default DistancesTotals
