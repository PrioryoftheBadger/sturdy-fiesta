// src/weather/WeatherEmoji.ts

/**
 * Utility for mapping Open-Meteo WMO weather codes
 * to emojis and short human-readable descriptions.
 *
 * Codes: https://open-meteo.com/en/docs
 */
export class WeatherEmoji {
  static emojiFromCode(code: number): string {
    // Clear / mainly clear
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";

    // Fog
    if (code === 45 || code === 48) return "🌫️";

    // Drizzle
    if (code === 51 || code === 53 || code === 55) return "🌦️";

    // Freezing drizzle
    if (code === 56 || code === 57) return "🌧️🧊";

    // Rain
    if ([61, 63, 65].includes(code)) return "🌧️";
    if ([66, 67].includes(code)) return "🌧️🧊";

    // Snow
    if ([71, 73, 75, 77].includes(code)) return "🌨️";

    // Showers
    if ([80, 81, 82].includes(code)) return "🌦️";

    // Thunder
    if ([95, 96, 99].includes(code)) return "⛈️";

    return "❓";
  }

  static descriptionFromCode(code: number): string {
    const base = (() => {
      switch (code) {
        case 0:
          return "Clear skies";
        case 1:
          return "Mostly sunny";
        case 2:
          return "Partly cloudy";
        case 3:
          return "Overcast";
        case 45:
        case 48:
          return "Fog or mist";
        case 51:
        case 53:
        case 55:
          return "Light drizzle";
        case 56:
        case 57:
          return "Freezing drizzle";
        case 61:
        case 63:
        case 65:
          return "Rain showers";
        case 66:
        case 67:
          return "Cold, icy rain";
        case 71:
        case 73:
        case 75:
          return "Snowfall";
        case 77:
          return "Snow grains";
        case 80:
        case 81:
        case 82:
          return "Passing showers";
        case 95:
          return "Thunderstorms";
        case 96:
        case 99:
          return "Thunderstorms with hail";
        default:
          return "Unusual conditions";
      }
    })();

    // Tiny bit of flavour for your “dubious metrics” vibe
    if (code === 0 || code === 1) {
      return `${base}, perfect for smug walks back to the office`;
    }
    if ([61, 63, 65, 80, 81, 82].includes(code)) {
      return `${base}, umbrella regret highly likely`;
    }
    return base;
  }
}
