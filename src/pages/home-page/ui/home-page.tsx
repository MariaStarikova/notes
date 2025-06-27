import { useState } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { Workspace } from '@/widgets/workspace';
import type { Note } from '@/entities/note/model/note-type';
import './home-page.scss';

export function HomePage() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [shouldFocusEditor, setShouldFocusEditor] = useState(false);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [refreshNotes, setRefreshNotes] = useState(0);

  const handleNoteSelect = (note: Note | null, shouldFocus = false) => {
    if (note) {
      setSelectedNote(note);
      setShouldFocusEditor(shouldFocus);
    } else {
      setSelectedNote(null);
      setShouldFocusEditor(false);
    }
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreatingNote(true);
    setShouldFocusEditor(true);
  };

  const handleNoteCreated = (newNote: Note) => {
    setSelectedNote(newNote);
    setIsCreatingNote(false);
    setShouldFocusEditor(false);
    setRefreshNotes(prev => prev + 1);
  };

  const handleCancelCreate = () => {
    setIsCreatingNote(false);
    setShouldFocusEditor(false);
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    setSelectedNote(updatedNote);
  };

  const renderContent = () => {
    if (selectedNote) {
      return (
        <div className="home-page__workspace">
          <Workspace
            selectedNote={selectedNote}
            onNoteUpdate={handleNoteUpdate}
            shouldFocusEditor={shouldFocusEditor}
            onEditorFocused={() => setShouldFocusEditor(false)}
          />
        </div>
      );
    }

    if (isCreatingNote) {
      return (
        <div className="home-page__workspace">
          <Workspace
            selectedNote={null}
            onNoteUpdate={handleNoteUpdate}
            shouldFocusEditor={shouldFocusEditor}
            onEditorFocused={() => setShouldFocusEditor(false)}
            isCreatingNote={isCreatingNote}
            onNoteCreated={handleNoteCreated}
            onCancelCreate={handleCancelCreate}
          />
        </div>
      );
    }

    return (
      <div className="home-page__hello">
        <h2 className="home-page__title">
          Рады приветствовать вас в небольшом редакторе markdown заметок!
        </h2>
        <p className="home-page__subtitle">
          Для начала работы выберите, пожалуйста, заметку слева или создайте новую.
        </p>
      </div>
    );
  };

  return (
    <div className="home-page">
      <div className="home-page__sidebar">
        <Sidebar
          onNoteSelect={handleNoteSelect}
          selectedNote={selectedNote}
          onCreateNote={handleCreateNote}
          refreshTrigger={refreshNotes}
        />
      </div>
      {renderContent()}
    </div>
  );
}
