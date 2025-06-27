import type { Dispatch, SetStateAction } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import type { Note } from '@/entities/note/model/note-type';

interface NoteEditorProps {
  selectedNote: Note | null;
  getSimpleMDEInstance: (instance: any) => void;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

export function NoteEditor(props: NoteEditorProps) {
  const { selectedNote, getSimpleMDEInstance, markdown, setMarkdown } = props;
  return (
    <div className="workspace__content">
      <div className="workspace__editor">
        <SimpleMDE
          key={selectedNote?.id}
          getMdeInstance={getSimpleMDEInstance}
          value={markdown}
          onChange={setMarkdown}
        />
      </div>
    </div>
  );
}
