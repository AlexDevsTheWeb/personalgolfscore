import { Dialog } from '@/styles/dialog/Dialog.styles';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import {
  Autocomplete, Button, Card, CardContent, CardHeader,
  Grid, TextField
} from '@mui/material';
import React, { useState } from 'react';
import SaveRoundButton from './SaveRoundButton.component';
import Select from './Select.component';


const HoleGeneralForm: React.FC<IHoleGeneralInfoFormProps> = ({
  holeData,
  hcpList,
  parList,
  currentHoleNumber,
  teeClubs = [],
  greenClubs = [], // Add greenClubs prop
  fairwayValues = [],
  onChange,
  onSave,
  isSaveDisabled,
}) => {

  const distanceValue = holeData.distance !== 0 ? holeData.distance : '';
  const strokesValue = holeData.strokes !== 0 ? holeData.strokes : '';
  const puttsValue = holeData.putts !== 0 ? holeData.putts : '';

  const waterValue = holeData.water !== 0 ? holeData.water : '';
  const outValue = holeData.out !== 0 ? holeData.out : '';

  const [dialogOpen, setDialogOpen] = useState<"general" | "putts" | "tee" | "approach" | "penalties" | null>(null);

  const newHoleItems = ["general", "putts", "tee", "approach", "penalties"];
  console.log("dialog open:", dialogOpen)
  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader title={`Hole ${currentHoleNumber} Informations`} />
        <CardContent>
          <Grid container spacing={1} columns={{ xs: 2, sm: 4, lg: 12 }}>
            {newHoleItems.map((item: string, index: number) => (
              <Grid key={index} size={{ xs: 2, sm: 4, lg: 2 }}>
                <Button variant='contained' onClick={() => setDialogOpen(item as "general" | "putts" | "tee" | "approach" | "penalties")} sx={{ width: '100%' }}>{item}</Button>
              </Grid>
            ))}
            <Grid size={{ xs: 2, sm: 4, lg: 2 }}>
              <SaveRoundButton onSave={onSave} disabled={isSaveDisabled()} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      <Dialog
        title='Hole details'
        open={dialogOpen === 'general'}
        onClose={() => setDialogOpen(null)}
      >
        <Grid container spacing={1} columns={{ xs: 2, sm: 4, lg: 12 }}>
          <Grid size={{ xs: 1, sm: 4, lg: 3 }}>
            <Select
              name={'par'}
              list={parList}
              onChange={(event: any, newValue: any) => {
                onChange({ target: { name: 'par', value: newValue ? Number(newValue) : 0 } } as any);
              }}
              value={holeData.par ? holeData.par.toString() : ''}
              label='Hole Par'
            />
          </Grid>
          <Grid size={{ xs: 1, sm: 4, lg: 3 }}>
            <TextField
              name='distance'
              label="Length"
              type='number'
              onChange={onChange}
              value={distanceValue}
              variant='filled'
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid size={{ xs: 1, sm: 4, lg: 3 }}>
            <Autocomplete
              options={hcpList}
              value={holeData.hcp ? holeData.hcp.toString() : null}
              onChange={(event, newValue) => {
                onChange({ target: { name: 'hcp', value: newValue ? Number(newValue) : 0 } } as any);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hole HCP"
                  name="hcp"
                  variant="filled"
                />
              )}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid size={{ xs: 1, sm: 4, lg: 3 }}>
            <TextField
              name='strokes'
              label="Score"
              type='number'
              onChange={onChange}
              value={strokesValue}
              variant='filled'
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Dialog>

      <Dialog title='Add Putts shots details' open={dialogOpen === 'putts'} onClose={() => setDialogOpen(null)}>
        <TextField
          name='putts'
          label="# of putts"
          type='number'
          onChange={onChange}
          value={puttsValue}
          variant='filled'
          sx={{ width: '100%' }}
        />
      </Dialog>

      <Dialog title='Add Tee shot' open={dialogOpen === 'tee'} onClose={() => setDialogOpen(null)}>
        <Autocomplete
          options={teeClubs}
          value={holeData.teeClub || null} onChange={(event, newValue) => {
            onChange({ target: { name: 'teeClub', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tee club"
              name="teeClub"
              variant="filled"
            />
          )}
          sx={{ width: '100%' }}
        />
      </Dialog>

      <Dialog title='Add green approach' open={dialogOpen === 'approach'} onClose={() => setDialogOpen(null)} fullWidth maxWidth="sm">
        <Autocomplete
          options={greenClubs}
          value={holeData.toGreen || null}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'toGreen', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Approach club"
              name="toGreen"
              variant="filled"
            />
          )}
          disabled={holeData.par === 3}
          sx={{ width: '100%' }}
        />
      </Dialog>

      <Dialog title='Add penalties' open={dialogOpen === 'penalties'} onClose={() => setDialogOpen(null)}>
        <Grid container spacing={1} columns={{ xs: 2, sm: 6, lg: 12 }}>
          <Grid size={{ xs: 1, sm: 6, lg: 6 }}>
            <TextField
              name='water'
              label="Water"
              type='number'
              variant='filled'
              onChange={onChange}
              value={waterValue}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid size={{ xs: 1, sm: 6, lg: 6 }}>
            <TextField
              name='out'
              label="Out"
              type='number'
              variant='filled'
              onChange={onChange}
              value={outValue}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default HoleGeneralForm;
