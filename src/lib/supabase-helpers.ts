import { supabase } from './supabase'

// Tipos para o banco de dados
export type DailyProgress = {
  id?: string
  user_id: string
  date: string
  workout_completed: boolean
  calories_consumed: number
  water_consumed: number
  steps_count: number
  created_at?: string
  updated_at?: string
}

export type WorkoutLog = {
  id?: string
  user_id: string
  date: string
  exercise_name: string
  sets: string
  muscle_group: string
  completed: boolean
  created_at?: string
}

// Funções para Daily Progress
export async function getDailyProgress(userId: string, date: string): Promise<DailyProgress | null> {
  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  if (error) {
    console.error('Erro ao buscar progresso diário:', error)
    return null
  }

  return data
}

export async function upsertDailyProgress(progress: DailyProgress): Promise<boolean> {
  const { error } = await supabase
    .from('daily_progress')
    .upsert({
      user_id: progress.user_id,
      date: progress.date,
      workout_completed: progress.workout_completed,
      calories_consumed: progress.calories_consumed,
      water_consumed: progress.water_consumed,
      steps_count: progress.steps_count,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,date'
    })

  if (error) {
    console.error('Erro ao salvar progresso diário:', error)
    return false
  }

  return true
}

export async function updateWaterIntake(userId: string, date: string, amount: number): Promise<boolean> {
  // Buscar progresso atual
  const current = await getDailyProgress(userId, date)
  
  const newAmount = (current?.water_consumed || 0) + amount

  return await upsertDailyProgress({
    user_id: userId,
    date,
    workout_completed: current?.workout_completed || false,
    calories_consumed: current?.calories_consumed || 0,
    water_consumed: newAmount,
    steps_count: current?.steps_count || 0
  })
}

export async function updateCaloriesIntake(userId: string, date: string, calories: number): Promise<boolean> {
  const current = await getDailyProgress(userId, date)

  return await upsertDailyProgress({
    user_id: userId,
    date,
    workout_completed: current?.workout_completed || false,
    calories_consumed: calories,
    water_consumed: current?.water_consumed || 0,
    steps_count: current?.steps_count || 0
  })
}

export async function markWorkoutComplete(userId: string, date: string): Promise<boolean> {
  const current = await getDailyProgress(userId, date)

  return await upsertDailyProgress({
    user_id: userId,
    date,
    workout_completed: true,
    calories_consumed: current?.calories_consumed || 0,
    water_consumed: current?.water_consumed || 0,
    steps_count: current?.steps_count || 0
  })
}

// Funções para Workout Logs
export async function getTodayWorkoutLogs(userId: string, date: string): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from('workout_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Erro ao buscar logs de treino:', error)
    return []
  }

  return data || []
}

export async function logWorkoutExercise(log: WorkoutLog): Promise<boolean> {
  const { error } = await supabase
    .from('workout_logs')
    .insert({
      user_id: log.user_id,
      date: log.date,
      exercise_name: log.exercise_name,
      sets: log.sets,
      muscle_group: log.muscle_group,
      completed: log.completed
    })

  if (error) {
    console.error('Erro ao registrar exercício:', error)
    return false
  }

  return true
}

// Função para buscar histórico de progresso (últimos 7 dias)
export async function getWeeklyProgress(userId: string): Promise<DailyProgress[]> {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgo.toISOString().split('T')[0])
    .order('date', { ascending: false })

  if (error) {
    console.error('Erro ao buscar progresso semanal:', error)
    return []
  }

  return data || []
}

// Função para obter perfil do usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }

  return data
}

// Função para criar/atualizar perfil do usuário
export async function upsertUserProfile(profile: any): Promise<boolean> {
  const { error } = await supabase
    .from('user_profiles')
    .upsert(profile, {
      onConflict: 'id'
    })

  if (error) {
    console.error('Erro ao salvar perfil:', error)
    return false
  }

  return true
}
