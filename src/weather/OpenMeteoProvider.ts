// src/weather/OpenMeteoProvider.ts

import { WeatherProvider, WeatherQuery, WeatherResult } from "./WeatherProvider";

/**
 * OpenMeteo implementation of WeatherProvider.
 * Uses forecast API for today/future, archive API for past dates.
 */
export class OpenMeteoProvider implements WeatherProvider {
  private readonly FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
  private readonly ARCHIVE_URL = "https://archive.open-meteo.com/v1/archive";

  async getWeather(query: WeatherQuery): Promise<WeatherResult> {
    const { dateTime, latitude, longitude } = query;

    if (Number.isNaN(dateTime.getTime())) {
      throw new Error("Invalid date passed to OpenMeteoProvider");
    }

    const targetDateStr = dateTime.toISOString().slice(0, 10); // YYYY-MM-DD
    const targetHour = dateTime.getHours();

    const today = new Date();
    const todayDateStr = today.toISOString().slice(0, 10);
    const isPastDate = targetDateStr < todayDateStr;

    const baseUrl = isPastDate ? this.ARCHIVE_URL : this.FORECAST_URL;

    const url = new URL(baseUrl);
    url.searchParams.set("latitude", latitude.toString());
    url.searchParams.set("longitude", longitude.toString());
    url.searchParams.set("hourly", "temperature_2m,weathercode");
    url.searchParams.set("start_date", targetDateStr);
    url.searchParams.set("end_date", targetDateStr);
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Open-Meteo request failed with ${response.status}`);
    }

    const data = await response.json();

    if (!data.hourly || !Array.isArray(data.hourly.time)) {
      throw new Error("Unexpected Open-Meteo response structure");
    }

    const times: string[] = data.hourly.time;
    const temps: number[] = data.hourly.temperature_2m;
    const codes: number[] = data.hourly.weathercode;

    // Find the record matching the requested hour (local time)
    let bestIndex = 0;
    let bestHourDiff = Number.POSITIVE_INFINITY;

    times.forEach((t, idx) => {
      const d = new Date(t);
      const hour = d.getHours();
      const diff = Math.abs(hour - targetHour);
      if (diff < bestHourDiff) {
        bestHourDiff = diff;
        bestIndex = idx;
      }
    });

    const time = times[bestIndex];
    const temperatureC = temps[bestIndex];
    const weatherCode = codes[bestIndex];

    return {
      time,
      temperatureC,
      weatherCode,
      isHistorical: isPastDate,
      providerName: "open-meteo",
    };
  }
}
