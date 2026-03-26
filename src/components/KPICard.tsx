import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
  sub?: string;
}

export default function KPICard({ icon: Icon, label, value, color = 'bg-primary/10 text-primary', sub }: KPICardProps) {
  return (
    <div className="bg-card rounded-xl p-4 card-shadow border animate-fade-in">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
        <Icon className="w-4.5 h-4.5" />
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      {sub && <p className="text-[10px] text-accent font-semibold mt-0.5">{sub}</p>}
    </div>
  );
}
