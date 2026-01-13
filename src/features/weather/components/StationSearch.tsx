import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Station } from '@/api/types';
import { weatherApi } from '@/api/weatherApi';
import { cn } from '@/lib/utils';

interface StationSearchProps {
  onSelect: (icao: string) => void;
  className?: string;
}

export function StationSearch({ onSelect, className }: StationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Station[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      const stations = await weatherApi.searchStations(query);
      setResults(stations);
      setIsLoading(false);
    };

    const timeout = setTimeout(search, 150);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station: Station) => {
    setQuery(station.icao);
    setIsOpen(false);
    onSelect(station.icao);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.length >= 3) {
      setIsOpen(false);
      onSelect(query.toUpperCase());
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toUpperCase());
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Enter ICAO code..."
          className="w-full pl-10 pr-10 py-2.5 bg-secondary/50 border border-border rounded-lg text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-popover border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {results.map((station) => (
            <button
              key={station.icao}
              onClick={() => handleSelect(station)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-secondary/50 transition-colors text-left"
            >
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-primary">{station.icao}</span>
                  <span className="text-sm text-foreground truncate">{station.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {station.city}, {station.country}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
