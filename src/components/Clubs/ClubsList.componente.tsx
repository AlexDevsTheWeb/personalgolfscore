import { Box, Typography, capitalize } from '@mui/material';
import ClubBox from './ClubBox.component';
import BoxClubs from '../../styles/box/BoxClubs.styles';
import { setTotalClubs } from '../../features/clubs/clubs.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store/store';
import { IClubType } from '../../types/clubs.types';

const ClubsList = (club: any) => {
  const { totalClubs, clubs: { types } } = useSelector((store: RootState) => store.clubs);
  const dispatch = useDispatch<any>();
  const { props } = club;
  const { details } = props;

  function update(types: IClubType[], name: string, clubNumber: number, selected: boolean, updatedData: Partial<IClubType>): IClubType[] {
    return types.map((item: any) => ((item.name === name && item.clubNumber === clubNumber && item.selected === selected) ? { ...item, ...updatedData } : item))
  }


  // TODO: find a way to update 'selected' for a single club
  const handleAddRemoveClubs = (n: string, c: number, s: boolean) => {

    const filteredClubs = types.map((type: any, index: number) => {
      return type.details.filter((t: any) => {
        return t.name === n && t.clubNumber === c;
      }).filter((f: any) => {
        return f
      });
    })

    // const filteredClubs2 = update(types, n, c, s, filteredClubs.filter((f: any)=> {return f.length > 0}))
    console.log("FILTERED --> ", filteredClubs)
  };
  useEffect(() => {
    let total = 0;
    details.map((det: any, index: number) => {
      if (!!details[index].selected) {
        total = totalClubs + 1;
      }
      dispatch(setTotalClubs(total));
      return true;
    });
    // eslint-disable-next-line
  }, [details, dispatch]);

  return (
    <Box>
      <Typography variant='clubsTypeName'>
        {capitalize(props.typeName)}
      </Typography>
      <BoxClubs>
        {details.map((clubs: any, index: number) => {
          return (<ClubBox key={index} details={details[index]} typename={props.typeName} handleAddRemoveClubs={handleAddRemoveClubs} />)
        })}
      </BoxClubs>
    </Box>
  )
}

export default ClubsList
