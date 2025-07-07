import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import type { Note } from '@/entities/note/model/note-type';
import { NoteDelete } from '@/features/note-delete';

interface NoteItemProps {
  note: Note;
  handleDelete: (id: string) => void;
  onNoteSelect: (note: Note | null, shouldFocus?: boolean) => void;
  isSelected: boolean;
}

export function NoteItem(props: NoteItemProps) {
  const { note, handleDelete, onNoteSelect, isSelected } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const openConfirm = () => setOpenDialog(true);
  const closeConfirm = () => setOpenDialog(false);
  const confirmDelete = () => {
    handleDelete(note.id);
    onNoteSelect(null);
    closeConfirm();
  };

  const handleNoteClick = () => {
    onNoteSelect(note);
  };

  const handleEditClick = () => {
    onNoteSelect(note, true);
  };
  return (
    <>
      <ListItemButton
        onClick={handleNoteClick}
        sx={{
          width: '100%',
          backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
          '&:hover': {
            backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <ListItemText
          primary={note.title}
          secondary={note.content.substring(0, 20) + (note.content.length > 20 ? '...' : '')}
        />
        <Stack direction="row" spacing={1}>
          <Tooltip title="Редактировать" arrow>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={e => {
                e.stopPropagation();
                handleEditClick();
              }}
            >
              <EditNote />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить" arrow>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={e => {
                e.stopPropagation();
                openConfirm();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </ListItemButton>

      <NoteDelete open={openDialog} onClose={closeConfirm} onConfirm={confirmDelete} />
    </>
  );
}
