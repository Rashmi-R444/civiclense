import { useState } from 'react';
import { Camera, Download, Trash2, Link as LinkIcon, MapPin, Award, FileText, Heart, Settings } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import CameraCapture from '@/components/CameraCapture';
import { Button } from '@/components/ui/button';
import { currentUser, reports, Evidence } from '@/data/mockData';

type ProfileTab = 'reports' | 'following' | 'evidence' | 'settings';

export default function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>('reports');
  const [showCamera, setShowCamera] = useState(false);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([
    { id: 'e1', imageUrl: '', lat: 12.9716, lng: 77.5946, locationLabel: 'MG Road, Bengaluru', timestamp: '2026-03-20T10:30:00', linkedReportId: 'r1' },
    { id: 'e2', imageUrl: '', lat: 12.9352, lng: 77.6710, locationLabel: 'Bellandur, Bengaluru', timestamp: '2026-03-18T14:15:00' },
  ]);

  const userReports = reports.filter(r => r.reporter === currentUser.name);
  const profileTabs: { id: ProfileTab; label: string; icon: any }[] = [
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'following', label: 'Following', icon: Heart },
    { id: 'evidence', label: 'My Evidence', icon: Camera },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const roleBadgeColors: Record<string, string> = {
    'Citizen': 'bg-muted text-muted-foreground',
    'Verified Reporter': 'bg-accent/10 text-accent',
    'NGO Partner': 'bg-info/10 text-info',
    'Government Official': 'bg-warning/10 text-warning',
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile header */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-3xl">{currentUser.avatar}</div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{currentUser.name}</h1>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${roleBadgeColors[currentUser.role]}`}>{currentUser.role}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Award className="w-3 h-3 text-accent" /> Reputation: {currentUser.reputation}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t text-center">
            <div><p className="text-lg font-bold">{currentUser.reportsCount}</p><p className="text-xs text-muted-foreground">Reports</p></div>
            <div><p className="text-lg font-bold">{currentUser.followingCount}</p><p className="text-xs text-muted-foreground">Following</p></div>
            <div><p className="text-lg font-bold">{currentUser.reputation}</p><p className="text-xs text-muted-foreground">Rep Score</p></div>
          </div>
        </div>

        {/* Tabs */}
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
            {userReports.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No reports yet.</p>}
            {userReports.map(r => (
              <div key={r.id} className="bg-card rounded-lg border p-4">
                <h3 className="text-sm font-bold">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{r.location} • {r.date}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'following' && (
          <div className="text-center py-8 text-sm text-muted-foreground">You're following {currentUser.followingCount} projects.</div>
        )}

        {tab === 'evidence' && (
          <div className="space-y-4">
            <Button className="bg-accent text-accent-foreground gap-1.5" onClick={() => setShowCamera(true)}>
              <Camera className="w-4 h-4" /> Capture Evidence
            </Button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {evidenceList.map(ev => (
                <div key={ev.id} className="bg-card rounded-lg border overflow-hidden">
                  <div className="h-28 bg-muted flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {ev.locationLabel}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{new Date(ev.timestamp).toLocaleDateString()}</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2"><LinkIcon className="w-3 h-3 mr-1" /> Attach</Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2"><Download className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-card rounded-lg border p-6 text-sm text-muted-foreground text-center">Settings panel coming soon.</div>
        )}
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={(img, gps) => {
            setEvidenceList(prev => [{ id: `e${Date.now()}`, imageUrl: img, lat: gps.lat, lng: gps.lng, locationLabel: gps.locationLabel, timestamp: gps.timestamp }, ...prev]);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </AppLayout>
  );
}
