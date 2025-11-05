'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Calculator, FileText, DollarSign, TrendingUp, Send, History } from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Load conversations from localStorage
    const savedConversations = localStorage.getItem('meizap_conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }

    // Load message count
    const savedCount = localStorage.getItem('meizap_message_count');
    if (savedCount) {
      setMessageCount(parseInt(savedCount));
    }

    // Load premium status
    const savedPremium = localStorage.getItem('meizap_premium');
    if (savedPremium === 'true') {
      setIsPremium(true);
    }
  }, []);

  const saveConversations = (convs: Conversation[]) => {
    localStorage.setItem('meizap_conversations', JSON.stringify(convs));
    setConversations(convs);
  };

  const saveMessageCount = (count: number) => {
    localStorage.setItem('meizap_message_count', count.toString());
    setMessageCount(count);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!isPremium && messageCount >= 5) {
      alert('Você atingiu o limite de 5 mensagens do plano gratuito. Faça upgrade para premium!');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update conversation history
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: input.slice(0, 50) + (input.length > 50 ? '...' : ''),
        messages: [userMessage, aiMessage],
        timestamp: new Date(),
      };

      const updatedConversations = [newConversation, ...conversations.slice(0, 4)]; // Keep last 5
      saveConversations(updatedConversations);

      // Update message count
      saveMessageCount(messageCount + 1);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, houve um erro. Tente novamente.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = (conversation: Conversation) => {
    setMessages(conversation.messages);
    setShowHistory(false);
  };

  const quickActions = [
    { icon: MessageCircle, label: 'Gerar mensagem de cobrança', prompt: 'Gere uma mensagem educada de cobrança para enviar no WhatsApp' },
    { icon: Calculator, label: 'Calcular DAS', prompt: 'Como calcular o imposto DAS do MEI?' },
    { icon: FileText, label: 'Emitir nota fiscal', prompt: 'Como emitir nota fiscal como MEI?' },
    { icon: DollarSign, label: 'Entender CNPJ', prompt: 'O que preciso saber sobre CNPJ do MEI?' },
    { icon: TrendingUp, label: 'Dicas de marketing', prompt: 'Dicas de marketing básico para MEI' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">MEIZap</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              Histórico
            </Button>
            {!isPremium && (
              <Button
                onClick={() => setIsPremium(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Upgrade Premium
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar - History */}
        {showHistory && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Conversas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {conversations.map((conv) => (
                    <Button
                      key={conv.id}
                      variant="ghost"
                      className="w-full justify-start text-left mb-2"
                      onClick={() => loadConversation(conv)}
                    >
                      <div>
                        <p className="font-medium truncate">{conv.title}</p>
                        <p className="text-sm text-gray-500">
                          {conv.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </Button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Chat */}
        <div className={showHistory ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Chat com MEIZap</CardTitle>
              {!isPremium && (
                <p className="text-sm text-gray-600">
                  Mensagens restantes hoje: {5 - messageCount}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(action.prompt)}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="text-xs text-center">{action.label}</span>
                  </Button>
                ))}
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                        Digitando...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}