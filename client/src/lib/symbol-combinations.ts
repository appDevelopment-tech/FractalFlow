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
  },
  
  // === MISSING THEOSOPHICAL ELEMENTS ===
  
  {
    input: ['🌀', '⚖️'],
    output: '🌩️',
    points: 80,
    name: 'Lightning',
    story: 'Fohat meets Karma and divine electricity flashes forth. Lightning - the union of cosmic force and law.'
  },
  
  {
    input: ['✨', '⏰'],
    output: '🌙',
    points: 90,
    name: 'Moon',
    story: 'Light cycles through Time and lunar consciousness emerges. Moon - the reflector of cosmic wisdom.'
  },
  
  {
    input: ['🌬️', '✨'],
    output: '☀️',
    points: 120,
    name: 'Sun',
    story: 'Great Breath illuminated by Light becomes the solar logos. Sun - the heart of our cosmic system.'
  },
  
  {
    input: ['👁️', '⚖️'],
    output: '🪬',
    points: 110,
    name: 'Divine Eye',
    story: 'Observer united with Karma becomes the all-seeing eye. Divine perception that witnesses all actions.'
  },
  
  {
    input: ['🌊', '⏰'],
    output: '🌀',
    points: 70,
    name: 'Spiral',
    story: 'Akasha moves through Time in spiraling evolution. The cosmic pattern of all growth and development.'
  },
  
  {
    input: ['🔥', '🌊'],
    output: '💨',
    points: 85,
    name: 'Steam',
    story: 'Will meets Akasha and becomes the breath of transformation. Steam - matter ascending to spirit.'
  },
  
  {
    input: ['🌳', '✨'],
    output: '🌸',
    points: 95,
    name: 'Flower',
    story: 'Deva consciousness illuminated by Light blooms into beauty. Flower - spirit manifesting through form.'
  },
  
  {
    input: ['👤', '👼'],
    output: '🧘',
    points: 150,
    name: 'Meditation',
    story: 'Human reaches toward Angel through inner communion. Meditation - the bridge between mortal and divine.'
  },
  
  {
    input: ['🧠', '🌀'],
    output: '🌪️',
    points: 130,
    name: 'Thought-Storm',
    story: 'Mind channels Fohat and ideas whirl with cosmic intensity. The creative chaos of inspired thinking.'
  },
  
  {
    input: ['❤️', '🌊'],
    output: '💧',
    points: 80,
    name: 'Tears',
    story: 'Heart moves through Akasha as emotional waters. Tears - the sacred expression of feeling.'
  },

  // === EXPANDED THEOSOPHICAL COMBINATIONS ===
  // Based on authentic Blavatsky cosmology with logical progressions
  
  // Great Breath combinations
  {
    input: ['🌬️', '👁️'],
    output: '⚡',
    points: 45,
    name: 'Motion',
    story: 'Great Breath witnessed by Observer creates the eternal movement of consciousness.'
  },
  
  {
    input: ['🌬️', '🌬️'],
    output: '〰️',
    points: 60,
    name: 'Cosmic Rhythm',
    story: 'Great Breath breathing into itself creates the heartbeat of the universe.'
  },

  // Observer-Space combinations  
  {
    input: ['👁️', '🌌'],
    output: '🧠',
    points: 70,
    name: 'Consciousness', 
    story: 'Observer contemplating infinite Space develops awareness of itself.'
  },

  {
    input: ['👁️', '⚡'],
    output: '⏰',
    points: 65,
    name: 'Time',
    story: 'Observer witnessing Motion creates the experience of time flowing.'
  },

  {
    input: ['👁️', '👁️'],
    output: '👁️‍🗨️',
    points: 80,
    name: 'Multiplicity',
    story: 'Observer seeing itself creates multiple streams of awareness.'
  },

  {
    input: ['👁️', '🕳️'],
    output: '❓',
    points: 90,
    name: 'Mystery',
    story: 'Observer gazing into the Void encounters the eternal question of existence.'
  },

  // Fohat-Akasha combinations
  {
    input: ['🌀', '🌊'],
    output: '☀️',
    points: 100,
    name: 'Light',
    story: 'Fohat energizing Akasha creates divine illumination piercing the cosmos.'
  },

  {
    input: ['🌀', '🌊'],
    output: '⚛️',
    points: 95,
    name: 'Matter',
    story: 'Fohat condensing Akasha crystallizes spirit into substance.'
  },

  {
    input: ['🌀', '🧠'],
    output: '🔥',
    points: 110,
    name: 'Will',
    story: 'Fohat channeled through Consciousness becomes directed cosmic force.'
  },

  {
    input: ['🌀', '⚡'],
    output: '⚡',
    points: 85,
    name: 'Energy',
    story: 'Fohat merging with Motion creates pure dynamic force.'
  },

  {
    input: ['🌀', '⏰'],
    output: '🔄',
    points: 75,
    name: 'Cycles',
    story: 'Fohat moving through Time creates the eternal wheel of existence.'
  },

  // Space-Time-Matter combinations
  {
    input: ['🌌', '⏰'],
    output: '🌐',
    points: 120,
    name: 'Spacetime',
    story: 'Space unified with Time creates the fabric of reality itself.'
  },

  {
    input: ['🌌', '⚛️'],
    output: '🏔️',
    points: 110,
    name: 'Physical Plane',
    story: 'Space filled with Matter crystallizes into the material realm.'
  },

  {
    input: ['🌌', '🧠'],
    output: '💭',
    points: 115,
    name: 'Mental Plane',
    story: 'Space illuminated by Consciousness creates the realm of thought.'
  },

  // Light consciousness combinations
  {
    input: ['☀️', '🧠'],
    output: '🦉',
    points: 130,
    name: 'Wisdom',
    story: 'Light penetrating Consciousness creates illuminated understanding.'
  },

  {
    input: ['☀️', '⚛️'],
    output: '💎',
    points: 125,
    name: 'Crystal',
    story: 'Light crystallized within Matter creates perfect geometric form.'
  },

  {
    input: ['☀️', '🕳️'],
    output: '🌑',
    points: 105,
    name: 'Shadow',
    story: 'Light meeting Void defines the boundary between illumination and mystery.'
  },

  // Matter-Consciousness-Life progression
  {
    input: ['⚛️', '🧠'],
    output: '🌱',
    points: 140,
    name: 'Life',
    story: 'Matter awakened by Consciousness stirs into living being.'
  },

  {
    input: ['🌱', '🧠'],
    output: '👤',
    points: 160,
    name: 'Soul',
    story: 'Life touched by Consciousness develops individual awareness.'
  },

  {
    input: ['👤', '⚛️'],
    output: '👨',
    points: 150,
    name: 'Human',
    story: 'Soul embodied in Matter becomes human - bridge between spirit and form.'
  },

  {
    input: ['👤', '☀️'],
    output: '👼',
    points: 180,
    name: 'Angel',
    story: 'Soul purified by Light becomes an angelic being of pure consciousness.'
  },

  // Human development
  {
    input: ['👨', '🧠'],
    output: '🧠',
    points: 90,
    name: 'Mind',
    story: 'Human developing consciousness creates the faculty of thinking.'
  },

  {
    input: ['👨', '❤️'],
    output: '❤️',
    points: 95,
    name: 'Heart',
    story: 'Human opening to feeling develops the emotional center.'
  },

  {
    input: ['👨', '🔥'],
    output: '🕊️',
    points: 120,
    name: 'Spirit',
    story: 'Human expressing Will awakens the divine spark within.'
  },

  // Planes and experiences
  {
    input: ['🏔️', '🌱'],
    output: '🌍',
    points: 200,
    name: 'Earth',
    story: 'Physical Plane animated by Life becomes a conscious planetary being.'
  },

  {
    input: ['🏔️', '☀️'],
    output: '☀️',
    points: 180,
    name: 'Sun',
    story: 'Physical Plane receiving Light manifests the solar principle.'
  },

  {
    input: ['💭', '🧠'],
    output: '💭',
    points: 85,
    name: 'Thought',
    story: 'Mental Plane activated by Consciousness generates thought-forms.'
  },

  {
    input: ['💭', '🧠'],
    output: '💡',
    points: 90,
    name: 'Idea',
    story: 'Mental Plane touched by experience creates illuminating insights.'
  },

  // Advanced consciousness states
  {
    input: ['🕳️', '🧠'],
    output: '🧘',
    points: 170,
    name: 'Meditation',
    story: 'Consciousness resting in the Void discovers the peace beyond thought.'
  },

  {
    input: ['❓', '🧠'],
    output: '✨',
    points: 140,
    name: 'Wonder',
    story: 'Mystery embraced by Consciousness becomes the joy of not-knowing.'
  },

  {
    input: ['❓', '🦉'],
    output: '🔮',
    points: 200,
    name: 'Gnosis',
    story: 'Mystery penetrated by Wisdom becomes direct knowing beyond thought.'
  },

  // Heart-mind unity
  {
    input: ['🧠', '❤️'],
    output: '🦉',
    points: 130,
    name: 'Wisdom',
    story: 'Mind and Heart united create the wisdom that transcends both.'
  },

  {
    input: ['❤️', '🧠'],
    output: '😊',
    points: 80,
    name: 'Emotion',
    story: 'Heart opening to Consciousness creates the dimension of feeling.'
  },

  {
    input: ['❤️', '🧠'],
    output: '💖',
    points: 120,
    name: 'Love',
    story: 'Heart experiencing through Consciousness discovers the unity in all.'
  },

  // Cosmic relationships
  {
    input: ['🌍', '👨'],
    output: '🏛️',
    points: 180,
    name: 'Civilization',
    story: 'Earth touched by Human consciousness develops collective culture.'
  },

  {
    input: ['🌍', '🧠'],
    output: '🌍',
    points: 220,
    name: 'Gaia',
    story: 'Earth awakening to its own Consciousness becomes a living planetary being.'
  },

  {
    input: ['☀️', '🌍'],
    output: '🍂',
    points: 160,
    name: 'Seasons',
    story: 'Sun and Earth dancing together create the rhythm of natural cycles.'
  },

  {
    input: ['☀️', '🧠'],
    output: '👑',
    points: 250,
    name: 'Solar Logos',
    story: 'Sun awakened to Consciousness becomes the supreme intelligence of our system.'
  }
];

// SYMBOL NAME MAPPING - Every symbol has a proper name
export const SYMBOL_NAMES: Record<string, string> = {
  '⚫': 'Absolute',
  '👁️': 'Observer', 
  '🌌': 'Space',
  '🌬️': 'Great Breath',
  '⚡': 'Motion',
  '🌀': 'Fohat',
  '✨': 'Light',
  '🕳️': 'Void',
  '🌊': 'Akasha',
  '⚖️': 'Karma',
  '⏰': 'Time',
  '🏔️': 'Physical Plane',
  '💭': 'Mental Plane',
  '🌟': 'Astral Plane',
  '👑': 'Buddhic Plane',
  '👤': 'Human',
  '🧚': 'Elemental',
  '👼': 'Angel',
  '🌳': 'Deva',
  '🧠': 'Mind',
  '❤️': 'Heart',
  '🔥': 'Will',
  '😊': 'Joy',
  '🤔': 'Contemplation',
  '💡': 'Inspiration',
  '🎯': 'Purpose',
  '🌅': 'Wonder',
  '🎨': 'Art',
  '🔬': 'Science',
  '🏛️': 'Civilization',
  '🎵': 'Music',
  '🌍': 'Earth',
  '⭐': 'Stars',
  '🔭': 'Astronomer',
  '🎼': 'Composer',
  '🌋': 'Volcano',
  '🙏': 'Prayer',
  '🌩️': 'Lightning',
  '🌙': 'Moon',
  '☀️': 'Sun',
  '🪬': 'Divine Eye',
  '💨': 'Steam',
  '🌸': 'Flower',
  '🧘': 'Meditation',
  '🌪️': 'Thought-Storm',
  '💧': 'Tears',
  '〰️': 'Cosmic Rhythm',
  '👁️‍🗨️': 'Multiplicity',
  '❓': 'Mystery',
  '⚛️': 'Matter',
  '🔄': 'Cycles',
  '🌐': 'Spacetime',
  '🦉': 'Wisdom',
  '💎': 'Crystal',
  '🌑': 'Shadow',
  '👨': 'Human',
  '🕊️': 'Spirit',
  '🍂': 'Seasons',
  '🔮': 'Gnosis',
  '😊': 'Emotion',
  '💖': 'Love',
  '👑': 'Solar Logos'
};

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
  
  // Don't create automatic fusions - only allow predefined combinations
  // This prevents unwanted multiplications like "eye+eye = two eyes"
  
  return null;
}

export function checkForFourElements(discoveredSymbols: string[]): boolean {
  const cosmicForces = ['🌀', '✨', '🌊', '⚖️']; // Fohat, Light, Akasha, Karma
  return cosmicForces.every(force => discoveredSymbols.includes(force));
}

// Hint system - philosophical guidance without revealing solutions
export function getHintForStuckPlayer(discoveredSymbols: string[]): string {
  const hints = [
    // Early stage hints
    "💫 The Absolute contains all potentials... What happens when it contemplates itself?",
    "🌊 Space and movement dance together... What emerges from their cosmic ballet?",
    "⚡ When consciousness witnesses motion, time is born...",
    "🌀 Cosmic electricity seeks a medium... What substance can carry divine force?",
    "👁️ The Observer seeing itself creates multiplicity... Contemplate self-reflection.",
    
    // Mid-stage hints  
    "✨ Light and matter are one essence... How does spirit crystallize into form?",
    "🧠 When consciousness touches matter, what miracle awakens?",
    "💎 Perfect geometric forms emerge when light meets substance...",
    "🌱 Life is consciousness dwelling in matter... What awakens when they unite?",
    "👤 Individual awareness emerges from universal life...",
    
    // Advanced hints
    "👼 Pure light can purify the soul... What beings exist beyond matter?",
    "🧘 Consciousness can rest in the void... What peace lies beyond thought?",
    "🦉 When mind and heart unite, what transcendent wisdom emerges?",
    "🌍 Planets too can awaken to consciousness... What happens when Earth realizes itself?",
    "👑 Even the Sun has cosmic consciousness... What supreme intelligence guides our system?",
    
    // Relationship hints
    "🔄 Time flows in cycles... What happens when cosmic force meets temporal rhythm?",
    "🌐 Space and time are woven together... What fabric holds reality?",
    "💖 The heart knows what the mind cannot grasp... What emerges from their unity?",
    "🔮 Mystery dissolved by wisdom becomes direct knowing...",
    "🏛️ Human consciousness can shape worlds... What happens when humanity touches Earth?"
  ];
  
  // Select hint based on progress level
  const progressLevel = Math.floor(discoveredSymbols.length / 5);
  const relevantHints = hints.slice(progressLevel * 5, (progressLevel + 1) * 5);
  
  if (relevantHints.length === 0) {
    return "🌟 You've discovered much! Try combining your discoveries in new ways... The cosmos has infinite depth.";
  }
  
  return relevantHints[Math.floor(Math.random() * relevantHints.length)];
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

// HINT SYSTEM - Contextual guidance without revealing exact solutions
export function getContextualHint(discoveredSymbols: string[]): string | null {
  // Early guidance for Absolute exploration
  if (discoveredSymbols.includes('⚫') && !discoveredSymbols.includes('👁️')) {
    return "The Absolute seeks to know itself... What happens when it becomes aware?";
  }
  
  if (discoveredSymbols.includes('👁️') && !discoveredSymbols.includes('🌌')) {
    return "The Observer needs space to exist... What infinite container holds all awareness?";
  }
  
  if (discoveredSymbols.includes('⚫') && discoveredSymbols.includes('👁️') && !discoveredSymbols.includes('🌬️')) {
    return "The Absolute breathes... What is the first stirring of cosmic life?";
  }
  
  // Cosmic Forces guidance
  if (discoveredSymbols.includes('⚡') && discoveredSymbols.includes('🌌') && !discoveredSymbols.includes('🌀')) {
    return "Motion needs space to become a force... What cosmic electricity shapes reality?";
  }
  
  if (discoveredSymbols.includes('🌀') && discoveredSymbols.includes('👁️') && !discoveredSymbols.includes('✨')) {
    return "Cosmic force meets awareness... What pierces the darkness of space?";
  }
  
  if (discoveredSymbols.includes('🌬️') && discoveredSymbols.includes('🌀') && !discoveredSymbols.includes('🌊')) {
    return "Breath and force create substance... What ethereal medium carries all vibration?";
  }
  
  // Matter and Life guidance
  if (discoveredSymbols.includes('🌀') && discoveredSymbols.includes('🌊') && !discoveredSymbols.includes('⚛️')) {
    return "Force condensing in the ethereal medium... What crystallizes spirit into form?";
  }
  
  if (discoveredSymbols.includes('⚛️') && discoveredSymbols.includes('🧠') && !discoveredSymbols.includes('🌱')) {
    return "Matter touched by awareness... What stirs substance into living being?";
  }
  
  if (discoveredSymbols.includes('🌱') && discoveredSymbols.includes('🧠') && !discoveredSymbols.includes('👤')) {
    return "Life develops awareness... What individual spark of consciousness emerges?";
  }
  
  // Human development
  if (discoveredSymbols.includes('👤') && discoveredSymbols.includes('⚛️') && !discoveredSymbols.includes('👨')) {
    return "Soul seeks embodiment... What bridge forms between spirit and matter?";
  }
  
  if (discoveredSymbols.includes('👤') && discoveredSymbols.includes('☀️') && !discoveredSymbols.includes('👼')) {
    return "Soul purified by divine illumination... What luminous being transcends form?";
  }
  
  // Advanced states
  if (discoveredSymbols.includes('🧠') && discoveredSymbols.includes('❤️') && !discoveredSymbols.includes('🦉')) {
    return "When mind and heart unite... What transcendent understanding emerges?";
  }
  
  if (discoveredSymbols.includes('🕳️') && discoveredSymbols.includes('🧠') && !discoveredSymbols.includes('🧘')) {
    return "Consciousness resting in emptiness... What peaceful state lies beyond thought?";
  }
  
  if (discoveredSymbols.includes('❓') && discoveredSymbols.includes('🦉') && !discoveredSymbols.includes('🔮')) {
    return "Mystery penetrated by wisdom... What direct knowing transcends all questions?";
  }
  
  // Cosmic beings
  if (discoveredSymbols.includes('☀️') && discoveredSymbols.includes('🧠') && !discoveredSymbols.includes('👑')) {
    return "The Sun awakening to consciousness... What supreme intelligence guides our cosmic system?";
  }
  
  if (discoveredSymbols.includes('🌍') && discoveredSymbols.includes('🧠') && !discoveredSymbols.includes('🌍')) {
    return "Earth developing awareness... What planetary consciousness emerges from matter?";
  }
  
  // General guidance based on what they have
  if (discoveredSymbols.length > 5 && discoveredSymbols.length < 10) {
    return "Cosmic forces are gathering... Consider how breath, motion, and space interact...";
  }
  
  if (discoveredSymbols.length > 10 && discoveredSymbols.length < 20) {
    return "The planes of existence are forming... How do force and substance create different realms?";
  }
  
  if (discoveredSymbols.length > 20 && discoveredSymbols.length < 30) {
    return "Consciousness is awakening in many forms... What happens when awareness meets matter?";
  }
  
  return null; // No specific hint needed
}

// Get hints for specific symbol combinations
export function getCombinationHints(currentCombination: string[]): string[] {
  const hints: string[] = [];
  
  if (currentCombination.length === 1) {
    const symbol = currentCombination[0];
    switch (symbol) {
      case '⚫':
        hints.push("The Absolute contains all possibilities...");
        hints.push("Self-reflection creates duality...");
        break;
      case '👁️':
        hints.push("The Observer sees infinite space...");
        hints.push("Awareness witnessing motion creates time...");
        break;
      case '🌀':
        hints.push("Cosmic force shapes ethereal substance...");
        hints.push("Electricity meeting awareness becomes light...");
        break;
      case '🌊':
        hints.push("The medium that carries all vibration...");
        hints.push("Where cosmic breath meets divine force...");
        break;
    }
  } else if (currentCombination.length === 2) {
    const [a, b] = currentCombination;
    
    // Hint for common combinations
    if ((a === '🌀' && b === '🌊') || (a === '🌊' && b === '🌀')) {
      hints.push("Force working through substance creates...");
      hints.push("Divine electricity condensing ethereal medium...");
    }
    
    if ((a === '👁️' && b === '🌌') || (a === '🌌' && b === '👁️')) {
      hints.push("Awareness contemplating infinite space...");
      hints.push("Observer developing self-consciousness...");
    }
    
    if ((a === '⚛️' && b === '🧠') || (a === '🧠' && b === '⚛️')) {
      hints.push("Matter awakened by consciousness...");
      hints.push("Substance stirring into living form...");
    }
  }
  
  return hints;
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