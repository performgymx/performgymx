'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Target, Dumbbell, Calendar, Utensils, AlertCircle, Clock, CheckCircle, TrendingUp, Apple, Flame } from 'lucide-react';

type Goal = 'hipertrofia' | 'definicao' | 'emagrecimento' | 'recomposicao';
type Level = 'iniciante' | 'intermediario' | 'avancado';

export default function FunilInteligente() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    objetivo: '' as Goal,
    diasSemana: 0,
    nivel: '' as Level,
    equipamentos: [] as string[],
    restricoes: [] as string[],
    tempoDia: 0,
  });

  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.objetivo !== '';
      case 2: return formData.diasSemana > 0;
      case 3: return formData.nivel !== '';
      case 4: return formData.equipamentos.length > 0;
      case 5: return true; // Restrições são opcionais
      case 6: return formData.tempoDia > 0;
      default: return false;
    }
  };

  // Lógica de recomendação baseada nas respostas
  const getRecommendations = () => {
    const recommendations = {
      treino: '',
      plano: '',
      receitas: [] as string[],
    };

    // Recomendação de treino
    if (formData.objetivo === 'hipertrofia') {
      recommendations.treino = formData.nivel === 'iniciante' 
        ? 'Treino ABC - 3x por semana com foco em compostos'
        : 'Treino ABCDE - 5x por semana com volume alto';
    } else if (formData.objetivo === 'emagrecimento') {
      recommendations.treino = 'Treino Full Body + HIIT - 4x por semana';
    } else if (formData.objetivo === 'definicao') {
      recommendations.treino = 'Treino Upper/Lower + Cardio - 4-5x por semana';
    } else {
      recommendations.treino = 'Treino de Recomposição - 4x por semana com força + cardio';
    }

    // Recomendação de plano alimentar
    if (formData.objetivo === 'hipertrofia') {
      recommendations.plano = 'Superávit calórico de 300-500 kcal | Alta proteína (2g/kg) | Carboidratos moderados a altos';
    } else if (formData.objetivo === 'emagrecimento') {
      recommendations.plano = 'Déficit calórico de 300-500 kcal | Alta proteína (2g/kg) | Carboidratos moderados';
    } else if (formData.objetivo === 'definicao') {
      recommendations.plano = 'Déficit leve de 200-300 kcal | Proteína alta (2.2g/kg) | Carb cycling';
    } else {
      recommendations.plano = 'Manutenção calórica | Proteína alta (2g/kg) | Macros balanceados';
    }

    // Receitas compatíveis
    if (formData.objetivo === 'hipertrofia') {
      recommendations.receitas = ['Frango com batata doce', 'Omelete de claras com aveia', 'Shake proteico com banana'];
    } else if (formData.objetivo === 'emagrecimento') {
      recommendations.receitas = ['Salada de frango grelhado', 'Omelete de legumes', 'Iogurte grego com frutas'];
    } else if (formData.objetivo === 'definicao') {
      recommendations.receitas = ['Salmão com brócolis', 'Peito de peru com salada', 'Panqueca proteica'];
    } else {
      recommendations.receitas = ['Bowl de quinoa', 'Wrap integral de frango', 'Smoothie verde proteico'];
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  if (showResults) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Seu Treino Personalizado Está Pronto!
            </h1>
            <p className="text-xl text-gray-400">
              Baseado nas suas respostas, criamos o treino perfeito para você
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {/* Treino Recomendado */}
            <Card className="p-6 bg-gray-900 border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-600/10 rounded-lg">
                  <Dumbbell className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">Treino Ideal</h3>
                  <p className="text-gray-300 text-lg">{recommendations.treino}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                      {formData.diasSemana}x por semana
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                      {formData.tempoDia} min/dia
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm capitalize text-gray-300">
                      {formData.nivel}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plano Alimentar */}
            <Card className="p-6 bg-gray-900 border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-600/10 rounded-lg">
                  <Apple className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">Plano Alimentar</h3>
                  <p className="text-gray-300 text-lg">{recommendations.plano}</p>
                  {formData.restricoes.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Restrições consideradas:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.restricoes.map((r) => (
                          <span key={r} className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-sm text-gray-300">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Receitas Sugeridas */}
            <Card className="p-6 bg-gray-900 border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-600/10 rounded-lg">
                  <Utensils className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">Receitas Compatíveis</h3>
                  <ul className="space-y-2">
                    {recommendations.receitas.map((receita, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <Flame className="w-5 h-5 text-red-600" />
                        {receita}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Final */}
          <Card className="p-8 bg-gradient-to-r from-red-600 to-red-700 border-0 text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-4 text-white">
              Pronto para Transformar seu Corpo?
            </h2>
            <p className="text-lg mb-6 text-white opacity-90">
              Tenha acesso completo a treinos personalizados, planos alimentares detalhados, 
              acompanhamento diário e suporte de IA 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 font-bold text-lg px-8 hover:text-red-700"
              >
                Assinar Agora - R$ 47/mês
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-black bg-white hover:bg-gray-100 font-bold text-lg px-8"
                onClick={() => {
                  setShowResults(false);
                  setStep(1);
                  setFormData({
                    objetivo: '' as Goal,
                    diasSemana: 0,
                    nivel: '' as Level,
                    equipamentos: [],
                    restricoes: [],
                    tempoDia: 0,
                  });
                }}
              >
                Refazer Funil
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 bg-gray-900 border-gray-800">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm font-medium text-red-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Objetivo */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Qual é o seu objetivo?</h2>
              <p className="text-gray-400">Escolha o que melhor descreve sua meta</p>
            </div>
            
            <RadioGroup value={formData.objetivo} onValueChange={(value) => setFormData({ ...formData, objetivo: value as Goal })}>
              <div className="space-y-3">
                {[
                  { value: 'hipertrofia', label: 'Hipertrofia', desc: 'Ganhar massa muscular' },
                  { value: 'definicao', label: 'Definição', desc: 'Tonificar e definir músculos' },
                  { value: 'emagrecimento', label: 'Emagrecimento', desc: 'Perder gordura corporal' },
                  { value: 'recomposicao', label: 'Recomposição', desc: 'Ganhar músculo e perder gordura' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.objetivo === option.value ? 'border-red-600 bg-red-600/10' : 'border-gray-700 hover:border-red-600/50'
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Dias por Semana */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Quantos dias por semana você treina?</h2>
              <p className="text-gray-400">Seja realista com sua disponibilidade</p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map((dia) => (
                <button
                  key={dia}
                  onClick={() => setFormData({ ...formData, diasSemana: dia })}
                  className={`p-6 border-2 rounded-lg font-bold text-2xl transition-all ${
                    formData.diasSemana === dia 
                      ? 'border-red-600 bg-red-600/10 text-red-600' 
                      : 'border-gray-700 hover:border-red-600/50 text-white'
                  }`}
                >
                  {dia}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Nível */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Qual é o seu nível?</h2>
              <p className="text-gray-400">Seja honesto para melhores resultados</p>
            </div>
            
            <RadioGroup value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value as Level })}>
              <div className="space-y-3">
                {[
                  { value: 'iniciante', label: 'Iniciante', desc: 'Pouca ou nenhuma experiência com treinos' },
                  { value: 'intermediario', label: 'Intermediário', desc: 'Treino há alguns meses, conheço os exercícios' },
                  { value: 'avancado', label: 'Avançado', desc: 'Treino há mais de 1 ano consistentemente' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.nivel === option.value ? 'border-red-600 bg-red-600/10' : 'border-gray-700 hover:border-red-600/50'
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Equipamentos */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Quais equipamentos você tem acesso?</h2>
              <p className="text-gray-400">Marque todos que se aplicam</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Halteres',
                'Barra',
                'Máquinas',
                'Elásticos',
                'Kettlebell',
                'Peso corporal',
                'Banco',
                'Barra fixa',
              ].map((equip) => (
                <label
                  key={equip}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.equipamentos.includes(equip) 
                      ? 'border-red-600 bg-red-600/10' 
                      : 'border-gray-700 hover:border-red-600/50'
                  }`}
                >
                  <Checkbox
                    checked={formData.equipamentos.includes(equip)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, equipamentos: [...formData.equipamentos, equip] });
                      } else {
                        setFormData({ ...formData, equipamentos: formData.equipamentos.filter(e => e !== equip) });
                      }
                    }}
                  />
                  <span className="font-medium text-white">{equip}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Restrições Alimentares */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Possui restrições alimentares?</h2>
              <p className="text-gray-400">Opcional - marque se tiver alguma</p>
            </div>
            
            <div className="space-y-3">
              {[
                'Lactose',
                'Glúten',
                'Vegetariano',
                'Vegano',
                'Frutos do mar',
                'Amendoim',
                'Soja',
                'Ovos',
              ].map((restricao) => (
                <label
                  key={restricao}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.restricoes.includes(restricao) 
                      ? 'border-red-600 bg-red-600/10' 
                      : 'border-gray-700 hover:border-red-600/50'
                  }`}
                >
                  <Checkbox
                    checked={formData.restricoes.includes(restricao)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, restricoes: [...formData.restricoes, restricao] });
                      } else {
                        setFormData({ ...formData, restricoes: formData.restricoes.filter(r => r !== restricao) });
                      }
                    }}
                  />
                  <span className="font-medium text-white">{restricao}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Tempo Disponível */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-3xl font-bold mb-2 text-white">Quanto tempo você tem por dia?</h2>
              <p className="text-gray-400">Para treinar</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-2">{formData.tempoDia}</div>
                <div className="text-xl text-gray-400">minutos</div>
              </div>
              
              <div className="space-y-2">
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={formData.tempoDia}
                  onChange={(e) => setFormData({ ...formData, tempoDia: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 border-gray-700 text-black hover:bg-gray-800 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Ver Recomendações' : 'Próximo'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
