import { Station } from '../types';

export const mockStations: Station[] = [
  {
    icao: 'EBBR',
    name: 'Brussels Airport',
    city: 'Brussels',
    country: 'Belgium',
    latitude: 50.9014,
    longitude: 4.4844,
    elevation: 184,
  },
  {
    icao: 'EBAW',
    name: 'Antwerp International Airport',
    city: 'Antwerp',
    country: 'Belgium',
    latitude: 51.1894,
    longitude: 4.4603,
    elevation: 39,
  },
  {
    icao: 'ELLX',
    name: 'Luxembourg Airport',
    city: 'Luxembourg',
    country: 'Luxembourg',
    latitude: 49.6233,
    longitude: 6.2044,
    elevation: 1234,
  },
  {
    icao: 'EHAM',
    name: 'Amsterdam Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    latitude: 52.3086,
    longitude: 4.7639,
    elevation: -11,
  },
  {
    icao: 'LFPG',
    name: 'Paris Charles de Gaulle',
    city: 'Paris',
    country: 'France',
    latitude: 49.0097,
    longitude: 2.5479,
    elevation: 392,
  },
  {
    icao: 'EGLL',
    name: 'London Heathrow',
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.4700,
    longitude: -0.4543,
    elevation: 83,
  },
  {
    icao: 'EDDF',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
    latitude: 50.0264,
    longitude: 8.5431,
    elevation: 364,
  },
  {
    icao: 'KJFK',
    name: 'John F. Kennedy International',
    city: 'New York',
    country: 'United States',
    latitude: 40.6413,
    longitude: -73.7781,
    elevation: 13,
  },
];

export const getNearbyStations = (limit = 5): Station[] => {
  // Mock: pretend user is near Brussels
  return mockStations
    .map((s) => ({
      ...s,
      distance: Math.round(Math.random() * 200),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, limit);
};
