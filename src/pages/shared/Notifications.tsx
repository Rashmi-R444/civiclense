import { useNavigate } from 'react-router-dom';
import { Bell, FolderOpen, Trophy, AlertTriangle, CheckCircle } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { notifications } from '@/data/dummy';

const typeIcons = {
  update: { icon: FolderOpen, color: 'bg-info/10 text-info' },
  alert: { icon: AlertTriangle, color: 'bg-warning/10 text-warning' },
  reward: { icon: Trophy, color: 'bg-accent/10 text-accent' },
  report: { icon: CheckCircle, color: 'bg-success/10 text-success' },
};

export default function Notifications({ role = 'citizen' }: { role?: 'citizen' | 'admin' }) {
  const navigate = useNavigate();
  const basePath = role === 'admin' ? '/admin' : '/citizen';

  return (
    <MobileLayout title="Notifications" role={role}>
      <div className="space-y-2">
        {notifications.map(n => {
          const t = typeIcons[n.type];
          return (
            <button key={n.id}
              onClick={() => n.projectId && navigate(`${basePath}/project/${n.projectId}`)}
              className={`w-full flex items-start gap-3 rounded-xl p-3 border text-left active:scale-[0.98] transition-transform ${
                n.read ? 'bg-card' : 'bg-primary/5 border-primary/20'
              }`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${t.color}`}>
                <t.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.date}</p>
              </div>
            </button>
          );
        })}
      </div>
    </MobileLayout>
  );
}
