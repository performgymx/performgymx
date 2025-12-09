import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ============================================
// CONFIGURAÇÃO DA STRIPE
// ============================================
// Inicializar Stripe com a chave secreta
// PRODUÇÃO: Configure STRIPE_SECRET_KEY=sk_live_... no .env.local
// TESTE: Configure STRIPE_SECRET_KEY=sk_test_... no .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// ============================================
// MAPEAMENTO DE PLANOS E VALORES
// ============================================
// Valores em centavos (BRL)
const PLANOS = {
  basico: {
    valor: 2990,    // R$ 29,90
    nome: 'Plano Básico',
    descricao: 'Acesso básico à plataforma'
  },
  premium: {
    valor: 4990,   // R$ 49,90
    nome: 'Plano Premium',
    descricao: 'Acesso completo com recursos avançados'
  },
  empresarial: {
    valor: 9990,   // R$ 99,90
    nome: 'Plano Empresarial',
    descricao: 'Solução completa para empresas'
  }
};

// ============================================
// ENDPOINT POST /api/checkout
// ============================================
export async function POST(request: NextRequest) {
  console.log('🚀 [CHECKOUT] Iniciando processamento de checkout...');
  
  try {
    // ============================================
    // 1. RECEBER E VALIDAR DADOS
    // ============================================
    const body = await request.json();
    console.log('📥 [CHECKOUT] Dados recebidos:', {
      nome: body.nome,
      email: body.email,
      plano: body.plano,
      valor: body.valor,
      userId: body.userId
    });

    const { nome, email, plano, valor, userId } = body;

    // Validar campos obrigatórios
    if (!nome || !email || !plano) {
      console.error('❌ [CHECKOUT] Campos obrigatórios faltando');
      return NextResponse.json(
        { 
          status: 'error',
          error: 'Campos obrigatórios: nome, email, plano' 
        },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ [CHECKOUT] Email inválido:', email);
      return NextResponse.json(
        { 
          status: 'error',
          error: 'Email inválido' 
        },
        { status: 400 }
      );
    }

    // Validar se o plano existe
    if (!PLANOS[plano as keyof typeof PLANOS]) {
      console.error('❌ [CHECKOUT] Plano inválido:', plano);
      return NextResponse.json(
        { 
          status: 'error',
          error: 'Plano inválido. Escolha: basico, premium ou empresarial' 
        },
        { status: 400 }
      );
    }

    // ============================================
    // 2. PREPARAR DADOS DO CHECKOUT
    // ============================================
    const planoInfo = PLANOS[plano as keyof typeof PLANOS];
    
    // Usar valor do plano (já em centavos) ou converter se vier do frontend
    const valorEmCentavos = valor ? Math.round(valor * 100) : planoInfo.valor;
    
    console.log('💰 [CHECKOUT] Valor calculado:', {
      plano: planoInfo.nome,
      valorOriginal: valor,
      valorEmCentavos,
      valorFormatado: `R$ ${(valorEmCentavos / 100).toFixed(2)}`
    });

    // ============================================
    // 3. CONFIGURAR URLs DE REDIRECIONAMENTO
    // ============================================
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.BASE_URL || 
                    process.env.NEXT_PUBLIC_API_URL || 
                    'http://localhost:3000';

    const successUrl = `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/cancelado`;

    console.log('🔗 [CHECKOUT] URLs configuradas:', {
      baseUrl,
      successUrl,
      cancelUrl
    });

    // ============================================
    // 4. CRIAR SESSÃO DE CHECKOUT NA STRIPE
    // ============================================
    console.log('🎫 [CHECKOUT] Criando sessão Stripe...');
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: planoInfo.nome,
              description: planoInfo.descricao,
            },
            unit_amount: valorEmCentavos,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        nome,
        email,
        plano,
        userId: userId || 'guest',
        valorOriginal: valor?.toString() || (valorEmCentavos / 100).toString(),
      },
    });

    console.log('✅ [CHECKOUT] Sessão criada com sucesso:', {
      sessionId: session.id,
      paymentUrl: session.url,
      amount: valorEmCentavos,
      currency: 'BRL'
    });

    // ============================================
    // 5. RETORNAR RESPOSTA COM payment_url
    // ============================================
    const response = {
      status: 'ok',
      payment_url: session.url,
      sessionId: session.id,
      amount: valorEmCentavos,
      currency: 'BRL'
    };

    console.log('📤 [CHECKOUT] Retornando resposta:', response);

    return NextResponse.json(response);

  } catch (error: any) {
    // ============================================
    // TRATAMENTO DE ERROS
    // ============================================
    console.error('❌ [CHECKOUT] Erro ao processar checkout:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        status: 'error',
        error: 'Erro ao processar pagamento. Tente novamente.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
