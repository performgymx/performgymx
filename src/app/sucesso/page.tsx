'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SucessoPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('session_id');
    setSessionId(id);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Pagamento Confirmado! 🎉
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
        </p>

        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 text-center">
              ID da Transação:
            </p>
            <p className="text-xs text-gray-800 font-mono text-center break-all mt-1">
              {sessionId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-indigo-700 transition-all"
          >
            Voltar para Home
          </Link>

          <button
            onClick={() => window.print()}
            className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Imprimir Comprovante
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Dúvidas? Entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
