import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserProfile = {
  id?: string
  nome: string
  email: string
  idade: number
  nivel: 'iniciante' | 'intermediario' | 'avancado'
  objetivo: string
  dias_disponiveis: number
  tempo_por_treino: number
  restricoes?: string
  created_at?: string
}
