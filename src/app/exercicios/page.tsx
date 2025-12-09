"use client";

import { useState } from "react";
import Navbar from "@/components/custom/navbar";
import { 
  Dumbbell, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Lightbulb,
  Search
} from "lucide-react";

// Tipos
interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  instructions: string[];
  commonMistakes: string[];
  tips: string[];
}

interface MuscleGroup {
  id: string;
  name: string;
  icon: string;
  exercises: Exercise[];
}

// Dados dos exercícios
const muscleGroups: MuscleGroup[] = [
  {
    id: "peito",
    name: "Peito",
    icon: "💪",
    exercises: [
      {
        id: "supino-reto",
        name: "Supino Reto com Barra",
        gifUrl: "https://media.giphy.com/media/fV0oSDsZ4UgdW/giphy.gif",
        instructions: [
          "Deite-se no banco com os pés firmes no chão",
          "Segure a barra com pegada um pouco mais larga que os ombros",
          "Desça a barra controladamente até o peito",
          "Empurre a barra para cima até extensão completa dos braços"
        ],
        commonMistakes: [
          "Tirar os glúteos do banco durante a execução",
          "Barra muito alta ou baixa no peito",
          "Não controlar a descida da barra",
          "Pegada muito aberta ou muito fechada"
        ],
        tips: [
          "Mantenha os ombros retraídos durante todo o movimento",
          "Expire ao empurrar a barra para cima",
          "Use um spotter para cargas pesadas",
          "Mantenha os cotovelos em 45° do corpo"
        ]
      },
      {
        id: "supino-inclinado",
        name: "Supino Inclinado com Halteres",
        gifUrl: "https://media.giphy.com/media/l0HlvU6gXnZHwnB3a/giphy.gif",
        instructions: [
          "Ajuste o banco em 30-45 graus de inclinação",
          "Segure os halteres com pegada neutra",
          "Desça os halteres até a linha do peito superior",
          "Empurre os halteres para cima até quase encostar"
        ],
        commonMistakes: [
          "Banco muito inclinado (vira ombro)",
          "Não manter os cotovelos alinhados",
          "Movimentos muito rápidos",
          "Arquear demais as costas"
        ],
        tips: [
          "Foque na contração do peito superior",
          "Mantenha o core ativado",
          "Use amplitude completa do movimento",
          "Controle a descida (3 segundos)"
        ]
      },
      {
        id: "crucifixo",
        name: "Crucifixo com Halteres",
        gifUrl: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
        instructions: [
          "Deite-se no banco com halteres acima do peito",
          "Mantenha cotovelos levemente flexionados",
          "Abra os braços em arco até sentir alongamento",
          "Retorne à posição inicial contraindo o peito"
        ],
        commonMistakes: [
          "Estender completamente os cotovelos",
          "Descer os halteres muito abaixo da linha do peito",
          "Usar carga excessiva",
          "Movimentos bruscos"
        ],
        tips: [
          "Imagine abraçar uma árvore",
          "Foque no alongamento do peito",
          "Mantenha tensão constante",
          "Expire ao fechar os braços"
        ]
      }
    ]
  },
  {
    id: "costas",
    name: "Costas",
    icon: "🦾",
    exercises: [
      {
        id: "barra-fixa",
        name: "Barra Fixa (Pull-up)",
        gifUrl: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
        instructions: [
          "Segure a barra com pegada pronada (palmas para frente)",
          "Pendure-se com braços estendidos",
          "Puxe o corpo para cima até o queixo passar a barra",
          "Desça controladamente até extensão completa"
        ],
        commonMistakes: [
          "Usar impulso das pernas (kipping)",
          "Não fazer amplitude completa",
          "Deixar os ombros subirem",
          "Movimentos muito rápidos"
        ],
        tips: [
          "Ative o core para estabilidade",
          "Pense em puxar os cotovelos para baixo",
          "Mantenha o peito para frente",
          "Use elástico se necessário para iniciantes"
        ]
      },
      {
        id: "remada-curvada",
        name: "Remada Curvada com Barra",
        gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
        instructions: [
          "Segure a barra com pegada pronada",
          "Incline o tronco a 45 graus mantendo costas retas",
          "Puxe a barra em direção ao abdômen inferior",
          "Desça controladamente até extensão dos braços"
        ],
        commonMistakes: [
          "Arredondar as costas",
          "Usar muito impulso do quadril",
          "Puxar muito alto (trapézio)",
          "Não retrair as escápulas"
        ],
        tips: [
          "Mantenha joelhos levemente flexionados",
          "Foque em puxar com os cotovelos",
          "Contraia as escápulas no topo",
          "Mantenha o pescoço neutro"
        ]
      },
      {
        id: "pulldown",
        name: "Puxada na Polia Alta",
        gifUrl: "https://media.giphy.com/media/3o7TKPATxjbmM6EJnW/giphy.gif",
        instructions: [
          "Sente-se e ajuste o apoio das coxas",
          "Segure a barra com pegada larga",
          "Puxe a barra até a linha do peito",
          "Retorne controladamente até extensão completa"
        ],
        commonMistakes: [
          "Inclinar muito o corpo para trás",
          "Puxar atrás da nuca (perigoso)",
          "Usar carga excessiva com impulso",
          "Não controlar a subida"
        ],
        tips: [
          "Mantenha o peito elevado",
          "Pense em aproximar os cotovelos",
          "Contraia o dorsal no final",
          "Evite balançar o corpo"
        ]
      }
    ]
  },
  {
    id: "ombro",
    name: "Ombro",
    icon: "🏋️",
    exercises: [
      {
        id: "desenvolvimento",
        name: "Desenvolvimento com Halteres",
        gifUrl: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
        instructions: [
          "Sente-se com as costas apoiadas",
          "Segure os halteres na altura dos ombros",
          "Empurre os halteres para cima até extensão",
          "Desça controladamente até a posição inicial"
        ],
        commonMistakes: [
          "Arquear demais as costas",
          "Travar os cotovelos no topo",
          "Usar impulso das pernas",
          "Descer os halteres muito baixo"
        ],
        tips: [
          "Mantenha o core ativado",
          "Cotovelos alinhados com os ombros",
          "Expire ao empurrar para cima",
          "Controle a descida (2-3 segundos)"
        ]
      },
      {
        id: "elevacao-lateral",
        name: "Elevação Lateral",
        gifUrl: "https://media.giphy.com/media/l0HlvU6gXnZHwnB3a/giphy.gif",
        instructions: [
          "Fique em pé com halteres ao lado do corpo",
          "Mantenha cotovelos levemente flexionados",
          "Eleve os braços lateralmente até a altura dos ombros",
          "Desça controladamente até a posição inicial"
        ],
        commonMistakes: [
          "Elevar os ombros junto (trapézio)",
          "Usar muito impulso",
          "Subir acima da linha dos ombros",
          "Cotovelos muito flexionados"
        ],
        tips: [
          "Imagine despejar água de um copo",
          "Mantenha tensão constante",
          "Foque no deltoide lateral",
          "Use carga moderada"
        ]
      },
      {
        id: "elevacao-frontal",
        name: "Elevação Frontal",
        gifUrl: "https://media.giphy.com/media/fV0oSDsZ4UgdW/giphy.gif",
        instructions: [
          "Segure os halteres na frente das coxas",
          "Mantenha braços estendidos",
          "Eleve os halteres até a altura dos ombros",
          "Desça controladamente"
        ],
        commonMistakes: [
          "Balançar o corpo",
          "Elevar muito alto",
          "Usar carga excessiva",
          "Movimentos muito rápidos"
        ],
        tips: [
          "Alterne os braços para maior controle",
          "Mantenha o core estável",
          "Foque no deltoide anterior",
          "Pause no topo por 1 segundo"
        ]
      }
    ]
  },
  {
    id: "bracos",
    name: "Braços",
    icon: "💪",
    exercises: [
      {
        id: "rosca-direta",
        name: "Rosca Direta com Barra",
        gifUrl: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
        instructions: [
          "Segure a barra com pegada supinada (palmas para cima)",
          "Mantenha cotovelos fixos ao lado do corpo",
          "Flexione os cotovelos levantando a barra",
          "Desça controladamente até extensão completa"
        ],
        commonMistakes: [
          "Balançar o corpo para ajudar",
          "Mover os cotovelos para frente",
          "Não fazer amplitude completa",
          "Usar carga excessiva"
        ],
        tips: [
          "Mantenha os cotovelos travados",
          "Contraia o bíceps no topo",
          "Desça em 3 segundos",
          "Evite hiperextensão no final"
        ]
      },
      {
        id: "rosca-martelo",
        name: "Rosca Martelo",
        gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
        instructions: [
          "Segure os halteres com pegada neutra (palmas frente a frente)",
          "Mantenha cotovelos ao lado do corpo",
          "Flexione os cotovelos alternadamente",
          "Desça controladamente"
        ],
        commonMistakes: [
          "Rodar os punhos durante o movimento",
          "Usar impulso",
          "Mover os ombros",
          "Velocidade excessiva"
        ],
        tips: [
          "Trabalha bíceps e antebraço",
          "Mantenha punhos firmes",
          "Alterne ou faça simultâneo",
          "Foque na contração"
        ]
      },
      {
        id: "triceps-testa",
        name: "Tríceps Testa",
        gifUrl: "https://media.giphy.com/media/3o7TKPATxjbmM6EJnW/giphy.gif",
        instructions: [
          "Deite-se no banco com barra acima da cabeça",
          "Mantenha cotovelos fixos apontando para cima",
          "Desça a barra em direção à testa",
          "Estenda os braços voltando à posição inicial"
        ],
        commonMistakes: [
          "Mover os cotovelos durante execução",
          "Descer muito rápido",
          "Abrir muito os cotovelos",
          "Não estender completamente"
        ],
        tips: [
          "Use barra W para conforto dos punhos",
          "Mantenha cotovelos perpendiculares ao chão",
          "Controle total do movimento",
          "Expire ao estender"
        ]
      },
      {
        id: "triceps-polia",
        name: "Tríceps na Polia",
        gifUrl: "https://media.giphy.com/media/fV0oSDsZ4UgdW/giphy.gif",
        instructions: [
          "Segure a barra/corda na polia alta",
          "Mantenha cotovelos fixos ao lado do corpo",
          "Empurre para baixo até extensão completa",
          "Retorne controladamente"
        ],
        commonMistakes: [
          "Inclinar o corpo para frente demais",
          "Mover os cotovelos",
          "Não estender completamente",
          "Usar muito peso"
        ],
        tips: [
          "Mantenha postura ereta",
          "Contraia o tríceps no final",
          "Use corda para maior amplitude",
          "Cotovelos sempre fixos"
        ]
      }
    ]
  },
  {
    id: "pernas",
    name: "Pernas",
    icon: "🦵",
    exercises: [
      {
        id: "agachamento",
        name: "Agachamento Livre",
        gifUrl: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
        instructions: [
          "Posicione a barra nas costas (trapézio)",
          "Pés na largura dos ombros, pontas levemente abertas",
          "Desça flexionando quadril e joelhos simultaneamente",
          "Suba empurrando o chão com os pés"
        ],
        commonMistakes: [
          "Joelhos ultrapassarem muito os pés",
          "Arredondar as costas",
          "Não descer até paralelo",
          "Calcanhares saírem do chão"
        ],
        tips: [
          "Mantenha o peito elevado",
          "Joelhos alinhados com os pés",
          "Core sempre ativado",
          "Olhar para frente, não para baixo"
        ]
      },
      {
        id: "leg-press",
        name: "Leg Press 45°",
        gifUrl: "https://media.giphy.com/media/l0HlvU6gXnZHwnB3a/giphy.gif",
        instructions: [
          "Sente-se e posicione os pés na plataforma",
          "Destrave a máquina",
          "Desça controladamente flexionando os joelhos",
          "Empurre a plataforma até quase extensão completa"
        ],
        commonMistakes: [
          "Travar os joelhos no topo",
          "Tirar o quadril do assento",
          "Amplitude muito curta",
          "Pés muito juntos ou separados"
        ],
        tips: [
          "Mantenha lombar apoiada",
          "Não trave os joelhos",
          "Desça até 90° de flexão",
          "Distribua peso nos pés"
        ]
      },
      {
        id: "stiff",
        name: "Levantamento Terra Stiff",
        gifUrl: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
        instructions: [
          "Segure a barra com pegada pronada",
          "Mantenha pernas levemente flexionadas",
          "Desça a barra deslizando pelas pernas",
          "Suba contraindo posterior e glúteos"
        ],
        commonMistakes: [
          "Flexionar muito os joelhos (vira agachamento)",
          "Arredondar as costas",
          "Não sentir alongamento posterior",
          "Usar carga excessiva"
        ],
        tips: [
          "Foque no alongamento dos isquiotibiais",
          "Mantenha barra próxima ao corpo",
          "Contraia glúteos no topo",
          "Costas sempre retas"
        ]
      }
    ]
  },
  {
    id: "gluteo",
    name: "Glúteo",
    icon: "🍑",
    exercises: [
      {
        id: "hip-thrust",
        name: "Hip Thrust",
        gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
        instructions: [
          "Apoie as costas em um banco",
          "Posicione a barra sobre o quadril",
          "Empurre o quadril para cima contraindo glúteos",
          "Desça controladamente sem encostar no chão"
        ],
        commonMistakes: [
          "Arquear demais as costas",
          "Não contrair glúteos no topo",
          "Usar muito impulso",
          "Posição incorreta do banco"
        ],
        tips: [
          "Pause 2 segundos no topo",
          "Mantenha queixo recolhido",
          "Joelhos a 90° no topo",
          "Use almofada na barra"
        ]
      },
      {
        id: "agachamento-sumô",
        name: "Agachamento Sumô",
        gifUrl: "https://media.giphy.com/media/3o7TKPATxjbmM6EJnW/giphy.gif",
        instructions: [
          "Pés bem afastados, pontas para fora (45°)",
          "Segure haltere ou kettlebell",
          "Desça mantendo joelhos alinhados com os pés",
          "Suba contraindo glúteos e adutores"
        ],
        commonMistakes: [
          "Joelhos caindo para dentro",
          "Não descer o suficiente",
          "Inclinar muito para frente",
          "Calcanhares saindo do chão"
        ],
        tips: [
          "Trabalha glúteos e parte interna da coxa",
          "Mantenha tronco ereto",
          "Empurre joelhos para fora",
          "Contraia glúteos no topo"
        ]
      },
      {
        id: "coice-polia",
        name: "Coice na Polia",
        gifUrl: "https://media.giphy.com/media/fV0oSDsZ4UgdW/giphy.gif",
        instructions: [
          "Prenda a tornozeleira na polia baixa",
          "Apoie-se na máquina",
          "Estenda a perna para trás contraindo glúteo",
          "Retorne controladamente"
        ],
        commonMistakes: [
          "Arquear demais as costas",
          "Usar impulso",
          "Não contrair o glúteo",
          "Movimentos muito rápidos"
        ],
        tips: [
          "Mantenha core ativado",
          "Foque na contração do glúteo",
          "Não hiperextenda a lombar",
          "Controle total do movimento"
        ]
      }
    ]
  },
  {
    id: "abdomen",
    name: "Abdômen",
    icon: "🔥",
    exercises: [
      {
        id: "abdominal-supra",
        name: "Abdominal Supra",
        gifUrl: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
        instructions: [
          "Deite-se com joelhos flexionados",
          "Mãos atrás da cabeça ou cruzadas no peito",
          "Eleve o tronco contraindo o abdômen",
          "Desça controladamente"
        ],
        commonMistakes: [
          "Puxar o pescoço com as mãos",
          "Fazer amplitude muito grande",
          "Usar impulso",
          "Não contrair o abdômen"
        ],
        tips: [
          "Foque na contração abdominal",
          "Expire ao subir",
          "Mantenha lombar no chão",
          "Movimento curto e controlado"
        ]
      },
      {
        id: "prancha",
        name: "Prancha Isométrica",
        gifUrl: "https://media.giphy.com/media/l0HlvU6gXnZHwnB3a/giphy.gif",
        instructions: [
          "Apoie-se nos antebraços e pontas dos pés",
          "Mantenha corpo em linha reta",
          "Contraia abdômen e glúteos",
          "Segure a posição pelo tempo determinado"
        ],
        commonMistakes: [
          "Deixar quadril cair",
          "Elevar muito o quadril",
          "Não respirar",
          "Ombros muito à frente dos cotovelos"
        ],
        tips: [
          "Imagine uma linha reta da cabeça aos pés",
          "Respire normalmente",
          "Comece com 30 segundos",
          "Mantenha pescoço neutro"
        ]
      },
      {
        id: "bicicleta",
        name: "Abdominal Bicicleta",
        gifUrl: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
        instructions: [
          "Deite-se com mãos atrás da cabeça",
          "Eleve pernas e ombros do chão",
          "Leve cotovelo direito ao joelho esquerdo",
          "Alterne os lados em movimento de pedalada"
        ],
        commonMistakes: [
          "Puxar o pescoço",
          "Movimentos muito rápidos",
          "Não tocar cotovelo no joelho oposto",
          "Deixar pernas muito altas"
        ],
        tips: [
          "Trabalha oblíquos e reto abdominal",
          "Mantenha ritmo constante",
          "Contraia abdômen durante todo movimento",
          "Expire ao fazer a torção"
        ]
      }
    ]
  }
];

export default function ExerciciosPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("peito");
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const currentGroup = muscleGroups.find(g => g.id === selectedGroup);

  const filteredExercises = currentGroup?.exercises.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Dumbbell className="w-12 h-12 text-red-500" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Biblioteca de <span className="text-red-500">Exercícios</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Aprenda a executar cada exercício corretamente com GIFs animados, 
              instruções detalhadas e dicas profissionais
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar exercício..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Muscle Groups Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {muscleGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group.id);
                    setExpandedExercise(null);
                    setSearchTerm("");
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedGroup === group.id
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
                  }`}
                >
                  <span className="mr-2">{group.icon}</span>
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises List */}
          <div className="space-y-6">
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Nenhum exercício encontrado</p>
              </div>
            ) : (
              filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all"
                >
                  {/* Exercise Header */}
                  <button
                    onClick={() => setExpandedExercise(
                      expandedExercise === exercise.id ? null : exercise.id
                    )}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={exercise.gifUrl}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exercise.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Clique para ver detalhes completos
                        </p>
                      </div>
                    </div>
                    {expandedExercise === exercise.id ? (
                      <ChevronUp className="w-6 h-6 text-red-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {/* Exercise Details */}
                  {expandedExercise === exercise.id && (
                    <div className="border-t border-gray-800 p-6 space-y-6">
                      {/* GIF Grande */}
                      <div className="bg-gray-800 rounded-xl overflow-hidden">
                        <img
                          src={exercise.gifUrl}
                          alt={exercise.name}
                          className="w-full h-auto max-h-96 object-contain"
                        />
                      </div>

                      {/* Instruções */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <Dumbbell className="w-5 h-5 text-red-500" />
                          Como Executar
                        </h4>
                        <ol className="space-y-2">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-3 text-gray-300">
                              <span className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Erros Comuns */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          Erros Comuns
                        </h4>
                        <ul className="space-y-2">
                          {exercise.commonMistakes.map((mistake, index) => (
                            <li key={index} className="flex gap-3 text-gray-300">
                              <span className="text-red-500 flex-shrink-0">✗</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dicas Extras */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-red-500" />
                          Dicas Extras
                        </h4>
                        <ul className="space-y-2">
                          {exercise.tips.map((tip, index) => (
                            <li key={index} className="flex gap-3 text-gray-300">
                              <span className="text-red-500 flex-shrink-0">💡</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quer Treinos Personalizados?
            </h2>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Assine o PerformGymX e tenha acesso a treinos completos montados por IA, 
              planos alimentares e acompanhamento profissional
            </p>
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
              Assinar por R$ 47/mês
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/00ecb78b-bbd4-416c-ab91-88e6351ca469.png" 
              alt="PerformGymX Logo" 
              className="h-8 w-auto invert"
            />
            <span className="text-xl font-bold">PerformGym<span className="text-red-500">X</span></span>
          </div>
          <p className="text-gray-400">
            © 2024 PerformGymX. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
