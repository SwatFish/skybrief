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
    VFR: 'bg-gradient-to-br from-vfr via-vfr to-vfr/70 text-vfr-foreground glow-vfr',
    MVFR: 'bg-gradient-to-br from-mvfr via-mvfr to-mvfr/70 text-mvfr-foreground glow-mvfr',
    IFR: 'bg-gradient-to-br from-ifr via-ifr to-ifr/70 text-ifr-foreground glow-ifr',
    LIFR: 'bg-gradient-to-br from-lifr via-lifr to-lifr/70 text-lifr-foreground glow-lifr',
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
