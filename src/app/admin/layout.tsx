'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard as Home, 
  FileText, 
  FolderOpen, 
  User, 
  Settings,
  Terminal,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Experience', href: '/admin/experience', icon: User },
  { name: 'Skills', href: '/admin/skills', icon: Settings },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-terminal-background">
      {/* Header */}
      <header className="bg-terminal-surface border-b border-terminal-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-terminal-accent hover:text-terminal-accent/80">
              <Terminal className="h-6 w-6" />
              <span className="font-mono font-bold">Portfolio Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-terminal-muted text-sm font-mono">dev-mode</span>
            <Link
              href="/"
              className="flex items-center space-x-2 text-terminal-muted hover:text-terminal-accent transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Back to Site</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-terminal-surface border-r border-terminal-border min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30"
                      : "text-terminal-foreground hover:bg-terminal-muted/20 hover:text-terminal-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
