import { Sidebar } from '@/widgets/sidebar';
import { Workspace } from '@/widgets/workspace';

export function HomePage() {
  return (
    <div className="home-page">
      <Sidebar />
      <Workspace />
    </div>
  );
}
