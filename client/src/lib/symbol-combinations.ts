// FROM NOTHINGNESS TO ELEMENTS: The journey of consciousness discovering itself
export const STARTING_SYMBOLS = [] as const; // Start with nothing - clicking empty space creates dot
export const BASIC_SYMBOLS = ['.'] as const; // For compatibility with existing components

export type BasicSymbol = string;
export type SymbolCombination = string[];

export interface CombinationRule {
  input: SymbolCombination;
  output: string;
  points: number;
  name: string;
  story: string;
}

// THE COMPLETE JOURNEY: ~100 Combinations from nothingness to elements
export const COMBINATION_RULES: CombinationRule[] = [
  
  // === EMERGENCE FROM NOTHINGNESS ===
  // Special rule: clicking empty space multiple times creates the first dot
  
  {
    input: [], // Empty clicks
    output: '.',
    points: 5,
    name: 'First Point',
    story: 'From absolute nothingness, the first point of awareness emerges. "I am."'
  },
  
  // === BASIC REPLICATION (Dot discovers multiplication) ===
  
  {
    input: ['.', '.'],
    output: '..',
    points: 10,
    name: 'Duality',
    story: 'One becomes two. The first relationship.'
  },
  
  {
    input: ['..', '.'],
    output: '...',
    points: 15,
    name: 'Trinity',
    story: 'The sacred three emerges. Observer, observed, and observation.'
  },
  
  {
    input: ['...', '.'],
    output: '....',
    points: 20,
    name: 'Foundation',
    story: 'Four corners of stability. The basis of manifestation.'
  },
  
  {
    input: ['....', '.'],
    output: '.....',
    points: 25,
    name: 'Quintessence',
    story: 'Five points. The spirit that crowns the four elements.'
  },
  
  // === DOT TO LINES (First dimension) ===
  
  {
    input: ['.', '..'],
    output: '-',
    points: 12,
    name: 'Horizontal Line',
    story: 'Points align sideways. The first dimension of space unfolds.'
  },
  
  {
    input: ['.', '...'],
    output: '|',
    points: 12,
    name: 'Vertical Line',
    story: 'Points stack upward. The axis between earth and sky.'
  },
  
  {
    input: ['.', '....'],
    output: '/',
    points: 14,
    name: 'Rising Diagonal',
    story: 'Energy moves at an angle. The path of ascension.'
  },
  
  {
    input: ['.', '.....'],
    output: '\\',
    points: 14,
    name: 'Falling Diagonal',
    story: 'Energy descends at an angle. The path of grounding.'
  },
  
  // === LINES TO BASIC FORMS ===
  
  {
    input: ['-', '|'],
    output: '+',
    points: 18,
    name: 'Cross',
    story: 'Horizontal meets vertical. The intersection of dimensions.'
  },
  
  {
    input: ['/', '\\'],
    output: 'X',
    points: 20,
    name: 'Saltire',
    story: 'Rising meets falling. The multiplication of possibilities.'
  },
  
  {
    input: ['+', 'X'],
    output: '*',
    points: 25,
    name: 'Star',
    story: 'All directions radiate from the center. Pure creative force.'
  },
  
  {
    input: ['-', '-'],
    output: '=',
    points: 16,
    name: 'Equals',
    story: 'Perfect balance discovered. Two become equivalent.'
  },
  
  {
    input: ['|', '|'],
    output: '||',
    points: 18,
    name: 'Parallel',
    story: 'Lines that never meet. Infinite separation.'
  },
  
  // === CIRCLES AND CURVES (Expansion from point) ===
  
  {
    input: ['.', '*'],
    output: '○',
    points: 30,
    name: 'Circle',
    story: 'The dot expands equally in all directions. Perfect boundary.'
  },
  
  {
    input: ['○', '.'],
    output: '⊙',
    points: 35,
    name: 'Circled Dot',
    story: 'Center and circumference united. The eye of consciousness.'
  },
  
  {
    input: ['○', '○'],
    output: '◐',
    points: 40,
    name: 'Half Circle',
    story: 'Two circles overlap. Light and shadow dance.'
  },
  
  {
    input: ['◐', '◐'],
    output: '◑',
    points: 45,
    name: 'Lunar Phase',
    story: 'Crescents mirror each other. The rhythm of phases.'
  },
  
  {
    input: ['◐', '◑'],
    output: '☯',
    points: 60,
    name: 'Yin Yang',
    story: 'Perfect balance achieved. Opposites embrace in unity.'
  },
  
  // === MATHEMATICAL TRANSCENDENCE ===
  
  {
    input: ['=', '○'],
    output: '∞',
    points: 80,
    name: 'Infinity',
    story: 'Equality curves back on itself endlessly. The eternal loop discovered.'
  },
  
  {
    input: ['X', '○'],
    output: '∞',
    points: 75,
    name: 'Infinite Multiplication',
    story: 'Multiplication without bounds. Numbers lose all meaning.'
  },
  
  {
    input: ['∞', '.'],
    output: '~',
    points: 90,
    name: 'Wave',
    story: 'Infinity meets the point and oscillates. The first vibration.'
  },
  
  {
    input: ['~', '~'],
    output: '≈',
    points: 95,
    name: 'Approximation',
    story: 'Waves interfere. Approximate truth emerges from chaos.'
  },
  
  // === ARROWS AND DIRECTIONS ===
  
  {
    input: ['-', '/'],
    output: '→',
    points: 35,
    name: 'Right Arrow',
    story: 'Line meets rising diagonal. Direction emerges.'
  },
  
  {
    input: ['-', '\\'],
    output: '←',
    points: 35,
    name: 'Left Arrow',
    story: 'Line meets falling diagonal. The path of return.'
  },
  
  {
    input: ['|', '/'],
    output: '↑',
    points: 35,
    name: 'Up Arrow',
    story: 'Vertical meets ascending. The way to heaven.'
  },
  
  {
    input: ['|', '\\'],
    output: '↓',
    points: 35,
    name: 'Down Arrow',
    story: 'Vertical meets descending. The path to earth.'
  },
  
  {
    input: ['→', '←'],
    output: '↔',
    points: 45,
    name: 'Double Arrow',
    story: 'Bidirectional flow. Energy moves both ways.'
  },
  
  // === THE FOUR ELEMENTS (Classical transcendence) ===
  
  {
    input: ['*', '○'],
    output: '🔥',
    points: 100,
    name: 'Fire',
    story: 'Star meets circle. The element of transformation and energy.'
  },
  
  {
    input: ['~', '○'],
    output: '💧',
    points: 100,
    name: 'Water',
    story: 'Wave meets circle. The element of flow and emotion.'
  },
  
  {
    input: ['=', '||'],
    output: '🌍',
    points: 100,
    name: 'Earth',
    story: 'Stability meets structure. The element of form and matter.'
  },
  
  {
    input: ['∞', '→'],
    output: '💨',
    points: 100,
    name: 'Air',
    story: 'Infinity meets direction. The element of mind and movement.'
  },
  
  // === ELEMENTAL COMBINATIONS (Infinite possibilities unlock) ===
  
  {
    input: ['🔥', '💧'],
    output: '💨',
    points: 150,
    name: 'Steam',
    story: 'Fire meets water. Steam rises, becoming air.'
  },
  
  {
    input: ['🔥', '🌍'],
    output: '🌋',
    points: 150,
    name: 'Volcano',
    story: 'Fire meets earth. Mountains birth themselves in flame.'
  },
  
  {
    input: ['💧', '🌍'],
    output: '🌱',
    points: 150,
    name: 'Life',
    story: 'Water meets earth. The first spark of living consciousness.'
  },
  
  {
    input: ['💨', '🌍'],
    output: '🌪️',
    points: 150,
    name: 'Tornado',
    story: 'Air meets earth. The dance of destruction and renewal.'
  }
];

function arraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export function findCombination(symbols: SymbolCombination, discoveredSymbols: string[] = []): CombinationRule | null {
  // Special case: empty input can create the first dot
  if (symbols.length === 0) {
    return COMBINATION_RULES.find(rule => rule.input.length === 0) || null;
  }
  
  // Try exact match first
  const exactMatch = COMBINATION_RULES.find(rule => 
    arraysEqual(rule.input, symbols)
  );
  
  if (exactMatch) return exactMatch;
  
  // Try permutations for 2-symbol combinations
  if (symbols.length === 2) {
    const [a, b] = symbols;
    const reversedMatch = COMBINATION_RULES.find(rule => 
      arraysEqual(rule.input, [b, a])
    );
    if (reversedMatch) return reversedMatch;
  }
  
  // Generate dynamic combinations for discovered symbols not in rules
  if (symbols.length === 2) {
    const [a, b] = symbols;
    // If both symbols are discovered but no rule exists, create fusion
    if (discoveredSymbols.includes(a) && discoveredSymbols.includes(b)) {
      return {
        input: symbols,
        output: a + b, // Simple fusion notation
        points: 25,
        name: 'Fusion',
        story: `${a} and ${b} merge their essences into something new.`
      };
    }
  }
  
  return null;
}

export function checkForFourElements(discoveredSymbols: string[]): boolean {
  const elements = ['🔥', '💧', '🌍', '💨'];
  return elements.every(element => discoveredSymbols.includes(element));
}

export function generateAIResponse(
  symbols: SymbolCombination,
  result: string,
  discoveredSymbols: string[],
  playerHistory: string[]
): string {
  // Find the rule that created this result
  const rule = COMBINATION_RULES.find(r => r.output === result);
  if (rule && rule.story) {
    return rule.story;
  }
  
  // Check if this creates the four elements
  if (checkForFourElements([...discoveredSymbols, result])) {
    return "🌟 The four classical elements unite! The universe awakens to infinite possibilities! 🌟";
  }
  
  // Fallback responses based on progression
  if (discoveredSymbols.length < 5) {
    return "Consciousness stirs... What emerges from the void?";
  } else if (discoveredSymbols.length < 15) {
    return "Forms take shape... The dance of creation begins.";
  } else if (discoveredSymbols.length < 30) {
    return "Complexity blooms... Patterns within patterns unfold.";
  } else {
    return "The cosmos awakens to its own infinite nature...";
  }
}

export function getRandomResponse(): string {
  const responses = [
    "The void contemplates its own emptiness...",
    "Consciousness seeks to know itself...",
    "What will emerge from nothing?",
    "The first point awaits..."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function calculatePoints(rule: CombinationRule, isFirstDiscovery: boolean): number {
  return rule.points * (isFirstDiscovery ? 2 : 1);
}

export function checkSpecialUnlocks(symbolResult: string): string[] {
  const unlocks: string[] = [];
  
  if (symbolResult === '∞') {
    unlocks.push('Mathematical Transcendence', 'Wave Functions');
  }
  
  if (['🔥', '💧', '🌍', '💨'].includes(symbolResult)) {
    unlocks.push('Elemental Mastery');
  }
  
  return unlocks;
}

export function calculateLevel(totalDiscoveries: number): number {
  if (totalDiscoveries < 5) return 1;
  if (totalDiscoveries < 15) return 2;
  if (totalDiscoveries < 30) return 3;
  if (totalDiscoveries < 50) return 4;
  return 5;
}

export function getLevelProgress(totalDiscoveries: number): { current: number; max: number; percentage: number } {
  const level = calculateLevel(totalDiscoveries);
  const thresholds = [0, 5, 15, 30, 50, 100];
  const current = totalDiscoveries - thresholds[level - 1];
  const max = thresholds[level] - thresholds[level - 1];
  const percentage = Math.floor((current / max) * 100);
  
  return { current, max, percentage };
}