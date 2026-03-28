import { FileText, FolderKanban, MapPin, CheckCircle } from 'lucide-react';
import { stats } from '@/data/mockData';

const items = [
  { label: 'Total Reports', value: stats.totalReports.toLocaleString(), icon: FileText, color: 'text-info' },
  { label: 'Projects Tracked', value: stats.projectsTracked.toLocaleString(), icon: FolderKanban, color: 'text-accent' },
  { label: 'Cities Covered', value: stats.citiesCovered.toLocaleString(), icon: MapPin, color: 'text-warning' },
  { label: 'Issues Resolved', value: stats.issuesResolved.toLocaleString(), icon: CheckCircle, color: 'text-accent' },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(s => (
        <div key={s.label} className="bg-card rounded-lg border p-4 card-shadow text-center">
          <s.icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
