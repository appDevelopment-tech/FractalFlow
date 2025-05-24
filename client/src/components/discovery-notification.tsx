import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Notification } from '@/hooks/use-game-state';

interface DiscoveryNotificationProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function DiscoveryNotification({ notifications, onRemove }: DiscoveryNotificationProps) {
  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, 5000);
      
      return () => clearTimeout(timer);
    });
  }, [notifications, onRemove]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "bg-white shadow-lg rounded-xl border p-4 max-w-sm",
            "transform translate-x-0 transition-all duration-300 ease-out",
            "animate-in slide-in-from-right-full"
          )}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm",
                notification.type === 'discovery' && "bg-gradient-to-br from-accent to-amber-500",
                notification.type === 'level_up' && "bg-gradient-to-br from-primary to-blue-500",
                notification.type === 'special' && "bg-gradient-to-br from-purple-500 to-pink-500"
              )}>
                {notification.type === 'discovery' && '⭐'}
                {notification.type === 'level_up' && '🎉'}
                {notification.type === 'special' && '✨'}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-800">
                {notification.title}
              </div>
              <div className="text-xs text-muted mt-1">
                {notification.message}
              </div>
              {notification.points && (
                <div className="text-xs text-accent font-medium mt-1">
                  +{notification.points} points
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(notification.id)}
              className="text-slate-400 hover:text-slate-600 h-auto p-1"
            >
              ✕
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
