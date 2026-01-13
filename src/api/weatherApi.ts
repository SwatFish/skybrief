import { Station, DecodedMetar, DecodedTaf } from './types';
import { mockStations, getNearbyStations } from './mocks/stations';
import { getMetar, getTaf, generateDefaultMetar } from './mocks/weather';

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Weather API - Mocked for frontend development
 * These functions simulate API calls that will later connect to a real backend
 */

export const weatherApi = {
  /**
   * GET /api/stations
   * Returns all available stations
   */
  async getStations(): Promise<Station[]> {
    await delay(200);
    return mockStations;
  },

  /**
   * GET /api/stations/nearby
   * Returns stations near user's location
   */
  async getNearbyStations(limit = 5): Promise<Station[]> {
    await delay(300);
    return getNearbyStations(limit);
  },

  /**
   * GET /api/stations/search?q=...
   * Search stations by ICAO or name
   */
  async searchStations(query: string): Promise<Station[]> {
    await delay(150);
    const q = query.toLowerCase();
    return mockStations.filter(
      (s) =>
        s.icao.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  },

  /**
   * GET /api/metar?icao=XXXX
   * Returns decoded METAR for station
   */
  async getMetar(icao: string): Promise<DecodedMetar> {
    await delay(400);
    const metar = getMetar(icao);
    if (metar) return metar;
    // Generate default for unknown stations
    return generateDefaultMetar(icao);
  },

  /**
   * GET /api/taf?icao=XXXX
   * Returns decoded TAF for station
   */
  async getTaf(icao: string): Promise<DecodedTaf | null> {
    await delay(400);
    return getTaf(icao);
  },

  /**
   * GET /api/weather?icao=XXXX
   * Returns both METAR and TAF
   */
  async getWeather(icao: string): Promise<{ metar: DecodedMetar; taf: DecodedTaf | null }> {
    const [metar, taf] = await Promise.all([
      this.getMetar(icao),
      this.getTaf(icao),
    ]);
    return { metar, taf };
  },
};

export default weatherApi;
