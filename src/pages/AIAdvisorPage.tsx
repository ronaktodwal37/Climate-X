import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Droplets,
  ThermometerSun,
  Shield,
  Loader2,
  User,
  BotMessageSquare,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClimate } from '@/context/ClimateContext';
import { aiAdvisorResponses } from '@/data/mockData';
import type { AIMessage } from '@/types';

const suggestedQuestions = [
  'What happens if rainfall decreases by 20%?',
  'Impact of 3°C temperature rise?',
  'Recommendations for high heat risk areas',
  'Water conservation strategies',
];

const quickActions = [
  { icon: Droplets, label: 'Water Management', query: 'How can we optimize water storage during drought conditions?' },
  { icon: ThermometerSun, label: 'Heat Action', query: 'What measures should be taken during extreme heat?' },
  { icon: Shield, label: 'Risk Mitigation', query: 'How to prepare for seasonal climate risks?' },
  { icon: Lightbulb, label: 'Agriculture', query: 'Best crops for predicted climate conditions?' },
];

function generateMockResponse(query: string): string[] {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('rainfall') && (lowerQuery.includes('decrease') || lowerQuery.includes('reduce'))) {
    return aiAdvisorResponses.rainfall_decrease;
  }

  if (lowerQuery.includes('temperature') && (lowerQuery.includes('increase') || lowerQuery.includes('rise') || lowerQuery.includes('+'))) {
    return aiAdvisorResponses.temperature_increase;
  }

  return aiAdvisorResponses.default;
}

export function AIAdvisorPage() {
  const { selectedDistrict, simulationResult, risk } = useClimate();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: aiAdvisorResponses.default.join('\n'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (query?: string) => {
    const messageText = query || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responseLines = generateMockResponse(messageText);
    const assistantMessage: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseLines.join('\n'),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bot className="w-6 h-6 text-accent" />
          AI Climate Advisor
        </h1>
        <p className="text-sm text-muted-foreground">
          Gemini-powered recommendations for climate adaptation strategies
        </p>
      </motion.div>

      <div className="flex-1 grid lg:grid-cols-4 gap-4 min-h-0">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <GlassCard className="flex-1 flex flex-col min-h-0" variant="dark">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 min-h-0">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        message.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.role === 'assistant' && (
                          <BotMessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-accent" />
                        )}
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                        {message.role === 'user' && (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-xl p-4 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    <span className="text-sm text-muted-foreground">Analyzing climate data...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan-500/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about climate predictions, risks, or adaptation strategies..."
                  className="flex-1 bg-secondary border-cyan-500/20 focus:border-accent"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-accent hover:bg-accent/80 text-climate-dark"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSend(question)}
                    disabled={isLoading}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <GlassCard variant="accent">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Context
            </h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <span className="text-foreground">District:</span>{' '}
                {selectedDistrict?.name || 'Not selected'}
              </p>
              <p>
                <span className="text-foreground">Heat Risk:</span>{' '}
                {risk?.heatRisk?.toFixed(0) || '-'}%
              </p>
              <p>
                <span className="text-foreground">Drought Risk:</span>{' '}
                {risk?.droughtRisk?.toFixed(0) || '-'}%
              </p>
              {simulationResult && (
                <p>
                  <span className="text-foreground">Last Simulation:</span>{' '}
                  {simulationResult.climateStabilityScore.toFixed(0)}% stability
                </p>
              )}
            </div>
          </GlassCard>

          <GlassCard className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSend(action.query)}
                  disabled={isLoading}
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  <action.icon className="w-4 h-4 mr-2 text-accent" />
                  {action.label}
                </Button>
              ))}
            </div>
          </GlassCard>

          {/* Architecture Note */}
          <GlassCard variant="dark">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Note:</strong> This mock implementation
              can be replaced with actual Gemini API by updating the <code className="text-accent">generateResponse</code> function.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
