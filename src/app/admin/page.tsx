'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/custom/navbar';
import { 
  Dumbbell, 
  Image as ImageIcon, 
  Utensils, 
  DollarSign, 
  Users, 
  MessageSquare,
  Plus,
  Upload,
  Save,
  BarChart3,
  Settings,
  Send,
  X,
  Check,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

type TabType = 'exercicios' | 'gifs' | 'receitas' | 'precos' | 'relatorios' | 'mensagens';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('exercicios');

  // Estados para Exercícios
  const [exercicio, setExercicio] = useState({
    nome: '',
    categoria: '',
    musculo: '',
    descricao: '',
    gifUrl: ''
  });

  // Estados para GIFs
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [gifPreview, setGifPreview] = useState<string>('');

  // Estados para Receitas
  const [receita, setReceita] = useState({
    nome: '',
    categoria: '',
    ingredientes: '',
    preparo: '',
    calorias: '',
    proteina: '',
    carboidratos: '',
    gordura: '',
    imagemUrl: ''
  });

  // Estados para Preços
  const [precos, setPrecos] = useState({
    mensal: '29',
    trimestral: '49',
    anual: '29'
  });

  // Estados para Mensagens
  const [mensagem, setMensagem] = useState({
    titulo: '',
    conteudo: '',
    destinatarios: 'todos'
  });

  const handleGifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGifFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGifPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveExercicio = () => {
    console.log('Salvando exercício:', exercicio);
    alert('Exercício adicionado com sucesso!');
    setExercicio({
      nome: '',
      categoria: '',
      musculo: '',
      descricao: '',
      gifUrl: ''
    });
  };

  const handleSaveReceita = () => {
    console.log('Salvando receita:', receita);
    alert('Receita adicionada com sucesso!');
    setReceita({
      nome: '',
      categoria: '',
      ingredientes: '',
      preparo: '',
      calorias: '',
      proteina: '',
      carboidratos: '',
      gordura: '',
      imagemUrl: ''
    });
  };

  const handleSavePrecos = () => {
    console.log('Salvando preços:', precos);
    alert('Preços atualizados com sucesso!');
  };

  const handleSendMensagem = () => {
    console.log('Enviando mensagem:', mensagem);
    alert('Mensagem enviada com sucesso!');
    setMensagem({
      titulo: '',
      conteudo: '',
      destinatarios: 'todos'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Painel <span className="text-red-600">Administrativo</span>
            </h1>
            <p className="text-gray-400">Gerencie todo o conteúdo da plataforma</p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
            <Button
              onClick={() => setActiveTab('exercicios')}
              variant={activeTab === 'exercicios' ? 'default' : 'outline'}
              className={activeTab === 'exercicios' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              Exercícios
            </Button>
            <Button
              onClick={() => setActiveTab('gifs')}
              variant={activeTab === 'gifs' ? 'default' : 'outline'}
              className={activeTab === 'gifs' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              GIFs
            </Button>
            <Button
              onClick={() => setActiveTab('receitas')}
              variant={activeTab === 'receitas' ? 'default' : 'outline'}
              className={activeTab === 'receitas' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <Utensils className="w-4 h-4 mr-2" />
              Receitas
            </Button>
            <Button
              onClick={() => setActiveTab('precos')}
              variant={activeTab === 'precos' ? 'default' : 'outline'}
              className={activeTab === 'precos' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Preços
            </Button>
            <Button
              onClick={() => setActiveTab('relatorios')}
              variant={activeTab === 'relatorios' ? 'default' : 'outline'}
              className={activeTab === 'relatorios' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button
              onClick={() => setActiveTab('mensagens')}
              variant={activeTab === 'mensagens' ? 'default' : 'outline'}
              className={activeTab === 'mensagens' ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 hover:bg-gray-900'}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensagens
            </Button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Adicionar Exercícios */}
            {activeTab === 'exercicios' && (
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Adicionar Novo Exercício</h2>
                      <p className="text-gray-400 text-sm">Preencha os dados do exercício</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome">Nome do Exercício</Label>
                        <Input
                          id="nome"
                          value={exercicio.nome}
                          onChange={(e) => setExercicio({...exercicio, nome: e.target.value})}
                          placeholder="Ex: Supino Reto"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div>
                        <Label htmlFor="categoria">Categoria</Label>
                        <select
                          id="categoria"
                          value={exercicio.categoria}
                          onChange={(e) => setExercicio({...exercicio, categoria: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                        >
                          <option value="">Selecione...</option>
                          <option value="peito">Peito</option>
                          <option value="costas">Costas</option>
                          <option value="pernas">Pernas</option>
                          <option value="ombros">Ombros</option>
                          <option value="bracos">Braços</option>
                          <option value="abdomen">Abdômen</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="musculo">Músculo Principal</Label>
                        <Input
                          id="musculo"
                          value={exercicio.musculo}
                          onChange={(e) => setExercicio({...exercicio, musculo: e.target.value})}
                          placeholder="Ex: Peitoral Maior"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="descricao">Descrição / Instruções</Label>
                        <Textarea
                          id="descricao"
                          value={exercicio.descricao}
                          onChange={(e) => setExercicio({...exercicio, descricao: e.target.value})}
                          placeholder="Descreva como executar o exercício..."
                          rows={6}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gifUrl">URL do GIF</Label>
                        <Input
                          id="gifUrl"
                          value={exercicio.gifUrl}
                          onChange={(e) => setExercicio({...exercicio, gifUrl: e.target.value})}
                          placeholder="https://..."
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button onClick={handleSaveExercicio} className="bg-red-600 hover:bg-red-700">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Exercício
                    </Button>
                    <Button variant="outline" className="border-gray-700">
                      <X className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                </Card>

                {/* Lista de Exercícios */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Exercícios Cadastrados</h3>
                  <div className="space-y-3">
                    {['Supino Reto', 'Agachamento Livre', 'Remada Curvada', 'Desenvolvimento'].map((ex, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Dumbbell className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-semibold">{ex}</p>
                            <p className="text-sm text-gray-400">Peito • Peitoral Maior</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Upload de GIFs */}
            {activeTab === 'gifs' && (
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Upload de GIFs</h2>
                    <p className="text-gray-400 text-sm">Faça upload de GIFs demonstrativos</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-red-600 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".gif,image/gif"
                      onChange={handleGifUpload}
                      className="hidden"
                      id="gif-upload"
                    />
                    <label htmlFor="gif-upload" className="cursor-pointer">
                      <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">Clique para fazer upload</p>
                      <p className="text-sm text-gray-400">ou arraste e solte o arquivo GIF aqui</p>
                      <p className="text-xs text-gray-500 mt-2">Tamanho máximo: 10MB</p>
                    </label>
                  </div>

                  {gifPreview && (
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-2">Preview:</p>
                        <img src={gifPreview} alt="Preview" className="max-w-md mx-auto rounded-lg" />
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Upload className="w-4 h-4 mr-2" />
                          Fazer Upload
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-gray-700"
                          onClick={() => {
                            setGifFile(null);
                            setGifPreview('');
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-3 text-center">
                        <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-400">exercicio_{i}.gif</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Criar Receitas */}
            {activeTab === 'receitas' && (
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Adicionar Nova Receita</h2>
                    <p className="text-gray-400 text-sm">Crie receitas fitness para os usuários</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="receita-nome">Nome da Receita</Label>
                      <Input
                        id="receita-nome"
                        value={receita.nome}
                        onChange={(e) => setReceita({...receita, nome: e.target.value})}
                        placeholder="Ex: Omelete Proteica"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div>
                      <Label htmlFor="receita-categoria">Categoria</Label>
                      <select
                        id="receita-categoria"
                        value={receita.categoria}
                        onChange={(e) => setReceita({...receita, categoria: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                      >
                        <option value="">Selecione...</option>
                        <option value="cafe">Café da Manhã</option>
                        <option value="almoco">Almoço</option>
                        <option value="jantar">Jantar</option>
                        <option value="pre-treino">Pré-Treino</option>
                        <option value="sobremesa">Sobremesa</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="ingredientes">Ingredientes</Label>
                      <Textarea
                        id="ingredientes"
                        value={receita.ingredientes}
                        onChange={(e) => setReceita({...receita, ingredientes: e.target.value})}
                        placeholder="Liste os ingredientes..."
                        rows={4}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preparo">Modo de Preparo</Label>
                      <Textarea
                        id="preparo"
                        value={receita.preparo}
                        onChange={(e) => setReceita({...receita, preparo: e.target.value})}
                        placeholder="Descreva o passo a passo..."
                        rows={4}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="imagem-url">URL da Imagem</Label>
                      <Input
                        id="imagem-url"
                        value={receita.imagemUrl}
                        onChange={(e) => setReceita({...receita, imagemUrl: e.target.value})}
                        placeholder="https://..."
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="font-semibold mb-3">Informações Nutricionais</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="calorias" className="text-xs">Calorias (kcal)</Label>
                          <Input
                            id="calorias"
                            type="number"
                            value={receita.calorias}
                            onChange={(e) => setReceita({...receita, calorias: e.target.value})}
                            placeholder="350"
                            className="bg-gray-900 border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="proteina" className="text-xs">Proteína (g)</Label>
                          <Input
                            id="proteina"
                            type="number"
                            value={receita.proteina}
                            onChange={(e) => setReceita({...receita, proteina: e.target.value})}
                            placeholder="30"
                            className="bg-gray-900 border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="carboidratos" className="text-xs">Carboidratos (g)</Label>
                          <Input
                            id="carboidratos"
                            type="number"
                            value={receita.carboidratos}
                            onChange={(e) => setReceita({...receita, carboidratos: e.target.value})}
                            placeholder="25"
                            className="bg-gray-900 border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="gordura" className="text-xs">Gordura (g)</Label>
                          <Input
                            id="gordura"
                            type="number"
                            value={receita.gordura}
                            onChange={(e) => setReceita({...receita, gordura: e.target.value})}
                            placeholder="15"
                            className="bg-gray-900 border-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button onClick={handleSaveReceita} className="bg-red-600 hover:bg-red-700">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Receita
                  </Button>
                  <Button variant="outline" className="border-gray-700">
                    <X className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                </div>
              </Card>
            )}

            {/* Editar Preços */}
            {activeTab === 'precos' && (
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Editar Preços dos Planos</h2>
                    <p className="text-gray-400 text-sm">Atualize os valores de assinatura</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800 border-gray-700 p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold mb-2">Plano Mensal</h3>
                      <p className="text-sm text-gray-400">Renovação mensal</p>
                    </div>
                    <div>
                      <Label htmlFor="preco-mensal">Preço (R$)</Label>
                      <Input
                        id="preco-mensal"
                        type="number"
                        value={precos.mensal}
                        onChange={(e) => setPrecos({...precos, mensal: e.target.value})}
                        className="bg-gray-900 border-gray-700 text-2xl font-bold text-center"
                      />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        R$ {(parseFloat(precos.mensal) / 30).toFixed(2)}/dia
                      </p>
                    </div>
                  </Card>

                  <Card className="bg-gray-800 border-red-600 p-6 ring-2 ring-red-600">
                    <div className="text-center mb-4">
                      <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                        MAIS POPULAR
                      </div>
                      <h3 className="text-xl font-bold mb-2">Plano Trimestral</h3>
                      <p className="text-sm text-gray-400">3 meses</p>
                    </div>
                    <div>
                      <Label htmlFor="preco-trimestral">Preço/mês (R$)</Label>
                      <Input
                        id="preco-trimestral"
                        type="number"
                        value={precos.trimestral}
                        onChange={(e) => setPrecos({...precos, trimestral: e.target.value})}
                        className="bg-gray-900 border-gray-700 text-2xl font-bold text-center"
                      />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Total: R$ {(parseFloat(precos.trimestral) * 3).toFixed(2)}
                      </p>
                    </div>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold mb-2">Plano Anual</h3>
                      <p className="text-sm text-gray-400">12 meses</p>
                    </div>
                    <div>
                      <Label htmlFor="preco-anual">Preço/mês (R$)</Label>
                      <Input
                        id="preco-anual"
                        type="number"
                        value={precos.anual}
                        onChange={(e) => setPrecos({...precos, anual: e.target.value})}
                        className="bg-gray-900 border-gray-700 text-2xl font-bold text-center"
                      />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Total: R$ {(parseFloat(precos.anual) * 12).toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="mt-6">
                  <Button onClick={handleSavePrecos} className="bg-red-600 hover:bg-red-700">
                    <Save className="w-4 h-4 mr-2" />
                    Atualizar Preços
                  </Button>
                </div>
              </Card>
            )}

            {/* Relatórios de Usuários */}
            {activeTab === 'relatorios' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-red-600 to-red-700 border-red-500 p-6">
                    <Users className="w-8 h-8 mb-3" />
                    <p className="text-3xl font-bold mb-1">10,847</p>
                    <p className="text-sm text-red-100">Usuários Ativos</p>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500 p-6">
                    <DollarSign className="w-8 h-8 mb-3" />
                    <p className="text-3xl font-bold mb-1">R$ 487k</p>
                    <p className="text-sm text-green-100">Receita Mensal</p>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 p-6">
                    <BarChart3 className="w-8 h-8 mb-3" />
                    <p className="text-3xl font-bold mb-1">94.2%</p>
                    <p className="text-sm text-blue-100">Taxa de Retenção</p>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500 p-6">
                    <Check className="w-8 h-8 mb-3" />
                    <p className="text-3xl font-bold mb-1">8,234</p>
                    <p className="text-sm text-purple-100">Treinos Concluídos</p>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Usuários Recentes</h3>
                  <div className="space-y-3">
                    {[
                      { nome: 'João Silva', email: 'joao@email.com', plano: 'Trimestral', status: 'Ativo' },
                      { nome: 'Maria Santos', email: 'maria@email.com', plano: 'Anual', status: 'Ativo' },
                      { nome: 'Pedro Costa', email: 'pedro@email.com', plano: 'Mensal', status: 'Ativo' },
                      { nome: 'Ana Oliveira', email: 'ana@email.com', plano: 'Trimestral', status: 'Ativo' },
                      { nome: 'Carlos Souza', email: 'carlos@email.com', plano: 'Anual', status: 'Ativo' }
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold">
                            {user.nome[0]}
                          </div>
                          <div>
                            <p className="font-semibold">{user.nome}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold">{user.plano}</p>
                            <p className="text-xs text-green-500">{user.status}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Estatísticas de Uso</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Funcionalidades Mais Usadas</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Treinos Personalizados</span>
                          <span className="font-bold text-red-600">8,234</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Contador de Calorias</span>
                          <span className="font-bold text-red-600">6,891</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Receitas Fitness</span>
                          <span className="font-bold text-red-600">5,432</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Planos Mais Populares</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Trimestral</span>
                          <span className="font-bold text-red-600">52%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Anual</span>
                          <span className="font-bold text-red-600">31%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span className="text-sm">Mensal</span>
                          <span className="font-bold text-red-600">17%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Enviar Mensagens */}
            {activeTab === 'mensagens' && (
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Enviar Mensagem aos Assinantes</h2>
                    <p className="text-gray-400 text-sm">Comunique-se com seus usuários</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="destinatarios">Destinatários</Label>
                    <select
                      id="destinatarios"
                      value={mensagem.destinatarios}
                      onChange={(e) => setMensagem({...mensagem, destinatarios: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                    >
                      <option value="todos">Todos os Usuários</option>
                      <option value="ativos">Apenas Ativos</option>
                      <option value="mensal">Plano Mensal</option>
                      <option value="trimestral">Plano Trimestral</option>
                      <option value="anual">Plano Anual</option>
                      <option value="inativos">Usuários Inativos</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="titulo">Título da Mensagem</Label>
                    <Input
                      id="titulo"
                      value={mensagem.titulo}
                      onChange={(e) => setMensagem({...mensagem, titulo: e.target.value})}
                      placeholder="Ex: Nova Funcionalidade Disponível!"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div>
                    <Label htmlFor="conteudo">Conteúdo da Mensagem</Label>
                    <Textarea
                      id="conteudo"
                      value={mensagem.conteudo}
                      onChange={(e) => setMensagem({...mensagem, conteudo: e.target.value})}
                      placeholder="Escreva sua mensagem aqui..."
                      rows={8}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2">Preview da Mensagem:</p>
                    <div className="bg-gray-900 rounded p-4">
                      <p className="font-bold mb-2">{mensagem.titulo || 'Título da mensagem'}</p>
                      <p className="text-sm text-gray-400">{mensagem.conteudo || 'Conteúdo da mensagem aparecerá aqui...'}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSendMensagem} className="bg-red-600 hover:bg-red-700">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <Button variant="outline" className="border-gray-700">
                      <X className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>

                  <div className="border-t border-gray-800 pt-6 mt-6">
                    <h3 className="font-bold mb-4">Mensagens Enviadas Recentemente</h3>
                    <div className="space-y-3">
                      {[
                        { titulo: 'Novas Receitas Adicionadas', data: '08/12/2024', destinatarios: 'Todos' },
                        { titulo: 'Atualização do Sistema', data: '05/12/2024', destinatarios: 'Ativos' },
                        { titulo: 'Promoção Especial', data: '01/12/2024', destinatarios: 'Plano Mensal' }
                      ].map((msg, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-semibold">{msg.titulo}</p>
                            <p className="text-sm text-gray-400">{msg.destinatarios} • {msg.data}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
