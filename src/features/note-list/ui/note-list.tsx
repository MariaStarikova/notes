import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { getAllNotes, deleteNote, updateNote } from '@/entities/note/api/note-api.ts';
import type { Note } from '@/entities/note/model/note-type';
import { NoteItem } from '@/shared/ui/note-item';
import ListItem from '@mui/material/ListItem';

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
      } catch (error) {
        console.error('Ошибка при получении заметок:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    const newContent = prompt('Введите новый текст:');
    if (!newContent) return;

    try {
      await updateNote(id, newContent);
      setNotes(prev =>
        prev.map(note => (note.id === id ? { ...note, content: newContent } : note))
      );
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

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
