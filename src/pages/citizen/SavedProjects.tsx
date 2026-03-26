import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { projects } from '@/data/dummy';
import StatusBadge from '@/components/StatusBadge';

// Mock: first 3 are "saved"
const savedProjects = projects.slice(0, 3);

export default function SavedProjects() {
  const navigate = useNavigate();
  return (
    <MobileLayout title="Saved Projects" showBack role="citizen">
      <div className="space-y-3">
        {savedProjects.map(p => (
          <button key={p.id} onClick={() => navigate(`/citizen/project/${p.id}`)}
            className="w-full flex items-center gap-3 bg-card rounded-xl p-4 border card-shadow text-left active:scale-[0.98] transition-transform">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Bookmark className="w-5 h-5 text-warning" fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{p.name}</p>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3" /> {p.location}
              </div>
            </div>
            <StatusBadge status={p.status} />
          </button>
        ))}
      </div>
    </MobileLayout>
  );
}
