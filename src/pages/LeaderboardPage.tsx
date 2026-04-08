import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Trophy, Medal, Award, FileText } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LeaderEntry {
  ward: string;
  count: number;
  rank: number;
}

export default function LeaderboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const { data: projects } = useProjects();

  const leaderboard = useMemo<LeaderEntry[]>(() => {
    if (!projects) return [];
    const counts: Record<string, number> = {};
    projects.forEach(p => {
      const ward = p.ward || 'Unknown';
      counts[ward] = (counts[ward] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([ward, count], i) => ({ ward, count, rank: i + 1 }));
  }, [projects]);

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-5 h-5 text-warning/70" />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const rankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-warning" />
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm">Wards ranked by total reports submitted</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-lg font-semibold text-foreground">No reports yet</p>
            <p className="text-muted-foreground text-sm">Be the first to make a difference!</p>
          </div>
        ) : (
          <div className="bg-card border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead className="text-right">Reports</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map(entry => (
                  <TableRow key={entry.ward}>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {rankIcon(entry.rank)}
                        {rankMedal(entry.rank) && <span className="text-base">{rankMedal(entry.rank)}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">{entry.ward}</span>
                      {entry.rank <= 3 && (
                        <Badge className="ml-2 text-[10px] px-1.5 py-0 bg-warning/10 text-warning border-warning/20">
                          Top {entry.rank}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-primary text-lg">{entry.count}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
