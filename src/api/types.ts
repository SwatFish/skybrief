export type FlightCategory = 'VFR' | 'MVFR' | 'IFR' | 'LIFR';

export interface Station {
  icao: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number;
  distance?: number; // km from user
}

export interface CloudLayer {
  coverage: 'FEW' | 'SCT' | 'BKN' | 'OVC';
  altitude: number; // feet AGL
  type?: 'CB' | 'TCU';
}

export interface DecodedMetar {
  icao: string;
  observationTime: string;
  raw: string;
  flightCategory: FlightCategory;
  wind: {
    direction: number | 'VRB';
    speed: number;
    gust?: number;
    unit: 'KT' | 'MPS';
    variable?: { from: number; to: number };
  };
  visibility: {
    value: number;
    unit: 'SM' | 'M';
    qualifier?: 'M' | 'P'; // Less than / Greater than
  };
  clouds: CloudLayer[];
  ceiling?: number; // feet AGL, lowest BKN/OVC
  weather: string[]; // RA, TS, FG, BR, etc.
  temperature: number; // Celsius
  dewpoint: number;
  altimeter: {
    value: number;
    unit: 'inHg' | 'hPa';
  };
  remarks?: string;
}

export interface TafPeriod {
  type: 'FM' | 'BECMG' | 'TEMPO' | 'PROB30' | 'PROB40' | 'BASE';
  from: string; // ISO timestamp
  to: string;
  flightCategory: FlightCategory;
  wind: {
    direction: number | 'VRB';
    speed: number;
    gust?: number;
    unit: 'KT' | 'MPS';
  };
  visibility: {
    value: number;
    unit: 'SM' | 'M';
  };
  clouds: CloudLayer[];
  ceiling?: number;
  weather: string[];
  probability?: number;
}

export interface DecodedTaf {
  icao: string;
  issueTime: string;
  validFrom: string;
  validTo: string;
  raw: string;
  periods: TafPeriod[];
}
