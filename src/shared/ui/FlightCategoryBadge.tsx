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
    VFR: 'bg-gradient-to-r from-vfr/90 via-vfr/60 to-background/80 text-vfr-foreground border border-vfr/30',
    MVFR: 'bg-gradient-to-r from-mvfr/90 via-mvfr/60 to-background/80 text-mvfr-foreground border border-mvfr/30',
    IFR: 'bg-gradient-to-r from-ifr/90 via-ifr/60 to-background/80 text-ifr-foreground border border-ifr/30',
    LIFR: 'bg-gradient-to-r from-lifr/90 via-lifr/60 to-background/80 text-lifr-foreground border border-lifr/30',
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
