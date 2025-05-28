import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/use-game-state';
import { SymbolPalette } from '@/components/symbol-palette';
import { PlayArea } from '@/components/play-area';
import { ProgressSidebar } from '@/components/progress-sidebar';
import { DiscoveryNotification } from '@/components/discovery-notification';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { soundEngine } from '@/lib/sounds';

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
  const [showTutorial, setShowTutorial] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Show tutorial on first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('fractal-flow-tutorial-seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('fractal-flow-tutorial-seen', 'true');
    setShowTutorial(false);
  };

  // Load sound preference from localStorage
  useEffect(() => {
    const savedSoundPref = localStorage.getItem('fractal-flow-sound-enabled');
    if (savedSoundPref !== null) {
      const enabled = savedSoundPref === 'true';
      setSoundEnabled(enabled);
      soundEngine.setEnabled(enabled);
    }
  }, []);

  // Toggle sound and save preference
  const toggleSound = () => {
    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    soundEngine.setEnabled(newEnabled);
    localStorage.setItem('fractal-flow-sound-enabled', newEnabled.toString());
  };

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
              
              {/* Help, Sound, and Reset Buttons */}
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
                  onClick={toggleSound}
                  className="bg-white/80"
                  title={soundEnabled ? "Disable sounds" : "Enable sounds"}
                >
                  <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
                </Button>
                
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
              discoveredSymbols={discoveredSymbols}
            />
          </div>
        </div>
      </main>
      
      {/* Notification System */}
      <DiscoveryNotification
        notifications={gameState.notifications}
        onRemove={removeNotification}
      />
      
      {/* Tutorial Modal */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Welcome to Fractal Flow! ✨</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🧠</div>
              <p className="text-lg text-slate-700">
                A consciousness expansion puzzle game where you combine symbols to unlock deeper patterns.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">1️⃣</span>
                </div>
                <div>
                  <h4 className="font-semibold">Choose Symbols</h4>
                  <p className="text-sm text-muted">Click symbols from the palette or use number keys (1-9)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-secondary/10 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">2️⃣</span>
                </div>
                <div>
                  <h4 className="font-semibold">Combine & Discover</h4>
                  <p className="text-sm text-muted">Press "Combine" to see what emerges from your pattern</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-accent/10 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">3️⃣</span>
                </div>
                <div>
                  <h4 className="font-semibold">Consciousness Dance</h4>
                  <p className="text-sm text-muted">The game responds to your patterns - each combination creates a dialogue</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">✨ First Discovery Tip</h4>
              <p className="text-sm text-purple-700">
                Try combining <code className="bg-white px-1 rounded font-mono">○</code> and <code className="bg-white px-1 rounded font-mono">●</code> to unlock your first pattern!
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleTutorialComplete}
                className="px-8 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium"
              >
                Got it! Let's explore 🚀
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
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
