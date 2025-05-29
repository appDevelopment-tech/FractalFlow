import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { findCombination, generateAIResponse, calculatePoints, checkSpecialUnlocks, calculateLevel, getLevelProgress, checkForFourElements, type BasicSymbol } from '@/lib/symbol-combinations';
import { soundEngine } from '@/lib/sounds';
import { getDailyMystery, markDailyMysteryCompleted, hasCompletedDailyMystery } from '@/lib/daily-mystery';
import type { GameProfile, Discovery } from '@shared/schema';

export interface GameState {
  currentCombination: string[];
  sessionTime: number;
  sessionId: number | null;
  lastResponse: string | null;
  notifications: Notification[];
  playerHistory: string[]; // Track recent player patterns for AI responses
}

export interface Notification {
  id: string;
  type: 'discovery' | 'level_up' | 'special';
  title: string;
  message: string;
  points?: number;
  timestamp: number;
}

export function useGameState() {
  const queryClient = useQueryClient();
  
  const [gameState, setGameState] = useState<GameState>({
    currentCombination: [],
    sessionTime: 0,
    sessionId: null,
    lastResponse: null,
    notifications: [],
    playerHistory: []
  });

  // Fetch game profile
  const { data: profile, isLoading: profileLoading } = useQuery<GameProfile>({
    queryKey: ['/api/game/profile'],
  });

  // Fetch recent discoveries
  const { data: recentDiscoveries = [] } = useQuery<Discovery[]>({
    queryKey: ['/api/game/discoveries'],
    enabled: !!profile?.id,
  });

  // Start session mutation
  const startSessionMutation = useMutation({
    mutationFn: async (profileId: number) => {
      const response = await apiRequest('POST', '/api/game/session', {
        profileId,
        discoveryCount: 0,
        finalScore: 0
      });
      return response.json();
    },
    onSuccess: (session) => {
      setGameState(prev => ({ ...prev, sessionId: session.id }));
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updateData: Partial<GameProfile>) => {
      const response = await apiRequest('PATCH', `/api/game/profile/${profile?.id}`, updateData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/game/profile'] });
    }
  });

  // Create discovery mutation
  const createDiscoveryMutation = useMutation({
    mutationFn: async (discoveryData: { symbolResult: string; combination: BasicSymbol[]; points: number }) => {
      const response = await apiRequest('POST', '/api/game/discovery', {
        profileId: profile?.id,
        ...discoveryData
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/game/profile'] });
      queryClient.invalidateQueries({ queryKey: ['/api/game/discoveries'] });
    }
  });

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({ ...prev, sessionTime: prev.sessionTime + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('fractal-flow-history');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setGameState(prev => ({ ...prev, playerHistory: history }));
      } catch (e) {
        console.log('Could not load saved history');
      }
    }
  }, []);

  // Save player history to localStorage
  useEffect(() => {
    if (gameState.playerHistory.length > 0) {
      localStorage.setItem('fractal-flow-history', JSON.stringify(gameState.playerHistory));
    }
  }, [gameState.playerHistory]);

  // Start session when profile loads
  useEffect(() => {
    if (profile && !gameState.sessionId) {
      startSessionMutation.mutate(profile.id);
    }
  }, [profile, gameState.sessionId]);

  // Add symbol to current combination
  const addSymbol = useCallback((symbol: string) => {
    soundEngine.playSymbolClick(); // Audio feedback for symbol selection
    setGameState(prev => ({
      ...prev,
      currentCombination: [...prev.currentCombination, symbol].slice(-3) // Max 3 symbols
    }));
  }, []);

  // Clear current combination
  const clearCombination = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentCombination: [],
      lastResponse: null
    }));
  }, []);

  // Process symbol combination
  const processCombination = useCallback(async () => {
    if (!profile || gameState.currentCombination.length === 0) return;

    soundEngine.playCombine(); // Audio feedback for combination attempt
    const combination = [...gameState.currentCombination];
    
    // Get discovered symbols for infinite combinations
    const discoveredSymbols = Array.isArray(profile.discoveredSymbols) 
      ? profile.discoveredSymbols 
      : [];
    
    const rule = findCombination(combination, discoveredSymbols);
    
    if (rule) {
      // Check if this is a new discovery
      const discoveredSymbols = Array.isArray(profile.discoveredSymbols) 
        ? profile.discoveredSymbols 
        : [];
      const isFirstDiscovery = !discoveredSymbols.includes(rule.output);
      
      const points = calculatePoints(rule, isFirstDiscovery);
      
      // Prevent re-discovery cheating - only award points for first discovery
      if (!isFirstDiscovery) {
        setGameState(prev => ({
          ...prev,
          lastResponse: rule.output,
          notifications: [{
            id: Date.now().toString(),
            type: 'discovery',
            title: 'Pattern Recognized!',
            message: `You rediscovered ${rule.name} - no points awarded`,
            timestamp: Date.now()
          }, ...prev.notifications.slice(0, 4)]
        }));
        return;
      }
      
      // Play discovery sound for new discoveries
      soundEngine.playDiscovery();
      
      // Check if this discovery completes the daily mystery
      const dailyMystery = getDailyMystery();
      const allDiscoveredSymbols = [...discoveredSymbols, rule.output];
      const mysteryWasCompleted = hasCompletedDailyMystery(discoveredSymbols);
      const mysteryNowCompleted = hasCompletedDailyMystery(allDiscoveredSymbols);
      
      if (!mysteryWasCompleted && mysteryNowCompleted) {
        // Award the mystery reward symbol
        createDiscoveryMutation.mutate({
          symbolResult: dailyMystery.reward,
          combination: ['🎁', '✨'], // Special combination for mystery reward
          points: 100 // Bonus points for daily mystery
        });
        
        markDailyMysteryCompleted();
        
        // Add special daily mystery notification
        const mysteryNotification: Notification = {
          id: (Date.now() + 0.5).toString(),
          type: 'special',
          title: '🎁 Daily Mystery Solved!',
          message: `You unlocked ${dailyMystery.reward}: ${dailyMystery.description}`,
          points: 100,
          timestamp: Date.now()
        };
        
        setGameState(prev => ({
          ...prev,
          notifications: [mysteryNotification, ...prev.notifications.slice(0, 1)]
        }));
      }
      
      // Create discovery record only for new discoveries
      createDiscoveryMutation.mutate({
        symbolResult: rule.output,
        combination,
        points
      });

      // Check for special unlocks
      const unlocks = checkSpecialUnlocks(rule.output);
      
      // Check for four elements achievement - UNIVERSE UNLOCKED!
      const newDiscoveredSymbols = [...discoveredSymbols, rule.output];
      const hadFourElements = checkForFourElements(discoveredSymbols);
      const nowHasFourElements = checkForFourElements(newDiscoveredSymbols);
      
      if (nowHasFourElements && !hadFourElements) {
        const universeNotification: Notification = {
          id: (Date.now() + 1).toString(),
          type: 'special',
          title: '🌟 UNIVERSE UNLOCKED!',
          message: 'You have discovered the four elements! The infinite game begins - everything can now be combined with everything. From nothing, you have created the building blocks of reality.',
          points: 500,
          timestamp: Date.now()
        };
        setGameState(prev => ({ ...prev, notifications: [universeNotification, ...prev.notifications] }));
      }

      // Add notification
      const notification: Notification = {
        id: Date.now().toString(),
        type: isFirstDiscovery ? 'discovery' : 'discovery',
        title: isFirstDiscovery ? 'New Discovery!' : 'Pattern Recognized!',
        message: `You ${isFirstDiscovery ? 'unlocked' : 'created'} ${rule.name}`,
        points,
        timestamp: Date.now()
      };

      setGameState(prev => ({
        ...prev,
        currentCombination: [], // Clear combination after successful discovery
        lastResponse: rule.output,
        notifications: [notification, ...prev.notifications.slice(0, 1)] // Keep last 2
      }));

      // Check for level up
      const newLevel = calculateLevel(profile.totalDiscoveries + 1);
      if (newLevel > profile.level) {
        soundEngine.playLevelUp(); // Special sound for level up
        
        const levelNotification: Notification = {
          id: (Date.now() + 1).toString(),
          type: 'level_up',
          title: 'Level Up!',
          message: `You reached level ${newLevel}`,
          timestamp: Date.now()
        };
        
        setGameState(prev => ({
          ...prev,
          notifications: [levelNotification, ...prev.notifications.slice(0, 4)]
        }));
      }

      // Handle special unlocks
      unlocks.forEach(unlock => {
        const specialNotification: Notification = {
          id: (Date.now() + Math.random()).toString(),
          type: 'special',
          title: 'Special Feature Unlocked!',
          message: `You unlocked ${unlock.replace('_', ' ')}`,
          timestamp: Date.now()
        };
        
        setGameState(prev => ({
          ...prev,
          notifications: [specialNotification, ...prev.notifications.slice(0, 4)]
        }));
      });

    } else {
      // No combination found - give helpful feedback
      const discoveredSymbols = Array.isArray(profile.discoveredSymbols) 
        ? profile.discoveredSymbols 
        : [];
      const response = "😔";
      
      // Track this pattern in player history
      const patternString = combination.join('');
      setGameState(prev => ({
        ...prev,
        lastResponse: response,
        playerHistory: [patternString, ...prev.playerHistory.slice(0, 9)], // Keep last 10 patterns
        notifications: [{
          id: Date.now().toString(),
          type: 'discovery',
          title: 'No Combination Found',
          message: 'These symbols don\'t combine... yet. Try different patterns!',
          timestamp: Date.now()
        }, ...prev.notifications.slice(0, 1)]
      }));
    }
  }, [profile, gameState.currentCombination, createDiscoveryMutation]);

  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setGameState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  }, []);

  // Format session time
  const formattedSessionTime = useCallback(() => {
    const minutes = Math.floor(gameState.sessionTime / 60);
    const seconds = gameState.sessionTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [gameState.sessionTime]);

  // Reset all progress including profile data
  const resetProgress = useCallback(async () => {
    if (confirm('Are you sure you want to reset all progress? This will clear your discoveries, points, level, and tutorial. This cannot be undone.')) {
      // Clear localStorage
      localStorage.clear();
      
      // Reset profile data on server
      if (profile) {
        try {
          await updateProfileMutation.mutateAsync({
            level: 1,
            totalScore: 0,
            totalDiscoveries: 0,
            flowStreak: 0,
            discoveredSymbols: [],
            sessionData: {}
          });
        } catch (error) {
          console.log('Could not reset server data, but localStorage cleared');
        }
      }
      
      // Reload page to start fresh
      window.location.reload();
    }
  }, [profile, updateProfileMutation]);

  // Get level progress
  const levelProgress = profile ? getLevelProgress(profile.totalDiscoveries) : null;

  return {
    // State
    gameState,
    profile,
    recentDiscoveries,
    levelProgress,
    
    // Loading states
    isLoading: profileLoading,
    isProcessing: createDiscoveryMutation.isPending,
    
    // Actions
    addSymbol,
    clearCombination,
    processCombination,
    removeNotification,
    resetProgress,
    
    // Computed values
    formattedSessionTime,
    currentLevel: profile ? calculateLevel(profile.totalDiscoveries) : 1,
    discoveredSymbols: Array.isArray(profile?.discoveredSymbols) ? profile.discoveredSymbols : [],
  };
}
