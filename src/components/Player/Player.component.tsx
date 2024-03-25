import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react'
// import { db } from "../../utils/firebase/firebase.utils";
// import { collection, getDocs } from "firebase/firestore";
import { BoxPlayer, Grid, RowCard, Typography } from '../../styles';
import { useEffect } from 'react';
import { getPlayerDetails } from '../../features/player/player.slice';
import { RootState } from '../../store/store';

const Player: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, player } = useSelector((store: RootState) => store.player);

  useEffect(() => {
    dispatch(getPlayerDetails(""))
  }, [dispatch]);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <BoxPlayer>
      <Grid container spacing={1}>
        <Grid item md={5}>
          <BoxPlayer>
            <RowCard
              label={"Name"}
              value={`${player.firstName} ${player.lastName}`}
              name="name"
            />
            <RowCard
              label={"E-mail"}
              value={`${player.email}`}
              name="email"
            />
            <RowCard
              label={"HCP"}
              value={`${player.HCP}`}
              name="hcp"
            />
            {/* <RowCard
              label={"Date of birth"}
              value={`${player.DOB.seconds}`}
              name="dob"
            /> */}
          </BoxPlayer>
        </Grid>
      </Grid>
    </BoxPlayer>
  )
}

export default Player
