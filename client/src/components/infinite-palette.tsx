import React, { useState } from 'react';
import { BASIC_SYMBOLS, type BasicSymbol } from '@/lib/symbol-combinations';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Search, Sparkles } from 'lucide-react';

interface InfinitePaletteProps {
  onSymbolClick: (symbol: BasicSymbol | string) => void;
  discoveredSymbols: string[];
}

// Get display name for symbols
function getSymbolName(symbol: string): string {
  const symbolNames: Record<string, string> = {
    // Basic symbols
    '○': 'Circle',
    '●': 'Dot',
    '·': 'Point',
    '—': 'Line',
    '|': 'Vertical',
    '+': 'Plus',
    '×': 'Cross',
    '◯': 'Ring',
    '?': 'Question',
    
    // Discovered symbols
    '◐': 'Half Moon',
    '◑': 'Balance',
    '∞': 'Infinity',
    '∴': 'Therefore',
    '‽': 'Interrobang',
    '☯': 'Yin Yang',
    '🔥': 'Fire',
    '💧': 'Water',
    '🌍': 'Earth',
    '💨': 'Wind',
    '🌋': 'Volcano',
    '⚡': 'Lightning',
    '☁️': 'Cloud',
    '🌱': 'Life',
    '🌪️': 'Tornado',
    '◎': 'Target',
    '⊗': 'Tensor',
    '✚': 'Medical',
    '⋯': 'Ellipsis',
    '∶': 'Ratio',
    '|||': 'Triple Bar'
  };
  
  return symbolNames[symbol] || `Symbol ${symbol}`;
}

// Get category for symbol - simplified to just show the journey to elements
function getSymbolCategory(symbol: string): string {
  if (BASIC_SYMBOLS.includes(symbol as BasicSymbol)) return 'Starting Elements';
  if (['🔥', '💧', '🌍', '💨'].includes(symbol)) return 'Four Elements';
  return 'Discoveries';
}

export function InfinitePalette({ onSymbolClick, discoveredSymbols }: InfinitePaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Only show basic symbols and the four elements (if discovered)
  const fourElements = ['🔥', '💧', '🌍', '💨'];
  const discoveredElements = discoveredSymbols.filter(symbol => fourElements.includes(symbol));
  const availableSymbols = [...BASIC_SYMBOLS, ...discoveredElements];

  // Filter symbols based on search
  const filteredSymbols = availableSymbols.filter(symbol => {
    const name = getSymbolName(symbol).toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || symbol.includes(search);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
          Elements
        </h2>
        <Badge variant="secondary">
          {filteredSymbols.length} available
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
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
        <div className="grid grid-cols-2 gap-3">
          {filteredSymbols.map((symbol) => {
            const isFourElement = ['🔥', '💧', '🌍', '💨'].includes(symbol);
            return (
              <button
                key={symbol}
                onClick={() => onSymbolClick(symbol)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-200 text-center",
                  "hover:scale-105 active:scale-95 hover:shadow-md",
                  isFourElement
                    ? "border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 hover:border-orange-500 ring-2 ring-orange-200"
                    : "border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300"
                )}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-2xl font-mono">{symbol}</span>
                  <div className="text-sm font-medium text-slate-700">
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