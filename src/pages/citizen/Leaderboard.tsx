import { Trophy, Medal, Award, Star, Shield } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { leaderboard } from '@/data/dummy';

const badgeIcons: Record<string, { icon: typeof Trophy; color: string }> = {
  Reporter: { icon: Medal, color: 'text-info' },
  Watchdog: { icon: Shield, color: 'text-warning' },
  Contributor: { icon: Star, color: 'text-accent' },
};

export default function Leaderboard() {
  return (
    <MobileLayout title="Leaderboard" showBack role="citizen">
      <div className="space-y-5">
        {/* Top 3 */}
        <div className="flex items-end justify-center gap-3 pt-4 pb-2">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].filter(Boolean).map((u, i) => {
            const isFirst = i === 1;
            return (
              <div key={u.id} className={`flex flex-col items-center ${isFirst ? 'order-2' : i === 0 ? 'order-1' : 'order-3'}`}>
                <div className={`rounded-full flex items-center justify-center mb-2 border-2 ${
                  isFirst ? 'w-16 h-16 border-warning bg-warning/10' : 'w-12 h-12 border-border bg-card'
                }`}>
                  <span className={isFirst ? 'text-2xl' : 'text-lg'}>{u.avatar}</span>
                </div>
                {isFirst && <Trophy className="w-5 h-5 text-warning -mt-1 mb-1" />}
                <p className="text-xs font-bold text-foreground text-center">{u.name.split(' ')[0]}</p>
                <p className="text-[10px] font-bold text-primary">{u.points} pts</p>
              </div>
            );
          })}
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {leaderboard.map(u => (
            <div key={u.id} className="flex items-center gap-3 bg-card rounded-xl p-3 border card-shadow">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                u.rank === 1 ? 'bg-warning/10 text-warning' : u.rank === 2 ? 'bg-muted text-muted-foreground' : u.rank === 3 ? 'bg-warning/5 text-warning' : 'bg-muted text-muted-foreground'
              }`}>
                #{u.rank}
              </span>
              <span className="text-xl">{u.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{u.name}</p>
                <div className="flex gap-1 mt-0.5">
                  {u.badges.map(b => {
                    const badge = badgeIcons[b];
                    return badge ? <badge.icon key={b} className={`w-3.5 h-3.5 ${badge.color}`} /> : null;
                  })}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-primary">{u.points}</p>
                <p className="text-[10px] text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
