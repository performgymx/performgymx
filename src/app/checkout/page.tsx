'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Check, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    plano: 'basico'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Informações dos planos
  const planos = {
    basico: {
      nome: 'Básico',
      preco: 'R$ 29,90',
      features: ['Acesso básico', 'Suporte por email', '1 usuário']
    },
    premium: {
      nome: 'Premium',
      preco: 'R$ 49,90',
      features: ['Acesso completo', 'Suporte prioritário', '5 usuários', 'Recursos avançados']
    },
    empresarial: {
      nome: 'Empresarial',
      preco: 'R$ 99,90',
      features: ['Acesso ilimitado', 'Suporte 24/7', 'Usuários ilimitados', 'API dedicada', 'Customização']
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.plano) {
      newErrors.plano = 'Selecione um plano';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Redirecionar para página intermediária com os dados
    const params = new URLSearchParams({
      nome: formData.nome,
      email: formData.email,
      plano: formData.plano
    });

    router.push(`/checkout-redirect?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Escolha seu Plano
          </h1>
          <p className="text-lg text-gray-600">
            Selecione o plano ideal para você e comece agora mesmo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Cards dos Planos */}
          {Object.entries(planos).map(([key, plano]) => (
            <div
              key={key}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 cursor-pointer hover:shadow-2xl ${
                formData.plano === key ? 'ring-4 ring-indigo-600 scale-105' : ''
              }`}
              onClick={() => setFormData(prev => ({ ...prev, plano: key }))}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plano.nome}
                </h3>
                <div className="text-4xl font-bold text-indigo-600 mb-4">
                  {plano.preco}
                  <span className="text-lg text-gray-500 font-normal">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plano.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {formData.plano === key && (
                <div className="text-center text-indigo-600 font-semibold">
                  ✓ Plano Selecionado
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Formulário */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informações de Pagamento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="João Silva"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="joao@exemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Plano Selecionado */}
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Plano Selecionado:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {planos[formData.plano as keyof typeof planos].nome}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">
                      {planos[formData.plano as keyof typeof planos].preco}
                    </p>
                    <p className="text-sm text-gray-600">por mês</p>
                  </div>
                </div>
              </div>

              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ Pagamento Seguro:</strong> Você será redirecionado para a página segura da Stripe para inserir os dados do cartão.
                </p>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Assinar Agora
                  </>
                )}
              </button>
            </form>

            {/* Segurança */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                🔒 Pagamento 100% seguro processado pela Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
