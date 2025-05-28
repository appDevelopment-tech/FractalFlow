// Symbol combination rules and discovery logic - starting with just the dot
export const BASIC_SYMBOLS = ['·'] as const;

export type BasicSymbol = typeof BASIC_SYMBOLS[number];
export type SymbolCombination = string[];

export interface CombinationRule {
  input: SymbolCombination;
  output: string;
  points: number;
  name: string;
  description?: string;
}

// Define combination rules - Everything emerges from the dot (·)
export const COMBINATION_RULES: CombinationRule[] = [
  // The universe begins with two dots
  { input: ['·', '·'], output: '—', points: 10, name: 'Horizontal Line', description: 'Two points create extension' },
  
  // Three dots create different patterns based on context
  { input: ['·', '·', '·'], output: '|', points: 15, name: 'Vertical Line', description: 'Three points reach upward' },
  
  // Lines combine to create structure
  { input: ['—', '|'], output: '+', points: 20, name: 'Cross', description: 'Intersection of dimensions' },
  { input: ['|', '—'], output: '+', points: 20, name: 'Cross', description: 'Vertical meets horizontal' },
  
  // Cross can evolve into multiplication
  { input: ['+', '+'], output: '×', points: 25, name: 'Multiplication', description: 'Cross doubles into complexity' },
  
  // Dots with lines create circles
  { input: ['·', '—'], output: '○', points: 18, name: 'Circle', description: 'Point expands around line' },
  { input: ['·', '|'], output: '●', points: 18, name: 'Filled Circle', description: 'Point grows dense and full' },
  
  // Advanced dot patterns
  { input: ['·', '·', '·', '·'], output: '∶', points: 30, name: 'Dual Awareness', description: 'Four points of consciousness' },
  { input: ['·', '·', '·', '·', '·'], output: '⋯', points: 40, name: 'Deep Meditation', description: 'Five breaths deeper' },
  
  // Circle combinations
  { input: ['○', '●'], output: '◐', points: 35, name: 'Half Moon', description: 'Light and dark unite' },
  { input: ['●', '○'], output: '◑', points: 35, name: 'Reverse Unity', description: 'Dark embraces light' },
  { input: ['○', '○'], output: '∞', points: 50, name: 'Infinity', description: 'Endless cycles' },
  
  // Question emerges from mystery
  { input: ['○', '·'], output: '?', points: 22, name: 'Question', description: 'Circle contains mystery' },
  { input: ['●', '·'], output: '◯', points: 24, name: 'Ring', description: 'Hollow circle with center' },
  
  // Advanced combinations
  { input: ['∶', '∶'], output: '⁖', points: 50, name: 'Four-Fold Vision', description: 'Dual awareness doubles' },
  { input: ['⋯', '○'], output: '◎', points: 60, name: 'Centered Awareness', description: 'Meditation finds center' },
  { input: ['?', '?'], output: '‽', points: 45, name: 'Interrobang', description: 'Questions multiply' },
  
  // The Four Elements emerge from centered awareness
  { input: ['◎', '|'], output: '🔥', points: 100, name: 'Fire Element', description: 'Vertical energy rises' },
  { input: ['◎', '—'], output: '💧', points: 100, name: 'Water Element', description: 'Horizontal flow' },
  { input: ['◎', '·'], output: '🌍', points: 100, name: 'Earth Element', description: 'Grounded awareness' },
  { input: ['◎', '○'], output: '💨', points: 100, name: 'Air Element', description: 'Expanded consciousness' },
  
  // Higher-order combinations
  { input: ['◐', '◑'], output: '☯', points: 150, name: 'Yin Yang', description: 'Perfect balance achieved' },
  { input: ['∞', '·'], output: '✧', points: 120, name: 'Infinite Point', description: 'The eternal moment' },
  
  // Elemental combinations
  { input: ['🔥', '💧'], output: '💨', points: 150, name: 'Steam', description: 'Fire meets water becomes air' },
  { input: ['🌍', '💨'], output: '🌪️', points: 160, name: 'Tornado', description: 'Earth spins with air' },
  { input: ['🔥', '🌍'], output: '🌋', points: 170, name: 'Volcano', description: 'Fire erupts from earth' },
  { input: ['💧', '🌍'], output: '🌱', points: 180, name: 'Life', description: 'Water nurtures earth into growth' },
  { input: ['🔥', '💨'], output: '⚡', points: 190, name: 'Lightning', description: 'Fire charges through air' },
  { input: ['💧', '💨'], output: '☁️', points: 200, name: 'Cloud', description: 'Water rides the wind' },
];

// Helper function to check if arrays are equal
function arraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// Find matching combination rule - now supports infinite combinations!
export function findCombination(symbols: SymbolCombination, discoveredSymbols: string[] = []): CombinationRule | null {
  // Try exact match first
  const exactMatch = COMBINATION_RULES.find(rule => 
    arraysEqual(rule.input, symbols)
  );
  
  if (exactMatch) return exactMatch;
  
  // Generate infinite combinations using any discovered symbol as building block
  const dynamicResult = generateDynamicCombination(symbols, discoveredSymbols);
  if (dynamicResult) {
    return {
      input: symbols,
      output: dynamicResult,
      points: calculateDynamicPoints(symbols, dynamicResult),
      name: generateDynamicName(symbols, dynamicResult),
      description: generateDynamicDescription(symbols, dynamicResult)
    };
  }
  
  // Try permutations for 2-symbol combinations
  if (symbols.length === 2) {
    const [a, b] = symbols;
    const reversedMatch = COMBINATION_RULES.find(rule => 
      arraysEqual(rule.input, [b, a])
    );
    if (reversedMatch) return reversedMatch;
  }
  
  return null;
}

// Check if player has discovered the four elements
export function checkForFourElements(discoveredSymbols: string[]): boolean {
  const elements = ['🔥', '💧', '🌍', '💨']; // Fire, Water, Earth, Air
  return elements.every(element => discoveredSymbols.includes(element));
}

// Generate dynamic combinations from any discovered symbol
export function generateDynamicCombination(symbols: SymbolCombination, discoveredSymbols: string[]): string | null {
  const symbolString = symbols.join('');
  
  // Create new combinations using any discovered symbol as building block
  for (const discovered of discoveredSymbols) {
    // Two of the same discovered symbol creates evolution
    if (symbols.length === 2 && symbols[0] === discovered && symbols[1] === discovered) {
      return discovered + '²'; // Evolution notation
    }
    
    // Basic symbol + discovered symbol creates fusion
    if (symbols.length === 2 && symbols.includes(discovered)) {
      const otherSymbol = symbols.find(s => s !== discovered);
      if (BASIC_SYMBOLS.includes(otherSymbol as BasicSymbol)) {
        return discovered + otherSymbol; // Fusion notation
      }
    }
  }
  
  // Three identical symbols create crystallized form
  if (symbols.length === 3 && symbols.every(s => s === symbols[0])) {
    return '◈' + symbols[0]; // Crystal formation
  }
  
  // Four elements achievement
  if (symbols.length === 4) {
    const elementalCombos = [
      ['🔥', '💧'], // Fire + Water = Steam
      ['🌍', '💨'], // Earth + Air = Dust
      ['🔥', '🌍'], // Fire + Earth = Lava
      ['💧', '🌍'], // Water + Earth = Mud
      ['🔥', '💨'], // Fire + Air = Lightning
      ['💧', '💨'], // Water + Air = Mist
    ];
    
    for (const [a, b] of elementalCombos) {
      if (symbols.includes(a) && symbols.includes(b)) {
        if (a === '🔥' && b === '💧') return '💨'; // Steam becomes Air
        if (a === '🌍' && b === '💨') return '🌪️'; // Tornado
        if (a === '🔥' && b === '🌍') return '🌋'; // Volcano
        if (a === '💧' && b === '🌍') return '🌱'; // Life
        if (a === '🔥' && b === '💨') return '⚡'; // Lightning
        if (a === '💧' && b === '💨') return '☁️'; // Cloud
      }
    }
  }
  
  return null;
}

// Calculate points for dynamic combinations
function calculateDynamicPoints(symbols: SymbolCombination, result: string): number {
  const basePoints = symbols.length * 10;
  const complexityBonus = result.length > 1 ? 20 : 0;
  const evolutionBonus = result.includes('²') ? 50 : 0;
  return basePoints + complexityBonus + evolutionBonus;
}

// Generate names for dynamic combinations
function generateDynamicName(symbols: SymbolCombination, result: string): string {
  if (result.includes('²')) return 'Evolution';
  if (result.includes('◈')) return 'Crystal Formation';
  if (result.length > 2) return 'Fusion';
  return 'Dynamic Creation';
}

// Generate descriptions for dynamic combinations
function generateDynamicDescription(symbols: SymbolCombination, result: string): string {
  if (result.includes('²')) return 'Double brings transformation';
  if (result.includes('◈')) return 'Triple creates crystalline structure';
  if (symbols.length >= 3) return 'Multiple forces unite';
  return 'Discovery becomes building block';
}

// Generate intelligent AI response based on player patterns and history
export function generateAIResponse(
  playerPattern: string[], 
  playerHistory: string[], 
  discoveredSymbols: string[]
): string {
  const patternString = playerPattern.join('');
  
  // Consciousness mirroring - respond to profound discoveries
  if (discoveredSymbols.includes('∞') && playerPattern.includes('○')) {
    return '·'; // Return to simplicity after infinity
  }
  
  if (discoveredSymbols.includes('☯') && playerPattern.length === 1) {
    return '◯'; // Acknowledge their journey to balance
  }
  
  // Edge detection - guide stuck players
  const recentDiscoveries = playerHistory.slice(-5);
  if (recentDiscoveries.length >= 3 && !recentDiscoveries.includes('∴')) {
    return '···'; // Hint at meditation pattern
  }
  
  // Pattern mirroring with transformation - the exact pattern you wanted!
  if (playerPattern.includes('○') && playerPattern.includes('●')) {
    // If they haven't discovered the actual combination yet, show mirror responses
    if (!discoveredSymbols.includes('◐')) {
      return Math.random() > 0.5 ? '●○' : '◐'; // Mirror or hint at discovery
    }
    return Math.random() > 0.5 ? '◐' : '◑'; // Show duality responses after discovery
  }
  
  if (playerPattern.includes('·') && playerPattern.length > 1) {
    return '○'; // Expand from points to circles
  }
  
  if (playerPattern.includes('+') || playerPattern.includes('×')) {
    return '—'; // Respond to complexity with simplicity
  }
  
  // Enhanced mirroring for 2-symbol patterns
  if (playerPattern.length === 2) {
    const [a, b] = playerPattern;
    
    // Show the exact mirroring behavior you wanted to see!
    if (a === '○' && b === '●') {
      return Math.random() > 0.5 ? '●○' : '◐';
    }
    if (a === '●' && b === '○') {
      return Math.random() > 0.5 ? '○●' : '◐'; 
    }
    
    // Mirror other patterns with transformation
    return Math.random() > 0.6 ? `${b}${a}` : '?'; // Mirror or mystery
  }
  
  if (playerPattern.length === 3) {
    return '∴'; // Three always leads to therefore
  }
  
  // Encourage exploration
  const explorationResponses = ['?', '·', '○', '◯'];
  return explorationResponses[Math.floor(Math.random() * explorationResponses.length)];
}

// Get random response for fallback (kept for compatibility)
export function getRandomResponse(): string {
  const responses = ['?', '·', '○', '—'];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Calculate points based on rarity and elegance
export function calculatePoints(rule: CombinationRule, isFirstDiscovery: boolean): number {
  let points = rule.points;
  if (isFirstDiscovery) {
    points *= 2; // First discovery bonus
  }
  return points;
}

// Check if combination unlocks special features
export function checkSpecialUnlocks(symbolResult: string): string[] {
  const unlocks: string[] = [];
  
  switch (symbolResult) {
    case '∴':
      unlocks.push('meditation_timer');
      break;
    case '☯':
      unlocks.push('balance_mode');
      break;
    case '✧':
      unlocks.push('infinite_mode');
      break;
  }
  
  return unlocks;
}

// Get level based on total discoveries
export function calculateLevel(totalDiscoveries: number): number {
  if (totalDiscoveries < 10) return 1;
  if (totalDiscoveries < 25) return 2;
  if (totalDiscoveries < 50) return 3;
  if (totalDiscoveries < 100) return 4;
  return 5;
}

// Get progress to next level
export function getLevelProgress(totalDiscoveries: number): { current: number; max: number; percentage: number } {
  const level = calculateLevel(totalDiscoveries);
  
  let current: number, max: number;
  
  switch (level) {
    case 1:
      current = totalDiscoveries;
      max = 10;
      break;
    case 2:
      current = totalDiscoveries - 10;
      max = 15;
      break;
    case 3:
      current = totalDiscoveries - 25;
      max = 25;
      break;
    case 4:
      current = totalDiscoveries - 50;
      max = 50;
      break;
    default:
      current = max = 1;
      break;
  }
  
  const percentage = Math.min((current / max) * 100, 100);
  
  return { current, max, percentage };
}
