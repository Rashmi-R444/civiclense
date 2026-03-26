import { UserCheck, UserX, Shield } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { users } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function UserManagement() {
  return (
    <MobileLayout title="User Management" role="admin">
      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="bg-card rounded-xl p-4 border card-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{u.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{u.name}</p>
                  {u.role === 'admin' && <Shield className="w-3.5 h-3.5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">{u.email}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Joined {u.joinDate} • {u.reportsCount} reports</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
              }`}>
                {u.role}
              </span>
            </div>
            {u.role === 'citizen' && (
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 h-8 rounded-lg text-xs font-semibold gap-1"
                  onClick={() => toast(`${u.name} approved`)}>
                  <UserCheck className="w-3 h-3" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 rounded-lg text-xs font-semibold gap-1 text-destructive border-destructive/20"
                  onClick={() => toast(`${u.name} removed`)}>
                  <UserX className="w-3 h-3" /> Remove
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
