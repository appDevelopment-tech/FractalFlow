// Symbol combination rules and discovery logic
export const BASIC_SYMBOLS = ['○', '●', '·', '—', '|', '+', '×', '◯', '?'] as const;

export type BasicSymbol = typeof BASIC_SYMBOLS[number];
export type SymbolCombination = BasicSymbol[];

export interface CombinationRule {
  input: SymbolCombination;
  output: string;
  points: number;
  name: string;
  description?: string;
}

// Define combination rules
export const COMBINATION_RULES: CombinationRule[] = [
  // Basic combinations
  { input: ['○', '●'], output: '◐', points: 25, name: 'Half Moon', description: 'Balance of light and dark' },
  { input: ['○', '○'], output: '∞', points: 50, name: 'Infinity', description: 'Endless cycles' },
  { input: ['·', '·', '·'], output: '∴', points: 30, name: 'Therefore', description: 'Meditation timer unlocked' },
  { input: ['—', '|'], output: '+', points: 15, name: 'Cross', description: 'Intersection of paths' },
  { input: ['+', '+'], output: '✚', points: 35, name: 'Double Cross', description: 'Healing symbol' },
  { input: ['×', '○'], output: '⊗', points: 40, name: 'Circled Times', description: 'Multiplication in unity' },
  { input: ['?', '?'], output: '‽', points: 45, name: 'Interrobang', description: 'Surprised questioning' },
  { input: ['◯', '·'], output: '⊙', points: 55, name: 'Circled Dot', description: 'Center of attention' },
  
  // Advanced patterns
  { input: ['○', '●', '○'], output: '◑', points: 60, name: 'Yin Yang Start', description: 'Beginning of duality' },
  { input: ['·', '—', '·'], output: '∶', points: 25, name: 'Ratio', description: 'Mathematical proportion' },
  { input: ['+', '×'], output: '✤', points: 70, name: 'Star Cross', description: 'Stellar intersection' },
  { input: ['|', '|', '|'], output: '|||', points: 35, name: 'Triple Bar', description: 'Strong foundation' },
  
  // More basic combinations
  { input: ['●', '○'], output: '◑', points: 25, name: 'Reverse Unity', description: 'Dark embraces light' },
  { input: ['|', '—'], output: '+', points: 15, name: 'Cross Alt', description: 'Vertical meets horizontal' },
  { input: ['·', '○'], output: '◯', points: 20, name: 'Hollow Circle', description: 'Point expands outward' },
  { input: ['×', '+'], output: '✛', points: 30, name: 'Heavy Cross', description: 'Multiplication crosses addition' },
  { input: ['○', '—'], output: '⊖', points: 22, name: 'Circle Minus', description: 'Unity with subtraction' },
  { input: ['●', '|'], output: '⫸', points: 18, name: 'Dot Line', description: 'Darkness divided' },
  { input: ['?', '·'], output: '⁇', points: 24, name: 'Question Dot', description: 'Uncertain point' },
  { input: ['—', '—'], output: '=', points: 16, name: 'Equals', description: 'Perfect equality' },
  { input: ['|', '·'], output: '⫶', points: 17, name: 'Line Dot', description: 'Vertical precision' },
  { input: ['×', '×'], output: '✕', points: 28, name: 'X Mark', description: 'Double crossing' },
  
  // Second-order combinations using discovered symbols
  { input: ['∞', '·'], output: '✧', points: 100, name: 'Infinite Point', description: 'The eternal moment' },
  { input: ['◐', '◑'], output: '☯', points: 150, name: 'Yin Yang', description: 'Perfect balance achieved' },
  { input: ['?', '○', '?'], output: '◊', points: 80, name: 'Diamond', description: 'Clarity through questioning' },
  { input: ['⊗', '∴'], output: '⊛', points: 120, name: 'Tensor Logic', description: 'Multiplication meets reasoning' },
  { input: ['☯', '?'], output: '☸', points: 200, name: 'Dharma Wheel', description: 'Balance questions reality' },
];

// Helper function to check if arrays are equal
function arraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// Find matching combination rule
export function findCombination(symbols: SymbolCombination): CombinationRule | null {
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
  
  return null;
}

// Generate intelligent AI response based on player patterns and history
export function generateAIResponse(
  playerPattern: SymbolCombination, 
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
