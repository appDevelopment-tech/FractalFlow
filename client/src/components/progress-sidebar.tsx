import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { DailyMysteryCard } from '@/components/daily-mystery';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { GameProfile, Discovery } from '@shared/schema';

interface ProgressSidebarProps {
  profile: GameProfile | undefined;
  recentDiscoveries: Discovery[];
  levelProgress: { current: number; max: number; percentage: number } | null;
  currentLevel: number;
  discoveredSymbols: string[];
}

// Helper component for progress content
function ProgressContent({ 
  profile, 
  levelProgress, 
  currentLevel,
  discoveredSymbols 
}: {
  profile: GameProfile | undefined;
  levelProgress: { current: number; max: number; percentage: number } | null;
  currentLevel: number;
  discoveredSymbols: string[];
}) {
  return (
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
  );
}

// Helper component for discoveries content
function DiscoveriesContent({ recentDiscoveries }: { recentDiscoveries: Discovery[] }) {
  return (
    <div className="space-y-3">
      {recentDiscoveries.length > 0 ? (
        recentDiscoveries.slice(0, 3).map((discovery, index) => (
          <div
            key={discovery.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border",
              index === 0 ? "bg-gradient-to-r from-accent/5 to-transparent border-accent/20" :
              index === 1 ? "bg-gradient-to-r from-secondary/5 to-transparent border-secondary/20" :
              "bg-slate-50 border-slate-200"
            )}
          >
            <div className="text-2xl">{discovery.symbolResult}</div>
            <div className="flex-1">
              <div className="font-medium text-slate-800">
                {getCombinationName(discovery.symbolResult)}
              </div>
              <div className="text-sm text-muted">
                {discovery.combination?.join(' + ')} = {discovery.symbolResult}
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              +{discovery.pointsEarned}
            </Badge>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted">
          <span className="text-4xl mb-2 block">🔍</span>
          No discoveries yet!<br />
          Start combining elements to see your progress.
        </div>
      )}
    </div>
  );
}

function getCombinationName(symbol: string): string {
  const names: Record<string, string> = {
    '👁️‍🗨️': 'Observer',
    '🌌': 'Space',
    '🌬️': 'Great Breath',
    '🌀': 'Fohat',
    '✨': 'Light',
    '🌊': 'Akasha',
    '⚖️': 'Karma',
    '⏰': 'Time',
    '💎': 'Matter',
    '🧠': 'Consciousness',
    '🌱': 'Life',
    '💭': 'Soul',
    '👤': 'Human',
    '❤️': 'Heart',
    '🔥': 'Fire',
    '💧': 'Water',
    '🌍': 'Earth',
    '💨': 'Air',
    '👼': 'Angel',
    '🧚': 'Elemental',
    '🌳': 'Tree of Life',
    '🏔️': 'Mountain',
    '👑': 'Solar Logos',
    '🌍': 'Gaia',
    '🦉': 'Wisdom',
    '🧘': 'Meditation',
    '🔮': 'Gnosis',
    '😊': 'Emotion',
    '💖': 'Love'
  };
  return names[symbol] || symbol;
}

export function ProgressSidebar({ 
  profile, 
  recentDiscoveries, 
  levelProgress, 
  currentLevel,
  discoveredSymbols
}: ProgressSidebarProps) {
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isDiscoveriesOpen, setIsDiscoveriesOpen] = useState(false);
  const [isDailyMysteryOpen, setIsDailyMysteryOpen] = useState(false);
  
  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* Progress Card - Mobile Collapsible */}
      <Collapsible open={isProgressOpen} onOpenChange={setIsProgressOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-white border-slate-200">
            <div className="flex items-center">
              <span className="text-primary mr-2">📈</span>
              Progress
            </div>
            {isProgressOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mt-2">
            <ProgressContent 
              profile={profile} 
              levelProgress={levelProgress} 
              currentLevel={currentLevel} 
              discoveredSymbols={discoveredSymbols}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Progress Card - Desktop */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="text-primary mr-2">📈</span>
          Progress
        </h3>
        <ProgressContent 
          profile={profile} 
          levelProgress={levelProgress} 
          currentLevel={currentLevel} 
          discoveredSymbols={discoveredSymbols}
        />
      </div>

      {/* Recent Discoveries - Mobile Collapsible */}
      <Collapsible open={isDiscoveriesOpen} onOpenChange={setIsDiscoveriesOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-white border-slate-200">
            <div className="flex items-center">
              <span className="text-accent mr-2">⏰</span>
              Recent Discoveries
            </div>
            {isDiscoveriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mt-2">
            <DiscoveriesContent recentDiscoveries={recentDiscoveries} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Recent Discoveries - Desktop */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="text-accent mr-2">⏰</span>
          Recent Discoveries
        </h3>
        <DiscoveriesContent recentDiscoveries={recentDiscoveries} />
      </div>

      {/* Daily Mystery - Mobile Collapsible */}
      <Collapsible open={isDailyMysteryOpen} onOpenChange={setIsDailyMysteryOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-white border-slate-200">
            <div className="flex items-center">
              <span className="text-purple-500 mr-2">🌟</span>
              Daily Mystery
            </div>
            {isDailyMysteryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2">
            <DailyMysteryCard discoveredSymbols={discoveredSymbols} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Daily Mystery - Desktop */}
      <div className="hidden md:block">
        <DailyMysteryCard discoveredSymbols={discoveredSymbols} />
      </div>
    </div>
  );
}