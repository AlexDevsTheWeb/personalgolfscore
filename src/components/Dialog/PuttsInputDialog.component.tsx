import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PuttsGenerator from '../NewRound/PuttsGenerator.component';

interface PuttsInputDialogProps {
  open: boolean;
  numberOfPutts: number;
  initialPuttsLength: number[]; // To pre-fill if editing
  onClose: () => void;
  onSubmit: (puttsLength: number[]) => void;
}

const PuttsInputDialog: React.FC<PuttsInputDialogProps> = ({
  open,
  numberOfPutts,
  initialPuttsLength,
  onClose,
  onSubmit,
}) => {
  const [currentPuttsLength, setCurrentPuttsLength] = useState<number[]>([]);
  const [puttsNumberArray, setPuttsNumberArray] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      // Initialize puttsNumberArray based on numberOfPutts
      setPuttsNumberArray(Array.from({ length: numberOfPutts }, (_, i) => i + 1));

      // Initialize currentPuttsLength, respecting initialPuttsLength
      const newLengths = new Array(numberOfPutts).fill(0);
      for (let i = 0; i < Math.min(initialPuttsLength.length, numberOfPutts); i++) {
        newLengths[i] = initialPuttsLength[i] ?? 0;
      }
      setCurrentPuttsLength(newLengths);
    }
  }, [open, numberOfPutts, initialPuttsLength]);

  const handleChangePuttLength = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    puttIndex: number
  ) => {
    const newPuttsLength = [...currentPuttsLength];
    // Ensure the array is long enough (should be by useEffect, but good practice)
    while (newPuttsLength.length <= puttIndex) {
      newPuttsLength.push(0);
    }
    newPuttsLength[puttIndex] = e.target.value === '' ? 0 : Number(e.target.value);
    setCurrentPuttsLength(newPuttsLength);
  };

  const handleSubmit = () => {
    onSubmit(currentPuttsLength);
    onClose(); // Close dialog on submit
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Putt Lengths</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Please enter the length (in meters/feet) for each of your {numberOfPutts} putt(s).
        </Typography>
        {puttsNumberArray.length > 0 && (
          <PuttsGenerator
            puttsNumber={puttsNumberArray}
            puttLengths={currentPuttsLength} // Pass current lengths to prefill
            setPuttDistance={handleChangePuttLength}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Putts</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PuttsInputDialog;