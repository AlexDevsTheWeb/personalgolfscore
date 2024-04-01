import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/clubs/clubs.slice';
import { RootState } from '../../store/store';
import { BoxPlayer, Grid, Typography } from '../../styles';
import ClubsList from './ClubsList.componente';
import ClubsHeaderTypography from '../../styles/typography/ClubsHeaderTypography.styles';

const ClubsMain = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, clubs, totalClubs } = useSelector((store: RootState) => store.clubs);
  const [myClubs, setMyClubs] = useState([]);
  const { playerID, types } = clubs;

  useEffect(() => {
    dispatch(getClubsDetails(""))
  }, [dispatch]);

  useEffect(() => {
    const result = Object.keys(types).map((type, index) => {
      return { [type]: types[type as keyof typeof types] };
    });
    setMyClubs(result as any);
  }, [clubs, types, dispatch])

  if (!!isLoading) {
    return <Typography>Loading ...</Typography>
  }

  return (
    <BoxPlayer>
      <ClubsHeaderTypography playerID={playerID} totalClubs={totalClubs} />
      <Grid container spacing={{ xs: 1, md: 1 }} columns={12}>
        {myClubs
          ? myClubs.map((clubs: any, index: number) => {
            return (
              <Grid
                item
                sm={12}
                md={12}
                key={index}
                sx={{ minWidth: '100%' }}
              >
                <ClubsList
                  props={clubs[index]}
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
