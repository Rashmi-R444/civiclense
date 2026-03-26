import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Send, CheckCircle } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/dummy';

const issueTypes = ['Safety Hazard', 'Delay', 'Quality', 'Environmental', 'Budget', 'Other'];

export default function ReportIssue() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');

  if (submitted) {
    return (
      <MobileLayout title="Report Submitted" showBack role="citizen" hideNav>
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">Thank You!</h2>
          <p className="text-sm text-muted-foreground max-w-xs">Your report has been submitted and will be reviewed by the admin team.</p>
          <Button className="rounded-xl h-11 px-8 font-bold" onClick={() => navigate('/citizen')}>Back to Home</Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Report Issue" showBack role="citizen" hideNav>
      <div className="space-y-5">
        {project && (
          <div className="bg-primary/5 rounded-xl p-3 border">
            <p className="text-xs text-muted-foreground">Reporting for</p>
            <p className="text-sm font-bold text-foreground">{project.name}</p>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">Issue Type</label>
          <div className="grid grid-cols-2 gap-2">
            {issueTypes.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  type === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Describe the issue in detail..."
            className="w-full rounded-xl bg-card border p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <button className="w-full bg-card rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/30 transition-colors">
          <Camera className="w-6 h-6" />
          <span className="text-xs font-semibold">Upload Photo (Optional)</span>
        </button>

        <Button className="w-full h-12 rounded-xl font-bold gap-2" disabled={!type || !desc} onClick={() => setSubmitted(true)}>
          <Send className="w-4 h-4" /> Submit Report
        </Button>
      </div>
    </MobileLayout>
  );
}
