import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  isBot?: boolean;
  children: ReactNode;
  className?: string;
}

export const ChatMessage = ({ isBot = true, children, className }: ChatMessageProps) => {
  return (
    <div className={cn(
      'flex w-full mb-4 animate-in slide-in-from-bottom-2 duration-300',
      isBot ? 'justify-start' : 'justify-end',
      className
    )}>
      <div className={cn(
        'max-w-[80%] px-4 py-3 font-pixel text-xs leading-relaxed shadow-lg border-2 relative',
        isBot 
          ? 'bg-gradient-chat text-card-foreground border-border' 
          : 'bg-primary/90 text-primary-foreground border-border'
      )}>
        {children}
      </div>
    </div>
  );
};