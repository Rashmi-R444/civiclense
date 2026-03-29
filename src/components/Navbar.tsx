import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, Menu, Moon, Sun, Bell, X, User, FileText, Trophy, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Map', path: '/map' },
  { label: 'Projects', path: '/projects' },
  { label: 'Reports', path: '/reports' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'About', path: '/about' },
];

function UserAvatar({ className = '' }: { className?: string }) {
  const { user } = useAuth();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  return (
    <Avatar className={`h-8 w-8 ${className}`}>
      <AvatarImage src={user?.avatar} alt={user?.name} />
      <AvatarFallback className="text-xs bg-accent text-accent-foreground">{initials}</AvatarFallback>
    </Avatar>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Eye className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            CivicLens
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map(l => {
            const active = location.pathname === l.path;
            return (
              <Link key={l.path} to={l.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggle}>
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* Auth: avatar dropdown or sign-in */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reports')}>
                    <FileText className="mr-2 h-4 w-4" /> My Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/leaderboard')}>
                    <Trophy className="mr-2 h-4 w-4" /> Leaderboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="h-8 text-xs">Sign In</Button>
              </Link>
            )}
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card px-4 py-3 space-y-1">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${location.pathname === l.path ? 'bg-accent/10 text-accent' : 'text-muted-foreground'}`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" className="w-full text-destructive" onClick={() => { setMobileOpen(false); handleSignOut(); }}>
                Sign Out
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
