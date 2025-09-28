import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    await onSendMessage(message);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background border-t border-border">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/35 w-5 h-5" />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="WRITE HERE"
          disabled={isLoading}
          className="w-full rounded-full border-2 border-border bg-input pl-12 pr-6 py-3 text-sm focus:border-primary focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground/35 shadow-inner"
        />
      </div>
      <Button
        type="submit"
        disabled={!inputValue.trim() || isLoading}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-0 shadow-lg"
      >
        <Send size={18} />
      </Button>
    </form>
  );
}