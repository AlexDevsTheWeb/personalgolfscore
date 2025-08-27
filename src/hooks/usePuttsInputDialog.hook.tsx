import { useEffect, useRef, useState } from 'react';

interface UsePuttsInputDialogProps {
  tmpHolePutts: number; // From tmpHole.putts
  initialPuttsLength: number[]; // The puttsLength state from AddSingleHole
  onPuttsLengthChange: (newLengths: number[]) => void; // To update puttsLength in AddSingleHole
}

export const usePuttsInputDialog = ({
  tmpHolePutts,
  initialPuttsLength,
  onPuttsLengthChange,
}: UsePuttsInputDialogProps) => {
  const [isPuttsInputDialogOpen, setIsPuttsInputDialogOpen] = useState(false);
  // This local state will be used by the dialog and synced with parent via onPuttsLengthChange
  const [currentDialogPuttsLength, setCurrentDialogPuttsLength] = useState<number[]>([]);
  const [puttsNumber, setPuttsNumber] = useState<number>(0);
  const prevTmpHolePuttsRef = useRef<number>(); // Store previous value of tmpHolePutts

  useEffect(() => {
    // Open dialog only if tmpHolePutts changes to a positive value,
    // or if it changes from one positive value to another (to re-initialize for new count).
    // If tmpHolePutts > 0 but hasn't changed from its previous positive value,
    // and the dialog was closed (e.g., by submit), it will remain closed.
    if (tmpHolePutts > 0) {
      if (tmpHolePutts !== prevTmpHolePuttsRef.current) {
        setIsPuttsInputDialogOpen(true);
      }
    } else { // tmpHolePutts is 0 or less
      setIsPuttsInputDialogOpen(false);
    }
    // Update the ref *after* all comparisons for the current render are done.
    prevTmpHolePuttsRef.current = tmpHolePutts;
  }, [tmpHolePutts]); // Only react to changes in tmpHolePutts for opening/closing

  // Effect to initialize/update the dialog's internal state (putt lengths)
  // This runs when the dialog opens, or if the number of putts/initial lengths change while it's open.
  useEffect(() => {
    if (isPuttsInputDialogOpen) {
      const newLengths = new Array(tmpHolePutts).fill(0);
      for (let i = 0; i < Math.min(initialPuttsLength.length, tmpHolePutts); i++) {
        newLengths[i] = initialPuttsLength[i] ?? 0;
      }
      setCurrentDialogPuttsLength(newLengths);
    }
  }, [isPuttsInputDialogOpen, tmpHolePutts, initialPuttsLength]);

  const handleClose = () => {
    setIsPuttsInputDialogOpen(false);
  };

  const handleSubmit = (newPuttsLengthFromDialog: number[]) => {
    onPuttsLengthChange(newPuttsLengthFromDialog);
    setIsPuttsInputDialogOpen(false);
  };
  const handleChangeNumofPutts = (e: any) => {
    setPuttsNumber(e.target.value);
  }

  return {
    puttsDialogProps: {
      open: isPuttsInputDialogOpen,
      numberOfPutts: tmpHolePutts,
      initialPuttsLength: currentDialogPuttsLength, // Pass the hook's managed lengths
      onClose: handleClose,
      onSubmit: handleSubmit,
      onChange: handleChangeNumofPutts,
    },
  };
};
