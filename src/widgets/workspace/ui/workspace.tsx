import { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import type { Note } from '@/entities/note/model/note-type';
import { addNote, updateNote } from '@/entities/note/api/note-api';
import { NoteEditor } from '@/features/note-editor';
import type SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import './workspace.scss';

interface WorkspaceProps {
  selectedNote: Note | null;
  onNoteUpdate: (note: Note) => void;
  shouldFocusEditor?: boolean;
  onEditorFocused?: () => void;
  isCreatingNote?: boolean;
  onNoteCreated?: (note: Note) => void;
  onCancelCreate?: () => void;
}

export function Workspace(props: WorkspaceProps) {
  const {
    selectedNote,
    onNoteUpdate,
    shouldFocusEditor,
    onEditorFocused,
    isCreatingNote,
    onNoteCreated,
    onCancelCreate
  } = props;
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveStatus, setShowSaveStatus] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const simpleMDEInstanceRef = useRef<SimpleMDE | null>(null);
  const pendingFocusRef = useRef(false);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setMarkdown(selectedNote.content);
      setIsEditorReady(false);
    } else {
      setTitle('');
      setMarkdown('');
      setIsEditorReady(false);
    }
  }, [selectedNote]);

  const focusEditor = useCallback(() => {
    if (simpleMDEInstanceRef.current?.codemirror) {
      try {
        const codemirror = simpleMDEInstanceRef.current.codemirror;
        codemirror.focus();
        const doc = codemirror.getDoc();
        const lastLine = doc.lastLine();
        const lastLineLength = doc.getLine(lastLine).length;
        doc.setCursor(lastLine, lastLineLength);
        onEditorFocused?.();
        pendingFocusRef.current = false;
        return true;
      } catch (error) {
        console.error('Ошибка при установке фокуса:', error);
        return false;
      }
    }
    return false;
  }, [onEditorFocused]);

  useEffect(() => {
    if (shouldFocusEditor) {
      pendingFocusRef.current = true;

      if (isEditorReady) {
        setTimeout(() => {
          if (pendingFocusRef.current) {
            focusEditor();
          }
        }, 100);
      }
    }
  }, [shouldFocusEditor, isEditorReady, focusEditor]);

  useEffect(() => {
    if (isEditorReady && pendingFocusRef.current) {
      setTimeout(() => {
        if (pendingFocusRef.current) {
          focusEditor();
        }
      }, 150);
    }
  }, [isEditorReady, focusEditor]);

  const saveNote = useCallback(
    async (noteId: string, newTitle: string, newContent: string) => {
      if (!noteId) return;

      setIsSaving(true);
      setShowSaveStatus(true);
      try {
        await updateNote(noteId, newTitle, newContent);
        setLastSaved(new Date());
        onNoteUpdate({
          id: noteId,
          title: newTitle,
          content: newContent
        });
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [onNoteUpdate]
  );

  useEffect(() => {
    if (lastSaved && !isSaving) {
      const timeoutId = setTimeout(() => {
        setShowSaveStatus(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [lastSaved, isSaving]);

  useEffect(() => {
    if (!selectedNote) return;

    const timeoutId = setTimeout(() => {
      if (title !== selectedNote.title || markdown !== selectedNote.content) {
        saveNote(selectedNote.id, title, markdown);
      }
    }, 1100);

    return () => clearTimeout(timeoutId);
  }, [title, markdown, selectedNote, saveNote]);

  const handleCreateNote = async () => {
    if (!title.trim()) {
      alert('Пожалуйста, введите заголовок заметки');
      return;
    }

    setIsCreating(true);
    try {
      const newNote = await addNote({
        title: title.trim(),
        content: markdown
      });
      onNoteCreated?.(newNote);
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      alert('Произошла ошибка при создании заметки');
    } finally {
      setIsCreating(false);
    }
  };

  const components: Components = {
    code: props => {
      const inline = 'inline' in props ? props.inline : false;
      const className = 'className' in props ? props.className : '';
      const children = 'children' in props ? props.children : '';

      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };

  const getSaveStatus = () => {
    if (!showSaveStatus) return null;
    if (isSaving) return { text: 'Сохранение...', color: 'warning' as const };
    if (lastSaved) {
      return { text: 'Изменения сохранены', color: 'success' as const };
    }
    return null;
  };

  const saveStatus = getSaveStatus();

  const getSimpleMDEInstance = (instance: SimpleMDE) => {
    simpleMDEInstanceRef.current = instance;

    setTimeout(() => {
      setIsEditorReady(true);
    }, 100);
  };

  return (
    <div className="workspace">
      <div className="workspace__top">
        <div className="workspace__header">
          <Box
            component="form"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Заголовок заметки"
              type="text"
              className="workspace__title-input"
              variant="outlined"
              color="primary"
              sx={{ width: '100%' }}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {!saveStatus && <span className="workspace__transparent"></span>}
            {saveStatus && (
              <Chip
                className="workspace__chip"
                label={saveStatus.text}
                color={saveStatus.color}
                size="small"
                sx={{
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Box>
        </div>

        <NoteEditor
          selectedNote={selectedNote}
          getSimpleMDEInstance={getSimpleMDEInstance}
          markdown={markdown}
          setMarkdown={setMarkdown}
        />
      </div>

      {isCreatingNote && (
        <Box
          sx={{
            padding: '20px',
            borderTop: '1px solid #e1e5e9',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <Button variant="outlined" onClick={onCancelCreate} disabled={isCreating}>
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateNote}
            disabled={!title.trim() || isCreating}
            color="primary"
          >
            {isCreating ? 'Создание...' : 'Создать'}
          </Button>
        </Box>
      )}

      <div className="workspace__preview">
        <h2>Предварительный просмотр</h2>
        <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
