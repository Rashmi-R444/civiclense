import { useNavigate } from 'react-router-dom';
import { FolderOpen, AlertTriangle, FileText, TrendingUp, Clock, Users } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import KPICard from '@/components/KPICard';
import { projects, issues } from '@/data/dummy';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const pendingReports = issues.filter(i => i.status === 'Pending').length;
  const completedPct = Math.round((projects.filter(p => p.status === 'Completed').length / projects.length) * 100);

  return (
    <MobileLayout title="Admin Panel" role="admin">
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Overview 📊</h2>
          <p className="text-sm text-muted-foreground">Manage public projects & reports</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <KPICard icon={FolderOpen} label="Total Projects" value={projects.length} />
          <KPICard icon={AlertTriangle} label="Active Issues" value={issues.length} color="bg-warning/10 text-warning" />
          <KPICard icon={FileText} label="Pending Reports" value={pendingReports} color="bg-destructive/10 text-destructive" />
          <KPICard icon={TrendingUp} label="Completion" value={`${completedPct}%`} color="bg-success/10 text-success" />
        </div>

        {/* Charts Mock */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <h3 className="text-sm font-bold text-foreground mb-3">Project Completion</h3>
          <div className="flex items-end gap-2 h-32">
            {projects.map(p => (
              <div key={p.id} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-muted rounded-t-lg overflow-hidden flex flex-col-reverse" style={{ height: 100 }}>
                  <div className="bg-primary rounded-t-lg transition-all" style={{ height: `${p.progress}%` }} />
                </div>
                <span className="text-[9px] text-muted-foreground font-semibold truncate w-full text-center">{p.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Trend Mock */}
        <div className="bg-card rounded-xl p-4 border card-shadow">
          <h3 className="text-sm font-bold text-foreground mb-3">Issue Trends</h3>
          <div className="flex items-end gap-3 h-20">
            {[3, 5, 2, 7, 4, 6, 3].map((v, i) => (
              <div key={i} className="flex-1 bg-warning/20 rounded-t-lg" style={{ height: `${v * 14}%` }}>
                <div className="w-full bg-warning rounded-t-lg" style={{ height: `${60 + Math.random() * 40}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: FolderOpen, label: 'Projects', path: '/admin/projects', color: 'bg-primary/10 text-primary' },
            { icon: AlertTriangle, label: 'Complaints', path: '/admin/complaints', color: 'bg-warning/10 text-warning' },
            { icon: Users, label: 'Users', path: '/admin/users', color: 'bg-info/10 text-info' },
            { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics', color: 'bg-accent/10 text-accent' },
          ].map(a => (
            <button key={a.path} onClick={() => navigate(a.path)}
              className="bg-card rounded-xl p-4 border card-shadow flex items-center gap-3 active:scale-95 transition-transform">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.color}`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-foreground">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
