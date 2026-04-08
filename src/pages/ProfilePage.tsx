import { useState, useEffect } from 'react';
import { Camera, Award, FileText, Heart, Settings, Save } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useProjects } from '@/hooks/useProjects';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

type ProfileTab = 'reports' | 'following' | 'settings';

export default function ProfilePage() {
  const { user, profile, isAuthenticated, loading, refreshProfile } = useAuth();
  const { data: projects } = useProjects();
  const [tab, setTab] = useState<ProfileTab>('reports');
  const [fullName, setFullName] = useState('');
  const [ward, setWard] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setWard(profile.ward || '');
    }
  }, [profile]);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: '/profile' }} replace />;

  const myProjects = projects?.filter(p => p.created_by === user?.id) || [];

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, ward })
      .eq('user_id', user.id);
    if (error) toast.error('Failed to update profile');
    else {
      toast.success('Profile updated!');
      await refreshProfile();
    }
    setSaving(false);
  };

  const profileTabs: { id: ProfileTab; label: string; icon: any }[] = [
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'following', label: 'Following', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const initials = profile?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-bold text-accent">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{profile?.full_name || 'User'}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground capitalize">{profile?.role}</span>
                {profile?.ward && <span className="text-xs text-muted-foreground">{profile.ward}</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t text-center">
            <div><p className="text-lg font-bold">{myProjects.length}</p><p className="text-xs text-muted-foreground">Reports</p></div>
            <div><p className="text-lg font-bold">{profile?.ward || '—'}</p><p className="text-xs text-muted-foreground">Ward</p></div>
          </div>
        </div>

        <div className="flex gap-1 bg-muted p-1 rounded-lg overflow-x-auto">
          {profileTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'reports' && (
          <div className="space-y-3">
            {myProjects.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No reports yet.</p>}
            {myProjects.map(p => (
              <div key={p.id} className="bg-card rounded-lg border p-4">
                <h3 className="text-sm font-bold">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.location_text} • {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'following' && (
          <div className="text-center py-8 text-sm text-muted-foreground">Following feature coming soon.</div>
        )}

        {tab === 'settings' && (
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h3 className="font-bold">Edit Profile</h3>
            <div>
              <label className="text-xs font-semibold mb-1 block">Full Name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">Ward</label>
              <input value={ward} onChange={e => setWard(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background" placeholder="e.g. Ward 12 - Shivajinagar" />
            </div>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
