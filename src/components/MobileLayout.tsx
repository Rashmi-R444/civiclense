import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Bell, User, LayoutDashboard, Users, FileBarChart, ChevronLeft } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  role?: 'citizen' | 'admin';
  hideNav?: boolean;
}

const citizenTabs = [
  { icon: Home, label: 'Home', path: '/citizen' },
  { icon: Map, label: 'Map', path: '/citizen/map' },
  { icon: Bell, label: 'Alerts', path: '/citizen/notifications' },
  { icon: User, label: 'Profile', path: '/citizen/profile' },
];

const adminTabs = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Map, label: 'Map', path: '/admin/map' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: FileBarChart, label: 'Reports', path: '/admin/analytics' },
];

export default function MobileLayout({ children, title, showBack, role = 'citizen', hideNav }: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = role === 'admin' ? adminTabs : citizenTabs;

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      {title && (
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b px-4 py-3 flex items-center gap-3 card-shadow">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          <h1 className="text-lg font-bold text-foreground flex-1">{title}</h1>
        </header>
      )}
      <main className="flex-1 overflow-y-auto screen-padding">{children}</main>
      {!hideNav && (
        <nav className="sticky bottom-0 z-30 bg-card/95 backdrop-blur-lg border-t px-2 pb-1 pt-1 card-shadow">
          <div className="flex justify-around">
            {tabs.map(tab => {
              const active = location.pathname === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all ${active ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <tab.icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px] font-semibold">{tab.label}</span>
                  {active && <div className="w-4 h-0.5 rounded-full bg-primary mt-0.5" />}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
