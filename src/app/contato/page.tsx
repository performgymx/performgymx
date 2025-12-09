'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dumbbell, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">FitAI</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-red-600">
              Voltar ao Início
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Contato & <span className="text-red-600">Suporte</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Estamos aqui para ajudar você a alcançar seus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-gray-900 border-gray-800 p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-white">Envie sua mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Assunto</Label>
                    <Input
                      id="subject"
                      placeholder="Como podemos ajudar?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Descreva sua dúvida ou sugestão..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
                <h3 className="text-2xl font-bold mb-2 text-white">Mensagem Enviada!</h3>
                <p className="text-gray-400">
                  Obrigado pelo contato. Responderemos em breve.
                </p>
              </div>
            )}
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <Mail className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <p className="text-gray-400 mb-2">
                Resposta em até 24 horas
              </p>
              <a href="mailto:suporte@fitai.com" className="text-red-600 hover:text-red-500">
                suporte@fitai.com
              </a>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <MessageSquare className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Chat ao Vivo</h3>
              <p className="text-gray-400 mb-4">
                Disponível de segunda a sexta, 9h às 18h
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Iniciar Chat
              </Button>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Perguntas Frequentes</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Como funciona o plano personalizado?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Posso cancelar a qualquer momento?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Como a IA cria os treinos?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    → Funciona para iniciantes?
                  </Link>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Social Proof */}
        <Card className="mt-12 bg-gradient-to-r from-red-600 to-red-800 border-0 p-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-white">Suporte Premium</h3>
          <p className="text-white opacity-90 mb-6">
            Membros Premium têm acesso a suporte prioritário e coach dedicado
          </p>
          <Link href="/vendas">
            <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
              Conhecer Planos Premium
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
