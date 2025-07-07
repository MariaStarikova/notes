import { NoteList } from '@/features/note-list';
import './sidebar.scss';
import { NoteSearch } from '@/features/note-search';
import { useEffect, useState } from 'react';
import type { Note } from '@/entities/note/model/note-type';
import { getAllNotes, deleteNote } from '@/entities/note/api/note-api';
import Button from '@mui/material/Button';

interface SidebarProps {
  onNoteSelect: (note: Note | null, shouldFocus?: boolean) => void;
  selectedNote: Note | null;
  onCreateNote: () => void;
  refreshTrigger?: number;
}

export function Sidebar({
  onNoteSelect,
  selectedNote,
  onCreateNote,
  refreshTrigger
}: SidebarProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textValue, setTextValue] = useState('');

  const handleSearch = (text: string) => {
    setTextValue(text);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  useEffect(() => {
    if (selectedNote) {
      setNotes(prev => prev.map(note => (note.id === selectedNote.id ? selectedNote : note)));
    }
  }, [selectedNote]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.error('Ошибка при получении заметок:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [refreshTrigger]);

  useEffect(() => {
    const lower = textValue.toLowerCase();
    setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(lower)));
  }, [textValue, notes]);

  return (
    <div className="sidebar">
      <NoteSearch textValue={textValue} onChange={handleSearch} />
      <div className="sidebar__buttons">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onNoteSelect(null)}
          size="small"
          disableElevation
          sx={{
            fontSize: '0.625rem',
            padding: '1px 5px',
            minHeight: '22px',
            minWidth: 'auto',
            lineHeight: 1,
            borderRadius: '6px'
          }}
        >
          Сбросить
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCreateNote}
          size="small"
          disableElevation
          sx={{
            fontSize: '0.625rem',
            padding: '1px 5px',
            minHeight: '22px',
            minWidth: 'auto',
            lineHeight: 1,
            borderRadius: '6px'
          }}
        >
          Добавить заметку
        </Button>
      </div>
      <NoteList
        notes={filteredNotes}
        isLoading={isLoading}
        handleDelete={handleDelete}
        onNoteSelect={onNoteSelect}
        selectedNote={selectedNote}
      />
    </div>
  );
}
