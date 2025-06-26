import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import type { Note } from '@/entities/note/model/note-type';
import { NoteItem } from '@/shared/ui/note-item';
import ListItem from '@mui/material/ListItem';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}

export function NoteList(props: NoteListProps) {
  const { notes, isLoading, handleDelete, handleUpdate } = props;

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
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            </ListItem>
          ))}
        </List>
        {notes.length === 0 && <p>Заметок пока нет</p>}
      </nav>
    </Box>
  );
}
