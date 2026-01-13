import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface DataCellProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  status?: 'normal' | 'caution' | 'warning' | 'critical';
  className?: string;
}

export function DataCell({
  label,
  value,
  unit,
  icon: Icon,
  status = 'normal',
  className,
}: DataCellProps) {
  const statusColors = {
    normal: 'text-foreground',
    caution: 'text-caution',
    warning: 'text-warning',
    critical: 'text-destructive',
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="data-label flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className={cn('data-value', statusColors[status])}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
