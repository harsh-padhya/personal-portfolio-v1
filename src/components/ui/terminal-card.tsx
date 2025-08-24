import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'glass' | 'code';
}

export function TerminalCard({ children, title, className, variant = 'default' }: TerminalCardProps) {
  const baseClasses = "border border-terminal-border rounded-lg overflow-hidden";
  
  const variantClasses = {
    default: "bg-terminal-card backdrop-blur-sm",
    glass: "bg-terminal-card/20 backdrop-blur-md border-terminal-accent/20",
    code: "bg-terminal-surface font-mono"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {title && (
        <div className="bg-terminal-surface border-b border-terminal-border px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-terminal-foreground text-sm font-mono ml-2">{title}</span>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
