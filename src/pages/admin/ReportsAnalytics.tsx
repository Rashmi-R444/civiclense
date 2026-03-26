import { Download, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { projects, issues } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ReportsAnalytics() {
  const statusCounts = {
    'Not Started': projects.filter(p => p.status === 'Not Started').length,
    'Ongoing': projects.filter(p => p.status === 'Ongoing').length,
    'Completed': projects.filter(p => p.status === 'Completed').length,
  };
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <MobileLayout title="Reports & Analytics" role="admin">
      <div className="space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(statusCounts).map(([k, v]) => (
            <div key={k} className="bg-card rounded-xl p-3 border card-shadow text-center">
              <p className="text-xl font-extrabold text-foreground">{v}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">{k}</p>
            </div>
          ))}
        </div>

        {/* Bar chart mock */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Budget Utilization</h3>
          </div>
          <div className="space-y-3">
            {projects.map(p => {
              const pct = Math.round((p.spent / p.budget) * 100);
              return (
                <div key={p.id}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="font-semibold text-foreground truncate mr-2">{p.name}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct > 80 ? 'bg-warning' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie chart mock */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-bold text-foreground">Issue Categories</h3>
          </div>
          <div className="flex gap-6 items-center">
            {/* Simple pie mock */}
            <div className="w-24 h-24 rounded-full border-[8px] border-info relative flex-shrink-0"
              style={{ borderRightColor: 'hsl(var(--warning))', borderBottomColor: 'hsl(var(--destructive))', borderLeftColor: 'hsl(var(--accent))' }}>
              <div className="absolute inset-2 rounded-full bg-card" />
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Safety', color: 'bg-info', count: 2 },
                { label: 'Delay', color: 'bg-warning', count: 2 },
                { label: 'Quality', color: 'bg-destructive', count: 2 },
                { label: 'Other', color: 'bg-accent', count: 1 },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                  <span className="text-xs text-foreground font-medium">{c.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-success" />
            <h3 className="text-sm font-bold text-foreground">Overall Spending</h3>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Total Budget</p>
              <p className="text-lg font-extrabold text-foreground">₹{(totalBudget / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Total Spent</p>
              <p className="text-lg font-extrabold text-warning">₹{(totalSpent / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl font-bold gap-2" onClick={() => toast('Report exported!')}>
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>
    </MobileLayout>
  );
}
