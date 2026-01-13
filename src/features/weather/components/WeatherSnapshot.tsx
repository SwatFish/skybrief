import { DecodedMetar } from '@/api/types';
import { FlightCategoryBadge } from '@/shared/ui/FlightCategoryBadge';
import { WindIndicator } from '@/shared/ui/WindIndicator';
import { WeatherPhenomenaList } from '@/shared/ui/WeatherIcon';
import { DataCell } from '@/shared/ui/DataCell';
import { Eye, Mountain, Thermometer, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherSnapshotProps {
  metar: DecodedMetar;
  compact?: boolean;
  className?: string;
}

function formatVisibility(vis: DecodedMetar['visibility']): string {
  if (vis.qualifier === 'P') return `>${vis.value}`;
  if (vis.qualifier === 'M') return `<${vis.value}`;
  return vis.value.toString();
}

function getVisibilityStatus(value: number): 'normal' | 'caution' | 'warning' | 'critical' {
  if (value >= 5) return 'normal';
  if (value >= 3) return 'caution';
  if (value >= 1) return 'warning';
  return 'critical';
}

function getCeilingStatus(ceiling?: number): 'normal' | 'caution' | 'warning' | 'critical' {
  if (!ceiling) return 'normal';
  if (ceiling >= 3000) return 'normal';
  if (ceiling >= 1000) return 'caution';
  if (ceiling >= 500) return 'warning';
  return 'critical';
}

export function WeatherSnapshot({ metar, compact = false, className }: WeatherSnapshotProps) {
  const tempSpread = metar.temperature - metar.dewpoint;
  const isFogRisk = tempSpread <= 3;

  return (
    <div className={cn('aviation-card animate-fade-in', className)}>
      {/* Header: Category + Station */}
      <div className="flex items-center justify-between mb-4">
        <FlightCategoryBadge category={metar.flightCategory} size="lg" showLabel />
        <span className="text-xs text-muted-foreground font-mono">
          {new Date(metar.observationTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          UTC
        </span>
      </div>

      {/* Main Grid */}
      <div
        className={cn(
          'grid gap-4',
          compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
        )}
      >
        {/* Wind */}
        <div className="aviation-panel col-span-1">
          <span className="data-label mb-2 block">Wind</span>
          <WindIndicator
            direction={metar.wind.direction}
            speed={metar.wind.speed}
            gust={metar.wind.gust}
            unit={metar.wind.unit}
          />
        </div>

        {/* Visibility */}
        <div className="aviation-panel">
          <DataCell
            label="Visibility"
            value={formatVisibility(metar.visibility)}
            unit={metar.visibility.unit}
            icon={Eye}
            status={getVisibilityStatus(metar.visibility.value)}
          />
        </div>

        {/* Ceiling */}
        <div className="aviation-panel">
          <DataCell
            label="Ceiling"
            value={metar.ceiling ? metar.ceiling.toLocaleString() : 'CLR'}
            unit={metar.ceiling ? 'ft' : undefined}
            icon={Mountain}
            status={getCeilingStatus(metar.ceiling)}
          />
          {metar.clouds.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {metar.clouds.map((c, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded"
                >
                  {c.coverage}
                  {Math.floor(c.altitude / 100)
                    .toString()
                    .padStart(3, '0')}
                  {c.type && ` ${c.type}`}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Weather Phenomena */}
        <div className="aviation-panel">
          <span className="data-label mb-2 block">Weather</span>
          <WeatherPhenomenaList phenomena={metar.weather} />
        </div>

        {/* Temperature */}
        <div className="aviation-panel">
          <DataCell
            label="Temp / Dewpoint"
            value={`${metar.temperature}° / ${metar.dewpoint}°`}
            icon={Thermometer}
            status={isFogRisk ? 'caution' : 'normal'}
          />
          {isFogRisk && (
            <span className="text-xs text-caution mt-1 block">
              Fog risk (spread: {tempSpread}°)
            </span>
          )}
        </div>

        {/* Altimeter */}
        <div className="aviation-panel">
          <DataCell
            label="QNH"
            value={metar.altimeter.value}
            unit={metar.altimeter.unit}
            icon={Gauge}
          />
        </div>
      </div>
    </div>
  );
}
