'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Plus, Search, X, Dumbbell, MoreVertical, Trash, Edit, Share, Copy } from 'lucide-react';
import Image from 'next/image';

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  gifUrl: string;
  sets?: number;
  reps?: string;
  weight?: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

// Lista de exercícios disponíveis
const AVAILABLE_EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Supino Reto com Barra',
    equipment: 'Barra',
    primaryMuscle: 'Peito',
    secondaryMuscle: 'Tríceps, Ombros',
    gifUrl: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f4db6331-3750-421a-a867-1c8869134145.gif'
  }
];

export default function MontadorTreino() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [expandedGif, setExpandedGif] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredExercises = AVAILABLE_EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName || 'Novo Treino',
      exercises: []
    };
    setWorkouts([...workouts, newWorkout]);
    setWorkoutName('');
    // NÃO setamos selectedWorkout aqui - usuário permanece na lista
  };

  const addExerciseToWorkout = (exercise: Exercise) => {
    if (!selectedWorkout || !isEditing) return;

    const newExercise = { ...exercise, sets: 3, reps: '8-12', weight: '' };
    const updatedWorkout = {
      ...selectedWorkout,
      exercises: [...selectedWorkout.exercises, newExercise]
    };

    setWorkouts(workouts.map(w => w.id === selectedWorkout.id ? updatedWorkout : w));
    setSelectedWorkout(updatedWorkout);
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const removeExercise = (exerciseIndex: number) => {
    if (!selectedWorkout || !isEditing) return;

    const updatedWorkout = {
      ...selectedWorkout,
      exercises: selectedWorkout.exercises.filter((_, index) => index !== exerciseIndex)
    };

    setWorkouts(workouts.map(w => w.id === selectedWorkout.id ? updatedWorkout : w));
    setSelectedWorkout(updatedWorkout);
  };

  const updateExerciseField = (exerciseIndex: number, field: 'sets' | 'reps' | 'weight', value: string | number) => {
    if (!selectedWorkout || !isEditing) return;

    const updatedExercises = [...selectedWorkout.exercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      [field]: value
    };

    const updatedWorkout = {
      ...selectedWorkout,
      exercises: updatedExercises
    };

    setWorkouts(workouts.map(w => w.id === selectedWorkout.id ? updatedWorkout : w));
    setSelectedWorkout(updatedWorkout);
  };

  const deleteWorkout = (workoutId: string) => {
    setWorkouts(workouts.filter(w => w.id !== workoutId));
    if (selectedWorkout?.id === workoutId) {
      setSelectedWorkout(null);
    }
  };

  const editWorkout = (workoutId: string) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
      setSelectedWorkout(workout);
      setIsEditing(true);
    }
  };

  const shareWorkout = (workoutId: string) => {
    // Implementar compartilhamento
    alert('Funcionalidade de compartilhamento em desenvolvimento!');
  };

  const duplicateWorkout = (workoutId: string) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
      const duplicated: Workout = {
        id: Date.now().toString(),
        name: `${workout.name} (Cópia)`,
        exercises: [...workout.exercises]
      };
      setWorkouts([...workouts, duplicated]);
    }
  };

  const toggleGifExpansion = (gifUrl: string) => {
    setExpandedGif(expandedGif === gifUrl ? null : gifUrl);
  };

  const handleSaveWorkout = () => {
    setIsEditing(false);
  };

  // Visualização de lista de rotinas
  if (!selectedWorkout) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-gray-900 hover:text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            </Link>
            
            <h1 className="text-lg font-semibold">Minhas Rotinas</h1>
            
            <div className="w-24"></div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Input para criar nova rotina */}
          <Card className="bg-gray-900 border-gray-800 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">Criar Nova Rotina</h2>
            <div className="flex gap-3">
              <Input
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Nome da rotina (ex: Treino A - Peito e Tríceps)"
                className="flex-1 bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && createWorkout()}
              />
              <Button 
                onClick={createWorkout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar
              </Button>
            </div>
          </Card>

          {/* Lista de Rotinas */}
          {workouts.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Dumbbell className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Nenhuma rotina criada</h3>
                <p className="text-gray-400">
                  Crie sua primeira rotina de treino para começar
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {workouts.map((workout) => (
                <Card 
                  key={workout.id} 
                  className="bg-gray-900 border-gray-800 p-6 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setSelectedWorkout(workout);
                    setIsEditing(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{workout.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {workout.exercises.length} {workout.exercises.length === 1 ? 'exercício' : 'exercícios'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              editWorkout(workout.id);
                            }}
                            className="cursor-pointer hover:bg-gray-700"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateWorkout(workout.id);
                            }}
                            className="cursor-pointer hover:bg-gray-700"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              shareWorkout(workout.id);
                            }}
                            className="cursor-pointer hover:bg-gray-700"
                          >
                            <Share className="w-4 h-4 mr-2" />
                            Compartilhar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteWorkout(workout.id);
                            }}
                            className="cursor-pointer hover:bg-gray-700 text-red-400 hover:text-red-300"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Visualização de rotina específica com exercícios
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-900"
            onClick={() => {
              setSelectedWorkout(null);
              setIsEditing(false);
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
          
          <h1 className="text-lg font-semibold">{selectedWorkout.name}</h1>
          
          {isEditing ? (
            <Button 
              onClick={handleSaveWorkout}
              className="bg-red-600 hover:bg-red-700 text-black font-semibold"
            >
              Salvar
            </Button>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-red-600 hover:bg-red-700 text-black font-semibold"
            >
              Editar
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Empty State */}
        {selectedWorkout.exercises.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Nenhum exercício adicionado</h3>
              <p className="text-gray-400 mb-6">
                {isEditing ? 'Comece adicionando exercícios a esta rotina' : 'Clique em "Editar" para adicionar exercícios'}
              </p>
              {isEditing && (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Exercício
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Lista de Exercícios Adicionados */}
            {selectedWorkout.exercises.map((exercise, index) => (
              <Card key={`${exercise.id}-${index}`} className="bg-gray-900 border-gray-800 p-4">
                <div className="flex gap-4">
                  {/* Informações do Exercício */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white">{exercise.name}</h3>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExercise(index)}
                          className="text-gray-400 hover:text-white hover:bg-gray-800 -mt-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Equipamento:</span> {exercise.equipment}
                      </p>
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Músculo Primário:</span>{' '}
                        <span className="text-blue-400">{exercise.primaryMuscle}</span>
                      </p>
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Músculo Secundário:</span>{' '}
                        <span className="text-blue-400">{exercise.secondaryMuscle}</span>
                      </p>
                    </div>

                    {/* Séries, Reps, Peso - EDITÁVEIS APENAS EM MODO EDIÇÃO */}
                    <div className="flex gap-4 mt-4">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Séries</label>
                        <Input
                          type="number"
                          value={exercise.sets || ''}
                          onChange={(e) => updateExerciseField(index, 'sets', parseInt(e.target.value) || 0)}
                          className="w-16 h-8 bg-gray-800 border-gray-700 text-white text-sm"
                          placeholder="0"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Reps</label>
                        <Input
                          type="text"
                          value={exercise.reps || ''}
                          onChange={(e) => updateExerciseField(index, 'reps', e.target.value)}
                          className="w-20 h-8 bg-gray-800 border-gray-700 text-white text-sm"
                          placeholder="0"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Peso (kg)</label>
                        <Input
                          type="text"
                          value={exercise.weight || ''}
                          onChange={(e) => updateExerciseField(index, 'weight', e.target.value)}
                          placeholder="0"
                          className="w-20 h-8 bg-gray-800 border-gray-700 text-white text-sm"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {/* GIF do Exercício - Clicável para expandir */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-32 h-32 bg-white rounded-lg border-2 border-white overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => toggleGifExpansion(exercise.gifUrl)}
                    >
                      <Image
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        width={128}
                        height={128}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Botão Adicionar Mais - APENAS EM MODO EDIÇÃO */}
            {isEditing && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white hover:bg-gray-100 text-black font-bold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Exercício
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Modal de Seleção de Exercícios */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Selecionar Exercício</DialogTitle>
          </DialogHeader>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar exercício..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Lista de Exercícios */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => addExerciseToWorkout(exercise)}
              >
                <div className="flex gap-4">
                  {/* Informações */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{exercise.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Equipamento:</span> {exercise.equipment}
                      </p>
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Músculo Primário:</span>{' '}
                        <span className="text-blue-400">{exercise.primaryMuscle}</span>
                      </p>
                      <p className="text-gray-400">
                        <span className="font-semibold text-white">Músculo Secundário:</span>{' '}
                        <span className="text-blue-400">{exercise.secondaryMuscle}</span>
                      </p>
                    </div>
                  </div>

                  {/* GIF */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-white rounded-lg border-2 border-white overflow-hidden flex items-center justify-center">
                      <Image
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        width={96}
                        height={96}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredExercises.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                Nenhum exercício encontrado
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de GIF Expandido */}
      {expandedGif && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedGif(null)}
        >
          <div className="relative max-w-2xl w-full">
            <div className="bg-white rounded-lg p-2">
              <Image
                src={expandedGif}
                alt="Exercício expandido"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setExpandedGif(null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
