import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { GameProfile, Discovery } from '@shared/schema';

interface ProgressSidebarProps {
  profile: GameProfile | undefined;
  recentDiscoveries: Discovery[];
  levelProgress: { current: number; max: number; percentage: number } | null;
  currentLevel: number;
}

export function ProgressSidebar({ 
  profile, 
  recentDiscoveries, 
  levelProgress, 
  currentLevel 
}: ProgressSidebarProps) {
  return (
    <div className="space-y-6">
      
      {/* Progress Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="text-primary mr-2">📈</span>
          Progress
        </h3>
        
        <div className="space-y-4">
          {/* Level Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Level {currentLevel}
              </span>
              {levelProgress && (
                <span className="text-xs text-muted">
                  {levelProgress.current}/{levelProgress.max}
                </span>
              )}
            </div>
            <Progress 
              value={levelProgress?.percentage || 0} 
              className="h-2"
            />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary">
                {profile?.totalDiscoveries || 0}
              </div>
              <div className="text-xs text-muted">Discoveries</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-secondary">
                {profile?.flowStreak || 0}
              </div>
              <div className="text-xs text-muted">Flow Streak</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Discoveries */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="text-accent mr-2">⏰</span>
          Recent Discoveries
        </h3>
        
        <div className="space-y-3">
          {recentDiscoveries.length > 0 ? (
            recentDiscoveries.slice(0, 3).map((discovery, index) => (
              <div
                key={discovery.id}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg border",
                  index === 0 ? "bg-gradient-to-r from-accent/5 to-transparent border-accent/20" :
                  index === 1 ? "bg-gradient-to-r from-secondary/5 to-transparent border-secondary/20" :
                  "bg-gradient-to-r from-emerald-50 to-transparent border-emerald-200"
                )}
              >
                <div className={cn(
                  "text-lg font-mono",
                  index === 0 ? "text-accent" :
                  index === 1 ? "text-secondary" :
                  "text-emerald-700"
                )}>
                  {discovery.symbolResult}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">
                    {getCombinationName(discovery.symbolResult)}
                  </div>
                  <div className="text-xs text-muted">
                    {Array.isArray(discovery.combination) 
                      ? discovery.combination.join(' + ') 
                      : 'Unknown combination'} = {discovery.symbolResult}
                  </div>
                </div>
                <div className={cn(
                  "text-xs font-medium",
                  index === 0 ? "text-accent" :
                  index === 1 ? "text-secondary" :
                  "text-emerald-700"
                )}>
                  +{discovery.points}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm">No discoveries yet</p>
              <p className="text-xs">Start combining symbols!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Easter Egg Hint */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
          <span className="text-purple-500 mr-2">🥚</span>
          Mystery
        </h3>
        <p className="text-sm text-slate-600 mb-3">
          Some patterns reveal themselves only when discovered in sequence...
        </p>
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/50 rounded-lg px-3 py-2">
            <span className="text-lg font-mono">?</span>
            <span className="text-sm text-muted">+</span>
            <span className="text-lg font-mono">?</span>
            <span className="text-sm text-muted">=</span>
            <span className="text-lg">✧</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get display name for symbols
function getCombinationName(symbol: string): string {
  const names: Record<string, string> = {
    '◐': 'Half Moon',
    '∞': 'Infinity',
    '∴': 'Therefore',
    '+': 'Cross',
    '✚': 'Double Cross',
    '⊗': 'Circled Times',
    '‽': 'Interrobang',
    '⊙': 'Circled Dot',
    '◑': 'Yin Yang Start',
    '∶': 'Ratio',
    '✤': 'Star Cross',
    '|||': 'Triple Bar',
    '✧': 'Infinite Point',
    '☯': 'Yin Yang',
    '◊': 'Diamond',
  };
  
  return names[symbol] || 'Unknown Symbol';
}
