import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import HoleAutomaticInfo from './components/HoleAutomaticInfo.component';
import Select from './components/Select.component';

const AddSingleHole = () => {
  const dispatch = useDispatch<any>();
  const { round: { roundPlayingHCP, roundHoles }
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState(0);
  const [mtToGreen, setMtToGreen] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs } as any));
    if (name === 'toGreen' && value === 'mt.') {
      if (value === 'mt.') {
        setMtToGreen(true);
      }
    }
    else {
      setMtToGreen(false);
    }
  }

  const saveHole = () => {
    const newHoleNumber = holesCompleted + 1
    dispatch(setHolesCompleted({ newHoleNumber }));
    dispatch(setHoleNumber({ newHoleNumber }));
  };

  useEffect(() => {
    if (tmpHole.holeNumber !== 0) {
      setHoleFinished(holesCompleted + 1);
      dispatch(setNewHole({ tmpHole, roundPlayingHCP, roundHoles, holesCompleted }));
      dispatch(resetNewRoundHoleTmp())
    }
    // eslint-disable-next-line
  }, [holesCompleted, dispatch])

  return (
    <BoxSingleHoleContainer>
      <BoxSingleHoleInternal>
        <BoxNewHole>
          <Select
            name='hcp'
            list={Number(roundHoles) === 18 ? hcpList18 : hcpList9}
            onChange={handleChange}
            value={tmpHole.hcp.toString()}
          />
          <Select
            name='par'
            list={parList}
            onChange={handleChange}
            value={tmpHole.par.toString()}
          />
          <TextField
            id="strokes"
            name='strokes'
            label="Strokes"
            variant="filled"
            sx={{ width: '150px' }}
            type='number'
            onChange={e => handleChange(e)}
            value={tmpHole.strokes !== 0 ? tmpHole.strokes : ''}
          />
          <TextField
            id="putts"
            name='putts'
            label="Putts"
            variant="filled"
            type='number'
            onChange={e => handleChange(e)}
            value={tmpHole.putts !== 0 ? tmpHole.putts : ''}
          />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChange(e)} value={tmpHole.fairway} par={tmpHole.par} />
          <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.teeClub} />
          <TextField id='driveDistance' name='driveDistance' label='Drive distance' variant='filled' type='number' onChange={e => handleChange(e)}
            value={tmpHole.driveDistance !== 0 ? tmpHole.driveDistance : ''} />
          <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.toGreen !== '' ? tmpHole.toGreen : ''} />
        </BoxNewHole>
        <BoxNewHole>

          {!!mtToGreen ? <TextField id="mtToGreen" name='toGreenMeters' label="Meters to green" variant="filled" type='number' onChange={e => handleChange(e)} /> : null}
          <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChange(e)} gir={tmpHole.gir} value={tmpHole.greenSide !== '' ? tmpHole.greenSide : ''} />
          <Select name='chipClub' label='Chip club' list={chipClubs} onChange={(e: any) => handleChange(e)} gir={tmpHole.gir} value={tmpHole.chipClub !== '' ? tmpHole.chipClub : ''} />
          <TextField id="putt1" name='firstPutt' label="Putt 1" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.firstPutt !== 0 ? tmpHole.firstPutt : ''} />
          <TextField id="putt2" name='secondPutt' label="Putt 2" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.secondPutt !== 0 ? tmpHole.secondPutt : ''} />
          <TextField id="putt3" name='thirdPutt' label="Putt 3" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.thirdPutt !== 0 ? tmpHole.thirdPutt : ''} />
        </BoxNewHole>
        <BoxNewHole>
          <TextField id="sand" name='sand' label="Sand" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.sand !== 0 ? tmpHole.sand : ''} />
          <TextField id="water" name='water' label="Water" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.water !== 0 ? tmpHole.water : ''} />
          <TextField id="out" name='out' label="Out" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.out !== 0 ? tmpHole.out : ''} />
        </BoxNewHole>
      </BoxSingleHoleInternal>
      <BoxSingleHoleInternal paddingTop={1.25}>
        <HoleAutomaticInfo
          holeFinished={holeFinished}
          tmpHole={tmpHole}
          shots={shots}
          roundHoles={roundHoles}
          saveHole={saveHole}
        />

      </BoxSingleHoleInternal>
    </BoxSingleHoleContainer>
  )
}

export default AddSingleHole

