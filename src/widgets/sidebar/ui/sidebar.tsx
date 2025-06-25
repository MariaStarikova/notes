import { NoteList } from '@/features/note-list';
import './sidebar.scss';
import { NoteSearch } from '@/features/note-search';

export function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Sidebar</h1>
      <NoteSearch />
      <NoteList />
    </div>
  );
}
