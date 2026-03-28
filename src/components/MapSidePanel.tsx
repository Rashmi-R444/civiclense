import { X, ThumbsUp, MessageSquare, Calendar, MapPin } from 'lucide-react';
import { CivicReport, issueCategoryConfig } from '@/data/mockData';
import StatusBadge from './StatusBadge';

interface MapSidePanelProps {
  report: CivicReport | null;
  onClose: () => void;
}

export default function MapSidePanel({ report, onClose }: MapSidePanelProps) {
  if (!report) return null;
  const cat = issueCategoryConfig[report.category];

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-card border-l shadow-xl z-[20] overflow-y-auto animate-fade-in">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${cat.bgColor} ${cat.color}`}>{cat.label}</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
        <h3 className="text-base font-bold text-foreground leading-tight">{report.title}</h3>
        <p className="text-sm text-muted-foreground">{report.description}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <StatusBadge status={report.status} />
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" /> {report.date}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> {report.location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            Reported by: {report.anonymous ? 'Anonymous' : report.reporter}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <ThumbsUp className="w-4 h-4" /> {report.upvotes}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <MessageSquare className="w-4 h-4" /> {report.comments} comments
          </span>
        </div>
      </div>
    </div>
  );
}
