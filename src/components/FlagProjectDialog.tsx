import { useState } from 'react';
import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

const FLAG_REASONS = [
  'Inaccurate information',
  'Duplicate project',
  'Spam or irrelevant',
  'Other',
] as const;

function getFlaggedProjects(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem('civiclens_flags') || '{}');
  } catch {
    return {};
  }
}

function saveFlaggedProject(projectId: string, userId: string) {
  const flags = getFlaggedProjects();
  if (!flags[userId]) flags[userId] = [];
  flags[userId].push(projectId);
  localStorage.setItem('civiclens_flags', JSON.stringify(flags));
}

function hasUserFlagged(projectId: string, userId: string): boolean {
  const flags = getFlaggedProjects();
  return flags[userId]?.includes(projectId) ?? false;
}

interface FlagProjectButtonProps {
  projectId: string;
  variant?: 'desktop' | 'mobile';
}

export default function FlagProjectButton({ projectId, variant = 'desktop' }: FlagProjectButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>(FLAG_REASONS[0]);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const alreadyFlagged = isAuthenticated && user ? hasUserFlagged(projectId, user.id) : false;

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to flag a project.');
      navigate('/login');
      return;
    }
    if (alreadyFlagged) return;
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!user) return;
    setSubmitting(true);
    // Simulate async
    setTimeout(() => {
      saveFlaggedProject(projectId, user.id);
      setSubmitting(false);
      setOpen(false);
      setReason(FLAG_REASONS[0]);
      setDetails('');
      toast.success('Project flagged — thank you for your report.');
    }, 400);
  };

  const isFlagged = alreadyFlagged;

  const button = variant === 'desktop' ? (
    <Button
      variant="outline"
      size="sm"
      className={`h-8 text-xs gap-1 ${isFlagged ? 'text-destructive border-destructive bg-destructive/10' : 'text-destructive border-destructive/30'}`}
      onClick={handleClick}
      disabled={isFlagged}
    >
      <Flag className="w-3 h-3" fill={isFlagged ? 'currentColor' : 'none'} />
      {isFlagged ? 'Flagged' : 'Flag'}
    </Button>
  ) : (
    <Button
      className={`flex-1 h-12 rounded-xl font-bold gap-2 ${isFlagged ? 'bg-destructive/10 text-destructive border border-destructive' : ''}`}
      variant={isFlagged ? 'outline' : 'destructive'}
      onClick={handleClick}
      disabled={isFlagged}
    >
      <Flag className="w-4 h-4" fill={isFlagged ? 'currentColor' : 'none'} />
      {isFlagged ? 'Flagged' : 'Flag Project'}
    </Button>
  );

  return (
    <>
      {isFlagged ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent><p>You've already flagged this project.</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        button
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flag this project</DialogTitle>
            <DialogDescription>Select a reason for flagging. This helps us review and improve data quality.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              {FLAG_REASONS.map(r => (
                <div key={r} className="flex items-center gap-2">
                  <RadioGroupItem value={r} id={`flag-${r}`} />
                  <Label htmlFor={`flag-${r}`} className="text-sm cursor-pointer">{r}</Label>
                </div>
              ))}
            </RadioGroup>
            <Textarea
              placeholder="Additional details (optional)"
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="resize-none h-20"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" variant="destructive" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Flag'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
