import { useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Project, formatCurrency } from '@/data/dummy';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';

export default function ProjectCard({ project, basePath = '/citizen' }: { project: Project; basePath?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${basePath}/project/${project.id}`)}
      className="w-full text-left bg-card rounded-xl p-4 card-shadow border animate-fade-in transition-all hover:card-elevated active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-foreground text-sm leading-tight flex-1 mr-2">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
        <MapPin className="w-3 h-3" />
        {project.location}
        {project.issues > 0 && (
          <span className="ml-auto flex items-center gap-1 text-warning">
            <AlertTriangle className="w-3 h-3" /> {project.issues}
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>Budget: {formatCurrency(project.budget)}</span>
          <span>Spent: {formatCurrency(project.spent)}</span>
        </div>
      </div>
    </button>
  );
}
