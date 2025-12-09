'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Status = 'loading' | 'redirecting' | 'error';

export default function CheckoutRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const processCheckout = async () => {
      try {
        console.log('🚀 [REDIRECT] Iniciando processamento de checkout...');

        // ============================================
        // 1. OBTER PARÂMETROS DA URL
        // ============================================
        const nome = searchParams.get('nome');
        const email = searchParams.get('email');
        const plano = searchParams.get('plano');
        const valor = searchParams.get('valor');
        const userId = searchParams.get('userId');

        console.log('📥 [REDIRECT] Parâmetros recebidos:', {
          nome,
          email,
          plano,
          valor,
          userId
        });

        // ============================================
        // 2. VALIDAR PARÂMETROS OBRIGATÓRIOS
        // ============================================
        if (!nome || !email || !plano) {
          console.error('❌ [REDIRECT] Parâmetros obrigatórios faltando');
          setError('Dados incompletos. Por favor, volte e preencha o formulário novamente.');
          setStatus('error');
          return;
        }

        // ============================================
        // 3. CHAMAR API /api/checkout
        // ============================================
        console.log('📤 [REDIRECT] Enviando requisição para /api/checkout...');
        
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
            plano,
            valor: valor ? parseFloat(valor) : undefined,
            userId: userId || undefined,
          }),
        });

        console.log('📨 [REDIRECT] Resposta recebida:', {
          status: response.status,
          ok: response.ok
        });

        const data = await response.json();
        console.log('📦 [REDIRECT] Dados da resposta:', data);

        // ============================================
        // 4. VALIDAR RESPOSTA
        // ============================================
        if (!response.ok) {
          console.error('❌ [REDIRECT] Erro na resposta da API:', data);
          throw new Error(data.error || 'Erro ao processar pagamento');
        }

        if (!data.payment_url && !data.url) {
          console.error('❌ [REDIRECT] payment_url não recebido');
          throw new Error('URL de checkout não recebida');
        }

        const paymentUrl = data.payment_url || data.url;
        console.log('✅ [REDIRECT] payment_url recebido:', paymentUrl);

        // ============================================
        // 5. ATUALIZAR STATUS PARA REDIRECTING
        // ============================================
        setStatus('redirecting');
        console.log('🔄 [REDIRECT] Status atualizado para: redirecting');

        // Aguardar um momento para mostrar mensagem
        await new Promise(resolve => setTimeout(resolve, 800));

        // ============================================
        // 6. REDIRECIONAR PARA STRIPE (TOP-LEVEL)
        // ============================================
        console.log('🚀 [REDIRECT] Iniciando redirecionamento para Stripe...');

        // Estratégia 1: Tentar window.top.location.href (melhor para iframes)
        try {
          if (window.top && window.top !== window) {
            console.log('📍 [REDIRECT] Redirecionando via window.top.location.href...');
            window.top.location.href = paymentUrl;
            return;
          }
        } catch (topError) {
          console.warn('⚠️ [REDIRECT] window.top bloqueado:', topError);
        }

        // Estratégia 2: Fallback para window.location.replace
        console.log('📍 [REDIRECT] Redirecionando via window.location.replace...');
        window.location.replace(paymentUrl);

        // Aguardar redirecionamento
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Se chegou aqui, o redirecionamento pode ter falhado
        console.warn('⚠️ [REDIRECT] Redirecionamento pode ter sido bloqueado');
        setError('Redirecionamento bloqueado pelo navegador. Clique no botão abaixo para continuar manualmente.');
        setStatus('error');

      } catch (err: any) {
        console.error('❌ [REDIRECT] Erro no processamento:', {
          message: err.message,
          stack: err.stack
        });
        setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
        setStatus('error');
      }
    };

    processCheckout();
  }, [searchParams]);

  // ============================================
  // RENDERIZAÇÃO - ESTADO DE ERRO
  // ============================================
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full bg-gray-800 border-gray-700 p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600/20 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-4">
            Erro ao Processar Pagamento
          </h1>

          <p className="text-gray-300 text-center mb-6">
            {error}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar e Tentar Novamente
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              Recarregar Página
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Se o problema persistir, entre em contato com o suporte.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // ============================================
  // RENDERIZAÇÃO - ESTADO DE LOADING/REDIRECTING
  // ============================================
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full bg-gray-800 border-gray-700 p-8">
        <div className="flex justify-center mb-6">
          {status === 'loading' ? (
            <Loader2 className="w-16 h-16 text-red-600 animate-spin" />
          ) : (
            <div className="bg-green-600/20 p-4 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-500 animate-pulse" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-4">
          {status === 'loading' ? 'Processando Pagamento...' : 'Redirecionando...'}
        </h1>

        <p className="text-gray-300 text-center mb-6">
          {status === 'loading' 
            ? 'Estamos preparando seu checkout seguro na Stripe...'
            : 'Você será levado para a página segura da Stripe em instantes...'
          }
        </p>

        <Card className="bg-gray-900 border-gray-700 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300 font-medium mb-1">
                Pagamento 100% Seguro
              </p>
              <p className="text-xs text-gray-400">
                Seus dados são protegidos pela Stripe, líder mundial em pagamentos online.
              </p>
            </div>
          </div>
        </Card>

        {/* Animação de loading */}
        <div className="flex justify-center space-x-2">
          <div 
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Aguarde enquanto preparamos tudo para você...
          </p>
        </div>
      </Card>
    </div>
  );
}
