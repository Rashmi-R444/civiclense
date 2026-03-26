import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { projects } from '@/data/dummy';
import StatusBadge from '@/components/StatusBadge';

export default function MapView({ role = 'citizen' }: { role?: 'citizen' | 'admin' }) {
  const navigate = useNavigate();
  const basePath = role === 'admin' ? '/admin' : '/citizen';

  return (
    <MobileLayout title="Map View" role={role}>
      <div className="space-y-4">
        {/* Mock Map */}
        <div className="relative bg-muted rounded-2xl overflow-hidden border" style={{ height: 280 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-info/5 to-accent/5" />
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <div key={`h${i}`} className="absolute w-full h-px bg-border" style={{ top: `${(i + 1) * 12}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`v${i}`} className="absolute h-full w-px bg-border" style={{ left: `${(i + 1) * 16}%` }} />
          ))}
          {/* Pins */}
          {projects.map((p, i) => (
            <button key={p.id} onClick={() => navigate(`${basePath}/project/${p.id}`)}
              className="absolute group"
              style={{ top: `${15 + (i * 13) % 60}%`, left: `${10 + (i * 17) % 75}%` }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                p.status === 'Completed' ? 'bg-success' : p.status === 'Ongoing' ? 'bg-info' : 'bg-muted-foreground'
              }`}>
                <MapPin className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-card rounded-lg p-2 shadow-lg border whitespace-nowrap z-10">
                <p className="text-[10px] font-bold text-foreground">{p.name}</p>
              </div>
            </button>
          ))}
          <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-semibold text-muted-foreground border">
            Mock Map • {projects.length} pins
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center">
          {[
            { color: 'bg-info', label: 'Ongoing' },
            { color: 'bg-success', label: 'Completed' },
            { color: 'bg-muted-foreground', label: 'Not Started' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-[10px] font-semibold text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Project List Below Map */}
        <div className="space-y-2">
          {projects.map(p => (
            <button key={p.id} onClick={() => navigate(`${basePath}/project/${p.id}`)}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3 border card-shadow text-left active:scale-[0.98] transition-transform">
              <MapPin className={`w-4 h-4 flex-shrink-0 ${p.status === 'Completed' ? 'text-success' : p.status === 'Ongoing' ? 'text-info' : 'text-muted-foreground'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.location}</p>
              </div>
              <StatusBadge status={p.status} />
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
