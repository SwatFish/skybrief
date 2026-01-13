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
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5 font-semibold',
  };

  const categoryClasses: Record<FlightCategory, string> = {
    VFR: 'bg-vfr text-vfr-foreground glow-vfr',
    MVFR: 'bg-mvfr text-mvfr-foreground glow-mvfr',
    IFR: 'bg-ifr text-ifr-foreground glow-ifr',
    LIFR: 'bg-lifr text-lifr-foreground glow-lifr',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'rounded font-bold tracking-wide transition-all',
          sizeClasses[size],
          categoryClasses[category]
        )}
      >
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
