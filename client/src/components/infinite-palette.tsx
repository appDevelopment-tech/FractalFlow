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

// Get category for symbol
function getSymbolCategory(symbol: string): string {
  if (BASIC_SYMBOLS.includes(symbol as BasicSymbol)) return 'Basic';
  if (['🔥', '💧', '🌍', '💨'].includes(symbol)) return 'Elements';
  if (['🌋', '⚡', '☁️', '🌱', '🌪️'].includes(symbol)) return 'Nature';
  if (symbol.includes('²')) return 'Evolution';
  if (symbol.includes('◈')) return 'Crystal';
  return 'Discovery';
}

export function InfinitePalette({ onSymbolClick, discoveredSymbols }: InfinitePaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDiscovered, setShowDiscovered] = useState(false);

  // Combine basic symbols with discovered ones
  const allSymbols = [...BASIC_SYMBOLS, ...discoveredSymbols];
  const uniqueSymbols = Array.from(new Set(allSymbols));

  // Filter symbols based on search
  const filteredSymbols = uniqueSymbols.filter(symbol => {
    const name = getSymbolName(symbol).toLowerCase();
    const category = getSymbolCategory(symbol).toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || category.includes(search) || symbol.includes(search);
  });

  // Group by category
  const categorizedSymbols = filteredSymbols.reduce((acc, symbol) => {
    const category = getSymbolCategory(symbol);
    if (!acc[category]) acc[category] = [];
    acc[category].push(symbol);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
          Infinite Palette
        </h2>
        <Badge variant="secondary">
          {uniqueSymbols.length} symbols
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder={`Search (${uniqueSymbols.length}) items...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowDiscovered(false)}
          className={cn(
            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
            !showDiscovered 
              ? "bg-blue-100 text-blue-700 border border-blue-200" 
              : "text-slate-600 hover:text-slate-800"
          )}
        >
          ⚛️ All Elements
        </button>
        <button
          onClick={() => setShowDiscovered(true)}
          className={cn(
            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
            showDiscovered 
              ? "bg-purple-100 text-purple-700 border border-purple-200" 
              : "text-slate-600 hover:text-slate-800"
          )}
        >
          ✨ Discoveries ({discoveredSymbols.length})
        </button>
      </div>

      {/* Symbol Grid */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {Object.entries(categorizedSymbols)
          .filter(([category, symbols]) => 
            !showDiscovered || !['Basic'].includes(category)
          )
          .map(([category, symbols]: [string, string[]]) => (
          <div key={category}>
            <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              {category} ({symbols.length})
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {symbols.map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => onSymbolClick(symbol)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all duration-200 text-left",
                    "hover:scale-105 active:scale-95 hover:shadow-md",
                    getSymbolCategory(symbol) === 'Basic'
                      ? "border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300"
                      : getSymbolCategory(symbol) === 'Elements'
                      ? "border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 hover:border-orange-400"
                      : "border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 hover:border-purple-400"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-mono">{symbol}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">
                        {getSymbolName(symbol)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 text-center">
        {filteredSymbols.length === uniqueSymbols.length 
          ? `${uniqueSymbols.length} total symbols` 
          : `${filteredSymbols.length} of ${uniqueSymbols.length} symbols`
        }
      </div>
    </div>
  );
}