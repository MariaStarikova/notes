import { NoteList } from '@/features/note-list';
import './sidebar.scss';
import { NoteSearch } from '@/features/note-search';
import { useEffect, useState } from 'react';
import type { Note } from '@/entities/note/model/note-type';
import { getAllNotes, deleteNote, updateNote } from '@/entities/note/api/note-api';

export function Sidebar() {
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
  }, []);

  useEffect(() => {
    const lower = textValue.toLowerCase();
    setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(lower)));
  }, [textValue, notes]);

  return (
    <div className="sidebar">
      <NoteSearch textValue={textValue} onChange={handleSearch} />
      <NoteList
        notes={filteredNotes}
        isLoading={isLoading}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
