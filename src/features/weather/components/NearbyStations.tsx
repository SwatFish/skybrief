import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Station } from '@/api/types';
import { weatherApi } from '@/api/weatherApi';
import { cn } from '@/lib/utils';

interface NearbyStationsProps {
  onSelect: (icao: string) => void;
  currentIcao?: string;
  className?: string;
}

export function NearbyStations({ onSelect, currentIcao, className }: NearbyStationsProps) {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    weatherApi.getNearbyStations(4).then(setStations);
  }, []);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Navigation className="w-3 h-3" />
        Nearby:
      </span>
      <div className="flex gap-1">
        {stations.map((station) => (
          <button
            key={station.icao}
            onClick={() => onSelect(station.icao)}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-mono transition-all',
              station.icao === currentIcao
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {station.icao}
          </button>
        ))}
      </div>
    </div>
  );
}
