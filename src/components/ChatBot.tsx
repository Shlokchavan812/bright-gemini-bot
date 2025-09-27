import { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, sendMessage } from '@/lib/gemini';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m CC BOT, your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-chat-bot p-4 rounded-2xl rounded-bl-md">
              <p className="text-sm text-muted-foreground">CC BOT is typing...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}