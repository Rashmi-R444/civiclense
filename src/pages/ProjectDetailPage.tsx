import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Share2, ThumbsUp } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { useProjects, toggleUpvote } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import FlagProjectButton from '@/components/FlagProjectDialog';
import { toast } from 'sonner';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: projects, isLoading } = useProjects(user?.id);
  const queryClient = useQueryClient();

  const project = projects?.find(p => p.id === id);

  if (isLoading) return <AppLayout><div className="text-center py-12 text-muted-foreground">Loading…</div></AppLayout>;

  if (!project) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-xl font-bold">Project not found</h1>
          <Link to="/projects" className="text-accent text-sm mt-2 inline-block">← Back to Projects</Link>
        </div>
      </AppLayout>
    );
  }

  const handleUpvote = async () => {
    if (!user) { toast.error('Please sign in to upvote.'); return; }
    await toggleUpvote(project.id, user.id, !!project.user_has_upvoted);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground mb-3">
              <ArrowLeft className="w-3 h-3" /> Back to Projects
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20">{project.category}</span>
                <h1 className="text-xl font-bold mt-2">{project.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-xs text-primary-foreground/70">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location_text || project.ward || '—'}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                project.status === 'Completed' ? 'bg-accent/20 text-accent' : project.status === 'In Progress' ? 'bg-info/20 text-info' : 'bg-white/20'
              }`}>{project.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 border-b">
            <Button variant="outline" size="sm" className={`h-8 text-xs gap-1 ${project.user_has_upvoted ? 'text-accent border-accent' : ''}`} onClick={handleUpvote}>
              <ThumbsUp className="w-3 h-3" fill={project.user_has_upvoted ? 'currentColor' : 'none'} /> {project.upvote_count}
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Share2 className="w-3 h-3" /> Share</Button>
            <FlagProjectButton projectId={project.id} variant="desktop" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoCard label="Category" value={project.category} />
            <InfoCard label="Status" value={project.status} />
            <InfoCard label="Ward" value={project.ward || '—'} />
            <InfoCard label="Upvotes" value={String(project.upvote_count)} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-lg border p-3 text-center">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
