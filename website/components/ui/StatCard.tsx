import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { CountUp } from './CountUp';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  prefix = '',
  icon: Icon,
  trend,
  tone = 'default',
}: {
  label: string;
  value: number;
  prefix?: string;
  icon?: LucideIcon;
  trend?: number;
  tone?: 'default' | 'success' | 'warning' | 'error';
}) {
  const toneColor = {
    default: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  }[tone];

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        {Icon && (
          <div className={cn('rounded-xl bg-primary/5 p-2', toneColor)}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <CountUp value={value} prefix={prefix} className="text-2xl font-bold text-ink dark:text-white" />
        {typeof trend === 'number' && (
          <span
            className={cn(
              'mb-1 text-xs font-semibold',
              trend >= 0 ? 'text-success' : 'text-error',
            )}
          >
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
    </GlassCard>
  );
}
