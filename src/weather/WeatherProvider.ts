// src/weather/WeatherProvider.ts

export interface WeatherQuery {
  /** Local date/time of the lunch */
  dateTime: Date;
  /** Latitude in decimal degrees */
  latitude: number;
  /** Longitude in decimal degrees */
  longitude: number;
}

export interface WeatherResult {
  /** ISO time string for the matched hour */
  time: string;
  /** Air temperature at 2m in °C */
  temperatureC: number;
  /** WMO weather code from Open-Meteo */
  weatherCode: number;
  /** True if pulled from archive API rather than forecast */
  isHistorical: boolean;
  /** Name of the provider, e.g. "open-meteo" */
  providerName: string;
}

export interface WeatherProvider {
  getWeather(query: WeatherQuery): Promise<WeatherResult>;
}
