import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Clock, Plane } from 'lucide-react';
import { DecodedMetar, DecodedTaf } from '@/api/types';
import { weatherApi } from '@/api/weatherApi';
import { WeatherSnapshot } from './components/WeatherSnapshot';
import { TafTimeline } from './components/TafTimeline';
import { RawDataPanel } from './components/RawDataPanel';
import { StationSearch } from './components/StationSearch';
import { NearbyStations } from './components/NearbyStations';
import { cn } from '@/lib/utils';

export function MetarTafPage() {
  const [icao, setIcao] = useState('EBBR');
  const [metar, setMetar] = useState<DecodedMetar | null>(null);
  const [taf, setTaf] = useState<DecodedTaf | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = useCallback(async (stationIcao: string) => {
    setIsLoading(true);
    try {
      const data = await weatherApi.getWeather(stationIcao);
      setMetar(data.metar);
      setTaf(data.taf);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(icao);
  }, [icao, fetchWeather]);

  const handleStationSelect = (newIcao: string) => {
    setIcao(newIcao);
  };

  const handleRefresh = () => {
    fetchWeather(icao);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="aviation-card">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-sm">
            <StationSearch onSelect={handleStationSelect} />
          </div>

          {/* Nearby Stations */}
          <NearbyStations onSelect={handleStationSelect} currentIcao={icao} />

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {lastUpdated && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all text-sm font-medium',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Station Header */}
      {metar && (
        <div className="flex items-center gap-3">
          <Plane className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{metar.icao}</h1>
            <span className="text-sm text-muted-foreground">Weather Briefing</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !metar && (
        <div className="aviation-card flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* METAR Section */}
      {metar && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Current Conditions (METAR)
          </h2>
          <WeatherSnapshot metar={metar} />
          <RawDataPanel title="Raw METAR" data={metar.raw} />
        </div>
      )}

      {/* TAF Section */}
      {taf && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Forecast (TAF)
          </h2>
          <TafTimeline taf={taf} />
          <RawDataPanel title="Raw TAF" data={taf.raw} />
        </div>
      )}

      {/* No TAF Available */}
      {metar && !taf && (
        <div className="aviation-card py-8 text-center">
          <p className="text-muted-foreground">No TAF available for {icao}</p>
        </div>
      )}
    </div>
  );
}
