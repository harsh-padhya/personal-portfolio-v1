'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert prose-terminal max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom components for terminal styling
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-terminal-accent mb-6 font-mono border-b border-terminal-border pb-4">
              <span className="text-terminal-accent">#</span> {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-terminal-foreground mb-4 mt-8 font-mono">
              <span className="text-terminal-accent">##</span> {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-terminal-foreground mb-3 mt-6 font-mono">
              <span className="text-terminal-accent">###</span> {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-terminal-foreground leading-relaxed mb-4">
              {children}
            </p>
          ),
          pre: ({ children }) => (
            <pre className="bg-terminal-surface border border-terminal-border rounded-lg p-4 overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          code: ({ children, className, ...props }: any) => {
            const isInline = !className || !className.includes('language-');
            return isInline ? (
              <code className="bg-terminal-muted/20 text-terminal-accent px-1 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <code className="text-terminal-foreground font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-terminal-accent bg-terminal-accent/5 pl-4 py-2 mb-4 italic">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-terminal-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-terminal-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-terminal-foreground">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-terminal-accent hover:text-terminal-accent/80 underline transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-terminal-border rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-terminal-surface">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-terminal-border">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-terminal-muted/10">
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-terminal-foreground text-sm">
              {children}
            </td>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-terminal-accent text-sm font-mono text-left">
              {children}
            </th>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
