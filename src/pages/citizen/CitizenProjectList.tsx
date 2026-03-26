import { useState } from 'react';
import { Search } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import ProjectCard from '@/components/ProjectCard';
import { projects, ProjectStatus } from '@/data/dummy';

const filters: (ProjectStatus | 'All')[] = ['All', 'Not Started', 'Ongoing', 'Completed'];

export default function CitizenProjectList() {
  const [filter, setFilter] = useState<ProjectStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p =>
    (filter === 'All' || p.status === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileLayout title="Projects" showBack role="citizen">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          {filtered.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No projects found</p>}
        </div>
      </div>
    </MobileLayout>
  );
}
