import { useNavigate } from 'react-router-dom';
import { LogOut, Bookmark, Trophy, Settings, ChevronRight, Medal, Shield, Star } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { users } from '@/data/dummy';

const user = users[0]; // Mock logged-in user

const badgeDetails: Record<string, { icon: typeof Medal; color: string; label: string }> = {
  Reporter: { icon: Medal, color: 'bg-info/10 text-info', label: 'Reporter' },
  Watchdog: { icon: Shield, color: 'bg-warning/10 text-warning', label: 'Watchdog' },
  Contributor: { icon: Star, color: 'bg-accent/10 text-accent', label: 'Contributor' },
};

export default function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout title="Profile" role="citizen">
      <div className="space-y-5">
        {/* User Card */}
        <div className="bg-card rounded-2xl p-5 border card-shadow text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">{user.avatar}</span>
          </div>
          <h2 className="text-lg font-extrabold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-xl font-extrabold text-primary">{user.points}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Points</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-foreground">{user.reportsCount}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Reports</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-foreground">{user.badges.length}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Badges</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Achievements</h3>
          <div className="flex gap-3">
            {user.badges.map(b => {
              const d = badgeDetails[b];
              if (!d) return null;
              return (
                <div key={b} className="flex-1 bg-card rounded-xl p-3 border card-shadow text-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${d.color}`}>
                    <d.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-foreground">{d.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1">
          {[
            { icon: Bookmark, label: 'Saved Projects', path: '/citizen/saved' },
            { icon: Trophy, label: 'Leaderboard', path: '/citizen/leaderboard' },
            { icon: Settings, label: 'Settings', path: '#' },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3.5 border text-left active:scale-[0.98] transition-transform">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-2 py-3 text-destructive font-bold text-sm rounded-xl border border-destructive/20 bg-destructive/5">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </MobileLayout>
  );
}
