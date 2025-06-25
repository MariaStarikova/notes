import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Note } from '@/entities/note/model/note-type';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import { NoteDelete } from '@/features/note-delete';

interface NoteItemProps {
  note: Note;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
}

export function NoteItem(props: NoteItemProps) {
  const { note, handleUpdate, handleDelete } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const openConfirm = () => setOpenDialog(true);
  const closeConfirm = () => setOpenDialog(false);
  const confirmDelete = () => {
    handleDelete(note.id);
    closeConfirm();
  };
  return (
    <>
      <ListItemButton>
        <ListItemText primary={note.title} />
        <Stack direction="row" spacing={1}>
          <Tooltip title="Редактировать" arrow>
            <IconButton aria-label="edit" color="primary" onClick={() => handleUpdate(note.id)}>
              <EditNote />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить" arrow>
            <IconButton aria-label="delete" color="primary" onClick={openConfirm}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </ListItemButton>

      <NoteDelete open={openDialog} onClose={closeConfirm} onConfirm={confirmDelete} />
    </>
  );
}
