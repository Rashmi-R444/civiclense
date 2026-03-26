import { Check, X, MessageSquare } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { issues } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  Approved: 'bg-success/10 text-success',
  Rejected: 'bg-destructive/10 text-destructive',
  Resolved: 'bg-info/10 text-info',
};

export default function AdminComplaints() {
  return (
    <MobileLayout title="Complaints" showBack role="admin">
      <div className="space-y-3">
        {issues.map(issue => (
          <div key={issue.id} className="bg-card rounded-xl p-4 border card-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-bold text-foreground">{issue.type}</p>
                <p className="text-xs text-muted-foreground">{issue.projectName}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[issue.status]}`}>
                {issue.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{issue.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">By {issue.reporter} • {issue.date}</span>
              {issue.status === 'Pending' && (
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 px-2 rounded-lg text-[10px] gap-1 text-success border-success/20"
                    onClick={() => toast('Approved')}>
                    <Check className="w-3 h-3" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 rounded-lg text-[10px] gap-1 text-destructive border-destructive/20"
                    onClick={() => toast('Rejected')}>
                    <X className="w-3 h-3" /> Reject
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 rounded-lg text-[10px] gap-1"
                    onClick={() => toast('Response sent')}>
                    <MessageSquare className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
