import { FlightCategory } from '@/api/types';
import { cn } from '@/lib/utils';

interface FlightCategoryBadgeProps {
  category: FlightCategory;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const categoryLabels: Record<FlightCategory, string> = {
  VFR: 'Visual Flight Rules',
  MVFR: 'Marginal VFR',
  IFR: 'Instrument Flight Rules',
  LIFR: 'Low IFR',
};

export function FlightCategoryBadge({
  category,
  size = 'md',
  showLabel = false,
  className,
}: FlightCategoryBadgeProps) {
  const dotSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-medium',
    lg: 'text-base font-semibold',
  };

  const categoryColors: Record<FlightCategory, string> = {
    VFR: 'bg-vfr',
    MVFR: 'bg-mvfr',
    IFR: 'bg-ifr',
    LIFR: 'bg-lifr',
  };

  const textColors: Record<FlightCategory, string> = {
    VFR: 'text-vfr',
    MVFR: 'text-mvfr',
    IFR: 'text-ifr',
    LIFR: 'text-lifr',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'rounded-full shrink-0',
          dotSizes[size],
          categoryColors[category]
        )}
      />
      <span className={cn(textSizes[size], textColors[category])}>
        {category}
      </span>
      {showLabel && (
        <span className="text-muted-foreground text-sm">
          {categoryLabels[category]}
        </span>
      )}
    </div>
  );
}
