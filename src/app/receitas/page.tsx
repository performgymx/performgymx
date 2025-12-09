'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Dumbbell, 
  Search, 
  Clock, 
  Utensils, 
  Flame, 
  Heart,
  ChefHat,
  X,
  Sparkles,
  Coffee,
  UtensilsCrossed,
  Moon,
  Zap,
  Cake
} from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
}

export default function ReceitasFitness() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const recipes: Recipe[] = [
    // Café da Manhã
    {
      id: '1',
      name: 'Omelete de Claras com Aveia',
      category: 'Café da Manhã',
      calories: 280,
      protein: 25,
      carbs: 22,
      fat: 8,
      prepTime: 15,
      difficulty: 'easy',
      tags: ['Rápido', 'Alto Proteína'],
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
      ingredients: [
        '4 claras de ovo',
        '2 colheres de sopa de aveia',
        '1 tomate picado',
        'Temperos a gosto',
        'Spray de óleo'
      ],
      instructions: [
        'Bata as claras em uma tigela',
        'Adicione a aveia e misture bem',
        'Aqueça uma frigideira antiaderente com spray',
        'Despeje a mistura e adicione o tomate',
        'Cozinhe por 3-4 minutos de cada lado',
        'Tempere e sirva quente'
      ]
    },
    {
      id: '2',
      name: 'Panqueca de Banana Fit',
      category: 'Café da Manhã',
      calories: 310,
      protein: 18,
      carbs: 42,
      fat: 7,
      prepTime: 15,
      difficulty: 'easy',
      tags: ['Sem Açúcar', 'Rápido'],
      imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop',
      ingredients: [
        '1 banana madura',
        '2 ovos',
        '2 colheres de aveia',
        '1 colher de whey protein',
        'Canela a gosto'
      ],
      instructions: [
        'Amasse a banana em uma tigela',
        'Adicione os ovos e misture',
        'Acrescente aveia, whey e canela',
        'Aqueça frigideira antiaderente',
        'Faça pequenas panquecas',
        'Vire quando formar bolhas'
      ]
    },
    {
      id: '3',
      name: 'Bowl de Açaí Proteico',
      category: 'Café da Manhã',
      calories: 350,
      protein: 22,
      carbs: 48,
      fat: 9,
      prepTime: 10,
      difficulty: 'easy',
      tags: ['Antioxidante', 'Energético'],
      imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
      ingredients: [
        '100g de polpa de açaí',
        '1 scoop de whey protein',
        '1 banana congelada',
        'Granola fit',
        'Frutas vermelhas'
      ],
      instructions: [
        'Bata açaí, whey e banana no liquidificador',
        'Despeje em uma tigela',
        'Adicione granola por cima',
        'Decore com frutas vermelhas',
        'Sirva imediatamente'
      ]
    },

    // Almoço
    {
      id: '4',
      name: 'Frango Grelhado com Batata Doce',
      category: 'Almoço',
      calories: 450,
      protein: 42,
      carbs: 38,
      fat: 12,
      prepTime: 30,
      difficulty: 'easy',
      tags: ['Alto Proteína', 'Clássico'],
      imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
      ingredients: [
        '150g de peito de frango',
        '200g de batata doce',
        'Brócolis a gosto',
        'Azeite de oliva',
        'Temperos naturais'
      ],
      instructions: [
        'Tempere o frango e deixe marinar',
        'Corte a batata doce em cubos',
        'Asse a batata doce no forno',
        'Grelhe o frango em fogo médio',
        'Cozinhe o brócolis no vapor',
        'Monte o prato e sirva'
      ]
    },
    {
      id: '5',
      name: 'Salada de Quinoa com Frango',
      category: 'Almoço',
      calories: 420,
      protein: 38,
      carbs: 35,
      fat: 14,
      prepTime: 20,
      difficulty: 'easy',
      tags: ['Leve', 'Alto Proteína'],
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      ingredients: [
        '100g de quinoa cozida',
        '120g de frango desfiado',
        'Tomate cereja',
        'Rúcula',
        'Azeite e limão'
      ],
      instructions: [
        'Cozinhe a quinoa conforme embalagem',
        'Grelhe e desfie o frango',
        'Corte os tomates ao meio',
        'Misture todos os ingredientes',
        'Tempere com azeite e limão',
        'Sirva gelado'
      ]
    },
    {
      id: '6',
      name: 'Wrap de Frango Integral',
      category: 'Almoço',
      calories: 390,
      protein: 32,
      carbs: 40,
      fat: 10,
      prepTime: 20,
      difficulty: 'medium',
      tags: ['Prático', 'Portátil'],
      imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
      ingredients: [
        '1 tortilha integral',
        '100g de frango grelhado',
        'Alface',
        'Tomate',
        'Molho de iogurte'
      ],
      instructions: [
        'Aqueça levemente a tortilha',
        'Espalhe o molho de iogurte',
        'Adicione frango, alface e tomate',
        'Enrole firmemente',
        'Corte ao meio',
        'Sirva imediatamente'
      ]
    },

    // Jantar
    {
      id: '7',
      name: 'Salmão com Legumes no Vapor',
      category: 'Jantar',
      calories: 380,
      protein: 35,
      carbs: 18,
      fat: 20,
      prepTime: 25,
      difficulty: 'medium',
      tags: ['Ômega 3', 'Low Carb'],
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      ingredients: [
        '150g de filé de salmão',
        'Brócolis',
        'Cenoura',
        'Abobrinha',
        'Limão e ervas'
      ],
      instructions: [
        'Tempere o salmão com limão e ervas',
        'Corte os legumes em pedaços uniformes',
        'Coloque os legumes na vaporeira',
        'Asse o salmão no forno a 180°C',
        'Cozinhe por 15-20 minutos',
        'Sirva com limão extra'
      ]
    },
    {
      id: '8',
      name: 'Omelete de Forno com Vegetais',
      category: 'Jantar',
      calories: 290,
      protein: 28,
      carbs: 12,
      fat: 15,
      prepTime: 30,
      difficulty: 'easy',
      tags: ['Low Carb', 'Vegetariano'],
      imageUrl: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop',
      ingredients: [
        '4 ovos',
        'Espinafre',
        'Tomate',
        'Queijo cottage',
        'Temperos'
      ],
      instructions: [
        'Bata os ovos com temperos',
        'Adicione espinafre e tomate picados',
        'Misture o queijo cottage',
        'Despeje em forma untada',
        'Asse a 180°C por 20 minutos',
        'Corte em fatias e sirva'
      ]
    },

    // Pré-Treino
    {
      id: '9',
      name: 'Smoothie Energético',
      category: 'Pré-Treino',
      calories: 220,
      protein: 20,
      carbs: 32,
      fat: 3,
      prepTime: 5,
      difficulty: 'easy',
      tags: ['Rápido', 'Energético'],
      imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
      ingredients: [
        '1 banana',
        '1 scoop de whey',
        '1 colher de aveia',
        '200ml de água',
        'Gelo'
      ],
      instructions: [
        'Coloque todos os ingredientes no liquidificador',
        'Bata até ficar homogêneo',
        'Adicione gelo se preferir',
        'Sirva imediatamente',
        'Consuma 30-60min antes do treino'
      ]
    },
    {
      id: '10',
      name: 'Tapioca com Pasta de Amendoim',
      category: 'Pré-Treino',
      calories: 340,
      protein: 15,
      carbs: 45,
      fat: 12,
      prepTime: 10,
      difficulty: 'easy',
      tags: ['Energético', 'Rápido'],
      imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
      ingredients: [
        '3 colheres de goma de tapioca',
        '2 colheres de pasta de amendoim',
        '1 banana fatiada',
        'Canela'
      ],
      instructions: [
        'Aqueça frigideira antiaderente',
        'Espalhe a tapioca uniformemente',
        'Deixe formar uma massa',
        'Adicione pasta de amendoim e banana',
        'Dobre ao meio',
        'Sirva quente'
      ]
    },
    {
      id: '11',
      name: 'Pão Integral com Ovo',
      category: 'Pré-Treino',
      calories: 310,
      protein: 22,
      carbs: 38,
      fat: 8,
      prepTime: 10,
      difficulty: 'easy',
      tags: ['Prático', 'Clássico'],
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
      ingredients: [
        '2 fatias de pão integral',
        '2 ovos',
        'Tomate',
        'Alface',
        'Temperos'
      ],
      instructions: [
        'Toste o pão integral',
        'Prepare ovos mexidos ou cozidos',
        'Monte o sanduíche com vegetais',
        'Tempere a gosto',
        'Sirva imediatamente'
      ]
    },

    // Sobremesas
    {
      id: '12',
      name: 'Mousse de Chocolate Proteico',
      category: 'Sobremesas',
      calories: 180,
      protein: 20,
      carbs: 15,
      fat: 5,
      prepTime: 10,
      difficulty: 'easy',
      tags: ['Sem Açúcar', 'Alto Proteína'],
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      ingredients: [
        '1 scoop de whey chocolate',
        '200g de iogurte grego',
        '1 colher de cacau em pó',
        'Adoçante a gosto',
        'Frutas vermelhas'
      ],
      instructions: [
        'Misture whey, iogurte e cacau',
        'Adicione adoçante',
        'Bata até ficar cremoso',
        'Leve à geladeira por 2 horas',
        'Decore com frutas vermelhas',
        'Sirva gelado'
      ]
    },
    {
      id: '13',
      name: 'Brownie Fit de Batata Doce',
      category: 'Sobremesas',
      calories: 210,
      protein: 12,
      carbs: 28,
      fat: 6,
      prepTime: 40,
      difficulty: 'medium',
      tags: ['Sem Açúcar', 'Assado'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      ingredients: [
        '200g de batata doce cozida',
        '2 ovos',
        '3 colheres de cacau',
        '2 colheres de whey',
        'Adoçante'
      ],
      instructions: [
        'Amasse a batata doce cozida',
        'Misture todos os ingredientes',
        'Bata até ficar homogêneo',
        'Despeje em forma untada',
        'Asse a 180°C por 25 minutos',
        'Deixe esfriar antes de cortar'
      ]
    },
    {
      id: '14',
      name: 'Sorvete de Banana Fit',
      category: 'Sobremesas',
      calories: 150,
      protein: 8,
      carbs: 28,
      fat: 2,
      prepTime: 5,
      difficulty: 'easy',
      tags: ['Sem Açúcar', 'Refrescante'],
      imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      ingredients: [
        '2 bananas congeladas',
        '1 scoop de whey',
        '1 colher de cacau',
        'Leite vegetal'
      ],
      instructions: [
        'Corte as bananas em rodelas e congele',
        'Bata no processador até virar creme',
        'Adicione whey e cacau',
        'Adicione leite se necessário',
        'Sirva imediatamente ou recongele'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: Utensils },
    { id: 'Café da Manhã', name: 'Café da Manhã', icon: Coffee },
    { id: 'Almoço', name: 'Almoço', icon: UtensilsCrossed },
    { id: 'Jantar', name: 'Jantar', icon: Moon },
    { id: 'Pré-Treino', name: 'Pré-Treino', icon: Zap },
    { id: 'Sobremesas', name: 'Sobremesas', icon: Cake }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  const handleGenerateRecipe = () => {
    setIsGenerating(true);
    
    // Simula geração de receita com IA
    setTimeout(() => {
      const newRecipe: Recipe = {
        id: 'ai-generated',
        name: 'Receita Personalizada com IA',
        category: 'Almoço',
        calories: 420,
        protein: 40,
        carbs: 35,
        fat: 12,
        prepTime: 25,
        difficulty: 'medium',
        tags: ['Personalizado', 'IA'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        ingredients: [
          '150g de proteína magra (frango/peixe)',
          '100g de carboidrato complexo',
          'Vegetais variados',
          'Temperos naturais',
          'Azeite de oliva'
        ],
        instructions: [
          'Prepare a proteína conforme sua preferência',
          'Cozinhe o carboidrato',
          'Refogue os vegetais',
          'Tempere com ervas naturais',
          'Monte o prato balanceado',
          'Sirva e aproveite!'
        ]
      };
      
      setGeneratedRecipe(newRecipe);
      setSelectedRecipe(newRecipe);
      setIsGenerating(false);
      setShowAIGenerator(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">PerformGym<span className="text-red-600">X</span></span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-red-600">
              Voltar ao Início
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Receitas <span className="text-red-600">Fitness</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Receitas saudáveis e deliciosas para atingir seus objetivos
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar receitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-900 border-gray-800 text-white h-14 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'border-gray-700 bg-white text-black hover:bg-gray-100'
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 text-gray-400">
          {filteredRecipes.length} receita{filteredRecipes.length !== 1 ? 's' : ''} encontrada{filteredRecipes.length !== 1 ? 's' : ''}
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-red-600 transition-all group cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-800 overflow-hidden">
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white`}>
                    {getDifficultyLabel(recipe.difficulty)}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs mb-2">
                  {recipe.category}
                </Badge>

                <h3 className="text-lg font-bold mb-3 group-hover:text-red-600 transition-colors text-white">
                  {recipe.name}
                </h3>

                <div className="grid grid-cols-4 gap-2 mb-3 text-sm">
                  <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                    <Flame className="w-4 h-4 text-red-500 mb-1" />
                    <span className="text-xs text-gray-400">Kcal</span>
                    <span className="font-bold text-xs text-white">{recipe.calories}</span>
                  </div>

                  <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                    <Utensils className="w-4 h-4 text-blue-500 mb-1" />
                    <span className="text-xs text-gray-400">Prot</span>
                    <span className="font-bold text-xs text-white">{recipe.protein}g</span>
                  </div>

                  <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                    <ChefHat className="w-4 h-4 text-green-500 mb-1" />
                    <span className="text-xs text-gray-400">Carb</span>
                    <span className="font-bold text-xs text-white">{recipe.carbs}g</span>
                  </div>

                  <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                    <Clock className="w-4 h-4 text-yellow-500 mb-1" />
                    <span className="text-xs text-gray-400">Gord</span>
                    <span className="font-bold text-xs text-white">{recipe.fat}g</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.prepTime} min
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-red-600/30 text-red-500 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Generate Custom Recipe */}
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-red-600 to-red-800 border-0 p-8 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2 text-white">Receita Personalizada com IA</h3>
          <p className="text-white opacity-90 mb-6">
            A IA pode criar uma receita exclusiva baseada nos seus objetivos e restrições alimentares
          </p>
          <Button 
            onClick={() => setShowAIGenerator(true)}
            className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar Receita com IA
          </Button>
        </Card>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="bg-gray-900 border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-white">{selectedRecipe.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="p-6">
              {/* Image */}
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gray-800 border-gray-700 p-4 text-center">
                  <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Calorias</p>
                  <p className="text-2xl font-bold text-white">{selectedRecipe.calories}</p>
                </Card>

                <Card className="bg-gray-800 border-gray-700 p-4 text-center">
                  <Utensils className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Proteína</p>
                  <p className="text-2xl font-bold text-white">{selectedRecipe.protein}g</p>
                </Card>

                <Card className="bg-gray-800 border-gray-700 p-4 text-center">
                  <ChefHat className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Carboidrato</p>
                  <p className="text-2xl font-bold text-white">{selectedRecipe.carbs}g</p>
                </Card>

                <Card className="bg-gray-800 border-gray-700 p-4 text-center">
                  <Heart className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Gordura</p>
                  <p className="text-2xl font-bold text-white">{selectedRecipe.fat}g</p>
                </Card>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <Badge className={`${getDifficultyColor(selectedRecipe.difficulty)} text-white`}>
                  {getDifficultyLabel(selectedRecipe.difficulty)}
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-400">
                  {selectedRecipe.category}
                </Badge>
                <span className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {selectedRecipe.prepTime} minutos
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedRecipe.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-red-600/30 text-red-500">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <Utensils className="w-5 h-5 text-red-600" />
                  Ingredientes
                </h3>
                <Card className="bg-gray-800 border-gray-700 p-4">
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2 text-white">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <ChefHat className="w-5 h-5 text-red-600" />
                  Modo de Preparo
                </h3>
                <Card className="bg-gray-800 border-gray-700 p-4">
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <span className="pt-0.5 text-white">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* AI Generator Modal */}
      {showAIGenerator && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full">
            <div className="border-b border-gray-800 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                <Sparkles className="w-6 h-6 text-red-600" />
                Gerar Receita Personalizada
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAIGenerator(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label className="text-white mb-2 block">
                  Descreva suas preferências e restrições
                </Label>
                <Textarea
                  placeholder="Ex: Quero uma receita rica em proteína, sem lactose, com frango, para o almoço, que seja rápida de fazer..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                />
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm text-white">💡 Dicas para melhor resultado:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Mencione seu objetivo (hipertrofia, emagrecimento, etc)</li>
                  <li>• Informe restrições alimentares (lactose, glúten, etc)</li>
                  <li>• Especifique ingredientes preferidos ou evitados</li>
                  <li>• Indique o momento do dia (café, almoço, jantar, etc)</li>
                </ul>
              </div>

              <Button
                onClick={handleGenerateRecipe}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Gerando receita...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Gerar Receita com IA
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
