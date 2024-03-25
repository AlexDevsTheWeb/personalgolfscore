import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/clubs/clubs.slice';
import { RootState } from '../../store/store';
import { BoxPlayer, Card, Grid, Typography } from '../../styles';
import { IClub } from '../../types/clubs.types';
import ClubsList from './ClubsList.componente';

const ClubsMain = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, clubs } = useSelector((store: RootState) => store.clubs)

  useEffect(() => {
    console.log("passo di qui")
    dispatch(getClubsDetails(""))
  }, [dispatch]);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <BoxPlayer>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={2}>
        {clubs.map((club: IClub, index: number) => {
          return (
            <div key={index}>
              <Grid item sm={4} md={4} key={index} sx={{ width: "300px", minWidth: "200px" }}>
                <ClubsList
                  props={club}
                  index={index}
                />
              </Grid>
            </div>
          )
        }

        )
        }
      </Grid>

    </BoxPlayer>
  )
}

export default ClubsMain
