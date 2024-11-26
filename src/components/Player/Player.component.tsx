import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react'
// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, getDocs } from "firebase/firestore";
import { getPlayerDetails } from '@/features/player/player.slice';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { BoxPlayer, RowCard, Typography } from '../../styles';

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
        value={`${player.hcp}`}
        name="hcp"
      />
      <RowCard
        label={"Date of birth"}
        value={`${player.dob}`}
        name="dob"
      />
    </BoxPlayer >
  )
}

export default Player
