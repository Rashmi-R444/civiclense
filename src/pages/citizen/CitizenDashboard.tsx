import { useNavigate } from 'react-router-dom';
import { FolderOpen, Map, Trophy, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import KPICard from '@/components/KPICard';
import { projects, issues, notifications } from '@/data/dummy';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const activeProjects = projects.filter(p => p.status === 'Ongoing').length;
  const totalIssues = issues.length;

  const quickActions = [
    { icon: FolderOpen, label: 'Projects', path: '/citizen/projects', color: 'bg-primary/10 text-primary' },
    { icon: Map, label: 'Map View', path: '/citizen/map', color: 'bg-accent/10 text-accent' },
    { icon: Trophy, label: 'Leaderboard', path: '/citizen/leaderboard', color: 'bg-warning/10 text-warning' },
  ];

  return (
    <MobileLayout title="OpenWorks" role="citizen">
      <div className="space-y-5">
        {/* Greeting */}
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Good morning! 👋</h2>
          <p className="text-sm text-muted-foreground">Stay informed about your community</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-3">
          <KPICard icon={FolderOpen} label="Projects" value={projects.length} />
          <KPICard icon={AlertTriangle} label="Issues" value={totalIssues} color="bg-warning/10 text-warning" />
          <KPICard icon={TrendingUp} label="Points" value={850} color="bg-accent/10 text-accent" sub="+50 this week" />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Quick Actions</h3>
          <div className="flex gap-3">
            {quickActions.map(a => (
              <button key={a.path} onClick={() => navigate(a.path)}
                className="flex-1 bg-card rounded-xl p-3 card-shadow border flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.color}`}>
                  <a.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-foreground">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Projects Snapshot */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Active Projects</h3>
            <button onClick={() => navigate('/citizen/projects')} className="text-xs text-primary font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {projects.filter(p => p.status === 'Ongoing').slice(0, 3).map(p => (
              <button key={p.id} onClick={() => navigate(`/citizen/project/${p.id}`)}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3 card-shadow border active:scale-[0.98] transition-transform text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">{p.progress}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.location}</p>
                </div>
                <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {notifications.slice(0, 3).map(n => (
              <div key={n.id} className="flex items-start gap-3 bg-card rounded-xl p-3 border">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  n.type === 'update' ? 'bg-info/10 text-info' : n.type === 'reward' ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                }`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground">{n.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
