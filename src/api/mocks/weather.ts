import { DecodedMetar, DecodedTaf, FlightCategory } from '../types';

const metarDatabase: Record<string, DecodedMetar> = {
  EBBR: {
    icao: 'EBBR',
    observationTime: new Date().toISOString(),
    raw: 'EBBR 131150Z 25012G22KT 9999 FEW035 SCT045 BKN080 18/12 Q1018 NOSIG',
    flightCategory: 'VFR',
    wind: { direction: 250, speed: 12, gust: 22, unit: 'KT' },
    visibility: { value: 10, unit: 'SM', qualifier: 'P' },
    clouds: [
      { coverage: 'FEW', altitude: 3500 },
      { coverage: 'SCT', altitude: 4500 },
      { coverage: 'BKN', altitude: 8000 },
    ],
    ceiling: 8000,
    weather: [],
    temperature: 18,
    dewpoint: 12,
    altimeter: { value: 1018, unit: 'hPa' },
  },
  EBAW: {
    icao: 'EBAW',
    observationTime: new Date().toISOString(),
    raw: 'EBAW 131150Z 27008KT 5000 -RA BR SCT008 BKN015 OVC025 14/13 Q1016',
    flightCategory: 'MVFR',
    wind: { direction: 270, speed: 8, unit: 'KT' },
    visibility: { value: 3, unit: 'SM' },
    clouds: [
      { coverage: 'SCT', altitude: 800 },
      { coverage: 'BKN', altitude: 1500 },
      { coverage: 'OVC', altitude: 2500 },
    ],
    ceiling: 1500,
    weather: ['-RA', 'BR'],
    temperature: 14,
    dewpoint: 13,
    altimeter: { value: 1016, unit: 'hPa' },
  },
  EHAM: {
    icao: 'EHAM',
    observationTime: new Date().toISOString(),
    raw: 'EHAM 131150Z 31015G28KT 2000 +TSRA BKN005 OVC010CB 12/11 Q1012 TEMPO 0800 +TSRA',
    flightCategory: 'IFR',
    wind: { direction: 310, speed: 15, gust: 28, unit: 'KT' },
    visibility: { value: 1.25, unit: 'SM' },
    clouds: [
      { coverage: 'BKN', altitude: 500 },
      { coverage: 'OVC', altitude: 1000, type: 'CB' },
    ],
    ceiling: 500,
    weather: ['+TSRA'],
    temperature: 12,
    dewpoint: 11,
    altimeter: { value: 1012, unit: 'hPa' },
  },
  LFPG: {
    icao: 'LFPG',
    observationTime: new Date().toISOString(),
    raw: 'LFPG 131150Z 00000KT 0200 FG VV001 08/08 Q1020',
    flightCategory: 'LIFR',
    wind: { direction: 0, speed: 0, unit: 'KT' },
    visibility: { value: 0.125, unit: 'SM' },
    clouds: [],
    ceiling: 100,
    weather: ['FG'],
    temperature: 8,
    dewpoint: 8,
    altimeter: { value: 1020, unit: 'hPa' },
    remarks: 'VV001',
  },
};

const tafDatabase: Record<string, DecodedTaf> = {
  EBBR: {
    icao: 'EBBR',
    issueTime: new Date().toISOString(),
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    raw: `TAF EBBR 131100Z 1312/1412 25012G22KT 9999 FEW035 SCT045
  TEMPO 1314/1318 4000 SHRA BKN020
  BECMG 1318/1320 18008KT 9999 SCT040
  FM140200 VRB03KT 3000 BR BKN008
  PROB40 TEMPO 1404/1408 0800 FG VV002`,
    periods: [
      {
        type: 'BASE',
        from: new Date().toISOString(),
        to: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        flightCategory: 'VFR',
        wind: { direction: 250, speed: 12, gust: 22, unit: 'KT' },
        visibility: { value: 10, unit: 'SM' },
        clouds: [
          { coverage: 'FEW', altitude: 3500 },
          { coverage: 'SCT', altitude: 4500 },
        ],
        ceiling: undefined,
        weather: [],
      },
      {
        type: 'TEMPO',
        from: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        flightCategory: 'MVFR',
        wind: { direction: 250, speed: 12, gust: 22, unit: 'KT' },
        visibility: { value: 2.5, unit: 'SM' },
        clouds: [{ coverage: 'BKN', altitude: 2000 }],
        ceiling: 2000,
        weather: ['SHRA'],
      },
      {
        type: 'BECMG',
        from: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        flightCategory: 'VFR',
        wind: { direction: 180, speed: 8, unit: 'KT' },
        visibility: { value: 10, unit: 'SM' },
        clouds: [{ coverage: 'SCT', altitude: 4000 }],
        ceiling: undefined,
        weather: [],
      },
      {
        type: 'FM',
        from: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
        flightCategory: 'IFR',
        wind: { direction: 'VRB', speed: 3, unit: 'KT' },
        visibility: { value: 1.9, unit: 'SM' },
        clouds: [{ coverage: 'BKN', altitude: 800 }],
        ceiling: 800,
        weather: ['BR'],
      },
      {
        type: 'PROB40',
        from: new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
        flightCategory: 'LIFR',
        wind: { direction: 'VRB', speed: 3, unit: 'KT' },
        visibility: { value: 0.5, unit: 'SM' },
        clouds: [],
        ceiling: 200,
        weather: ['FG'],
        probability: 40,
      },
    ],
  },
};

export const getMetar = (icao: string): DecodedMetar | null => {
  const upper = icao.toUpperCase();
  return metarDatabase[upper] || null;
};

export const getTaf = (icao: string): DecodedTaf | null => {
  const upper = icao.toUpperCase();
  return tafDatabase[upper] || null;
};

// Generate a default METAR for unknown stations
export const generateDefaultMetar = (icao: string): DecodedMetar => {
  const categories: FlightCategory[] = ['VFR', 'MVFR', 'IFR', 'LIFR'];
  const category = categories[Math.floor(Math.random() * 2)]; // Bias toward VFR/MVFR

  return {
    icao: icao.toUpperCase(),
    observationTime: new Date().toISOString(),
    raw: `${icao.toUpperCase()} 131150Z 27010KT 9999 FEW040 22/15 Q1015`,
    flightCategory: category,
    wind: { direction: 270, speed: 10, unit: 'KT' },
    visibility: { value: 10, unit: 'SM', qualifier: 'P' },
    clouds: [{ coverage: 'FEW', altitude: 4000 }],
    ceiling: undefined,
    weather: [],
    temperature: 22,
    dewpoint: 15,
    altimeter: { value: 1015, unit: 'hPa' },
  };
};
