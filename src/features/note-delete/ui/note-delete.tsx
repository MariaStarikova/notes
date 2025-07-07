import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteNoteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function NoteDelete(props: DeleteNoteDialogProps) {
  const { open, onClose, onConfirm } = props;
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition
      }}
      keepMounted
      onClose={onClose}
      aria-describedby="delete-note-description"
    >
      <DialogTitle>{'Удалить заметку?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-note-description">
          Вы уверены, что хотите удалить эту заметку? Это действие необратимо.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onConfirm} color="error">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
