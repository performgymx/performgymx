'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Info } from 'lucide-react';

interface ExerciseDemoProps {
  exerciseName: string;
  onClose: () => void;
}

// Dados dos exercícios com animação e músculos
const exerciseData: Record<string, {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  tips: string[];
}> = {
  'Supino Reto': {
    primaryMuscles: ['Peitoral Maior'],
    secondaryMuscles: ['Tríceps', 'Deltóide Anterior'],
    instructions: [
      'Deite-se no banco com os pés apoiados no chão',
      'Segure a barra com as mãos um pouco mais largas que os ombros',
      'Desça a barra controladamente até o peito',
      'Empurre a barra de volta à posição inicial'
    ],
    tips: [
      'Mantenha os ombros retraídos durante todo o movimento',
      'Não deixe a barra quicar no peito',
      'Expire ao empurrar a barra para cima'
    ]
  },
  'Supino Inclinado': {
    primaryMuscles: ['Peitoral Superior'],
    secondaryMuscles: ['Tríceps', 'Deltóide Anterior'],
    instructions: [
      'Ajuste o banco em 30-45 graus de inclinação',
      'Deite-se e segure os halteres acima do peito',
      'Desça os halteres controladamente',
      'Empurre de volta à posição inicial'
    ],
    tips: [
      'Mantenha os cotovelos em ângulo de 45 graus',
      'Não arqueie excessivamente as costas',
      'Controle o movimento na descida'
    ]
  },
  'Agachamento': {
    primaryMuscles: ['Quadríceps', 'Glúteos'],
    secondaryMuscles: ['Isquiotibiais', 'Core'],
    instructions: [
      'Posicione a barra nos ombros, pés na largura dos ombros',
      'Desça flexionando joelhos e quadril simultaneamente',
      'Desça até as coxas ficarem paralelas ao chão',
      'Empurre pelos calcanhares para subir'
    ],
    tips: [
      'Mantenha o peito elevado e olhar para frente',
      'Joelhos alinhados com os pés',
      'Não deixe os joelhos ultrapassarem muito os pés'
    ]
  },
  'Remada Curvada': {
    primaryMuscles: ['Latíssimo do Dorso', 'Trapézio'],
    secondaryMuscles: ['Bíceps', 'Deltóide Posterior'],
    instructions: [
      'Incline o tronco para frente mantendo as costas retas',
      'Segure a barra com pegada pronada',
      'Puxe a barra em direção ao abdômen',
      'Controle a descida da barra'
    ],
    tips: [
      'Mantenha o core contraído',
      'Não use impulso do corpo',
      'Foque em puxar com os cotovelos'
    ]
  },
  'Desenvolvimento': {
    primaryMuscles: ['Deltóide'],
    secondaryMuscles: ['Tríceps', 'Trapézio Superior'],
    instructions: [
      'Sente-se com as costas apoiadas',
      'Segure os halteres na altura dos ombros',
      'Empurre os halteres para cima até estender os braços',
      'Desça controladamente'
    ],
    tips: [
      'Não arqueie as costas',
      'Mantenha o core contraído',
      'Evite travar completamente os cotovelos no topo'
    ]
  },
  'Rosca Direta': {
    primaryMuscles: ['Bíceps Braquial'],
    secondaryMuscles: ['Braquial', 'Antebraços'],
    instructions: [
      'Fique em pé com os pés na largura dos ombros',
      'Segure a barra com pegada supinada',
      'Flexione os cotovelos levantando a barra',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha os cotovelos fixos ao lado do corpo',
      'Não balance o corpo',
      'Controle a fase excêntrica'
    ]
  }
};

export default function ExerciseDemo({ exerciseName, onClose }: ExerciseDemoProps) {
  const [activeTab, setActiveTab] = useState<'resumo' | 'instrucoes'>('resumo');
  const [animationPhase, setAnimationPhase] = useState<'start' | 'end'>('start');
  
  const data = exerciseData[exerciseName] || exerciseData['Supino Reto'];

  // Alterna a animação usando useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => prev === 'start' ? 'end' : 'start');
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-black hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-black">{exerciseName}</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-[73px] z-10">
        <div className="container mx-auto px-4 flex gap-6">
          <button
            onClick={() => setActiveTab('resumo')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'resumo'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Resumo
          </button>
          <button
            onClick={() => setActiveTab('instrucoes')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'instrucoes'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Instruções
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            {/* Animação do Exercício */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
              {/* Figura humana simplificada com animação */}
              <div className="relative">
                {/* Corpo */}
                <svg width="200" height="350" viewBox="0 0 200 350" className="mx-auto">
                  {/* Cabeça */}
                  <circle cx="100" cy="30" r="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                  
                  {/* Pescoço */}
                  <line x1="100" y1="50" x2="100" y2="70" stroke="#9CA3AF" strokeWidth="8"/>
                  
                  {/* Tronco */}
                  <rect x="70" y="70" width="60" height="100" rx="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                  
                  {/* Peitoral (destacado) */}
                  {(exerciseName.includes('Supino') || exerciseName.includes('Crucifixo') || exerciseName.includes('Flexão')) && (
                    <rect 
                      x="75" 
                      y="75" 
                      width="50" 
                      height="40" 
                      rx="8" 
                      fill="#3B82F6" 
                      opacity={animationPhase === 'start' ? 0.7 : 0.9}
                      className="transition-opacity duration-500"
                    />
                  )}
                  
                  {/* Ombros (destacado para desenvolvimento) */}
                  {exerciseName.includes('Desenvolvimento') && (
                    <>
                      <circle cx="65" cy="75" r="15" fill="#3B82F6" opacity={animationPhase === 'start' ? 0.7 : 0.9} className="transition-opacity duration-500"/>
                      <circle cx="135" cy="75" r="15" fill="#3B82F6" opacity={animationPhase === 'start' ? 0.7 : 0.9} className="transition-opacity duration-500"/>
                    </>
                  )}
                  
                  {/* Costas (destacado para remada) */}
                  {exerciseName.includes('Remada') && (
                    <rect 
                      x="75" 
                      y="80" 
                      width="50" 
                      height="70" 
                      rx="8" 
                      fill="#3B82F6" 
                      opacity={animationPhase === 'start' ? 0.7 : 0.9}
                      className="transition-opacity duration-500"
                    />
                  )}
                  
                  {/* Braços */}
                  <g className={`transition-transform duration-500 ${animationPhase === 'end' ? 'translate-y-[-10px]' : ''}`}>
                    {/* Braço esquerdo */}
                    <line 
                      x1="70" 
                      y1="80" 
                      x2={exerciseName.includes('Supino') ? '40' : '50'} 
                      y2={animationPhase === 'start' ? '120' : '100'} 
                      stroke={exerciseName.includes('Rosca') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="10"
                      className="transition-all duration-500"
                    />
                    <line 
                      x1={exerciseName.includes('Supino') ? '40' : '50'} 
                      y1={animationPhase === 'start' ? '120' : '100'} 
                      x2="30" 
                      y2={animationPhase === 'start' ? '160' : '130'} 
                      stroke={exerciseName.includes('Rosca') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="10"
                      className="transition-all duration-500"
                    />
                    
                    {/* Braço direito */}
                    <line 
                      x1="130" 
                      y1="80" 
                      x2={exerciseName.includes('Supino') ? '160' : '150'} 
                      y2={animationPhase === 'start' ? '120' : '100'} 
                      stroke={exerciseName.includes('Rosca') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="10"
                      className="transition-all duration-500"
                    />
                    <line 
                      x1={exerciseName.includes('Supino') ? '160' : '150'} 
                      y1={animationPhase === 'start' ? '120' : '100'} 
                      x2="170" 
                      y2={animationPhase === 'start' ? '160' : '130'} 
                      stroke={exerciseName.includes('Rosca') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="10"
                      className="transition-all duration-500"
                    />
                  </g>
                  
                  {/* Pernas */}
                  <g className={exerciseName.includes('Agachamento') ? `transition-transform duration-500 ${animationPhase === 'start' ? 'translate-y-[20px]' : ''}` : ''}>
                    {/* Coxa esquerda */}
                    <line 
                      x1="85" 
                      y1="170" 
                      x2="75" 
                      y2="250" 
                      stroke={exerciseName.includes('Agachamento') || exerciseName.includes('Leg') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="14"
                      className="transition-all duration-500"
                    />
                    {/* Panturrilha esquerda */}
                    <line x1="75" y1="250" x2="70" y2="320" stroke="#9CA3AF" strokeWidth="10"/>
                    
                    {/* Coxa direita */}
                    <line 
                      x1="115" 
                      y1="170" 
                      x2="125" 
                      y2="250" 
                      stroke={exerciseName.includes('Agachamento') || exerciseName.includes('Leg') ? '#3B82F6' : '#9CA3AF'} 
                      strokeWidth="14"
                      className="transition-all duration-500"
                    />
                    {/* Panturrilha direita */}
                    <line x1="125" y1="250" x2="130" y2="320" stroke="#9CA3AF" strokeWidth="10"/>
                  </g>
                </svg>
                
                {/* Indicador de movimento */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <div className={`w-2 h-2 rounded-full ${animationPhase === 'start' ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-300`} />
                  <div className={`w-2 h-2 rounded-full ${animationPhase === 'end' ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-300`} />
                </div>
              </div>
            </div>

            {/* Músculos Trabalhados */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">MÚSCULOS PRIMÁRIOS</h3>
                <div className="flex flex-wrap gap-2">
                  {data.primaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">MÚSCULOS SECUNDÁRIOS</h3>
                <div className="flex flex-wrap gap-2">
                  {data.secondaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dica */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Dica:</span> {data.tips[0]}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instrucoes' && (
          <div className="space-y-6">
            {/* Instruções */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Como Executar</h3>
              <ol className="space-y-3">
                {data.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-0.5">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Dicas Adicionais */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Dicas Importantes</h3>
              <ul className="space-y-3">
                {data.tips.map((tip, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <p className="text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
