// import { useEffect, useState } from 'react'
// import { db } from "../../utils/firebase/firebase.utils";
// import { collection, getDocs } from "firebase/firestore";
import { IPlayer } from '../../types/player.types';
import { BoxPlayer, Grid, RowCard } from '../../styles';

const Player: React.FC = () => {

  const player: IPlayer = {
    DOB: {
      seconds: 100,
      nanoseconds: 100,
    },
    HCP: 24.8,
    email: "alessandro.torri@gmail.com",
    firstName: "Alessandro",
    id: "12345",
    lastName: "Torri",
    userID: "54321"
  }


  return (

    <BoxPlayer>
      <Grid container spacing={1}>
        <Grid item md={5}>
          <BoxPlayer sx={{ width: "300px" }}>
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
            <RowCard
              label={"Date of birth"}
              value={`${player.DOB.seconds}`}
              name="dob"
            />
          </BoxPlayer>
        </Grid>
      </Grid>
    </BoxPlayer>
  )
}

export default Player
