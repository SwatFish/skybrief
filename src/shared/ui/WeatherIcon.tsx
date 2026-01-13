import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Cloudy,
  Sun,
  Snowflake,
  Droplets,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  phenomenon: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface WeatherInfo {
  icon: LucideIcon;
  label: string;
  color: string;
}

const phenomenonMap: Record<string, WeatherInfo> = {
  RA: { icon: CloudRain, label: 'Rain', color: 'text-mvfr' },
  '-RA': { icon: CloudDrizzle, label: 'Light Rain', color: 'text-mvfr' },
  '+RA': { icon: CloudRain, label: 'Heavy Rain', color: 'text-ifr' },
  SHRA: { icon: CloudRain, label: 'Rain Showers', color: 'text-mvfr' },
  DZ: { icon: CloudDrizzle, label: 'Drizzle', color: 'text-muted-foreground' },
  SN: { icon: CloudSnow, label: 'Snow', color: 'text-foreground' },
  '-SN': { icon: Snowflake, label: 'Light Snow', color: 'text-foreground' },
  '+SN': { icon: CloudSnow, label: 'Heavy Snow', color: 'text-ifr' },
  TS: { icon: CloudLightning, label: 'Thunderstorm', color: 'text-destructive' },
  TSRA: { icon: CloudLightning, label: 'Thunderstorm + Rain', color: 'text-destructive' },
  '+TSRA': { icon: CloudLightning, label: 'Heavy T-Storm', color: 'text-destructive' },
  FG: { icon: CloudFog, label: 'Fog', color: 'text-lifr' },
  BR: { icon: Droplets, label: 'Mist', color: 'text-muted-foreground' },
  HZ: { icon: Cloud, label: 'Haze', color: 'text-muted-foreground' },
  FU: { icon: Cloud, label: 'Smoke', color: 'text-warning' },
  VA: { icon: AlertTriangle, label: 'Volcanic Ash', color: 'text-destructive' },
  GR: { icon: AlertTriangle, label: 'Hail', color: 'text-destructive' },
  FC: { icon: AlertTriangle, label: 'Funnel Cloud', color: 'text-destructive' },
};

const defaultInfo: WeatherInfo = {
  icon: Cloudy,
  label: 'Weather',
  color: 'text-muted-foreground',
};

export function WeatherIcon({ phenomenon, size = 'md', className }: WeatherIconProps) {
  const info = phenomenonMap[phenomenon] || defaultInfo;
  const Icon = info.icon;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 border border-border/50',
        className
      )}
    >
      <Icon className={cn(sizeClasses[size], info.color)} />
      <span className={cn('text-xs font-medium', info.color)}>{info.label}</span>
    </div>
  );
}

export function WeatherPhenomenaList({
  phenomena,
  className,
}: {
  phenomena: string[];
  className?: string;
}) {
  if (!phenomena.length) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        <Sun className="w-5 h-5 text-safe" />
        <span className="text-sm text-safe">Clear</span>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {phenomena.map((p) => (
        <WeatherIcon key={p} phenomenon={p} />
      ))}
    </div>
  );
}
