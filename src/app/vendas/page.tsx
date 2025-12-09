'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/custom/navbar';
import Image from 'next/image';
import { 
  Check, 
  X, 
  Zap, 
  Crown, 
  Rocket,
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  Dumbbell,
  Camera,
  Utensils,
  BookOpen,
  BarChart3,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function VendasPage() {
  const router = useRouter();
  // Estado para contagem regressiva (24 horas em segundos)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  // Efeito para decrementar o contador a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return 24 * 60 * 60; // Reinicia para 24h quando chegar a 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Função para formatar tempo em HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Função para redirecionar ao checkout
  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section - Copy Agressiva */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-red-600 rounded-full animate-pulse">
            <span className="text-white text-sm font-bold">🔥 OFERTA LIMITADA - 70% OFF</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Pare de <span className="text-red-600 line-through">Enrolar</span>
            <span className="block mt-2">e Comece a <span className="text-red-600">TRANSFORMAR</span></span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-bold">
            Você está a 1 decisão de distância do corpo que sempre quis
          </p>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Enquanto você adia, milhares já estão treinando com IA, comendo certo e 
            <span className="text-red-600 font-bold"> vendo resultados REAIS</span> em semanas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={handleGoToCheckout}
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-8 font-bold shadow-2xl shadow-red-600/50 hover:scale-105 transition-all"
            >
              QUERO COMEÇAR AGORA
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleGoToCheckout}
              className="bg-white hover:bg-gray-100 text-black border-2 border-white text-xl px-12 py-8 font-bold hover:scale-105 transition-all"
            >
              Começar Gratuitamente
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Garantia 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <span>+10.847 membros ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              <span>4.9/5 estrelas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgência e Escassez */}
      <section className="py-8 px-4 bg-red-600">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 animate-pulse" />
              <div>
                <p className="font-bold text-lg">Apenas 23 vagas restantes hoje</p>
                <p className="text-sm text-red-100">Preço volta ao normal em 48h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Oferta expira em:</p>
                <p className="text-2xl font-black">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema vs Solução */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Você Está Cansado de...
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            (Seja honesto, você reconhece pelo menos 3 desses problemas)
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Problemas */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-red-600/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Treinar sem direção</p>
                  <p className="text-gray-400 text-sm">Chegar na academia e não saber o que fazer, perdendo tempo e resultados</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-red-600/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Dietas impossíveis</p>
                  <p className="text-gray-400 text-sm">Planos genéricos que não cabem na sua rotina e você desiste em 3 dias</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-red-600/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Personal caro demais</p>
                  <p className="text-gray-400 text-sm">R$ 200-400/mês que você não tem para gastar com acompanhamento</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-red-600/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Zero progresso visível</p>
                  <p className="text-gray-400 text-sm">Meses treinando e parece que nada muda no espelho</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-red-600/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Desculpas infinitas</p>
                  <p className="text-gray-400 text-sm">"Segunda eu começo", "Não tenho tempo", "Vou esperar o verão passar"</p>
                </div>
              </div>
            </div>

            {/* Soluções */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Treinos personalizados diários</p>
                  <p className="text-gray-300 text-sm">IA cria seu treino perfeito todo dia, adaptado ao seu feedback e progresso</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Nutrição que cabe na SUA vida</p>
                  <p className="text-gray-300 text-sm">Receitas personalizadas, contador de calorias por foto, zero neura</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Personal IA 24/7 por R$ 1,60/dia</p>
                  <p className="text-gray-300 text-sm">Menos que um café. Acompanhamento completo sem pesar no bolso</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Dashboard de evolução real</p>
                  <p className="text-gray-300 text-sm">Gráficos, fotos, medidas - você VÊ seu progresso acontecendo</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Comece HOJE, não segunda</p>
                  <p className="text-gray-300 text-sm">Seu primeiro treino personalizado em 2 minutos. Zero desculpas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-3xl font-black mb-6">
              A pergunta é: <span className="text-red-600">Até quando você vai esperar?</span>
            </p>
            <Button 
              size="lg" 
              onClick={handleGoToCheckout}
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-8 font-bold shadow-2xl shadow-red-600/50"
            >
              ACABAR COM AS DESCULPAS AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* Planos - Preços */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Escolha Seu <span className="text-red-600">Plano de Ataque</span>
            </h2>
            <p className="text-xl text-gray-400">
              Todos os planos com 70% OFF por tempo limitado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Plano Mensal */}
            <Card className="bg-gray-900 border-gray-800 p-8 relative">
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Mensal</h3>
                <p className="text-gray-400 text-sm mb-4">Para quem quer testar</p>
                
                <div className="mb-4">
                  <span className="text-gray-500 line-through text-xl">R$ 97</span>
                  <div className="text-5xl font-black text-white">
                    R$ 29
                    <span className="text-lg text-gray-400 font-normal">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">R$ 0,96/dia</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Treinos personalizados com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Contador de calorias por foto</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Biblioteca de exercícios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Receitas fitness personalizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Dashboard de progresso</span>
                </li>
              </ul>

              <Button 
                onClick={handleGoToCheckout}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold"
              >
                Começar Agora
              </Button>
            </Card>

            {/* Plano Trimestral - DESTAQUE */}
            <Card className="bg-gradient-to-b from-red-600 to-red-700 border-red-500 p-8 relative transform scale-105 shadow-2xl shadow-red-600/50">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm">
                🔥 MAIS POPULAR
              </div>

              <div className="text-center mb-6">
                <Crown className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Trimestral</h3>
                <p className="text-red-100 text-sm mb-4">Melhor custo-benefício</p>
                
                <div className="mb-4">
                  <span className="text-red-200 line-through text-xl">R$ 291</span>
                  <div className="text-5xl font-black text-white">
                    R$ 49
                    <span className="text-lg text-red-100 font-normal">/mês</span>
                  </div>
                  <p className="text-sm text-red-100 mt-2">R$ 1,63/dia • Total R$ 147</p>
                  <div className="inline-block mt-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    ECONOMIZE R$ 144
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Tudo do plano Mensal +</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ajustes automáticos de treino</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Análise de progresso semanal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Acesso a comunidade VIP</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-bold">Garantia estendida 60 dias</span>
                </li>
              </ul>

              <Button 
                onClick={handleGoToCheckout}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg py-6"
              >
                GARANTIR DESCONTO MÁXIMO
              </Button>
            </Card>

            {/* Plano Anual */}
            <Card className="bg-gray-900 border-gray-800 p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                💎 MELHOR VALOR
              </div>

              <div className="text-center mb-6">
                <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Anual</h3>
                <p className="text-gray-400 text-sm mb-4">Transformação completa</p>
                
                <div className="mb-4">
                  <span className="text-gray-500 line-through text-xl">R$ 1.164</span>
                  <div className="text-5xl font-black text-white">
                    R$ 29
                    <span className="text-lg text-gray-400 font-normal">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">R$ 0,96/dia • Total R$ 348</p>
                  <div className="inline-block mt-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ECONOMIZE R$ 816
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Tudo do plano Trimestral +</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Consultoria mensal com especialista</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Planos de nutrição avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Acesso antecipado a novidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Certificado de conclusão</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-bold">Garantia incondicional 90 dias</span>
                </li>
              </ul>

              <Button 
                onClick={handleGoToCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Começar Transformação
              </Button>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              💳 Aceitamos todos os cartões de crédito e PIX
            </p>
            <p className="text-gray-500 text-xs">
              Pagamento 100% seguro • Cancele quando quiser • Sem taxas ocultas
            </p>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Não Acredite em Mim. <span className="text-red-600">Acredite Neles.</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Resultados reais de pessoas reais que pararam de enrolar
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Depoimento 1 - Marcos Silva */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=faces"
                    alt="Marcos Silva"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Marcos Silva</p>
                  <p className="text-sm text-gray-400">Perdeu 18kg em 3 meses</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "Tentei 4 academias diferentes e nunca vi resultado. Com o PerformGymX em 2 meses já tinha perdido 12kg. 
                A IA realmente entende o que eu preciso e adapta tudo pra minha rotina maluca."
              </p>
            </Card>

            {/* Depoimento 2 - Juliana Costa */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                    alt="Juliana Costa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Juliana Costa</p>
                  <p className="text-sm text-gray-400">Ganhou 5kg de massa magra</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "Pagava R$ 350/mês em personal e não tinha metade do que tenho aqui. 
                O contador de calorias por foto mudou minha vida. Finalmente consigo seguir a dieta sem neura."
              </p>
            </Card>

            {/* Depoimento 3 - Rafael Mendes */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                    alt="Rafael Mendes"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Rafael Mendes</p>
                  <p className="text-sm text-gray-400">De sedentário a atleta</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "Nunca tinha treinado na vida. Achei que seria complicado mas a IA me guiou desde o dia 1. 
                6 meses depois estou irreconhecível. Melhor investimento que já fiz."
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold mb-4">
              Média de <span className="text-red-600">4.9/5 estrelas</span> em +2.400 avaliações
            </p>
            <p className="text-gray-400">
              Junte-se a milhares de pessoas que já transformaram seus corpos
            </p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-green-600/20 to-green-600/5 border-2 border-green-600 rounded-2xl p-12 text-center">
            <Shield className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">
              Garantia Blindada de <span className="text-green-500">30 Dias</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Teste por 30 dias completos. Se não gostar, devolvemos 100% do seu dinheiro.
            </p>
            <p className="text-gray-400 mb-8">
              Sem perguntas, sem burocracia, sem enrolação. É simples: ou você fica satisfeito ou seu dinheiro volta.
              Assumimos TODO o risco para você não ter desculpa para não começar HOJE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span>Reembolso total</span>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span>Sem perguntas</span>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span>Processo rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Agressivo */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Ainda Tem <span className="text-red-600">Dúvidas?</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            (Ou está procurando desculpas para não começar?)
          </p>

          <div className="space-y-4">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-2">❓ "Funciona mesmo ou é mais um app genérico?"</h3>
              <p className="text-gray-400">
                A IA analisa VOCÊ especificamente: seu corpo, objetivos, limitações, preferências. 
                Não é planilha de Excel copiada. São treinos que se adaptam ao SEU progresso em tempo real.
              </p>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-2">❓ "Não tenho tempo para treinar..."</h3>
              <p className="text-gray-400">
                Você tem tempo para rolar feed por 2 horas. A IA cria treinos de 20-45 minutos que cabem na SUA agenda. 
                Pare de usar "falta de tempo" como desculpa.
              </p>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-2">❓ "E se eu não gostar?"</h3>
              <p className="text-gray-400">
                30 dias de garantia total. Teste, use todas as funcionalidades. Se não gostar, clica em "cancelar" 
                e recebe 100% de volta. Sem drama, sem burocracia.
              </p>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-2">❓ "Sou iniciante, vai ser muito difícil?"</h3>
              <p className="text-gray-400">
                A IA começa do SEU nível. Se você nunca treinou, ela cria treinos para iniciantes. 
                Conforme você evolui, ela aumenta a dificuldade. É literalmente impossível ficar perdido.
              </p>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-2">❓ "Posso cancelar quando quiser?"</h3>
              <p className="text-gray-400">
                Sim. Sem multa, sem taxa, sem contrato de 12 meses. Cancela com 2 cliques. 
                Mas aposto que você não vai querer quando ver os resultados.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Agressivo */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Chega de Enrolar.
            <span className="block mt-2">É AGORA ou NUNCA.</span>
          </h2>
          
          <p className="text-2xl mb-4 font-bold">
            Você tem 2 opções:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
            <Card className="bg-black/40 border-white/20 p-6">
              <div className="flex items-start gap-3">
                <X className="w-8 h-8 text-red-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-xl mb-2">OPÇÃO 1: Continuar igual</p>
                  <p className="text-red-100">
                    Fechar essa página, voltar pro sofá, continuar insatisfeito com seu corpo, 
                    gastar R$ 400/mês em personal ou treinar sem direção. Daqui 6 meses estar no mesmo lugar.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 border-green-500 p-6">
              <div className="flex items-start gap-3">
                <Check className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-xl mb-2">OPÇÃO 2: Transformar HOJE</p>
                  <p className="text-white">
                    Clicar no botão, investir R$ 1,60/dia, ter treinos personalizados, nutrição inteligente, 
                    e daqui 3 meses estar irreconhecível. Você escolhe.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Button 
            size="lg" 
            onClick={handleGoToCheckout}
            className="bg-white text-red-600 hover:bg-gray-100 text-2xl px-16 py-10 font-black shadow-2xl hover:scale-105 transition-all mb-6"
          >
            SIM, QUERO TRANSFORMAR MEU CORPO AGORA
            <ArrowRight className="ml-3 w-8 h-8" />
          </Button>

          <div className="space-y-2 text-sm text-red-100">
            <p>✅ Acesso imediato após pagamento</p>
            <p>✅ Primeiro treino personalizado em 2 minutos</p>
            <p>✅ Garantia incondicional de 30 dias</p>
            <p>✅ Cancele quando quiser, sem multa</p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-lg font-bold mb-2">
              ⏰ Oferta expira em: <span className="text-yellow-300 text-2xl">{formatTime(timeLeft)}</span>
            </p>
            <p className="text-red-100">
              Apenas 23 vagas restantes com 70% OFF
            </p>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-black border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2024 PerformGymX. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/contato" className="hover:text-white">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
