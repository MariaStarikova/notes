import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import type { Note } from '@/entities/note/model/note-type';
import { NoteItem } from '@/shared/ui/note-item';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  handleDelete: (id: string) => void;
  onNoteSelect: (note: Note | null, shouldFocus?: boolean) => void;
  selectedNote: Note | null;
}

export function NoteList(props: NoteListProps) {
  const { notes, isLoading, handleDelete, onNoteSelect, selectedNote } = props;

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List sx={{ width: '100%', maxWidth: '100vw' }}>
          {notes.map(note => (
            <ListItem disablePadding key={note.id}>
              <NoteItem
                note={note}
                handleDelete={handleDelete}
                onNoteSelect={onNoteSelect}
                isSelected={selectedNote?.id === note.id}
              />
            </ListItem>
          ))}
        </List>
        {notes.length === 0 && <p>Заметок пока нет</p>}
      </nav>
    </Box>
  );
}
