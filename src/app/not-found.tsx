import Link from 'next/link';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-terminal-background flex items-center justify-center p-4">
      <TerminalCard className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-mono font-bold text-terminal-accent">404</h1>
            <h2 className="text-xl font-mono text-terminal-foreground">Page Not Found</h2>
          </div>
          
          <p className="text-terminal-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <TerminalButton className="w-full">Return Home</TerminalButton>
            </Link>
            <Link href="/blog" className="block">
              <TerminalButton variant="secondary" className="w-full">Browse Blog</TerminalButton>
            </Link>
          </div>
        </div>
      </TerminalCard>
    </div>
  );
}