import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Trophy, Medal, Award, FileText } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { reports } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LeaderEntry {
  reporter: string;
  count: number;
  rank: number;
}

export default function LeaderboardPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const leaderboard = useMemo<LeaderEntry[]>(() => {
    const counts: Record<string, number> = {};
    reports.forEach((r) => {
      const name = r.anonymous ? 'Anonymous' : r.reporter;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([reporter, count], i) => ({ reporter, count, rank: i + 1 }));
  }, []);

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
          <p className="text-muted-foreground text-sm">
            Citizens ranked by total reports submitted
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-lg font-semibold text-foreground">No reports yet</p>
            <p className="text-muted-foreground text-sm">
              Be the first to make a difference!
            </p>
          </div>
        ) : (
          <div className="bg-card border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead className="text-right">Reports</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry) => {
                  const isCurrentUser = user?.name === entry.reporter;
                  return (
                    <TableRow
                      key={entry.reporter}
                      className={
                        isCurrentUser
                          ? 'bg-accent/10 border-l-2 border-l-accent'
                          : ''
                      }
                    >
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {rankIcon(entry.rank)}
                          {rankMedal(entry.rank) && (
                            <span className="text-base">{rankMedal(entry.rank)}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {entry.reporter}
                          </span>
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              You
                            </Badge>
                          )}
                          {entry.rank <= 3 && (
                            <Badge className="text-[10px] px-1.5 py-0 bg-warning/10 text-warning border-warning/20">
                              Top {entry.rank}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-primary text-lg">
                          {entry.count}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
