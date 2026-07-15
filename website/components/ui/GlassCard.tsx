import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function GlassCard({
  children,
  className,
  goldBorder = false,
}: {
  children: ReactNode;
  className?: string;
  goldBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        goldBorder && 'border-accent/40 shadow-gold',
        className,
      )}
    >
      {children}
    </div>
  );
}
