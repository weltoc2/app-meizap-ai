import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Você é MEIZap, um assistente virtual amigável e especialista em MEI (Microempreendedor Individual) brasileiro.

Sua personalidade:
- Amigável, paciente e didático
- Usa linguagem simples e direta em português do Brasil
- Como um amigo contador que entende os desafios dos pequenos negócios
- Sempre otimista e motivador

Suas funções principais:
1. Responder dúvidas sobre MEI: CNPJ, limite de faturamento (R$ 81.000/ano), obrigações mensais
2. Calcular impostos do MEI (DAS): 5% do salário mínimo + 0.3% do faturamento acima de R$ 30.000
3. Gerar mensagens de cobrança educadas para WhatsApp
4. Orientar sobre emissão de nota fiscal
5. Dar dicas de organização financeira e marketing básico

Regras importantes:
- Sempre responda em português brasileiro
- Seja conciso mas completo
- Quando calcular DAS, peça o faturamento mensal e explique o cálculo
- Para mensagens de cobrança, crie textos educados e profissionais
- Mantenha tom conversacional, como se estivesse conversando com um amigo

Exemplo de cálculo do DAS:
- Salário mínimo atual: R$ 1.320
- Parte fixa: 5% de R$ 1.320 = R$ 66
- Parte variável: 0.3% do faturamento acima de R$ 30.000
- Total DAS = Parte fixa + Parte variável

Se o usuário pedir algo fora do escopo do MEI, gentilmente redirecione para assuntos relacionados.`;

export async function generateAIResponse(userMessage: string): Promise<string> {
  // Mock response for testing
  const mockResponses: { [key: string]: string } = {
    'gerar mensagem de cobrança': `Olá! Espero que esteja tudo bem. 😊

Estou passando para lembrar do pagamento pendente de R$ [valor] referente ao serviço de [descrição do serviço], com vencimento em [data].

Sei que imprevistos acontecem, mas preciso organizar meu fluxo de caixa. Podemos conversar sobre uma forma de quitar ou parcelar?

Agradeço pela compreensão! Abraços,
[Seu nome]`,
    'calcular das': 'Para calcular o DAS do MEI, preciso saber seu faturamento mensal. Qual foi o valor faturado no último mês?',
    'emitir nota fiscal': 'Para emitir nota fiscal como MEI, você pode usar o portal do Simples Nacional ou apps como NFe.io. Primeiro, cadastre-se no portal da prefeitura de sua cidade. Precisa de ajuda com algum passo específico?',
    'cnpj': 'O CNPJ do MEI é gratuito e você consegue online no portal do Simples Nacional. Ele é essencial para emitir notas fiscais e comprovar renda. Já tem o seu?',
    'marketing': 'Para marketing como MEI, comece criando presença no Instagram e Facebook. Poste fotos dos seus trabalhos, use stories para promoções e interaja com clientes. Que tipo de serviço você oferece?',
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const key in mockResponses) {
    if (lowerMessage.includes(key)) {
      return mockResponses[key];
    }
  }

  return 'Oi! Sou o MEIZap, seu assistente para MEIs. Como posso ajudar hoje? Posso tirar dúvidas sobre impostos, gerar mensagens de cobrança, calcular o DAS ou dar dicas de organização financeira.';

  // Uncomment below for real OpenAI integration
  /*
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Desculpe, houve um erro na comunicação com a IA. Tente novamente.';
  }
  */
}