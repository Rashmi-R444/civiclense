import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Building2, Bookmark, AlertTriangle, TrendingUp } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { projects, formatCurrency } from '@/data/dummy';
import { toast } from 'sonner';

export default function CitizenProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [saved, setSaved] = useState(false);

  if (!project) return <MobileLayout title="Not Found" showBack><p className="text-center text-muted-foreground py-8">Project not found</p></MobileLayout>;

  const budgetPercent = Math.round((project.spent / project.budget) * 100);

  return (
    <MobileLayout title={project.name} showBack role="citizen">
      <div className="space-y-5">
        {/* Hero */}
        <div className="bg-primary/5 rounded-2xl p-5 border">
          <div className="flex items-start justify-between mb-3">
            <StatusBadge status={project.status} />
            <button onClick={() => { setSaved(!saved); toast(saved ? 'Removed from saved' : 'Project saved!'); }}
              className={`p-2 rounded-lg transition-colors ${saved ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
              <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <h2 className="text-lg font-extrabold text-foreground mb-1">{project.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: 'Location', value: project.location },
            { icon: Building2, label: 'Department', value: project.department },
            { icon: Calendar, label: 'Start', value: project.startDate },
            { icon: Calendar, label: 'End', value: project.endDate },
          ].map(item => (
            <div key={item.label} className="bg-card rounded-xl p-3 border card-shadow">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <item.icon className="w-3 h-3" />
                <span className="text-[10px] font-semibold uppercase">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Progress</span>
            <span className="ml-auto text-lg font-extrabold text-primary">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-3 mb-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Contractor: {project.contractor}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <h3 className="text-sm font-bold text-foreground mb-3">Budget Overview</h3>
          <div className="flex items-end gap-4 mb-3">
            <div className="flex-1">
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Total Budget</p>
              <p className="text-lg font-extrabold text-foreground">{formatCurrency(project.budget)}</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Spent</p>
              <p className="text-lg font-extrabold text-warning">{formatCurrency(project.spent)}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${budgetPercent > 90 ? 'bg-destructive' : budgetPercent > 70 ? 'bg-warning' : 'bg-accent'}`}
              style={{ width: `${budgetPercent}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{budgetPercent}% of budget utilized</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 h-12 rounded-xl font-bold gap-2" onClick={() => navigate(`/citizen/report/${project.id}`)}>
            <AlertTriangle className="w-4 h-4" /> Report Issue
          </Button>
          <FlagProjectButton projectId={project.id} variant="mobile" />
        </div>
      </div>
    </MobileLayout>
  );
}
