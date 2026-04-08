import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ThumbsUp, MapPin } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Progress } from '@/components/ui/progress';
import { useProjects, toggleUpvote, type ProjectWithUpvotes } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const statusFilters = ['All', 'Reported', 'In Progress', 'Completed'];
const categoryFilters = ['All', 'Road', 'Water', 'Sanitation', 'Electricity', 'Other'];

export default function ProjectsPage() {
  const { user } = useAuth();
  const { data: projects, isLoading } = useProjects(user?.id);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = (projects || [])
    .filter(p => statusFilter === 'All' || p.status === statusFilter)
    .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  const handleUpvote = async (e: React.MouseEvent, p: ProjectWithUpvotes) => {
    e.preventDefault();
    if (!user) { toast.error('Please sign in to upvote.'); return; }
    await toggleUpvote(p.id, user.id, !!p.user_has_upvoted);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track civic projects across the city</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-9 text-xs rounded-md border bg-card px-3">
            {statusFilters.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="h-9 text-xs rounded-md border bg-card px-3">
            {categoryFilters.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="block bg-card rounded-lg border p-4 card-shadow hover:card-elevated transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">{p.category}</span>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 mt-1">{p.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                    p.status === 'Completed' ? 'bg-accent/10 text-accent' : p.status === 'In Progress' ? 'bg-info/10 text-info' : 'bg-muted text-muted-foreground'
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location_text || p.ward || '—'}</div>
                  <button onClick={(e) => handleUpvote(e, p)} className={`flex items-center gap-1 ${p.user_has_upvoted ? 'text-accent font-semibold' : ''}`}>
                    <ThumbsUp className="w-3 h-3" fill={p.user_has_upvoted ? 'currentColor' : 'none'} /> {p.upvote_count}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No projects found matching your criteria.</div>
        )}
      </div>
    </AppLayout>
  );
}
