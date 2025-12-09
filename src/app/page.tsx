'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/custom/navbar';
import { 
  Target, 
  Dumbbell, 
  Utensils, 
  Camera, 
  BookOpen, 
  Users,
  Zap,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block mb-4 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full">
            <span className="text-red-600 text-sm font-semibold">🔥 Inteligência Artificial para Fitness</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Seu Personal Trainer
            <span className="block text-red-600">Inteligente</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Treinos personalizados, nutrição inteligente e acompanhamento completo. 
            Tudo criado por IA especialmente para você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/funil">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/vendas">
              <Button size="lg" variant="outline" className="border-gray-700 text-black bg-white hover:bg-gray-100 text-lg px-8 py-6">
                Ver Planos
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-red-600" />
              <span>100% Personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-600" />
              <span>Resultados Rápidos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              <span>+10k Usuários</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tudo que você precisa em <span className="text-red-600">um só lugar</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Ferramentas inteligentes para transformar seu corpo e sua saúde
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/funil">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <Target className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Treino Personalizado</h3>
                <p className="text-gray-400">
                  Responda perguntas e receba um plano 100% personalizado para seus objetivos
                </p>
              </Card>
            </Link>

            <Link href="/montador">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <Dumbbell className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Montador de Treino</h3>
                <p className="text-gray-400">
                  Crie treinos personalizados com IA ou escolha entre centenas de opções
                </p>
              </Card>
            </Link>

            <Link href="/treinos">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <Zap className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Treinos Automáticos</h3>
                <p className="text-gray-400">
                  IA cria treinos diários adaptados ao seu progresso e feedback
                </p>
              </Card>
            </Link>

            <Link href="/exercicios">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <BookOpen className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Guia de Exercícios</h3>
                <p className="text-gray-400">
                  Biblioteca completa com GIFs demonstrativos e instruções detalhadas
                </p>
              </Card>
            </Link>

            <Link href="/calorias">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <Camera className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Contador de Calorias</h3>
                <p className="text-gray-400">
                  Tire foto da comida e a IA calcula calorias e macros automaticamente
                </p>
              </Card>
            </Link>

            <Link href="/receitas">
              <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group h-full">
                <Utensils className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-white">Receitas Fitness</h3>
                <p className="text-gray-400">
                  Receitas saudáveis personalizadas para seu objetivo e restrições
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Como <span className="text-red-600">Funciona</span>
            </h2>
            <p className="text-gray-400 text-lg">
              3 passos simples para começar sua transformação
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Responda o Funil Inteligente</h3>
                <p className="text-gray-400">
                  Conte seus objetivos, nível, preferências e restrições. Leva apenas 2 minutos.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Receba Seu Plano Personalizado</h3>
                <p className="text-gray-400">
                  A IA cria treinos e dieta específicos para você, adaptados ao seu estilo de vida.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Acompanhe Sua Evolução</h3>
                <p className="text-gray-400">
                  Dashboard completo com progresso, gráficos e ajustes automáticos baseados nos seus resultados.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/funil">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                Começar Minha Jornada
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar seu corpo?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Junte-se a milhares de pessoas que já estão alcançando seus objetivos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/funil">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="/vendas">
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-red-600 text-lg px-8 py-6 font-semibold">
                Ver Planos Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/00ecb78b-bbd4-416c-ab91-88e6351ca469.png" 
                  alt="PerformGymX Logo" 
                  className="h-8 w-auto invert"
                />
                <span className="text-xl font-bold">PerformGym<span className="text-red-500">X</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Seu personal trainer inteligente, disponível 24/7
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/funil" className="hover:text-white">Funil Inteligente</Link></li>
                <li><Link href="/montador" className="hover:text-white">Montador de Treino</Link></li>
                <li><Link href="/treinos" className="hover:text-white">Treinos IA</Link></li>
                <li><Link href="/exercicios" className="hover:text-white">Exercícios</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Nutrição</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/calorias" className="hover:text-white">Contador de Calorias</Link></li>
                <li><Link href="/receitas" className="hover:text-white">Receitas Fitness</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/membros" className="hover:text-white">Área de Membros</Link></li>
                <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
                <li><Link href="/vendas" className="hover:text-white">Planos</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 PerformGymX. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
