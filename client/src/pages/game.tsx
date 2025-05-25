import { useState } from 'react';
import { useGameState } from '@/hooks/use-game-state';
import { SymbolPalette } from '@/components/symbol-palette';
import { PlayArea } from '@/components/play-area';
import { ProgressSidebar } from '@/components/progress-sidebar';
import { DiscoveryNotification } from '@/components/discovery-notification';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    resetProgress,
    formattedSessionTime,
    currentLevel,
    discoveredSymbols,
  } = useGameState();

  const [showHelp, setShowHelp] = useState(false);

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
              
              {/* Help and Reset Buttons */}
              <div className="flex items-center space-x-2">
                <Dialog open={showHelp} onOpenChange={setShowHelp}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-white/80">
                      <span className="text-lg">?</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>How to Play Fractal Flow</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">🎯 Goal</h4>
                        <p>Combine symbols to discover new patterns and unlock deeper layers of consciousness.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">🎮 How to Play</h4>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Click symbols from the palette to add them to your pattern</li>
                          <li>Press "Combine" to see what you discover</li>
                          <li>Use keyboard shortcuts (1-9) for quick symbol selection</li>
                          <li>The game responds intelligently to your patterns</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">💡 Tips</h4>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Try combining opposite symbols like ○ and ●</li>
                          <li>Experiment with repeated patterns like · · ·</li>
                          <li>Points are only awarded for first-time discoveries</li>
                          <li>The AI learns from your exploration style</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetProgress}
                  className="bg-white/80 text-red-600 hover:text-red-700"
                >
                  Reset
                </Button>
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
