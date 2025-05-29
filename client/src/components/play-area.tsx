import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type BasicSymbol, getContextualHint, getCombinationHints } from '@/lib/symbol-combinations';
import { InteractiveCanvas } from './interactive-canvas';
import { useState } from 'react';

interface PlayAreaProps {
  currentCombination: BasicSymbol[];
  lastResponse: string | null;
  onCombine: () => void;
  onClear: () => void;
  isProcessing: boolean;
  onSymbolAdd: (symbol: string) => void;
  discoveredSymbols: string[];
}

export function PlayArea({ 
  currentCombination, 
  lastResponse, 
  onCombine, 
  onClear, 
  isProcessing,
  onSymbolAdd,
  discoveredSymbols
}: PlayAreaProps) {
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  const getHint = () => {
    // Try combination-specific hints first
    const combinationHints = getCombinationHints(currentCombination);
    if (combinationHints.length > 0) {
      const randomHint = combinationHints[Math.floor(Math.random() * combinationHints.length)];
      setCurrentHint(randomHint);
    } else {
      // Fall back to contextual hints
      const contextualHint = getContextualHint(discoveredSymbols);
      setCurrentHint(contextualHint || "The cosmos holds infinite mysteries... Try combining different forces of consciousness...");
    }
    setShowHint(true);
    
    // Hide hint after 8 seconds
    setTimeout(() => setShowHint(false), 8000);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 min-h-[600px]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">
          Consciousness Playground
        </h2>
        <p className="text-muted">
          Combine symbols to discover new patterns and unlock deeper meanings
        </p>
      </div>
      
      {/* Combination Area */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-8 mb-8 border-2 border-dashed border-slate-300 min-h-[200px] flex items-center justify-center">
        
        {currentCombination.length > 0 || lastResponse ? (
          <div className="flex items-center space-x-6">
            {/* Player Pattern */}
            <div className="text-center">
              <div className="text-xs text-muted mb-2 font-medium">Your Pattern</div>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-4 shadow-sm border border-slate-200 min-h-[80px]">
                {currentCombination.length > 0 ? (
                  currentCombination.map((symbol, index) => (
                    <span key={index} className="flex items-center">
                      <span className="text-3xl font-mono text-primary">{symbol}</span>
                      {index < currentCombination.length - 1 && (
                        <span className="text-2xl text-slate-400 mx-2">+</span>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-lg">Drop symbols here</span>
                )}
              </div>
            </div>
            
            {/* Equals Arrow */}
            {lastResponse && (
              <>
                <div className="text-3xl text-muted animate-pulse">
                  ➜
                </div>
                
                {/* AI Response */}
                <div className="text-center">
                  <div className="text-xs text-muted mb-2 font-medium">Response</div>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-4 shadow-sm border border-accent/30 min-h-[80px] flex items-center justify-center">
                    <span className="text-3xl font-mono text-accent animate-pulse">
                      {lastResponse}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-lg font-medium">Start your journey</p>
            <p className="text-sm">Click symbols from the palette to begin</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          onClick={onCombine}
          disabled={currentCombination.length === 0 || isProcessing}
          className={cn(
            "bg-primary hover:bg-primary/90 text-white px-6 py-2",
            "font-medium transition-all duration-200 hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isProcessing ? (
            <span className="flex items-center space-x-2">
              <span className="animate-spin">⟳</span>
              <span>Processing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>✨</span>
              <span>Combine</span>
            </span>
          )}
        </Button>
        
        <Button
          onClick={onClear}
          variant="secondary"
          className="px-6 py-2 font-medium transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="flex items-center space-x-2">
            <span>↻</span>
            <span>Clear</span>
          </span>
        </Button>
        
        <Button
          onClick={getHint}
          variant="outline"
          className="px-6 py-2 font-medium transition-all duration-200 hover:scale-105 active:scale-95 border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <span className="flex items-center space-x-2">
            <span>💡</span>
            <span>Hint</span>
          </span>
        </Button>
      </div>
      
      {/* Hint Display */}
      {showHint && currentHint && (
        <div className="mb-4 text-center text-sm bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200 animate-fadeIn">
          <span className="text-amber-600 mr-2">💡</span>
          <span className="text-amber-800 font-medium">{currentHint}</span>
        </div>
      )}

      {/* AI Response Info */}
      <div className="text-center text-sm text-muted bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
        <span className="text-purple-500 mr-2">🧠</span>
        The game now responds to your patterns - each combination creates a consciousness dialogue
      </div>
    </div>
  );
}
