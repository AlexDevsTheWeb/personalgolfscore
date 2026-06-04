import { useState, useCallback } from 'react';

interface UseDialogReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface UseDialogOptions {
  initialState?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useDialog = (options: UseDialogOptions = {}): UseDialogReturn => {
  const { initialState = false, onOpen, onClose } = options;
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return { isOpen, open, close, toggle };
};

export default useDialog;