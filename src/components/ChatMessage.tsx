import { ChatMessage as ChatMessageType } from '@/lib/gemini';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex items-start gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-chat-bot text-foreground rounded-bl-md' 
          : 'bg-chat-user text-foreground rounded-br-md border border-border'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs text-muted-foreground mt-2 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}