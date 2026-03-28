import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Building2, Landmark, FolderKanban, AlertTriangle, ArrowUpDown } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { projects, CivicProject } from '@/data/mockData';

type Tab = 'all' | 'government' | 'ngo' | 'private';

const tabs: { id: Tab; label: string; icon: any; accent: string }[] = [
  { id: 'all', label: 'All Projects', icon: FolderKanban, accent: 'text-foreground' },
  { id: 'government', label: 'Government', icon: Landmark, accent: 'text-info' },
  { id: 'ngo', label: 'NGO & Community', icon: Users, accent: 'text-accent' },
  { id: 'private', label: 'Private & Public', icon: Building2, accent: 'text-warning' },
];

const categoryAccentMap: Record<string, string> = {
  government: 'border-l-info',
  ngo: 'border-l-accent',
  private: 'border-l-warning',
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'budget' | 'status' | 'followers'>('newest');

  const filtered = projects
    .filter(p => activeTab === 'all' || p.category === activeTab)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'budget') return b.budgetNum - a.budgetNum;
      if (sortBy === 'followers') return b.followers - a.followers;
      return 0;
    });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track government, NGO, and private projects across the country</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <t.icon className={`w-4 h-4 ${activeTab === t.id ? t.accent : ''}`} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="h-9 text-xs rounded-md border bg-card px-3">
            <option value="newest">Newest</option>
            <option value="budget">Budget (High-Low)</option>
            <option value="status">Status</option>
            <option value="followers">Most Followed</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No projects found matching your criteria.</div>
        )}
      </div>
    </AppLayout>
  );
}

function ProjectCard({ project: p }: { project: CivicProject }) {
  const borderAccent = categoryAccentMap[p.category] || '';

  return (
    <Link to={`/projects/${p.id}`} className={`block bg-card rounded-lg border border-l-4 ${borderAccent} p-4 card-shadow hover:card-elevated transition-shadow`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground line-clamp-2">{p.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {p.category === 'ngo' && p.orgName ? p.orgName : p.contractor || p.department}
            {p.sector && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-muted">{p.sector}</span>}
          </p>
        </div>
        <StatusBadge status={p.status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold text-foreground">{p.progress}%</span>
        </div>
        <Progress value={p.progress} className="h-1.5" />
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span>Budget: <span className="font-semibold text-foreground">{p.budget}</span></span>
        <span>{p.followers.toLocaleString()} followers</span>
      </div>

      {p.controversy && (
        <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
          <AlertTriangle className="w-3 h-3" /> Controversy flagged
        </div>
      )}

      {p.volunteers != null && (
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span><Users className="w-3 h-3 inline mr-1" />{p.volunteers} volunteers</span>
          {p.beneficiaries && <span>{p.beneficiaries} beneficiaries</span>}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-2">Last updated: {p.lastUpdated}</p>
    </Link>
  );
}
