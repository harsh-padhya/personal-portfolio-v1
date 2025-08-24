import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'code';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function TerminalButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button'
}: TerminalButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    primary: "bg-terminal-accent text-terminal-background hover:bg-terminal-accent/90 shadow-lg hover:shadow-terminal-accent/25",
    secondary: "bg-terminal-surface text-terminal-foreground border border-terminal-border hover:bg-terminal-muted",
    ghost: "text-terminal-accent hover:bg-terminal-accent/10 hover:text-terminal-accent",
    code: "bg-terminal-muted text-terminal-foreground font-mono border border-terminal-border hover:border-terminal-accent"
  };
  
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </button>
  );
}
