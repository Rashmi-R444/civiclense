import { ProjectStatus } from '@/data/dummy';

const statusConfig: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
  'Not Started': { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
  'Ongoing': { bg: 'bg-info/10', text: 'text-info', dot: 'bg-info' },
  'Completed': { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}
