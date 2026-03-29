import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, PlusCircle, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: PlusCircle, label: 'Report', path: '/reports?new=true', isCenter: true },
  { icon: Trophy, label: 'Board', path: '/leaderboard', requiresAuth: true },
  { id: 'profile', label: 'Profile', path: '/profile', requiresAuth: true },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const handleNavigate = (tab: typeof tabs[0]) => {
    if (tab.requiresAuth && !isAuthenticated) {
      navigate('/login', { state: { from: tab.path } });
    } else {
      navigate(tab.path);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex justify-around items-end px-1 pb-[env(safe-area-inset-bottom,4px)] pt-1">
        {tabs.map(tab => {
          const isProfile = 'id' in tab && tab.id === 'profile';
          const active = tab.isCenter ? false : location.pathname === tab.path;
          return (
            <button
              key={tab.path + tab.label}
              onClick={() => handleNavigate(tab)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-colors min-w-[3.5rem] ${
                tab.isCenter ? '' : active ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              {tab.isCenter ? (
                <div className="w-11 h-11 -mt-4 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <tab.icon className="w-5 h-5 text-accent-foreground" />
                </div>
              ) : isProfile && isAuthenticated ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-[9px] bg-accent text-accent-foreground">{initials}</AvatarFallback>
                </Avatar>
              ) : isProfile ? (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">?</span>
                </div>
              ) : (
                <tab.icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
              )}
              <span className={`text-[10px] font-semibold ${tab.isCenter ? 'text-accent' : ''}`}>{tab.label}</span>
              {active && <div className="w-4 h-0.5 rounded-full bg-accent" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
