import { useState } from 'react';
import { ThumbsUp, MapPin, Camera, Send } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import CameraCapture from '@/components/CameraCapture';
import { Button } from '@/components/ui/button';
import { useProjects, toggleUpvote, type ProjectWithUpvotes } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';

const statusFilters = ['All', 'Reported', 'In Progress', 'Completed'];
const categories = ['Road', 'Water', 'Sanitation', 'Electricity', 'Other'];

export default function ReportsPage() {
  const { user, isAuthenticated } = useAuth();
  const { data: projects, isLoading } = useProjects(user?.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(searchParams.get('new') === 'true');
  const [showCamera, setShowCamera] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Road');
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState('');
  const [ward, setWard] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [submitting, setSubmitting] = useState(false);

  const filtered = (projects || []).filter(p => filterStatus === 'All' || p.status === filterStatus);

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to submit a report.');
      navigate('/login', { state: { from: '/reports' } });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('projects').insert({
      title,
      description,
      category,
      location_text: locationText,
      ward,
      created_by: user.id,
    });
    if (error) {
      toast.error('Failed to submit report: ' + error.message);
    } else {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setTitle('');
        setDescription('');
        setLocationText('');
        setWard('');
        setCapturedPhoto(null);
      }, 2000);
    }
    setSubmitting(false);
  };

  const handleUpvote = async (p: ProjectWithUpvotes) => {
    if (!user) {
      toast.error('Please sign in to upvote.');
      return;
    }
    await toggleUpvote(p.id, user.id, !!p.user_has_upvoted);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-sm text-muted-foreground">Community-reported issues and concerns</p>
          </div>
          <Button className="bg-accent text-accent-foreground gap-1.5" onClick={() => setShowForm(true)}>
            <Send className="w-4 h-4" /> Submit Report
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${filterStatus === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground'}`}>
              {s}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading…</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="bg-card rounded-lg border p-4 card-shadow space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">{p.category}</span>
                    <h3 className="text-sm font-bold text-foreground mt-1">{p.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    p.status === 'Completed' ? 'bg-accent/10 text-accent' : p.status === 'In Progress' ? 'bg-info/10 text-info' : 'bg-muted text-muted-foreground'
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <button onClick={() => handleUpvote(p)} className={`flex items-center gap-1 ${p.user_has_upvoted ? 'text-accent font-semibold' : ''}`}>
                    <ThumbsUp className="w-3 h-3" fill={p.user_has_upvoted ? 'currentColor' : 'none'} /> {p.upvote_count}
                  </button>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location_text || p.ward || '—'}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No reports found.</div>}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto"><Send className="w-6 h-6 text-accent" /></div>
                <h3 className="font-bold">Report Submitted!</h3>
                <p className="text-sm text-muted-foreground">Your report has been received and will be reviewed.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Submit Report</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground text-sm">Cancel</button>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Title</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background" placeholder="Brief title..." />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Location</label>
                  <input value={locationText} onChange={e => setLocationText(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background" placeholder="e.g. MG Road, Bengaluru" />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Ward</label>
                  <input value={ward} onChange={e => setWard(e.target.value)} className="w-full h-9 border rounded-md px-3 text-sm bg-background" placeholder="e.g. Ward 12 - Shivajinagar" />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border rounded-md px-3 py-2 text-sm bg-background resize-none" placeholder="Describe the issue..." />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Photo Evidence</label>
                  {capturedPhoto ? (
                    <div className="relative">
                      <img src={capturedPhoto} alt="Evidence" className="w-full h-32 object-cover rounded-md" />
                      <button onClick={() => setCapturedPhoto(null)} className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Remove</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowCamera(true)} className="w-full border-2 border-dashed rounded-md p-4 flex flex-col items-center gap-1 text-muted-foreground hover:border-accent/40 transition-colors">
                      <Camera className="w-5 h-5" />
                      <span className="text-xs">Capture or upload photo</span>
                    </button>
                  )}
                </div>
                <Button className="w-full bg-accent text-accent-foreground" disabled={!title || !description || submitting} onClick={handleSubmit}>
                  {submitting ? 'Submitting…' : 'Submit Report'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {showCamera && (
        <CameraCapture
          onCapture={(img) => { setCapturedPhoto(img); setShowCamera(false); }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </AppLayout>
  );
}
