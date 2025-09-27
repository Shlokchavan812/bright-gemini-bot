import { Bot } from 'lucide-react';

export default function ChatHeader() {
  return (
    <header className="bg-chat-header text-primary-foreground p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Bot size={24} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">CC BOT</h1>
          <p className="text-sm text-primary-foreground/80">AI Assistant</p>
        </div>
      </div>
    </header>
  );
}