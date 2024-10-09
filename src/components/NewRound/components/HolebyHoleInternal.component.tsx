import { Box, Grid, Typography } from '@mui/material';
import BoxGeneralShadow from '../../../styles/box/BoxGeneralShadow.styles';
import { IShots } from '../../../types/roundData.types';

interface IProps {
  hole: IShots,
}

const HolebyHoleInternal = ({ hole }: IProps) => {

  const holeElements = Object.entries(hole);
  const x = ['holeNumber', 'par', 'score', 'points'];

  return (
    <BoxGeneralShadow>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {
            holeElements.map((value: any, index: number) => {

              if (value[0] === 'holeNumber') {
                return (
                  <Grid xs={4} md={2} sx={{ border: '1px solid #ddd' }}>
                    <Typography>{value[0]}</Typography>
                    <Typography>{value[1]}</Typography>
                  </Grid>
                )
              }
              else {
                return null
              }

            }

            )
          }
        </Grid>
      </Box>
    </BoxGeneralShadow>
  )
}

export default HolebyHoleInternal
