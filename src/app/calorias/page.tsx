'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Camera, 
  Upload, 
  Loader2, 
  Check, 
  AlertCircle,
  ArrowLeft,
  Save,
  TrendingDown,
  TrendingUp,
  Apple,
  Beef,
  Salad
} from 'lucide-react';

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AnalysisResult {
  foods: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  alternatives?: {
    food: string;
    suggestion: string;
    caloriesSaved: number;
  }[];
}

export default function CaloriasPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [savedMeals, setSavedMeals] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulação de análise com IA (em produção, usar API real como OpenAI Vision)
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        foods: [
          {
            name: 'Arroz branco',
            quantity: '150g',
            calories: 195,
            protein: 4,
            carbs: 43,
            fat: 0.3
          },
          {
            name: 'Frango grelhado',
            quantity: '120g',
            calories: 198,
            protein: 37,
            carbs: 0,
            fat: 4.3
          },
          {
            name: 'Feijão preto',
            quantity: '100g',
            calories: 132,
            protein: 9,
            carbs: 24,
            fat: 0.5
          },
          {
            name: 'Salada verde',
            quantity: '80g',
            calories: 16,
            protein: 1.2,
            carbs: 3,
            fat: 0.2
          }
        ],
        totalCalories: 541,
        totalProtein: 51.2,
        totalCarbs: 70,
        totalFat: 5.3,
        alternatives: [
          {
            food: 'Arroz branco',
            suggestion: 'Arroz integral (mesma quantidade)',
            caloriesSaved: 15
          },
          {
            food: 'Feijão preto',
            suggestion: 'Lentilha (mais proteína)',
            caloriesSaved: 0
          }
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const saveMeal = () => {
    if (analysisResult) {
      setSavedMeals(prev => prev + 1);
      // Em produção, salvar no backend/localStorage
      alert('Refeição salva no diário alimentar! ✅');
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Contador de <span className="text-red-600">Calorias</span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Tire uma foto do seu prato e descubra as calorias instantaneamente
                </p>
              </div>
              
              {savedMeals > 0 && (
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="text-center">
                    <Save className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <div className="text-2xl font-bold">{savedMeals}</div>
                    <div className="text-xs text-gray-400">Refeições salvas</div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Upload Area */}
          {!selectedImage && (
            <Card className="bg-gray-900 border-gray-800 p-12">
              <div className="text-center">
                <div className="mb-6">
                  <Camera className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-white">Envie uma foto do seu prato</h2>
                  <p className="text-gray-400">
                    Nossa IA irá reconhecer os alimentos e calcular as calorias automaticamente
                  </p>
                </div>

                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 hover:border-red-600 transition-colors">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Clique para selecionar uma imagem</p>
                    <p className="text-sm text-gray-600">PNG, JPG ou JPEG (máx. 10MB)</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="flex gap-3">
                    <Apple className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Reconhecimento Inteligente</h3>
                      <p className="text-sm text-gray-400">IA identifica cada alimento no prato</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Beef className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Cálculo Preciso</h3>
                      <p className="text-sm text-gray-400">Calorias e macros detalhados</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Salad className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Sugestões Saudáveis</h3>
                      <p className="text-sm text-gray-400">Alternativas para melhorar sua dieta</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Image Preview & Analysis */}
          {selectedImage && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Preview */}
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Imagem do Prato</h3>
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage} 
                    alt="Prato fotografado" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="flex gap-3">
                  {!analysisResult && (
                    <Button 
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Analisar Imagem
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={resetAnalysis}
                    variant="outline"
                    className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                  >
                    Nova Foto
                  </Button>
                </div>
              </Card>

              {/* Analysis Results */}
              <div className="space-y-6">
                {isAnalyzing && (
                  <Card className="bg-gray-900 border-gray-800 p-8">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-red-600 mx-auto mb-4 animate-spin" />
                      <h3 className="text-xl font-bold mb-2 text-white">Analisando sua refeição...</h3>
                      <p className="text-gray-400">Reconhecendo alimentos e calculando nutrientes</p>
                    </div>
                  </Card>
                )}

                {analysisResult && (
                  <>
                    {/* Total Summary */}
                    <Card className="bg-gradient-to-br from-red-600 to-red-800 border-0 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Total da Refeição</h3>
                        <Check className="w-6 h-6" />
                      </div>
                      
                      <div className="text-5xl font-bold mb-6">
                        {analysisResult.totalCalories} <span className="text-2xl">kcal</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm opacity-90 mb-1">Proteínas</div>
                          <div className="text-2xl font-bold">{analysisResult.totalProtein}g</div>
                        </div>
                        <div>
                          <div className="text-sm opacity-90 mb-1">Carboidratos</div>
                          <div className="text-2xl font-bold">{analysisResult.totalCarbs}g</div>
                        </div>
                        <div>
                          <div className="text-sm opacity-90 mb-1">Gorduras</div>
                          <div className="text-2xl font-bold">{analysisResult.totalFat}g</div>
                        </div>
                      </div>
                    </Card>

                    {/* Food Items */}
                    <Card className="bg-gray-900 border-gray-800 p-6">
                      <h3 className="text-xl font-bold mb-4 text-white">Alimentos Detectados</h3>
                      
                      <div className="space-y-4">
                        {analysisResult.foods.map((food, index) => (
                          <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-white">{food.name}</h4>
                                <p className="text-sm text-gray-400">{food.quantity}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-red-600">{food.calories} kcal</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-gray-400">
                                <span className="text-white font-medium">{food.protein}g</span> proteína
                              </div>
                              <div className="text-gray-400">
                                <span className="text-white font-medium">{food.carbs}g</span> carbo
                              </div>
                              <div className="text-gray-400">
                                <span className="text-white font-medium">{food.fat}g</span> gordura
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Alternatives */}
                    {analysisResult.alternatives && analysisResult.alternatives.length > 0 && (
                      <Card className="bg-gray-900 border-gray-800 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingDown className="w-5 h-5 text-green-500" />
                          <h3 className="text-xl font-bold text-white">Sugestões Mais Saudáveis</h3>
                        </div>
                        
                        <div className="space-y-4">
                          {analysisResult.alternatives.map((alt, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="text-sm text-gray-400 mb-1">Em vez de:</div>
                                  <div className="font-semibold text-white">{alt.food}</div>
                                </div>
                                {alt.caloriesSaved > 0 && (
                                  <div className="bg-green-600/20 text-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                                    -{alt.caloriesSaved} kcal
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 text-green-500">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm">{alt.suggestion}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                          <div className="flex gap-2">
                            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-300">
                              Essas são sugestões para otimizar sua dieta. Consulte um nutricionista para um plano personalizado.
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Save Button */}
                    <Button 
                      onClick={saveMeal}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Salvar no Diário Alimentar
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Info Cards */}
          {!selectedImage && (
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Rápido e Fácil</h3>
                <p className="text-gray-400 text-sm">
                  Basta tirar uma foto e pronto! Sem precisar digitar nada manualmente.
                </p>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Precisão com IA</h3>
                <p className="text-gray-400 text-sm">
                  Tecnologia de visão computacional para identificar alimentos com alta precisão.
                </p>
              </Card>

              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
                  <Save className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Histórico Completo</h3>
                <p className="text-gray-400 text-sm">
                  Todas as refeições ficam salvas no seu diário para acompanhamento.
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
