'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dumbbell, User, Settings, TrendingUp, Award, LogOut } from 'lucide-react';

export default function AreaMembros() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">FitAI</span>
          </Link>
          <Button variant="ghost" className="text-white hover:text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Welcome */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">Bem-vindo de volta!</h1>
          <p className="text-gray-400">Área exclusiva para membros</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gray-900 border-gray-800 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">7</div>
            <div className="text-sm text-gray-400">Dias de Sequência</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">24</div>
            <div className="text-sm text-gray-400">Treinos Completos</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">-3kg</div>
            <div className="text-sm text-gray-400">Progresso</div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <div className="text-sm text-gray-400">Badges</div>
          </Card>
        </div>

        {/* Main Menu */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <TrendingUp className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Dashboard</h3>
              <p className="text-gray-400 text-sm">
                Acompanhe seu progresso diário e evolução
              </p>
            </Card>
          </Link>

          <Link href="/treinos">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <Dumbbell className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Meus Treinos</h3>
              <p className="text-gray-400 text-sm">
                Acesse seus treinos personalizados pela IA
              </p>
            </Card>
          </Link>

          <Link href="/receitas">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <Award className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Receitas</h3>
              <p className="text-gray-400 text-sm">
                Receitas fitness personalizadas para você
              </p>
            </Card>
          </Link>

          <Link href="/exercicios">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <Settings className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Exercícios</h3>
              <p className="text-gray-400 text-sm">
                Biblioteca completa com demonstrações
              </p>
            </Card>
          </Link>

          <Link href="/calorias">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <User className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Contador de Calorias</h3>
              <p className="text-gray-400 text-sm">
                Tire foto e calcule calorias automaticamente
              </p>
            </Card>
          </Link>

          <Link href="/contato">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-red-600 transition-all cursor-pointer group">
              <Settings className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Suporte</h3>
              <p className="text-gray-400 text-sm">
                Entre em contato com nossa equipe
              </p>
            </Card>
          </Link>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-12 bg-gradient-to-r from-red-600 to-red-800 border-0 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Upgrade para Premium</h3>
              <p className="text-white opacity-90">
                Desbloqueie recursos exclusivos e acelere seus resultados
              </p>
            </div>
            <Link href="/vendas">
              <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
                Ver Planos
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
