// Tipos do sistema de fitness

export type FitnessGoal = 
  | 'lose_weight' 
  | 'gain_muscle' 
  | 'definition' 
  | 'performance' 
  | 'health';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutLocation = 'gym' | 'home';

export type DietType = 
  | 'balanced' 
  | 'low_carb' 
  | 'high_protein' 
  | 'vegetarian' 
  | 'vegan';

export interface UserProfile {
  // Funil
  goal: FitnessGoal;
  level: FitnessLevel;
  location: WorkoutLocation;
  dailyDuration: number; // minutos
  currentDiet: DietType;
  restrictions: string[];
  timeGoal: number; // semanas
  
  // Dados pessoais
  name?: string;
  age?: number;
  weight?: number;
  height?: number;
  targetWeight?: number;
  
  // Progresso
  completedDays: number;
  currentStreak: number;
  badges: string[];
  
  // Metas diárias
  dailyCalories: number;
  dailyWater: number; // ml
  dailySteps: number;
}

export interface DailyProgress {
  date: string;
  workoutCompleted: boolean;
  caloriesConsumed: number;
  waterConsumed: number;
  stepsCount: number;
  weight?: number;
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // segundos
  videoUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  muscleGroup: string;
}

export interface DailyWorkout {
  id: string;
  date: string;
  title: string;
  duration: number;
  exercises: WorkoutExercise[];
  completed: boolean;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  imageUrl?: string;
}

export interface DailyMealPlan {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'progress' | 'workout' | 'recipe' | 'steps';
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
}
