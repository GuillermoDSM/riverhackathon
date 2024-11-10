import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <div className="size-full rounded-full bg-gradient-to-br from-primary/50 to-primary/30" />
        </Avatar>
        <div>
          <h2 className="font-semibold">{user?.name || 'Anonymous User'}</h2>
          <p className="text-sm text-muted-foreground">
            Level {user?.level || 1}: {user?.xp || 0} XP
          </p>
        </div>
      </div>
      <Button variant="outline" onClick={logout}>Disconnect</Button>
    </div>
  );
} 