import React, { useState } from 'react';
import { BASIC_SYMBOLS, type BasicSymbol, SYMBOL_NAMES } from '@/lib/symbol-combinations';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Search, Sparkles } from 'lucide-react';

interface InfinitePaletteProps {
  onSymbolClick: (symbol: BasicSymbol | string) => void;
  discoveredSymbols: string[];
}

// Get display name for symbols using Blavatsky's theosophical names
function getSymbolName(symbol: string): string {
  return SYMBOL_NAMES[symbol] || symbol;
}

// Get category for symbol - simplified to just show the journey to elements
function getSymbolCategory(symbol: string): string {
  if (BASIC_SYMBOLS.includes(symbol as BasicSymbol)) return 'Starting Elements';
  if (['🔥', '💧', '🌍', '💨'].includes(symbol)) return 'Four Elements';
  return 'Discoveries';
}

export function InfinitePalette({ onSymbolClick, discoveredSymbols }: InfinitePaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Show basic symbols plus ALL discovered symbols as building blocks
  const fourElements = ['🔥', '💧', '🌍', '💨'];
  const availableSymbols = [...BASIC_SYMBOLS, ...discoveredSymbols];
  const discoveredElements = discoveredSymbols.filter(symbol => fourElements.includes(symbol));

  // Filter symbols based on search
  const filteredSymbols = availableSymbols.filter(symbol => {
    const name = getSymbolName(symbol).toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || symbol.includes(search);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-6 h-auto md:h-full flex flex-col">
      {/* Header - Hidden on mobile for compact view */}
      <div className="hidden md:flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
          Elements
        </h2>
      </div>

      {/* Search Bar - Hidden on mobile for compact view */}
      <div className="relative mb-4 hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder={`Search elements...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Simple Grid - Starting Elements + Four Elements */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 md:grid-cols-2 gap-1 md:gap-3">
          {filteredSymbols.map((symbol) => {
            const isFourElement = ['🔥', '💧', '🌍', '💨'].includes(symbol);
            return (
              <button
                key={symbol}
                onClick={() => onSymbolClick(symbol)}
                className={cn(
                  "p-1 md:p-4 rounded-lg border-2 transition-all duration-200 text-center",
                  "hover:scale-105 active:scale-95 hover:shadow-md",
                  isFourElement
                    ? "border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 hover:border-orange-500 ring-2 ring-orange-200"
                    : "border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300"
                )}
              >
                <div className="flex flex-col items-center space-y-0 md:space-y-1">
                  <span className="text-lg md:text-2xl font-mono">{symbol}</span>
                  <div className="hidden md:block text-sm font-medium text-slate-700">
                    {getSymbolName(symbol)}
                  </div>
                  {isFourElement && (
                    <div className="text-xs text-orange-600 font-medium">
                      Element
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Progress */}
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 text-center">
        Progress to Four Elements: {discoveredElements.length}/4
      </div>
    </div>
  );
}