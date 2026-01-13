import { cn } from '@/lib/utils';
import { Wind } from 'lucide-react';

interface WindIndicatorProps {
  direction: number | 'VRB';
  speed: number;
  gust?: number;
  unit?: 'KT' | 'MPS';
  className?: string;
}

export function WindIndicator({
  direction,
  speed,
  gust,
  unit = 'KT',
  className,
}: WindIndicatorProps) {
  const isVariable = direction === 'VRB';
  const isCalm = speed === 0;
  const hasGust = gust && gust > speed;

  // Determine if wind is concerning
  const isStrong = speed >= 20 || (gust && gust >= 30);
  const isModerate = speed >= 12 || (gust && gust >= 20);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Wind Direction Arrow */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-border/50 bg-secondary/30" />
        {!isCalm && !isVariable && (
          <div
            className="absolute w-1 h-5 bg-primary rounded-full origin-bottom"
            style={{
              transform: `rotate(${direction}deg) translateY(-6px)`,
            }}
          />
        )}
        {isVariable && (
          <Wind className="w-5 h-5 text-primary animate-pulse" />
        )}
        {isCalm && (
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
        )}
      </div>

      {/* Wind Data */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          {isCalm ? (
            <span className="data-value text-muted-foreground">Calm</span>
          ) : (
            <>
              <span
                className={cn(
                  'data-value',
                  isStrong && 'text-destructive',
                  isModerate && !isStrong && 'text-caution'
                )}
              >
                {speed}
              </span>
              {hasGust && (
                <>
                  <span className="text-muted-foreground">G</span>
                  <span className="data-value text-warning">{gust}</span>
                </>
              )}
              <span className="text-sm text-muted-foreground">{unit}</span>
            </>
          )}
        </div>
        <span className="data-label">
          {isCalm
            ? 'No Wind'
            : isVariable
            ? 'Variable'
            : `${direction.toString().padStart(3, '0')}°`}
        </span>
      </div>
    </div>
  );
}
