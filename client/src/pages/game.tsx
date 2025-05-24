import { useGameState } from '@/hooks/use-game-state';
import { SymbolPalette } from '@/components/symbol-palette';
import { PlayArea } from '@/components/play-area';
import { ProgressSidebar } from '@/components/progress-sidebar';
import { DiscoveryNotification } from '@/components/discovery-notification';
import { Skeleton } from '@/components/ui/skeleton';

export default function Game() {
  const {
    gameState,
    profile,
    recentDiscoveries,
    levelProgress,
    isLoading,
    isProcessing,
    addSymbol,
    clearCombination,
    processCombination,
    removeNotification,
    formattedSessionTime,
    currentLevel,
    discoveredSymbols,
  } = useGameState();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[600px] w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[800px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">∞</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-slate-800">Fractal Flow</h1>
                <p className="text-xs text-muted">Consciousness Discovery Game</p>
              </div>
            </div>
            
            {/* Stats and Menu */}
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-muted">⏱️</span>
                  <span className="text-slate-700">{formattedSessionTime()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-amber-500">⭐</span>
                  <span className="text-slate-700">{profile?.totalScore || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Symbol Palette */}
          <div className="lg:col-span-1">
            <SymbolPalette
              onSymbolClick={addSymbol}
              discoveredSymbols={discoveredSymbols}
            />
          </div>
          
          {/* Play Area */}
          <div className="lg:col-span-2">
            <PlayArea
              currentCombination={gameState.currentCombination}
              lastResponse={gameState.lastResponse}
              onCombine={processCombination}
              onClear={clearCombination}
              isProcessing={isProcessing}
            />
          </div>
          
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <ProgressSidebar
              profile={profile}
              recentDiscoveries={recentDiscoveries}
              levelProgress={levelProgress}
              currentLevel={currentLevel}
            />
          </div>
        </div>
      </main>
      
      {/* Notification System */}
      <DiscoveryNotification
        notifications={gameState.notifications}
        onRemove={removeNotification}
      />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
