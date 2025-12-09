import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializar Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// Mapeamento de planos para valores (em centavos)
const PLANOS = {
  basico: 2990,    // R$ 29,90
  premium: 4990,   // R$ 49,90
  empresarial: 9990 // R$ 99,90
};

export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body = await request.json();
    const { email, plano, nome } = body;

    // Validações
    if (!email || !plano || !nome) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: email, plano, nome' },
        { status: 400 }
      );
    }

    // Validar se o plano existe
    if (!PLANOS[plano as keyof typeof PLANOS]) {
      return NextResponse.json(
        { error: 'Plano inválido. Escolha: basico, premium ou empresarial' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Obter valor do plano
    const valor = PLANOS[plano as keyof typeof PLANOS];

    // Base URL para redirecionamentos
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    console.log('🚀 Criando sessão Stripe:', {
      email,
      plano,
      valor,
      nome,
      baseUrl
    });

    // Criar sessão de checkout na Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Plano ${plano.charAt(0).toUpperCase() + plano.slice(1)}`,
              description: `Assinatura mensal - ${nome}`,
            },
            unit_amount: valor,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelado`,
      metadata: {
        nome,
        plano,
      },
    });

    console.log('✅ Sessão criada com sucesso:', {
      sessionId: session.id,
      url: session.url
    });

    // Retornar URL da sessão
    return NextResponse.json({
      url: session.url,
      sessionId: session.id
    });

  } catch (error: any) {
    console.error('❌ Erro ao criar sessão Stripe:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao processar pagamento',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
