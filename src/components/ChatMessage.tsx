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
        'max-w-[80%] px-4 py-3 font-pixel text-sm shadow-lg border-2 relative',
        isBot 
          ? 'bg-gradient-chat text-card-foreground border-border ml-4' 
          : 'bg-primary text-primary-foreground border-primary mr-4'
      )}>
        {isBot && (
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-card" />
        )}
        {!isBot && (
          <div className="absolute -right-2 top-4 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-primary" />
        )}
        {children}
      </div>
    </div>
  );
};