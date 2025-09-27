import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

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
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 rounded-full border-2 border-border bg-input px-6 py-3 text-sm focus:border-primary focus:ring-primary"
      />
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