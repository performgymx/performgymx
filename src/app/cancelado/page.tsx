'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CanceladoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <XCircle className="w-16 h-16 text-orange-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Pagamento Cancelado
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">
            💡 Seus dados foram salvos. Você pode tentar novamente quando quiser.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-indigo-700 transition-all"
          >
            Tentar Novamente
          </Link>

          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-300 transition-all"
          >
            Voltar para Home
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Precisa de ajuda? Entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
