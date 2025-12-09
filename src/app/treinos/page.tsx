'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Clock, TrendingUp, Play, Check } from 'lucide-react';

interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: number;
  completed: boolean;
}

export default function TreinosIA() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Treino Full Body - Iniciante',
      type: 'Corpo Inteiro',
      duration: 45,
      difficulty: 'beginner',
      exercises: 8,
      completed: false,
    },
    {
      id: '2',
      name: 'Push Day - Intermediário',
      type: 'Superiores',
      duration: 60,
      difficulty: 'intermediate',
      exercises: 6,
      completed: true,
    },
    {
      id: '3',
      name: 'Leg Day Intenso',
      type: 'Inferiores',
      duration: 75,
      difficulty: 'advanced',
      exercises: 7,
      completed: false,
    },
    {
      id: '4',
      name: 'Pull Day - Costas e Bíceps',
      type: 'Superiores',
      duration: 60,
      difficulty: 'intermediate',
      exercises: 6,
      completed: false,
    },
    {
      id: '5',
      name: 'HIIT Cardio',
      type: 'Cardio',
      duration: 30,
      difficulty: 'beginner',
      exercises: 5,
      completed: true,
    },
    {
      id: '6',
      name: 'Treino de Força Avançado',
      type: 'Corpo Inteiro',
      duration: 90,
      difficulty: 'advanced',
      exercises: 10,
      completed: false,
    },
  ];

  const filteredWorkouts = selectedDifficulty === 'all' 
    ? workouts 
    : workouts.filter(w => w.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">FitAI</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:text-red-600">
              Dashboard
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Treinos Criados pela <span className="text-red-600">IA</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Treinos automáticos adaptados ao seu nível e objetivos. A IA ajusta baseado no seu progresso.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <div className="text-sm text-gray-400">Treinos Completos</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">720</div>
            <div className="text-sm text-gray-400">Minutos Treinados</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">85%</div>
            <div className="text-sm text-gray-400">Taxa de Conclusão</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">7</div>
            <div className="text-sm text-gray-400">Dias de Sequência</div>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Button
            variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('all')}
            className={selectedDifficulty === 'all' ? 'bg-red-600 hover:bg-red-700 text-white' : 'border-gray-700 text-black hover:bg-gray-800 hover:text-white'}
          >
            Todos
          </Button>
          <Button
            variant={selectedDifficulty === 'beginner' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('beginner')}
            className={selectedDifficulty === 'beginner' ? 'bg-green-600 hover:bg-green-700 text-black' : 'border-gray-700 text-black hover:bg-gray-800 hover:text-white'}
          >
            Iniciante
          </Button>
          <Button
            variant={selectedDifficulty === 'intermediate' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('intermediate')}
            className={selectedDifficulty === 'intermediate' ? 'bg-yellow-600 hover:bg-yellow-700 text-black' : 'border-gray-700 text-black hover:bg-gray-800 hover:text-white'}
          >
            Intermediário
          </Button>
          <Button
            variant={selectedDifficulty === 'advanced' ? 'default' : 'outline'}
            onClick={() => setSelectedDifficulty('advanced')}
            className={selectedDifficulty === 'advanced' ? 'bg-red-600 hover:bg-red-700 text-black' : 'border-gray-700 text-black hover:bg-gray-800 hover:text-white'}
          >
            Avançado
          </Button>
        </div>

        {/* Workouts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <Badge className={`${getDifficultyColor(workout.difficulty)} text-white`}>
                  {getDifficultyLabel(workout.difficulty)}
                </Badge>
                {workout.completed && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <Check className="w-4 h-4" />
                    <span>Completo</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors text-white">
                {workout.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4">{workout.type}</p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  <span>{workout.exercises} exercícios</span>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                {workout.completed ? 'Treinar Novamente' : 'Iniciar Treino'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Generate New Workout */}
        <Card className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-red-600 to-red-800 border-0 p-8 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2 text-white">Pronto para mais?</h3>
          <p className="text-white opacity-90 mb-6">
            A IA pode gerar um novo treino personalizado baseado no seu progresso
          </p>
          <Button className="bg-white text-black font-bold hover:bg-gray-100 hover:text-white text-lg px-8 py-6">
            Gerar Novo Treino
          </Button>
        </Card>
      </div>
    </div>
  );
}
