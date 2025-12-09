'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFitnessStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/custom/navbar';
import { 
  Dumbbell, 
  Utensils, 
  Droplet, 
  Footprints, 
  CheckCircle2, 
  TrendingUp,
  Flame,
  Target,
  Calendar,
  Play,
  ChevronRight,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { 
  getDailyProgress, 
  updateWaterIntake, 
  markWorkoutComplete,
  DailyProgress 
} from '@/lib/supabase-helpers';

// Exercícios do dia com vídeos demonstrativos
const todayWorkout = [
  { 
    name: 'Supino Reto', 
    sets: '4x12', 
    video: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    muscleGroup: 'Peito'
  },
  { 
    name: 'Crucifixo Inclinado', 
    sets: '3x15', 
    video: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    muscleGroup: 'Peito'
  },
  { 
    name: 'Tríceps Testa', 
    sets: '3x12', 
    video: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
    muscleGroup: 'Tríceps'
  },
  { 
    name: 'Tríceps Corda', 
    sets: '3x15', 
    video: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop',
    muscleGroup: 'Tríceps'
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { profile, hasCompletedOnboarding } = useFitnessStore();
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [todayProgress, setTodayProgress] = useState({
    workoutCompleted: false,
    caloriesConsumed: 0,
    waterConsumed: 0,
    stepsCount: 0,
  });

  // ID do usuário (você pode pegar do auth ou usar um ID fixo para testes)
  const userId = 'user-demo-123'; // Substitua por auth real depois

  useEffect(() => {
    if (!hasCompletedOnboarding || !profile) {
      router.push('/');
      return;
    }

    loadTodayProgress();
  }, [hasCompletedOnboarding, profile, router]);

  const loadTodayProgress = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const progress = await getDailyProgress(userId, today);
      
      if (progress) {
        setTodayProgress({
          workoutCompleted: progress.workout_completed,
          caloriesConsumed: progress.calories_consumed,
          waterConsumed: progress.water_consumed,
          stepsCount: progress.steps_count,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWater = async (amount: number) => {
    if (!profile) return;
    
    setSaving(true);
    const today = new Date().toISOString().split('T')[0];
    const newAmount = Math.min(todayProgress.waterConsumed + amount, profile.dailyWater);
    
    const success = await updateWaterIntake(userId, today, amount);
    
    if (success) {
      setTodayProgress({ ...todayProgress, waterConsumed: newAmount });
    }
    
    setSaving(false);
  };

  const handleCompleteWorkout = async () => {
    setSaving(true);
    const today = new Date().toISOString().split('T')[0];
    
    const success = await markWorkoutComplete(userId, today);
    
    if (success) {
      setTodayProgress({ ...todayProgress, workoutCompleted: true });
    }
    
    setSaving(false);
  };

  if (!profile) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  const caloriesProgress = (todayProgress.caloriesConsumed / profile.dailyCalories) * 100;
  const waterProgress = (todayProgress.waterConsumed / profile.dailyWater) * 100;
  const stepsProgress = (todayProgress.stepsCount / profile.dailySteps) * 100;

  const goalLabels: Record<string, string> = {
    lose_weight: 'Perder Peso',
    gain_muscle: 'Ganhar Massa',
    definition: 'Definição',
    performance: 'Performance',
    health: 'Saúde',
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Olá! 👋</h2>
          <p className="text-sm sm:text-base text-gray-400">
            Seu objetivo: <span className="font-semibold text-red-600">{goalLabels[profile.goal]}</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4 bg-gray-900 border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Dias</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{profile.completedDays}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-4 bg-gray-900 border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Sequência</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{profile.currentStreak}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-4 bg-gray-900 border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Meta</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{profile.timeGoal}s</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-4 bg-gray-900 border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Badges</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{profile.badges.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Treino do Dia - Destaque Principal */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-red-600 bg-gray-900">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-red-600 rounded-xl">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-white">Treino de Hoje</h3>
                <p className="text-xs sm:text-sm text-gray-400">Peito e Tríceps • {profile.dailyDuration} min</p>
              </div>
            </div>
            {todayProgress.workoutCompleted && (
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
            )}
          </div>

          {!todayProgress.workoutCompleted ? (
            <div className="space-y-4">
              {/* Preview dos exercícios */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {todayWorkout.slice(0, 4).map((exercise, idx) => (
                  <div key={idx} className="relative group cursor-pointer" onClick={() => setShowWorkoutDetails(!showWorkoutDetails)}>
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs font-medium truncate">{exercise.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista detalhada de exercícios */}
              {showWorkoutDetails && (
                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                  {todayWorkout.map((exercise, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800 hover:border-red-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                          <Dumbbell className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white">{exercise.name}</p>
                          <p className="text-xs text-gray-500">{exercise.sets} • {exercise.muscleGroup}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  ))}
                </div>
              )}

              <Button 
                className="w-full bg-red-600 hover:bg-red-700 h-12 sm:h-14 text-base sm:text-lg font-semibold"
                onClick={() => {
                  if (showWorkoutDetails) {
                    handleCompleteWorkout();
                  } else {
                    setShowWorkoutDetails(true);
                  }
                }}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Play className="w-5 h-5 mr-2" />
                )}
                {showWorkoutDetails ? 'Completar Treino' : 'Ver Exercícios'}
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-lg sm:text-xl text-red-600">Treino Completo!</p>
              <p className="text-sm text-gray-400">Ótimo trabalho hoje 💪</p>
            </div>
          )}
        </Card>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Dieta do Dia */}
          <Card className="p-4 sm:p-6 bg-gray-900 border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">Dieta de Hoje</h3>
                <p className="text-xs sm:text-sm text-gray-400">{profile.dailyCalories} kcal</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-400">Calorias Consumidas</span>
                  <span className="font-semibold text-white">{todayProgress.caloriesConsumed} / {profile.dailyCalories}</span>
                </div>
                <Progress value={caloriesProgress} className="h-2 sm:h-3" />
                <p className="text-xs text-gray-500 mt-1">
                  {caloriesProgress < 90 ? `Faltam ${profile.dailyCalories - todayProgress.caloriesConsumed} kcal` : 
                   caloriesProgress > 110 ? 'Acima da meta' : '✓ Na meta!'}
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { meal: 'Café da Manhã', time: '08:00', kcal: 450, done: true },
                  { meal: 'Almoço', time: '12:30', kcal: 650, done: true },
                  { meal: 'Lanche', time: '16:00', kcal: 200, done: false },
                  { meal: 'Jantar', time: '19:30', kcal: 600, done: false },
                ].map((meal, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    meal.done ? 'bg-red-600/10 border border-red-600/20' : 'bg-black border border-gray-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {meal.done && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                      <div>
                        <p className="font-medium text-sm text-white">{meal.meal}</p>
                        <p className="text-xs text-gray-500">{meal.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">{meal.kcal} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Progresso Diário - Água e Passos */}
          <div className="space-y-4 sm:space-y-6">
            {/* Água */}
            <Card className="p-4 sm:p-6 bg-gray-900 border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600/10 rounded-lg">
                  <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-white">Água</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{todayProgress.waterConsumed} / {profile.dailyWater} ml</p>
                </div>
                {waterProgress >= 100 && <CheckCircle2 className="w-6 h-6 text-red-600" />}
              </div>
              <Progress value={waterProgress} className="h-2 sm:h-3 mb-4" />
              <div className="flex gap-2">
                {[250, 500, 750].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => handleAddWater(amount)}
                    disabled={saving || todayProgress.waterConsumed >= profile.dailyWater}
                  >
                    {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : `+${amount}ml`}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Passos */}
            <Card className="p-4 sm:p-6 bg-gray-900 border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600/10 rounded-lg">
                  <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-white">Passos</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{todayProgress.stepsCount.toLocaleString()} / {profile.dailySteps.toLocaleString()}</p>
                </div>
                {stepsProgress >= 100 && <CheckCircle2 className="w-6 h-6 text-red-600" />}
              </div>
              <Progress value={stepsProgress} className="h-2 sm:h-3 mb-3" />
              <p className="text-xs sm:text-sm text-gray-400">
                {stepsProgress >= 100 ? '🎉 Meta atingida!' : `Faltam ${(profile.dailySteps - todayProgress.stepsCount).toLocaleString()} passos`}
              </p>
            </Card>
          </div>
        </div>

        {/* Dica Personalizada */}
        <Card className="p-4 sm:p-6 mb-6 bg-red-600/10 border-red-600/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white">Dica Personalizada</h3>
              <p className="text-sm sm:text-base text-gray-300">
                {profile.goal === 'lose_weight' && 'Mantenha um déficit calórico consistente e priorize proteínas em cada refeição. Beba água antes das refeições para aumentar a saciedade.'}
                {profile.goal === 'gain_muscle' && 'Aumente gradualmente a carga dos exercícios e consuma proteína após o treino. Durma pelo menos 7-8 horas para otimizar a recuperação muscular.'}
                {profile.goal === 'definition' && 'Combine treino de força com cardio moderado e mantenha uma dieta balanceada. Foque em exercícios compostos para queimar mais calorias.'}
                {profile.goal === 'performance' && 'Foque em exercícios compostos e dê atenção especial à recuperação. Varie a intensidade dos treinos para evitar platôs.'}
                {profile.goal === 'health' && 'Mantenha a consistência nos treinos e priorize alimentos naturais e integrais. A regularidade é mais importante que a intensidade.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Checklist Diário */}
        <Card className="p-4 sm:p-6 bg-gray-900 border-gray-800">
          <h3 className="font-bold text-base sm:text-lg mb-4 text-white">Checklist Diário</h3>
          <div className="space-y-2 sm:space-y-3">
            {[
              { label: 'Completar treino', done: todayProgress.workoutCompleted, icon: Dumbbell },
              { label: 'Atingir meta de calorias', done: caloriesProgress >= 90 && caloriesProgress <= 110, icon: Utensils },
              { label: 'Beber água suficiente', done: waterProgress >= 100, icon: Droplet },
              { label: 'Atingir meta de passos', done: stepsProgress >= 100, icon: Footprints },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  item.done ? 'bg-red-600/10 border border-red-600/20' : 'bg-black border border-gray-800'
                }`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                    item.done ? 'bg-red-600' : 'bg-gray-800'
                  }`}>
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                  </div>
                  <span className={`text-sm sm:text-base ${item.done ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
}
