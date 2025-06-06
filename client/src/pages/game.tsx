import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/use-game-state';
import { InfinitePalette } from '@/components/infinite-palette';
import { PlayArea } from '@/components/play-area';
import { ProgressSidebar } from '@/components/progress-sidebar';
import { DiscoveryNotification } from '@/components/discovery-notification';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { soundEngine } from '@/lib/sounds';
import { getHintForStuckPlayer } from '@/lib/symbol-combinations';
import { Menu, X } from 'lucide-react';

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
  const [currentHint, setCurrentHint] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showElementsPanel, setShowElementsPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">∞</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-display font-bold text-slate-800">Fractal Flow</h1>
                <p className="text-xs text-muted hidden md:block">Consciousness Discovery Game</p>
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
              
              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const hint = getHintForStuckPlayer(discoveredSymbols);
                    setCurrentHint(hint);
                  }}
                  className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                >
                  💡 Hint
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://buymeacoffee.com/maxpetrusex', '_blank')}
                  className="bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-black font-medium"
                >
                  🍵 Buy me a coffee
                </Button>
                
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

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="bg-white/80"
                >
                  {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-sm">
              <div className="px-4 py-3 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const hint = getHintForStuckPlayer(discoveredSymbols);
                    setCurrentHint(hint);
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                >
                  💡 Hint
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    toggleSound();
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-white/80"
                >
                  <span className="text-lg mr-2">{soundEnabled ? '🔊' : '🔇'}</span>
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setShowHelp(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-white/80"
                >
                  ? Help
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    resetProgress();
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-white/80 text-red-600 hover:text-red-700"
                >
                  Reset Game
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hint Display */}
      {currentHint && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-l-4 border-purple-500 p-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">🔮</span>
            </div>
            <div className="ml-3">
              <p className="text-purple-800 font-medium">Cosmic Guidance</p>
              <p className="text-purple-700 mt-1">{currentHint}</p>
            </div>
            <button
              onClick={() => setCurrentHint('')}
              className="ml-auto text-purple-600 hover:text-purple-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Consciousness Playground - Main Focus */}
          <div className="mb-4">
            <PlayArea
              currentCombination={gameState.currentCombination}
              lastResponse={gameState.lastResponse}
              onCombine={processCombination}
              onClear={clearCombination}
              isProcessing={isProcessing}
              onSymbolAdd={addSymbol}
              discoveredSymbols={discoveredSymbols}
            />
          </div>
          
          {/* Progress Section */}
          <div className="mb-4">
            <ProgressSidebar
              profile={profile}
              recentDiscoveries={recentDiscoveries}
              levelProgress={levelProgress}
              currentLevel={currentLevel}
              discoveredSymbols={discoveredSymbols}
            />
          </div>
          
          {/* Coffee Button - Mobile Only */}
          <div className="mb-6 text-center">
            <Button
              onClick={() => window.open('https://buymeacoffee.com/maxpetrusex', '_blank')}
              className="bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-black font-medium"
            >
              🍵 Buy me a coffee
            </Button>
          </div>
          
          {/* Elements Panel - Collapsible Bottom for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 transition-transform duration-300">
            {/* Toggle Button */}
            <div className="flex justify-center py-2 border-b border-slate-100">
              <button
                onClick={() => setShowElementsPanel(!showElementsPanel)}
                className="flex items-center space-x-2 px-4 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <span>🧩 Elements</span>
                <span className={`transform transition-transform ${showElementsPanel ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
            
            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-300 ${showElementsPanel ? 'max-h-64' : 'max-h-0'}`}>
              <div className="px-4 py-3">
                <InfinitePalette
                  onSymbolClick={addSymbol}
                  discoveredSymbols={discoveredSymbols}
                />
              </div>
            </div>
          </div>
          
          {/* Spacer for fixed bottom panel */}
          <div className="h-16"></div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Symbol Palette */}
          <div className="lg:col-span-1">
            <InfinitePalette
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
              onSymbolAdd={addSymbol}
              discoveredSymbols={discoveredSymbols}
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
      
      {/* Floating Action Button - Hidden on mobile */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
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
