import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Building2, Share2, Heart, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import AppLayout from '@/components/AppLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { projects } from '@/data/mockData';
import { useState } from 'react';
import FlagProjectButton from '@/components/FlagProjectDialog';

type DetailTab = 'overview' | 'updates' | 'documents' | 'map' | 'discussion';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [tab, setTab] = useState<DetailTab>('overview');

  if (!project) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-xl font-bold">Project not found</h1>
          <Link to="/projects" className="text-accent text-sm mt-2 inline-block">← Back to Projects</Link>
        </div>
      </AppLayout>
    );
  }

  const detailTabs: { id: DetailTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'updates', label: 'Updates' },
    { id: 'documents', label: 'Documents' },
    { id: 'map', label: 'Map' },
    { id: 'discussion', label: 'Discussion' },
  ];

  const spentPercentage = project.budgetNum > 0 ? Math.round((project.spent / project.budgetNum) * 100) : 0;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground mb-3">
              <ArrowLeft className="w-3 h-3" /> Back to Projects
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 capitalize">{project.category}</span>
                <h1 className="text-xl font-bold mt-2">{project.name}</h1>
                <div className="flex items-center gap-3 mt-2 text-xs text-primary-foreground/70">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {project.department}</span>
                </div>
              </div>
              <StatusBadge status={project.status} />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 border-b">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Heart className="w-3 h-3" /> Follow</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Share2 className="w-3 h-3" /> Share</Button>
            <FlagProjectButton projectId={project.id} variant="desktop" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg overflow-x-auto">
          {detailTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard label="Budget" value={project.budget} />
              <InfoCard label="Spent" value={`${spentPercentage}%`} />
              <InfoCard label="Followers" value={project.followers.toLocaleString()} />
              <InfoCard label="Progress" value={`${project.progress}%`} />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Completion</span><span>{project.progress}%</span></div>
              <Progress value={project.progress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground text-xs">Start Date</span><p className="font-semibold">{project.startDate}</p></div>
              <div><span className="text-muted-foreground text-xs">End Date</span><p className="font-semibold">{project.endDate}</p></div>
              <div><span className="text-muted-foreground text-xs">Contractor</span><p className="font-semibold">{project.contractor || 'N/A'}</p></div>
              <div><span className="text-muted-foreground text-xs">Last Updated</span><p className="font-semibold">{project.lastUpdated}</p></div>
            </div>
          </div>
        )}
        {tab === 'updates' && <div className="text-sm text-muted-foreground py-8 text-center">No updates posted yet.</div>}
        {tab === 'documents' && <div className="text-sm text-muted-foreground py-8 text-center">No documents uploaded yet.</div>}
        {tab === 'map' && (
          <div className="h-64 rounded-lg overflow-hidden border">
            <MapContainer center={[project.lat, project.lng]} zoom={14} className="w-full h-full" style={{ zIndex: 1 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        )}
        {tab === 'discussion' && <div className="text-sm text-muted-foreground py-8 text-center">Discussion coming soon.</div>}
      </div>
    </AppLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-lg border p-3 text-center">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
