'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, type UserProfile } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, User, Target, Calendar, Clock, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ColetaDados() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [etapa, setEtapa] = useState(1)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    nome: '',
    email: '',
    idade: 0,
    nivel: 'iniciante',
    objetivo: '',
    dias_disponiveis: 3,
    tempo_por_treino: 60,
    restricoes: ''
  })

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const proximaEtapa = () => {
    if (etapa === 1 && (!formData.nome || !formData.email || !formData.idade)) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }
    if (etapa === 2 && !formData.nivel) {
      toast.error('Selecione seu nível de experiência')
      return
    }
    if (etapa === 3 && !formData.objetivo) {
      toast.error('Descreva seu objetivo')
      return
    }
    setEtapa(prev => prev + 1)
  }

  const etapaAnterior = () => {
    setEtapa(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([formData])
        .select()

      if (error) throw error

      toast.success('Dados salvos com sucesso! Gerando seu treino personalizado...')
      
      // Redirecionar para página de treinos após 2 segundos
      setTimeout(() => {
        router.push('/treinos')
      }, 2000)
    } catch (error: any) {
      console.error('Erro ao salvar dados:', error)
      toast.error('Erro ao salvar dados: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Monte Seu Treino Personalizado
          </h1>
          <p className="text-lg text-gray-600">
            Responda algumas perguntas para criarmos o treino perfeito para você
          </p>
        </div>

        {/* Indicador de Progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    etapa >= num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {etapa > num ? <CheckCircle2 className="w-6 h-6" /> : num}
                </div>
                {num < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      etapa > num ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Dados Pessoais</span>
            <span>Nível</span>
            <span>Objetivo</span>
            <span>Disponibilidade</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                {etapa === 1 && <><User className="w-5 h-5" /> Dados Pessoais</>}
                {etapa === 2 && <><Target className="w-5 h-5" /> Nível de Experiência</>}
                {etapa === 3 && <><Target className="w-5 h-5" /> Seu Objetivo</>}
                {etapa === 4 && <><Calendar className="w-5 h-5" /> Disponibilidade</>}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {etapa === 1 && 'Vamos começar com suas informações básicas'}
                {etapa === 2 && 'Qual é o seu nível de experiência com treinos?'}
                {etapa === 3 && 'O que você deseja alcançar?'}
                {etapa === 4 && 'Quanto tempo você tem disponível?'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Etapa 1: Dados Pessoais */}
              {etapa === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="nome" className="text-gray-700 font-semibold">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Digite seu nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="idade" className="text-gray-700 font-semibold">
                      Idade *
                    </Label>
                    <Input
                      id="idade"
                      type="number"
                      placeholder="Ex: 25"
                      value={formData.idade || ''}
                      onChange={(e) => handleInputChange('idade', parseInt(e.target.value))}
                      className="mt-1"
                      min="15"
                      max="100"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Etapa 2: Nível */}
              {etapa === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'iniciante', label: 'Iniciante', desc: 'Pouca ou nenhuma experiência' },
                      { value: 'intermediario', label: 'Intermediário', desc: '6 meses a 2 anos de treino' },
                      { value: 'avancado', label: 'Avançado', desc: 'Mais de 2 anos de treino' }
                    ].map((nivel) => (
                      <button
                        key={nivel.value}
                        type="button"
                        onClick={() => handleInputChange('nivel', nivel.value)}
                        className={`p-6 rounded-lg border-2 transition-all text-left ${
                          formData.nivel === nivel.value
                            ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <h3 className="font-bold text-lg text-black mb-1">{nivel.label}</h3>
                        <p className="text-sm text-gray-600">{nivel.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Etapa 3: Objetivo */}
              {etapa === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="objetivo" className="text-gray-700 font-semibold">
                      Qual é o seu principal objetivo? *
                    </Label>
                    <Textarea
                      id="objetivo"
                      placeholder="Ex: Ganhar massa muscular, perder peso, melhorar condicionamento..."
                      value={formData.objetivo}
                      onChange={(e) => handleInputChange('objetivo', e.target.value)}
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="restricoes" className="text-gray-700 font-semibold">
                      Possui alguma restrição ou lesão? (Opcional)
                    </Label>
                    <Textarea
                      id="restricoes"
                      placeholder="Ex: Dor no joelho, problema na coluna..."
                      value={formData.restricoes}
                      onChange={(e) => handleInputChange('restricoes', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Etapa 4: Disponibilidade */}
              {etapa === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="dias" className="text-gray-700 font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Quantos dias por semana você pode treinar?
                    </Label>
                    <div className="flex gap-2 mt-3">
                      {[2, 3, 4, 5, 6, 7].map((dia) => (
                        <button
                          key={dia}
                          type="button"
                          onClick={() => handleInputChange('dias_disponiveis', dia)}
                          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                            formData.dias_disponiveis === dia
                              ? 'bg-blue-600 text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {dia}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tempo" className="text-gray-700 font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Quanto tempo por treino? (minutos)
                    </Label>
                    <div className="flex gap-2 mt-3">
                      {[30, 45, 60, 90, 120].map((tempo) => (
                        <button
                          key={tempo}
                          type="button"
                          onClick={() => handleInputChange('tempo_por_treino', tempo)}
                          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                            formData.tempo_por_treino === tempo
                              ? 'bg-purple-600 text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tempo}min
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">
                        <strong>Resumo:</strong> Você treinará <strong>{formData.dias_disponiveis} dias por semana</strong>, 
                        com <strong>{formData.tempo_por_treino} minutos</strong> por sessão.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de Navegação */}
              <div className="flex gap-3 pt-4">
                {etapa > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={etapaAnterior}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                )}

                {etapa < 4 ? (
                  <Button
                    type="button"
                    onClick={proximaEtapa}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Finalizar e Gerar Treino
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
