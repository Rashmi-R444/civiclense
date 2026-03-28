import { projectStatusConfig } from '@/data/mockData';

export default function StatusBadge({ status }: { status: string }) {
  const c = projectStatusConfig[status] || { color: 'text-muted-foreground', bgColor: 'bg-muted' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bgColor} ${c.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      {status}
    </span>
  );
}
