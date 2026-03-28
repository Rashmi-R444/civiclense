import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, MapPin, Camera, Send, Eye } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import CameraCapture from '@/components/CameraCapture';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { reports, issueCategoryConfig, IssueCategory } from '@/data/mockData';

const statusSteps = ['Submitted', 'Verified', 'Authority Notified', 'Resolved'];

export default function ReportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IssueCategory>('infrastructure');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = reports.filter(r => filterStatus === 'All' || r.status === filterStatus);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setTitle(''); setDescription(''); setCapturedPhoto(null); }, 2000);
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

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {['All', ...statusSteps].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${filterStatus === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Report list */}
        <div className="space-y-3">
          {filtered.map(r => {
            const cat = issueCategoryConfig[r.category];
            const stepIdx = statusSteps.indexOf(r.status);
            return (
              <div key={r.id} className="bg-card rounded-lg border p-4 card-shadow space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${cat.bgColor} ${cat.color}`}>{cat.label}</span>
                    <h3 className="text-sm font-bold text-foreground mt-1">{r.title}</h3>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>

                {/* Status tracker */}
                <div className="flex items-center gap-1">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-1 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i <= stepIdx ? 'bg-accent' : 'bg-muted'}`} />
                      <span className={`text-[9px] ${i <= stepIdx ? 'text-accent font-semibold' : 'text-muted-foreground'}`}>{step}</span>
                      {i < statusSteps.length - 1 && <div className={`flex-1 h-px ${i < stepIdx ? 'bg-accent' : 'bg-muted'}`} />}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {r.upvotes}</span>
                    <span className="flex items-center gap-1"><ThumbsDown className="w-3 h-3" /> {r.downvotes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {r.comments}</span>
                  </div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.location}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {r.anonymous ? 'Anonymous' : r.reporter} • {r.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit form modal */}
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
                  <select value={category} onChange={e => setCategory(e.target.value as IssueCategory)} className="w-full h-9 border rounded-md px-3 text-sm bg-background">
                    {Object.entries(issueCategoryConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
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
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} className="rounded" />
                  Submit anonymously
                </label>
                <Button className="w-full bg-accent text-accent-foreground" disabled={!title || !description} onClick={handleSubmit}>
                  Submit Report
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
