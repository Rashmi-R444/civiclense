import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<'citizen' | 'admin'>('citizen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'admin' ? '/admin' : '/citizen');
  };

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      <div className="bg-primary px-6 pt-12 pb-10 rounded-b-[2rem]">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-7 h-7 text-primary-foreground" />
          <span className="text-xl font-extrabold text-primary-foreground">OpenWorks</span>
        </div>
        <p className="text-primary-foreground/70 text-sm">{isSignup ? 'Create your account' : 'Welcome back'}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-8 space-y-5">
        {/* Role selector */}
        <div className="flex gap-2">
          {(['citizen', 'admin'] as const).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                role === r ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
              }`}
            >
              {r === 'citizen' ? '👤 Citizen' : '🛡️ Admin'}
            </button>
          ))}
        </div>

        {isSignup && (
          <div className="relative">
            <Input placeholder="Full Name" className="pl-10 h-12 rounded-xl bg-card border" />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <Input type="email" placeholder="Email address" className="pl-10 h-12 rounded-xl bg-card border" defaultValue="demo@openworks.app" />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          <Input type="password" placeholder="Password" className="pl-10 h-12 rounded-xl bg-card border" defaultValue="password" />
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm">
          {isSignup ? 'Create Account' : 'Sign In'}
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-border" />
          <span>or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full h-12 rounded-xl font-semibold text-sm gap-2" onClick={() => navigate(role === 'admin' ? '/admin' : '/citizen')}>
          <Chrome className="w-4 h-4" /> Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" className="text-primary font-bold" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}
