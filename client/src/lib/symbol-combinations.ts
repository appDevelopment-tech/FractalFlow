// BLAVATSKY'S COSMOLOGY: From Absolute Unity to Infinite Manifestation
export const STARTING_SYMBOLS = ['⚫'] as const; // Start with the Absolute
export const BASIC_SYMBOLS = ['⚫'] as const; // For compatibility

export type BasicSymbol = string;
export type SymbolCombination = string[];

export interface CombinationRule {
  input: SymbolCombination;
  output: string;
  points: number;
  name: string;
  story: string;
}

// THE COMPLETE JOURNEY: Blavatsky's Cosmological Progression
export const COMBINATION_RULES: CombinationRule[] = [
  
  // === CHAPTER 1: THE AWAKENING ===
  // The Absolute discovers itself, creating the first duality
  
  {
    input: ['⚫'],
    output: '👁️',
    points: 20,
    name: 'Observer',
    story: 'The Absolute opens its eye and becomes aware of itself. The first Observer awakens from eternal sleep.'
  },
  
  {
    input: ['⚫', '👁️'],
    output: '🌌',
    points: 30,
    name: 'Space',
    story: 'Observer and Absolute create the primordial void - infinite Space where all manifestation can occur.'
  },
  
  {
    input: ['⚫', '🌌'],
    output: '🌬️',
    points: 35,
    name: 'Great Breath',
    story: 'The Absolute breathes into Space. The cosmic rhythm begins - expansion and contraction of universes.'
  },
  
  {
    input: ['👁️', '🌬️'],
    output: '⚡',
    points: 40,
    name: 'Motion',
    story: 'Observer witnesses the Great Breath and Motion is born. The first dynamic principle stirs the void.'
  },
  
  // === CHAPTER 2: COSMIC FORCES ===
  // The building blocks of reality
  
  {
    input: ['⚡', '🌌'],
    output: '🌀',
    points: 50,
    name: 'Fohat',
    story: 'Motion fills Space with cosmic electricity. Fohat - the divine force that shapes all matter and energy.'
  },
  
  {
    input: ['🌀', '👁️'],
    output: '✨',
    points: 45,
    name: 'Light',
    story: 'Fohat meets the Observer and Light is born. The first illumination pierces the cosmic darkness.'
  },
  
  {
    input: ['🌌', '⚫'],
    output: '🕳️',
    points: 30,
    name: 'Void',
    story: 'Space recognizes its origin in the Absolute. The creative Void - emptiness pregnant with infinite potential.'
  },
  
  {
    input: ['🌬️', '🌀'],
    output: '🌊',
    points: 55,
    name: 'Akasha',
    story: 'Great Breath and Fohat create the subtle substance. Akasha - the ethereal medium of all vibration.'
  },
  
  {
    input: ['⚡', '👁️'],
    output: '⚖️',
    points: 60,
    name: 'Karma',
    story: 'Motion meets Observer and moral law emerges. Karma - the principle of action and consequence.'
  },
  
  {
    input: ['🌬️', '⚖️'],
    output: '⏰',
    points: 50,
    name: 'Time',
    story: 'Great Breath encounters Karma and cycles begin. Time - the measure of cosmic rhythms.'
  },
  
  // === CHAPTER 3: PLANES OF EXISTENCE ===
  // Different levels/dimensions of reality
  
  {
    input: ['🌀', '🌊'],
    output: '🏔️',
    points: 70,
    name: 'Physical Plane',
    story: 'Fohat condenses Akasha into dense matter. The Physical Plane crystallizes from cosmic forces.'
  },
  
  {
    input: ['✨', '🌊'],
    output: '💭',
    points: 75,
    name: 'Mental Plane',
    story: 'Light illuminates Akasha and thought-forms appear. The Mental Plane - realm of ideas and concepts.'
  },
  
  {
    input: ['🌀', '✨'],
    output: '🌟',
    points: 80,
    name: 'Astral Plane',
    story: 'Fohat energizes Light creating the emotional realm. The Astral Plane - dimension of desires and emotions.'
  },
  
  {
    input: ['👁️', '🌊'],
    output: '👑',
    points: 85,
    name: 'Buddhic Plane',
    story: 'Observer merges with Akasha in wisdom. The Buddhic Plane - realm of intuitive understanding.'
  },
  
  // === CHAPTER 4: BEINGS & CONSCIOUSNESS ===
  // Conscious entities and aspects of consciousness
  
  {
    input: ['🏔️', '🌟'],
    output: '👤',
    points: 90,
    name: 'Human',
    story: 'Physical meets Astral and humanity is born. Humans - bridges between matter and spirit.'
  },
  
  {
    input: ['🌟', '🌊'],
    output: '🧚',
    points: 85,
    name: 'Elemental',
    story: 'Astral forces shape Akasha into nature spirits. Elementals - consciousness of natural forces.'
  },
  
  {
    input: ['💭', '✨'],
    output: '👼',
    points: 100,
    name: 'Angel',
    story: 'Mental Plane touched by Light creates divine messengers. Angels - pure thought made luminous.'
  },
  
  {
    input: ['👑', '🌊'],
    output: '🌳',
    points: 95,
    name: 'Deva',
    story: 'Buddhic wisdom flows through Akasha. Devas - enlightened beings guiding evolution.'
  },
  
  {
    input: ['👤', '💭'],
    output: '🧠',
    points: 70,
    name: 'Mind',
    story: 'Human consciousness develops thinking faculty. Mind - the instrument of understanding.'
  },
  
  {
    input: ['👤', '🌟'],
    output: '❤️',
    points: 75,
    name: 'Heart',
    story: 'Human nature opens to astral currents. Heart - the center of love and compassion.'
  },
  
  {
    input: ['👤', '🌀'],
    output: '🔥',
    points: 80,
    name: 'Will',
    story: 'Human spirit channels Fohat directly. Will - the divine spark within humanity.'
  },
  
  // === CHAPTER 5: EXPERIENCES & EMOTIONS ===
  // The subjective dimension of existence
  
  {
    input: ['❤️', '✨'],
    output: '😊',
    points: 60,
    name: 'Joy',
    story: 'Heart illuminated by Light experiences pure happiness. Joy - the natural state of enlightened being.'
  },
  
  {
    input: ['🧠', '👑'],
    output: '🤔',
    points: 65,
    name: 'Contemplation',
    story: 'Mind touches Buddhic wisdom and reflects deeply. Contemplation - the gateway to higher understanding.'
  },
  
  {
    input: ['🧠', '✨'],
    output: '💡',
    points: 70,
    name: 'Inspiration',
    story: 'Mind receives Light and new ideas flash forth. Inspiration - divine wisdom flowing through thought.'
  },
  
  {
    input: ['🔥', '⚖️'],
    output: '🎯',
    points: 75,
    name: 'Purpose',
    story: 'Will aligns with Karma and destiny clarifies. Purpose - the soul\'s mission in this incarnation.'
  },
  
  {
    input: ['👁️', '🌌'],
    output: '🌅',
    points: 80,
    name: 'Wonder',
    story: 'Observer beholds infinite Space and awe arises. Wonder - the beginning of all wisdom.'
  },
  
  // === CHAPTER 6: INFINITE MANIFESTATION ===
  // Everything that can be experienced or created
  
  {
    input: ['💡', '❤️'],
    output: '🎨',
    points: 100,
    name: 'Art',
    story: 'Inspiration meets Heart and beauty manifests. Art - the divine expressing through human creativity.'
  },
  
  {
    input: ['🧠', '🏔️'],
    output: '🔬',
    points: 110,
    name: 'Science',
    story: 'Mind investigates the Physical Plane systematically. Science - understanding matter through consciousness.'
  },
  
  {
    input: ['👤', '⚖️'],
    output: '🏛️',
    points: 120,
    name: 'Civilization',
    story: 'Humans organize according to Karmic law. Civilization - collective evolution of consciousness.'
  },
  
  {
    input: ['🌊', '❤️'],
    output: '🎵',
    points: 90,
    name: 'Music',
    story: 'Akasha vibrates through Heart in harmony. Music - the emotional mathematics of the cosmos.'
  },
  
  {
    input: ['🏔️', '🌳'],
    output: '🌍',
    points: 150,
    name: 'Earth',
    story: 'Physical Plane guided by Devas becomes a living world. Earth - a conscious planetary being.'
  },
  
  {
    input: ['✨', '🌌'],
    output: '⭐',
    points: 200,
    name: 'Stars',
    story: 'Light fills infinite Space with celestial fires. Stars - the eyes of cosmic consciousness.'
  },
  
  // === MULTIPLICATIVE TRANSFORMATIONS ===
  // Advanced combinations that transform reality
  
  {
    input: ['👁️', '⭐'],
    output: '🔭',
    points: 250,
    name: 'Astronomer',
    story: 'Observer focuses on Stars and becomes a seeker of cosmic truth. The universe studying itself.'
  },
  
  {
    input: ['❤️', '🎵'],
    output: '🎼',
    points: 200,
    name: 'Composer',
    story: 'Heart channels Music into permanent form. The Akashic vibrations made manifest through human creativity.'
  },
  
  {
    input: ['🔥', '🌍'],
    output: '🌋',
    points: 300,
    name: 'Volcano',
    story: 'Will erupts through Earth in transformation. The planet awakening to its own divine nature.'
  },
  
  {
    input: ['🌊', '👼'],
    output: '🙏',
    points: 400,
    name: 'Prayer',
    story: 'Akasha carries human devotion to angelic realms. Communication between dimensions of consciousness.'
  }
];

function arraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export function findCombination(symbols: SymbolCombination, discoveredSymbols: string[] = []): CombinationRule | null {
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
        points: 50,
        name: 'Consciousness Fusion',
        story: `${a} and ${b} merge in the dance of cosmic evolution, creating new possibilities.`
      };
    }
  }
  
  return null;
}

export function checkForFourElements(discoveredSymbols: string[]): boolean {
  const cosmicForces = ['🌀', '✨', '🌊', '⚖️']; // Fohat, Light, Akasha, Karma
  return cosmicForces.every(force => discoveredSymbols.includes(force));
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
  
  // Check for cosmic awakening
  if (checkForFourElements([...discoveredSymbols, result])) {
    return "🌟 The four cosmic forces unite! Fohat, Light, Akasha, and Karma awaken to infinite creative potential! 🌟";
  }
  
  // Chapter-based responses based on progression
  if (discoveredSymbols.length < 5) {
    return "The Absolute stirs from eternal slumber... What aspects of itself will it discover?";
  } else if (discoveredSymbols.length < 15) {
    return "Cosmic forces gather strength... The building blocks of reality take shape.";
  } else if (discoveredSymbols.length < 30) {
    return "The planes of existence unfold... Multiple dimensions of reality emerge.";
  } else if (discoveredSymbols.length < 60) {
    return "Consciousness awakens in myriad forms... Beings populate the cosmic tapestry.";
  } else if (discoveredSymbols.length < 100) {
    return "The universe experiences itself subjectively... Emotions and insights bloom.";
  } else {
    return "Infinite manifestation explodes forth... All possibilities dance in cosmic consciousness.";
  }
}

export function getRandomResponse(): string {
  const responses = [
    "The Absolute contemplates its own mystery...",
    "Cosmic forces stir in the eternal depths...",
    "What will consciousness discover about itself?",
    "The universe awakens to its own infinite nature..."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function calculatePoints(rule: CombinationRule, isFirstDiscovery: boolean): number {
  return rule.points * (isFirstDiscovery ? 2 : 1);
}

export function checkSpecialUnlocks(symbolResult: string): string[] {
  const unlocks: string[] = [];
  
  if (['🌀', '✨', '🌊', '⚖️'].includes(symbolResult)) {
    unlocks.push('Cosmic Forces Mastery');
  }
  
  if (['🏔️', '💭', '🌟', '👑'].includes(symbolResult)) {
    unlocks.push('Planes of Existence');
  }
  
  if (['👤', '🧚', '👼', '🌳'].includes(symbolResult)) {
    unlocks.push('Conscious Beings');
  }
  
  return unlocks;
}

export function calculateLevel(totalDiscoveries: number): number {
  if (totalDiscoveries < 5) return 1; // Chapter 1: Awakening
  if (totalDiscoveries < 15) return 2; // Chapter 2: Cosmic Forces
  if (totalDiscoveries < 30) return 3; // Chapter 3: Planes
  if (totalDiscoveries < 60) return 4; // Chapter 4: Beings
  if (totalDiscoveries < 100) return 5; // Chapter 5: Experiences
  return 6; // Chapter 6: Infinite Manifestation
}

export function getLevelProgress(totalDiscoveries: number): { current: number; max: number; percentage: number } {
  const level = calculateLevel(totalDiscoveries);
  const thresholds = [0, 5, 15, 30, 60, 100, 200];
  const current = totalDiscoveries - thresholds[level - 1];
  const max = thresholds[level] - thresholds[level - 1];
  const percentage = Math.floor((current / max) * 100);
  
  return { current, max, percentage };
}