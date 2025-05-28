import React from 'react';
import { BASIC_SYMBOLS, type BasicSymbol } from '@/lib/symbol-combinations';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SymbolPaletteProps {
  onSymbolClick: (symbol: BasicSymbol | string) => void;
  discoveredSymbols: string[];
}

export function SymbolPalette({ onSymbolClick, discoveredSymbols }: SymbolPaletteProps) {
  const handleKeyPress = (key: string) => {
    const symbolIndex = parseInt(key) - 1;
    if (symbolIndex >= 0 && symbolIndex < BASIC_SYMBOLS.length) {
      onSymbolClick(BASIC_SYMBOLS[symbolIndex]);
    }
  };

  // Add keyboard event listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="text-primary mr-2">🎨</span>
        Symbol Palette
      </h2>
      
      {/* Basic Symbols Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {BASIC_SYMBOLS.map((symbol, index) => (
          <button
            key={symbol}
            onClick={() => onSymbolClick(symbol)}
            className={cn(
              "bg-slate-50 hover:bg-primary hover:text-white rounded-lg p-4 text-center",
              "cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
              "flex flex-col items-center justify-center min-h-[64px]"
            )}
            title={`Press ${index + 1} for ${symbol}`}
          >
            <span className="text-2xl font-mono">{symbol}</span>
            <div className="text-xs mt-1 opacity-70">{index + 1}</div>
          </button>
        ))}
      </div>
      
      {/* Discovered Symbols Section */}
      <div className="border-t border-slate-200 pt-4">
        <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
          <span className="text-accent mr-1">🔓</span>
          Discovered
          <Badge variant="secondary" className="ml-auto">
            {discoveredSymbols.length}
          </Badge>
        </h3>
        
        <div className="grid grid-cols-3 gap-2">
          {/* Show discovered symbols as clickable buttons */}
          {discoveredSymbols.slice(0, 9).map((symbol, index) => (
            <button
              key={symbol}
              onClick={() => onSymbolClick(symbol)}
              className={cn(
                "rounded-lg p-3 text-center cursor-pointer transition-all duration-200 hover:scale-105",
                "bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200",
                "hover:border-purple-400 hover:shadow-md flex items-center justify-center",
                index === 0 ? "ring-2 ring-purple-400 animate-pulse" :
                index === 1 ? "bg-gradient-to-br from-secondary/10 to-secondary/20 border border-secondary/30" :
                "bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-300"
              )}
            >
              <span className={cn(
                "text-xl font-mono",
                index === 0 ? "text-accent" :
                index === 1 ? "text-secondary" :
                "text-emerald-700"
              )}>
                {symbol}
              </span>
            </div>
          ))}
          
          {/* Locked slots */}
          {Array.from({ length: Math.max(0, 6 - discoveredSymbols.length) }).map((_, index) => (
            <div
              key={`locked-${index}`}
              className="bg-slate-100 rounded-lg p-3 text-center opacity-50"
            >
              <span className="text-slate-400">🔒</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Keyboard hint */}
      <div className="mt-4 text-xs text-muted text-center bg-slate-50 rounded p-2">
        Press 1-9 for quick symbol selection
      </div>
    </div>
  );
}
