'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

export default function CheckoutRedirectPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');

  useEffect(() => {
    const processCheckout = async () => {
      try {
        // Obter parâmetros da URL
        const nome = searchParams.get('nome');
        const email = searchParams.get('email');
        const plano = searchParams.get('plano');

        // Validar parâmetros
        if (!nome || !email || !plano) {
          setError('Dados incompletos. Por favor, volte e preencha o formulário novamente.');
          setStatus('error');
          return;
        }

        console.log('📤 Enviando dados para API:', { nome, email, plano });

        // Fazer requisição para API
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
            plano,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao processar pagamento');
        }

        if (!data.url) {
          throw new Error('URL de checkout não recebida');
        }

        console.log('✅ URL recebida:', data.url);
        setStatus('redirecting');

        // Aguardar um momento para mostrar mensagem
        await new Promise(resolve => setTimeout(resolve, 500));

        // Tentar redirecionar no top-level (fora de iframe)
        try {
          if (window.top) {
            console.log('🚀 Redirecionando via window.top...');
            window.top.location.assign(data.url);
          } else {
            throw new Error('window.top não disponível');
          }
        } catch (topError) {
          // Fallback: redirecionar na janela atual
          console.log('🔄 Fallback: redirecionando via window.location...');
          window.location.assign(data.url);
        }

        // Aguardar redirecionamento
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Se chegou aqui, o redirecionamento pode ter falhado
        console.warn('⚠️ Redirecionamento pode ter sido bloqueado');
        setError('Redirecionamento bloqueado. Clique no botão abaixo para continuar.');
        setStatus('error');

      } catch (err: any) {
        console.error('❌ Erro no checkout:', err);
        setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
        setStatus('error');
      }
    };

    processCheckout();
  }, [searchParams]);

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Ops! Algo deu errado
          </h1>

          <p className="text-gray-600 text-center mb-6">
            {error}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Voltar ao Checkout
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {status === 'loading' ? 'Processando...' : 'Redirecionando...'}
        </h1>

        <p className="text-gray-600 text-center mb-6">
          {status === 'loading' 
            ? 'Estamos preparando seu checkout seguro...'
            : 'Você será redirecionado para a página de pagamento da Stripe em instantes...'
          }
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            🔒 Aguarde enquanto preparamos seu pagamento seguro
          </p>
        </div>

        {/* Animação de loading */}
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
