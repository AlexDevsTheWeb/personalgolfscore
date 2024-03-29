import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/clubs/clubs.slice';
import { RootState } from '../../store/store';
import { BoxPlayer, Grid, Typography } from '../../styles';
import { IClub, IClubType } from '../../types/clubs.types';
import ClubsList from './ClubsList.componente';

const ClubsMain = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, clubs } = useSelector((store: RootState) => store.clubs)
  const { playerID, types } = clubs;

  useEffect(() => {
    dispatch(getClubsDetails(""))
  }, [dispatch]);

  if (!!isLoading) {
    return <Typography>Loading ...</Typography>
  }
  const result = Object.keys(types).map((type) => {
    return { [type]: types[type as keyof typeof types] };
  });

  console.log('this is result ---> ', result)
  return (
    <BoxPlayer>
      <Typography>{playerID}</Typography>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={12}>
        {types
          ? result.map((res: any, index: number) => {
            return (
              <Grid
                item
                sm={12}
                md={12}
                key={index}
                sx={{ minWidth: '100%' }}
              >
                <ClubsList
                  props={res as IClubType}
                  index={index}
                />
              </Grid>
            )
          })
          : <Typography>Loading ... </Typography>
        }
      </Grid>

    </BoxPlayer>
  )
}

export default ClubsMain
