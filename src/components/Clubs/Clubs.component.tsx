import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/clubs/clubs.slice';
import { RootState } from '../../store/store';
import { BoxPlayer, Card, Typography } from '../../styles';
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
      {clubs.map((club: IClub, index: number) => {
        return (
          <div key={index}>
            <Card>
              <ClubsList
                props={club}
                index={index}
              />
            </Card>
          </div>
        )
      }

      )
      }
    </BoxPlayer>
  )
}

export default ClubsMain
