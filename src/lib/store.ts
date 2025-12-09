'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, DailyProgress } from './types';

interface FitnessStore {
  // Estado do usuário
  profile: UserProfile | null;
  hasCompletedOnboarding: boolean;
  
  // Progresso
  dailyProgress: DailyProgress[];
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  completeOnboarding: () => void;
  updateDailyProgress: (progress: DailyProgress) => void;
  addBadge: (badgeId: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useFitnessStore = create<FitnessStore>()(
  persist(
    (set) => ({
      profile: null,
      hasCompletedOnboarding: false,
      dailyProgress: [],
      
      setProfile: (profile) => set({ profile }),
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      updateDailyProgress: (progress) => set((state) => ({
        dailyProgress: [
          ...state.dailyProgress.filter(p => p.date !== progress.date),
          progress
        ]
      })),
      
      addBadge: (badgeId) => set((state) => ({
        profile: state.profile ? {
          ...state.profile,
          badges: [...state.profile.badges, badgeId]
        } : null
      })),
      
      incrementStreak: () => set((state) => ({
        profile: state.profile ? {
          ...state.profile,
          currentStreak: state.profile.currentStreak + 1,
          completedDays: state.profile.completedDays + 1
        } : null
      })),
      
      resetStreak: () => set((state) => ({
        profile: state.profile ? {
          ...state.profile,
          currentStreak: 0
        } : null
      }))
    }),
    {
      name: 'fitness-storage',
    }
  )
);
