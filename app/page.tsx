import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calculator, FileText, DollarSign, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo e Nome */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-blue-600 mb-2">MEIZap</h1>
          <p className="text-xl text-gray-600">Seu contador virtual no WhatsApp — 24h por dia, sem enrolação.</p>
        </div>

        {/* Descrição */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            O assistente virtual perfeito para microempreendedores individuais (MEIs) brasileiros.
            Tire dúvidas sobre impostos, gere mensagens de cobrança, calcule o DAS e muito mais!
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Emitir Nota Fiscal</h3>
            <p className="text-sm text-gray-600">Orientações passo a passo</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Calcular DAS</h3>
            <p className="text-sm text-gray-600">Impostos simplificados</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Mensagens de Cobrança</h3>
            <p className="text-sm text-gray-600">Educadas e prontas para WhatsApp</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Dicas de Marketing</h3>
            <p className="text-sm text-gray-600">Para crescer seu negócio</p>
          </div>
        </div>

        {/* Botão para começar */}
        <Link href="/chat">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg">
            Começar Conversa Gratuita
          </Button>
        </Link>

        {/* Plano gratuito */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Plano gratuito: 5 mensagens por dia</p>
          <p>Premium: Mensagens ilimitadas por R$ 9,90/mês</p>
        </div>
      </div>
    </div>
  );
}