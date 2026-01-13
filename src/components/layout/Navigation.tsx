import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Cloud,
  MapPin,
  Route,
  AlertTriangle,
  Settings,
  Plane,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { path: '/', label: 'METAR/TAF', icon: <Cloud className="w-4 h-4" />, active: true },
  { path: '/planning', label: 'Flight Planning', icon: <Route className="w-4 h-4" /> },
  { path: '/notam', label: 'NOTAM', icon: <AlertTriangle className="w-4 h-4" /> },
  { path: '/airports', label: 'Airports', icon: <MapPin className="w-4 h-4" /> },
  { path: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-8">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">
              SkyBrief
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isPlaceholder = !item.active;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                    isPlaceholder && 'opacity-50'
                  )}
                >
                  {item.icon}
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
