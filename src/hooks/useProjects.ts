import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Project = Tables<'projects'>;

export interface ProjectWithUpvotes extends Project {
  upvote_count: number;
  user_has_upvoted?: boolean;
}

export function useProjects(userId?: string) {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithUpvotes[]> => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch upvote counts
      const { data: upvoteCounts } = await supabase
        .from('upvotes')
        .select('project_id');

      const countMap: Record<string, number> = {};
      upvoteCounts?.forEach(u => {
        countMap[u.project_id] = (countMap[u.project_id] || 0) + 1;
      });

      // Check user upvotes if logged in
      let userUpvotes: Set<string> = new Set();
      if (userId) {
        const { data: userVotes } = await supabase
          .from('upvotes')
          .select('project_id')
          .eq('user_id', userId);
        userVotes?.forEach(u => userUpvotes.add(u.project_id));
      }

      return (projects || []).map(p => ({
        ...p,
        upvote_count: countMap[p.id] || 0,
        user_has_upvoted: userUpvotes.has(p.id),
      }));
    },
  });
}

export async function toggleUpvote(projectId: string, userId: string, hasUpvoted: boolean) {
  if (hasUpvoted) {
    await supabase.from('upvotes').delete().eq('project_id', projectId).eq('user_id', userId);
  } else {
    await supabase.from('upvotes').insert({ project_id: projectId, user_id: userId });
  }
}
