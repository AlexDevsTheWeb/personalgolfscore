import { Dialog } from '@/styles/dialog/Dialog.styles';
import { PuttsInputDialogProps } from '@/types/props.types';
import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import PuttsGenerator from '../NewRound/PuttsGenerator.component';

const PuttsInputDialog: React.FC<PuttsInputDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {

  const [currentPuttsLength, setCurrentPuttsLength] = useState<number[]>([]);
  const [puttsNumberArray, setPuttsNumberArray] = useState<number[]>([]);
  const [puttNumber, setPuttsNumber] = useState<number>(0);

  const handleChangePuttLength = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    puttIndex: number
  ) => {
    const newPuttsLength = [...currentPuttsLength];
    while (newPuttsLength.length <= puttIndex) {
      newPuttsLength.push(0);
    }
    newPuttsLength[puttIndex] = e.target.value === '' ? 0 : Number(e.target.value);
    setCurrentPuttsLength(newPuttsLength);
  };

  const handlePuttsNumberChange = (value: number) => {
    setPuttsNumber(Number(value));
    setPuttsNumberArray(Array.from({ length: value }, (_, i) => i + 1));
  }

  const handleSubmit = () => {
    onSubmit(puttNumber, currentPuttsLength);
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog
      title='Putts lengths'
      open={open}
      onClose={onClose}
      onClick={handleSubmit}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="filled"
        name="putts"
        label="# of putts"
        type="number"
        sx={{ width: '100%' }}
        value={puttNumber}
        onChange={(e) => handlePuttsNumberChange(Number(e.target.value))}
      />
      {puttNumber > 0 &&
        <>
          <Typography gutterBottom>
            Please enter the length (in meters/feet) for each of your {puttNumber} putt(s).
          </Typography>
          {puttsNumberArray.length > 0 && (
            <PuttsGenerator
              puttsNumber={puttsNumberArray}
              puttLengths={currentPuttsLength}
              setPuttDistance={handleChangePuttLength}
            />
          )}
        </>
      }
    </Dialog>
  );
};

export default PuttsInputDialog;