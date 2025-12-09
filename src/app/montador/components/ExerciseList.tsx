'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';
import Image from 'next/image';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  gifUrl?: string; // URL do GIF do exercício
}

// Banco de dados de exercícios com informações detalhadas
const exercisesDatabase: Exercise[] = [
  {
    id: '1',
    name: 'Supino Reto com Barra',
    muscleGroup: 'Peito',
    primaryMuscles: ['peitoral-maior'],
    secondaryMuscles: ['triceps', 'deltoides-anterior'],
    equipment: 'Barra',
    gifUrl: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6b67ecef-4be6-42da-b8ff-01da906b67bd.gif'
  },
  {
    id: '2',
    name: 'Supino Inclinado',
    muscleGroup: 'Peito Superior',
    primaryMuscles: ['peitoral-superior'],
    secondaryMuscles: ['triceps', 'deltoides-anterior'],
    equipment: 'Barra'
  },
  {
    id: '3',
    name: 'Agachamento',
    muscleGroup: 'Pernas',
    primaryMuscles: ['quadriceps', 'gluteos'],
    secondaryMuscles: ['isquiotibiais', 'panturrilha'],
    equipment: 'Barra'
  },
  {
    id: '4',
    name: 'Leg Press',
    muscleGroup: 'Pernas',
    primaryMuscles: ['quadriceps', 'gluteos'],
    secondaryMuscles: ['isquiotibiais'],
    equipment: 'Máquina'
  },
  {
    id: '5',
    name: 'Barra Fixa',
    muscleGroup: 'Costas',
    primaryMuscles: ['dorsais'],
    secondaryMuscles: ['biceps', 'trapezio'],
    equipment: 'Peso Corporal'
  },
  {
    id: '6',
    name: 'Remada Curvada',
    muscleGroup: 'Costas',
    primaryMuscles: ['dorsais', 'trapezio'],
    secondaryMuscles: ['biceps', 'deltoides-posterior'],
    equipment: 'Barra'
  },
  {
    id: '7',
    name: 'Desenvolvimento',
    muscleGroup: 'Ombros',
    primaryMuscles: ['deltoides'],
    secondaryMuscles: ['triceps', 'trapezio'],
    equipment: 'Barra'
  },
  {
    id: '8',
    name: 'Elevação Lateral',
    muscleGroup: 'Ombros',
    primaryMuscles: ['deltoides-lateral'],
    secondaryMuscles: ['trapezio'],
    equipment: 'Halteres'
  },
  {
    id: '9',
    name: 'Rosca Direta',
    muscleGroup: 'Bíceps',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['antebraco'],
    equipment: 'Barra'
  },
  {
    id: '10',
    name: 'Tríceps Testa',
    muscleGroup: 'Tríceps',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Barra'
  },
  {
    id: '11',
    name: 'Crucifixo',
    muscleGroup: 'Peito',
    primaryMuscles: ['peitoral-maior'],
    secondaryMuscles: ['deltoides-anterior'],
    equipment: 'Halteres'
  },
  {
    id: '12',
    name: 'Stiff',
    muscleGroup: 'Posterior de Coxa',
    primaryMuscles: ['isquiotibiais', 'gluteos'],
    secondaryMuscles: ['lombar'],
    equipment: 'Barra'
  },
];

interface ExerciseListProps {
  onClose: () => void;
  onSelectExercise: (exerciseName: string) => void;
}

export default function ExerciseList({ onClose, onSelectExercise }: ExerciseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [animationPhase, setAnimationPhase] = useState<'start' | 'end'>('start');

  const filteredExercises = exercisesDatabase.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedExercise && !selectedExercise.gifUrl) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => prev === 'start' ? 'end' : 'start');
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [selectedExercise]);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleAddExercise = () => {
    if (selectedExercise) {
      onSelectExercise(selectedExercise.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 bg-white">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-blue-500 hover:bg-blue-50 font-medium"
          >
            Cancelar
          </Button>
          <h2 className="text-lg font-semibold text-black">Adicionar Exercício</h2>
          <Button
            onClick={handleAddExercise}
            disabled={!selectedExercise}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50"
          >
            Criar
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Procurar exercício"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedExercise ? (
            // Exercise Detail View with GIF or Animation
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-black mb-2">{selectedExercise.name}</h3>
                <p className="text-gray-600">{selectedExercise.muscleGroup}</p>
                <p className="text-sm text-gray-500 mt-1">Equipamento: {selectedExercise.equipment}</p>
              </div>

              {/* GIF or Animation Area */}
              <div className="bg-gray-50 rounded-lg p-8 mb-6">
                <div className="flex justify-center items-center">
                  {selectedExercise.gifUrl ? (
                    // Mostrar GIF real do exercício
                    <div className="relative w-full max-w-md aspect-square">
                      <Image
                        src={selectedExercise.gifUrl}
                        alt={selectedExercise.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    // Fallback: Animação SVG simplificada
                    <svg
                      width="200"
                      height="400"
                      viewBox="0 0 200 400"
                      className="transition-all duration-500"
                    >
                      {/* Head */}
                      <circle cx="100" cy="40" r="25" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                      
                      {/* Body */}
                      <rect 
                        x="75" 
                        y="65" 
                        width="50" 
                        height="80" 
                        rx="10" 
                        fill={selectedExercise.primaryMuscles.includes('peitoral-maior') || 
                              selectedExercise.primaryMuscles.includes('peitoral-superior') ? '#3B82F6' : '#E5E7EB'}
                        stroke="#9CA3AF" 
                        strokeWidth="2"
                        className="transition-colors duration-500"
                      />
                      
                      {/* Arms */}
                      <line 
                        x1="75" 
                        y1="80" 
                        x2={animationPhase === 'start' ? '40' : '30'} 
                        y2={animationPhase === 'start' ? '120' : '100'} 
                        stroke={selectedExercise.primaryMuscles.includes('biceps') || 
                                selectedExercise.secondaryMuscles.includes('biceps') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="8" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <line 
                        x1="125" 
                        y1="80" 
                        x2={animationPhase === 'start' ? '160' : '170'} 
                        y2={animationPhase === 'start' ? '120' : '100'} 
                        stroke={selectedExercise.primaryMuscles.includes('triceps') || 
                                selectedExercise.secondaryMuscles.includes('triceps') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="8" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      
                      {/* Shoulders */}
                      <circle 
                        cx="75" 
                        cy="75" 
                        r="12" 
                        fill={selectedExercise.primaryMuscles.includes('deltoides') || 
                              selectedExercise.primaryMuscles.includes('deltoides-lateral') ? '#3B82F6' : '#E5E7EB'}
                        stroke="#9CA3AF" 
                        strokeWidth="2"
                        className="transition-colors duration-500"
                      />
                      <circle 
                        cx="125" 
                        cy="75" 
                        r="12" 
                        fill={selectedExercise.primaryMuscles.includes('deltoides') || 
                              selectedExercise.primaryMuscles.includes('deltoides-lateral') ? '#3B82F6' : '#E5E7EB'}
                        stroke="#9CA3AF" 
                        strokeWidth="2"
                        className="transition-colors duration-500"
                      />
                      
                      {/* Legs */}
                      <line 
                        x1="85" 
                        y1="145" 
                        x2="70" 
                        y2={animationPhase === 'start' ? '250' : '230'} 
                        stroke={selectedExercise.primaryMuscles.includes('quadriceps') || 
                                selectedExercise.primaryMuscles.includes('gluteos') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="12" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <line 
                        x1="115" 
                        y1="145" 
                        x2="130" 
                        y2={animationPhase === 'start' ? '250' : '230'} 
                        stroke={selectedExercise.primaryMuscles.includes('quadriceps') || 
                                selectedExercise.primaryMuscles.includes('gluteos') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="12" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      
                      {/* Lower Legs */}
                      <line 
                        x1="70" 
                        y1={animationPhase === 'start' ? '250' : '230'} 
                        x2="65" 
                        y2="350" 
                        stroke={selectedExercise.primaryMuscles.includes('panturrilha') || 
                                selectedExercise.primaryMuscles.includes('isquiotibiais') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="10" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <line 
                        x1="130" 
                        y1={animationPhase === 'start' ? '250' : '230'} 
                        x2="135" 
                        y2="350" 
                        stroke={selectedExercise.primaryMuscles.includes('panturrilha') || 
                                selectedExercise.primaryMuscles.includes('isquiotibiais') ? '#3B82F6' : '#9CA3AF'}
                        strokeWidth="10" 
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      
                      {/* Back/Dorsais indicator */}
                      {(selectedExercise.primaryMuscles.includes('dorsais') || 
                        selectedExercise.primaryMuscles.includes('trapezio')) && (
                        <rect 
                          x="80" 
                          y="70" 
                          width="40" 
                          height="60" 
                          rx="8" 
                          fill="#3B82F6" 
                          opacity="0.7"
                          className="transition-opacity duration-500"
                        />
                      )}
                    </svg>
                  )}
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Músculos trabalhados
                  </p>
                </div>
              </div>

              {/* Muscle Groups Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Músculos Primários</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.primaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {muscle.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedExercise.secondaryMuscles.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Músculos Secundários</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.secondaryMuscles.map((muscle) => (
                        <span
                          key={muscle}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {muscle.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setSelectedExercise(null)}
                variant="outline"
                className="w-full mt-6 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Voltar para lista
              </Button>
            </div>
          ) : (
            // Exercise List
            <div className="divide-y divide-gray-200">
              {filteredExercises.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nenhum exercício encontrado
                </div>
              ) : (
                filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => handleExerciseClick(exercise)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Exercise Icon/Preview - Mostra GIF se disponível */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {exercise.gifUrl ? (
                        <Image
                          src={exercise.gifUrl}
                          alt={exercise.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 40 40">
                          <circle cx="20" cy="10" r="5" fill="#9CA3AF" />
                          <rect x="15" y="15" width="10" height="15" rx="2" fill="#9CA3AF" />
                          <line x1="15" y1="20" x2="10" y2="25" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                          <line x1="25" y1="20" x2="30" y2="25" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                          <line x1="17" y1="30" x2="15" y2="38" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                          <line x1="23" y1="30" x2="25" y2="38" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Exercise Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black mb-1">{exercise.name}</h3>
                      <p className="text-sm text-gray-600">{exercise.muscleGroup}</p>
                      <p className="text-xs text-gray-500 mt-1">{exercise.equipment}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
