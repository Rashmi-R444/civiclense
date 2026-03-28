import { Link, useLocation } from 'react-router-dom';
import { Eye, Menu, Moon, Sun, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Map', path: '/map' },
  { label: 'Projects', path: '/projects' },
  { label: 'Reports', path: '/reports' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link to="/login" className="hidden md:block">
            <Button variant="outline" size="sm" className="h-8 text-xs">Log in</Button>
          </Link>
          <Link to="/login" className="hidden md:block">
            <Button size="sm" className="h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">Sign up</Button>
          </Link>
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
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Log in</Button></Link>
            <Link to="/login" className="flex-1"><Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Sign up</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
