'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Crown, 
  Shield, 
  Sparkles, 
  Zap,
  Loader2,
  User,
  Mail,
  IdCard
} from 'lucide-react';
import { Card } from '@/components/ui/card';

// ============================================
// TIPOS E INTERFACES
// ============================================
interface FormData {
  nome: string;
  email: string;
  cpf: string;
  numeroCartao: string;
  validade: string;
  cvv: string;
  plano: 'basico' | 'premium' | 'empresarial';
}

interface Plano {
  nome: string;
  preco: number;
  precoFormatado: string;
  descricao: string;
  features: string[];
  popular?: boolean;
  desconto?: string;
  icon: React.ReactNode;
}

// ============================================
// CONFIGURAÇÃO DOS PLANOS
// ============================================
const PLANOS: Record<string, Plano> = {
  basico: {
    nome: 'Básico',
    preco: 29.90,
    precoFormatado: 'R$ 29,90',
    descricao: 'Ideal para começar',
    features: [
      'Acesso básico à plataforma',
      'Suporte por email',
      '1 usuário',
      'Atualizações mensais'
    ],
    icon: <Shield className="w-6 h-6" />
  },
  premium: {
    nome: 'Premium',
    preco: 49.90,
    precoFormatado: 'R$ 49,90',
    descricao: 'Mais popular',
    features: [
      'Acesso completo à plataforma',
      'Suporte prioritário 24/7',
      'Até 5 usuários',
      'Recursos avançados',
      'Relatórios detalhados',
      'Integrações ilimitadas'
    ],
    popular: true,
    desconto: '20% OFF',
    icon: <Crown className="w-6 h-6" />
  },
  empresarial: {
    nome: 'Empresarial',
    preco: 99.90,
    precoFormatado: 'R$ 99,90',
    descricao: 'Para grandes equipes',
    features: [
      'Acesso ilimitado',
      'Suporte dedicado 24/7',
      'Usuários ilimitados',
      'API dedicada',
      'Customização completa',
      'Treinamento personalizado',
      'SLA garantido'
    ],
    icon: <Sparkles className="w-6 h-6" />
  }
};

// ============================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================
const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return value;
};

const formatCardNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const formatValidade = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length >= 2) {
    return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
  }
  return numbers;
};

const formatCVV = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4);
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cpf: '',
    numeroCartao: '',
    validade: '',
    cvv: '',
    plano: 'premium'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formatação específica
    switch (name) {
      case 'cpf':
        formattedValue = formatCPF(value);
        break;
      case 'numeroCartao':
        formattedValue = formatCardNumber(value);
        break;
      case 'validade':
        formattedValue = formatValidade(value);
        break;
      case 'cvv':
        formattedValue = formatCVV(value);
        break;
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Limpar erro do campo
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Validar nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar CPF
    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (!cpfNumbers) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (cpfNumbers.length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }

    // Validar número do cartão
    const cardNumbers = formData.numeroCartao.replace(/\D/g, '');
    if (!cardNumbers) {
      newErrors.numeroCartao = 'Número do cartão é obrigatório';
    } else if (cardNumbers.length < 13 || cardNumbers.length > 19) {
      newErrors.numeroCartao = 'Número do cartão inválido';
    }

    // Validar validade
    const validadeNumbers = formData.validade.replace(/\D/g, '');
    if (!validadeNumbers) {
      newErrors.validade = 'Validade é obrigatória';
    } else if (validadeNumbers.length !== 4) {
      newErrors.validade = 'Validade inválida (MM/AA)';
    }

    // Validar CVV
    const cvvNumbers = formData.cvv.replace(/\D/g, '');
    if (!cvvNumbers) {
      newErrors.cvv = 'CVV é obrigatório';
    } else if (cvvNumbers.length < 3 || cvvNumbers.length > 4) {
      newErrors.cvv = 'CVV inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('📝 [CHECKOUT] Iniciando validação do formulário...');

    if (!validateForm()) {
      console.error('❌ [CHECKOUT] Validação falhou:', errors);
      return;
    }

    console.log('✅ [CHECKOUT] Formulário válido, iniciando redirecionamento...');
    setLoading(true);

    // Preparar dados para envio
    const planoSelecionado = PLANOS[formData.plano];
    
    const params = new URLSearchParams({
      nome: formData.nome,
      email: formData.email,
      plano: formData.plano,
      valor: planoSelecionado.preco.toString(),
      userId: 'guest' // Pode ser substituído por ID real do usuário
    });

    console.log('📤 [CHECKOUT] Redirecionando para /checkout-redirect com params:', {
      nome: formData.nome,
      email: formData.email,
      plano: formData.plano,
      valor: planoSelecionado.preco
    });

    // Redirecionar para página intermediária
    router.push(`/checkout-redirect?${params.toString()}`);
  };

  const planoSelecionado = PLANOS[formData.plano];

  // ============================================
  // RENDERIZAÇÃO
  // ============================================
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-4 rounded-full">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Escolha Seu Plano
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Selecione o plano ideal e comece a transformar seu negócio hoje mesmo
          </p>
        </div>

        {/* Cards dos Planos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(PLANOS).map(([key, plano]) => (
            <Card
              key={key}
              className={`relative bg-gray-900 border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                formData.plano === key 
                  ? 'border-red-600 shadow-2xl shadow-red-600/20' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, plano: key as any }))}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    MAIS POPULAR
                  </div>
                </div>
              )}

              {plano.desconto && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {plano.desconto}
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600/20 p-2 rounded-lg text-red-600">
                    {plano.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plano.nome}</h3>
                    <p className="text-sm text-gray-400">{plano.descricao}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {plano.precoFormatado.split(',')[0]}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      ,{plano.precoFormatado.split(',')[1]}
                    </span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Total: {plano.precoFormatado} mensais
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plano.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {formData.plano === key && (
                  <div className="bg-red-600/10 border border-red-600 rounded-lg p-3 text-center">
                    <p className="text-red-600 font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Plano Selecionado
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Formulário de Pagamento */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 p-2 rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Informações de Pagamento
                </h2>
                <p className="text-sm text-gray-400">
                  Preencha os dados para finalizar sua assinatura
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    errors.nome ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="João Silva"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="joao@exemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* CPF */}
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-2">
                  <IdCard className="w-4 h-4 inline mr-2" />
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  maxLength={14}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    errors.cpf ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="000.000.000-00"
                />
                {errors.cpf && (
                  <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>
                )}
              </div>

              {/* Número do Cartão */}
              <div>
                <label htmlFor="numeroCartao" className="block text-sm font-medium text-gray-300 mb-2">
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Número do Cartão
                </label>
                <input
                  type="text"
                  id="numeroCartao"
                  name="numeroCartao"
                  value={formData.numeroCartao}
                  onChange={handleChange}
                  maxLength={19}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    errors.numeroCartao ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="0000 0000 0000 0000"
                />
                {errors.numeroCartao && (
                  <p className="mt-1 text-sm text-red-500">{errors.numeroCartao}</p>
                )}
              </div>

              {/* Validade e CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="validade" className="block text-sm font-medium text-gray-300 mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    id="validade"
                    name="validade"
                    value={formData.validade}
                    onChange={handleChange}
                    maxLength={5}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      errors.validade ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="MM/AA"
                  />
                  {errors.validade && (
                    <p className="mt-1 text-sm text-red-500">{errors.validade}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength={4}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      errors.cvv ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="123"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Resumo do Plano */}
              <Card className="bg-gray-800 border-gray-700 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Plano Selecionado:</span>
                  <span className="text-white font-bold">{planoSelecionado.nome}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Valor Mensal:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {planoSelecionado.precoFormatado}
                  </span>
                </div>
              </Card>

              {/* Aviso de Segurança */}
              <Card className="bg-blue-900/20 border-blue-800 p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-300 font-medium mb-1">
                      Pagamento 100% Seguro
                    </p>
                    <p className="text-xs text-blue-400">
                      Seus dados são criptografados e protegidos pela Stripe, líder mundial em segurança de pagamentos online.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Botão de Submissão */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-red-700 focus:ring-4 focus:ring-red-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Assinar Agora
                  </>
                )}
              </button>
            </form>

            {/* Footer de Segurança */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Dados Protegidos</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Stripe Verified</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
