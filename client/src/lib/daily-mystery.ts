// Daily Mystery system for Fractal Flow
// Changes every 24 hours to encourage daily play

import { type BasicSymbol } from './symbol-combinations';

export interface DailyMystery {
  date: string; // YYYY-MM-DD format
  hint: string;
  solution: BasicSymbol[];
  reward: string;
  description: string;
}

// Predefined mysteries that rotate based on date - require multiple discoveries for engagement
const MYSTERIES: Omit<DailyMystery, 'date'>[] = [
  {
    hint: "Discover the cosmic trinity: Observer, Space, Great Breath, Motion, and Fohat",
    solution: ['👁️', '🌌', '🌬️', '⚡', '🌀'],
    reward: '🌟',
    description: "Cosmic Awakening - the five foundational forces unite"
  },
  {
    hint: "Master the elements: discover Light, Akasha, Karma, and Time",
    solution: ['✨', '🌊', '⚖️', '⏰'],
    reward: '💫',
    description: "Elemental Mastery - command over the four cosmic elements"
  },
  {
    hint: "Create consciousness: find Matter, Mind, Life, and Soul",
    solution: ['💎', '🧠', '🌱', '💭'],
    reward: '🧘',
    description: "Consciousness Evolution - the path from matter to soul"
  },
  {
    hint: "Awaken the heart: discover Human, Heart, Emotion, and Love",
    solution: ['👤', '❤️', '😊', '💖'],
    reward: '🕊️',
    description: "Heart Awakening - the emotional dimension of consciousness"
  },
  {
    hint: "Transcend matter: find Angel, Tree of Life, Mountain, and Solar Logos",
    solution: ['👼', '🌳', '🏔️', '👑'],
    reward: '✨',
    description: "Transcendence - beings beyond material existence"
  },
  {
    hint: "Unite opposites: discover Fire, Water, Earth, Air, and Will",
    solution: ['🔥', '💧', '🌍', '💨', '🔥'],
    reward: '⚖️',
    description: "Elemental Balance - harmony of opposing forces"
  },
  {
    hint: "Empty circles dance",
    solution: ['○', '○'],
    reward: '∞',
    description: "Infinity symbol - endless cycles"
  }
];

export function getDailyMystery(): DailyMystery {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Use date as seed for consistent daily selection
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const mysteryIndex = daysSinceEpoch % MYSTERIES.length;
  
  return {
    date: dateString,
    ...MYSTERIES[mysteryIndex]
  };
}

export function hasCompletedDailyMystery(discoveredSymbols: string[]): boolean {
  const mystery = getDailyMystery();
  // Check if player has discovered all required symbols for today's mystery
  return mystery.solution.every(symbol => discoveredSymbols.includes(symbol));
}

export function getDailyMysteryProgress(): {
  isCompleted: boolean;
  lastCompleted: string | null;
  streak: number;
} {
  const today = getDailyMystery().date;
  const savedProgress = localStorage.getItem('fractal-flow-daily-mystery');
  
  if (!savedProgress) {
    return { isCompleted: false, lastCompleted: null, streak: 0 };
  }
  
  try {
    const progress = JSON.parse(savedProgress);
    const isCompleted = progress.lastCompleted === today;
    
    // Calculate streak
    let streak = 0;
    if (progress.lastCompleted) {
      const lastDate = new Date(progress.lastCompleted);
      const currentDate = new Date(today);
      const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Completed today
        streak = progress.streak || 1;
      } else if (daysDiff === 1) {
        // Completed yesterday, maintain streak
        streak = progress.streak || 0;
      } else {
        // Streak broken
        streak = 0;
      }
    }
    
    return {
      isCompleted,
      lastCompleted: progress.lastCompleted,
      streak
    };
  } catch (e) {
    return { isCompleted: false, lastCompleted: null, streak: 0 };
  }
}

export function markDailyMysteryCompleted(): void {
  const today = getDailyMystery().date;
  const currentProgress = getDailyMysteryProgress();
  
  const newProgress = {
    lastCompleted: today,
    streak: currentProgress.isCompleted ? currentProgress.streak : currentProgress.streak + 1
  };
  
  localStorage.setItem('fractal-flow-daily-mystery', JSON.stringify(newProgress));
}

export function getTimeUntilNextMystery(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeLeft = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}