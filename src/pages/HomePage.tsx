import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Search, Filter, Camera, Flame, Layers } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import StatsBar from '@/components/StatsBar';
import MapSidePanel from '@/components/MapSidePanel';
import CameraCapture from '@/components/CameraCapture';
import { Button } from '@/components/ui/button';
import { reports, projects, CivicReport, issueCategoryConfig, IssueCategory } from '@/data/mockData';

const categoryColors: Record<IssueCategory, string> = {
  infrastructure: '#3b82f6',
  corruption: '#ef4444',
  environment: '#10b981',
  'public-safety': '#f59e0b',
  health: '#10b981',
  education: '#3b82f6',
};

const statusOptions = ['All', 'Submitted', 'Verified', 'Authority Notified', 'Resolved'];
const categoryOptions: IssueCategory[] = ['infrastructure', 'corruption', 'environment', 'public-safety', 'health', 'education'];

function HeatmapLayer() {
  return null; // placeholder
}

export default function HomePage() {
  const [selectedReport, setSelectedReport] = useState<CivicReport | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const allPins = useMemo(() => {
    const combined = [
      ...reports.map(r => ({ ...r, pinType: 'report' as const })),
    ];
    return combined.filter(p => {
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, categoryFilter, search]);

  const trendingReports = reports.slice().sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);

  return (
    <AppLayout hideFooter>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Filter bar */}
        <div className="bg-card border-b px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 min-w-[200px] flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by area or keyword..." className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" />
          </div>

          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 flex-shrink-0" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-3.5 h-3.5" /> Filters
          </Button>
          <Button variant={showHeatmap ? 'default' : 'outline'} size="sm" className={`h-8 text-xs gap-1.5 flex-shrink-0 ${showHeatmap ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setShowHeatmap(!showHeatmap)}>
            <Layers className="w-3.5 h-3.5" /> Heatmap
          </Button>
        </div>

        {showFilters && (
          <div className="bg-card border-b px-4 py-2.5 flex flex-wrap items-center gap-2">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-8 text-xs rounded-md border bg-background px-2">
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as any)} className="h-8 text-xs rounded-md border bg-background px-2">
              <option value="all">All Categories</option>
              {categoryOptions.map(c => <option key={c} value={c}>{issueCategoryConfig[c].label}</option>)}
            </select>
          </div>
        )}

        {/* Map + sidebar */}
        <div className="flex-1 relative">
          <MapContainer center={[12.9716, 77.5946]} zoom={12} className="w-full h-full" style={{ zIndex: 1 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
            {allPins.map(pin => (
              <CircleMarker key={pin.id} center={[pin.lat, pin.lng]}
                radius={showHeatmap ? 18 : 8}
                pathOptions={{
                  color: categoryColors[pin.category],
                  fillColor: categoryColors[pin.category],
                  fillOpacity: showHeatmap ? 0.25 : 0.7,
                  weight: showHeatmap ? 0 : 2,
                }}
                eventHandlers={{ click: () => setSelectedReport(pin) }}>
                <Popup>
                  <div className="text-xs font-semibold">{pin.title}</div>
                  <div className="text-xs text-gray-500">{pin.location}</div>
                </Popup>
              </CircleMarker>
            ))}
            {/* Project pins */}
            {projects.map(p => (
              <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={6}
                pathOptions={{ color: '#0f172a', fillColor: '#0f172a', fillOpacity: 0.5, weight: 2 }}>
                <Popup>
                  <div className="text-xs font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.status}</div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[10] bg-card/95 backdrop-blur-sm rounded-lg border p-3 shadow-lg">
            <p className="text-[10px] font-semibold text-muted-foreground mb-2">Categories</p>
            <div className="space-y-1">
              {categoryOptions.map(c => (
                <div key={c} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColors[c] }} />
                  <span className="text-[10px] text-muted-foreground">{issueCategoryConfig[c].label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending sidebar */}
          <div className="absolute top-4 right-4 z-[10] w-64 bg-card/95 backdrop-blur-sm rounded-lg border shadow-lg hidden lg:block">
            <div className="p-3 border-b flex items-center gap-2">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-xs font-bold">Trending Issues</span>
            </div>
            <div className="p-2 space-y-1">
              {trendingReports.map(r => (
                <button key={r.id} onClick={() => setSelectedReport(r)} className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{r.title}</p>
                  <p className="text-[10px] text-muted-foreground">{r.upvotes} upvotes • {r.comments} comments</p>
                </button>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <MapSidePanel report={selectedReport} onClose={() => setSelectedReport(null)} />

          {/* Report Now FAB */}
          <button onClick={() => setShowCamera(true)} className="absolute bottom-4 right-4 z-[10] bg-accent hover:bg-accent/90 text-accent-foreground h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
            <Camera className="w-6 h-6" />
          </button>
        </div>

        {/* Stats bar below map */}
        <div className="bg-card border-t p-4">
          <StatsBar />
        </div>
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={(img, gps) => { setShowCamera(false); }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </AppLayout>
  );
}
