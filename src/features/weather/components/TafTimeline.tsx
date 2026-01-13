import { DecodedTaf, TafPeriod, FlightCategory } from '@/api/types';
import { FlightCategoryBadge } from '@/shared/ui/FlightCategoryBadge';
import { WindIndicator } from '@/shared/ui/WindIndicator';
import { WeatherPhenomenaList } from '@/shared/ui/WeatherIcon';
import { cn } from '@/lib/utils';
import { Clock, AlertTriangle, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

interface TafTimelineProps {
  taf: DecodedTaf;
  className?: string;
}

const periodTypeLabels: Record<TafPeriod['type'], string> = {
  BASE: 'Initial',
  FM: 'From',
  BECMG: 'Becoming',
  TEMPO: 'Temporary',
  PROB30: 'Prob 30%',
  PROB40: 'Prob 40%',
};

const categoryOrder: FlightCategory[] = ['VFR', 'MVFR', 'IFR', 'LIFR'];

function getTrend(current: FlightCategory, next: FlightCategory): 'improving' | 'deteriorating' | 'stable' {
  const currentIdx = categoryOrder.indexOf(current);
  const nextIdx = categoryOrder.indexOf(next);
  if (nextIdx > currentIdx) return 'deteriorating';
  if (nextIdx < currentIdx) return 'improving';
  return 'stable';
}

function PeriodCard({ period, previousCategory }: { period: TafPeriod; previousCategory?: FlightCategory }) {
  const trend = previousCategory ? getTrend(previousCategory, period.flightCategory) : 'stable';
  const isDeteriorating = trend === 'deteriorating';
  const isImproving = trend === 'improving';
  const isTemporary = period.type === 'TEMPO' || period.type === 'PROB30' || period.type === 'PROB40';

  return (
    <div
      className={cn(
        'aviation-panel relative',
        isDeteriorating && 'border-destructive/50 bg-destructive/5',
        isTemporary && 'border-dashed opacity-90'
      )}
    >
      {/* Period Type Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded',
              period.type === 'FM' && 'bg-primary/20 text-primary',
              period.type === 'BECMG' && 'bg-accent/20 text-accent',
              period.type === 'TEMPO' && 'bg-caution/20 text-caution',
              (period.type === 'PROB30' || period.type === 'PROB40') && 'bg-muted text-muted-foreground',
              period.type === 'BASE' && 'bg-secondary text-secondary-foreground'
            )}
          >
            {periodTypeLabels[period.type]}
            {period.probability && ` ${period.probability}%`}
          </span>

          {/* Trend Indicator */}
          {isDeteriorating && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <TrendingDown className="w-3 h-3" />
              Deteriorating
            </span>
          )}
          {isImproving && (
            <span className="flex items-center gap-1 text-xs text-safe">
              <TrendingUp className="w-3 h-3" />
              Improving
            </span>
          )}
        </div>

        <FlightCategoryBadge category={period.flightCategory} size="sm" />
      </div>

      {/* Time Range */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Clock className="w-3 h-3" />
        <span className="font-mono">
          {new Date(period.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <ArrowRight className="w-3 h-3" />
        <span className="font-mono">
          {new Date(period.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Wind */}
        <div>
          <span className="data-label block mb-1">Wind</span>
          <div className="text-sm">
            {period.wind.direction === 'VRB' ? 'VRB' : `${period.wind.direction}°`}{' '}
            {period.wind.speed}
            {period.wind.gust && `G${period.wind.gust}`}
            {period.wind.unit}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <span className="data-label block mb-1">Visibility</span>
          <div className="text-sm">
            {period.visibility.value} {period.visibility.unit}
          </div>
        </div>

        {/* Ceiling */}
        <div>
          <span className="data-label block mb-1">Ceiling</span>
          <div className="text-sm">
            {period.ceiling ? `${period.ceiling.toLocaleString()} ft` : 'CLR'}
          </div>
        </div>

        {/* Weather */}
        <div>
          <span className="data-label block mb-1">Weather</span>
          <WeatherPhenomenaList phenomena={period.weather} />
        </div>
      </div>

      {/* Warning for severe conditions */}
      {(period.flightCategory === 'LIFR' || period.weather.some(w => w.includes('TS'))) && (
        <div className="mt-3 flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-2 py-1.5 rounded">
          <AlertTriangle className="w-4 h-4" />
          <span>Significant weather - exercise caution</span>
        </div>
      )}
    </div>
  );
}

export function TafTimeline({ taf, className }: TafTimelineProps) {
  return (
    <div className={cn('aviation-card animate-fade-in', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">TAF Forecast</h3>
          <span className="text-xs text-muted-foreground">
            Valid {new Date(taf.validFrom).toLocaleDateString()} -{' '}
            {new Date(taf.validTo).toLocaleDateString()}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          Issued {new Date(taf.issueTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/30 to-border" />

        {/* Periods */}
        <div className="space-y-3 pl-10">
          {taf.periods.map((period, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot with glow */}
              <div
                className={cn(
                  'absolute -left-10 top-3 w-3 h-3 rounded-full border-2 border-background transition-all duration-200',
                  'group-hover:scale-125',
                  period.flightCategory === 'VFR' && 'bg-vfr shadow-[0_0_8px_hsl(var(--vfr)/0.6)]',
                  period.flightCategory === 'MVFR' && 'bg-mvfr shadow-[0_0_8px_hsl(var(--mvfr)/0.6)]',
                  period.flightCategory === 'IFR' && 'bg-ifr shadow-[0_0_8px_hsl(var(--ifr)/0.6)]',
                  period.flightCategory === 'LIFR' && 'bg-lifr shadow-[0_0_8px_hsl(var(--lifr)/0.6)]'
                )}
              />
              {/* Connector line for hover */}
              <div className="absolute -left-7 top-4 w-4 h-px bg-gradient-to-r from-transparent to-border/50 group-hover:to-primary/50 transition-colors" />
              <PeriodCard
                period={period}
                previousCategory={index > 0 ? taf.periods[index - 1].flightCategory : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
