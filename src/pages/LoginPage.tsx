import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    if (isSignup) {
      const { error } = await signup(email, password, fullName);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Account created! You can now sign in.');
        setIsSignup(false);
      }
    } else {
      const { error } = await login(email, password);
      if (error) {
        toast.error(error);
      } else {
        navigate(from, { replace: true });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignup ? 'Join CivicLens and start making a difference' : 'Sign in to your CivicLens account'}
          </p>
        </div>

        <div className="bg-card rounded-xl border p-6 space-y-4">
          {isSignup && (
            <div>
              <label className="text-xs font-semibold mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full h-9 border rounded-md pl-9 pr-3 text-sm bg-background" placeholder="Your name" />
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full h-9 border rounded-md pl-9 pr-3 text-sm bg-background" placeholder="email@example.com" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-9 border rounded-md pl-9 pr-3 text-sm bg-background" placeholder="••••••••" />
            </div>
          </div>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Please wait…' : isSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-accent font-semibold hover:underline">
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
