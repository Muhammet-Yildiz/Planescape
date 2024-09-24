import { useRef, useState } from 'react';

export const usePopover = (): [
  React.RefObject<HTMLElement>,
  boolean,
  () => void,
  () => void
] => {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return [anchorRef, open, handleOpen, handleClose];
};