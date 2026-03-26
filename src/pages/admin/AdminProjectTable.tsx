import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Search } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import StatusBadge from '@/components/StatusBadge';
import { projects, formatCurrency } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminProjectTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <MobileLayout title="Manage Projects" showBack role="admin">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <Button className="h-11 rounded-xl font-bold gap-1" onClick={() => toast('Add project form would open')}>
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {filtered.map(p => (
            <div key={p.id} className="bg-card rounded-xl p-4 border card-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-sm font-bold text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.location} • {p.department}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>Budget: {formatCurrency(project.budget)}</span>
                <span>Progress: {p.progress}%</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs font-semibold gap-1 h-8"
                  onClick={() => navigate(`/admin/project/${p.id}`)}>
                  <Eye className="w-3 h-3" /> View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs font-semibold gap-1 h-8"
                  onClick={() => toast('Edit mode would open')}>
                  <Edit className="w-3 h-3" /> Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
