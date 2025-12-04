// src/components/WeatherWidget.tsx

import React, { useEffect, useState } from "react";
import {
  WeatherProvider,
  WeatherResult,
} from "../weather/WeatherProvider";
import { OpenMeteoProvider } from "../weather/OpenMeteoProvider";
import { WeatherEmoji } from "../weather/WeatherEmoji";

const defaultProvider = new OpenMeteoProvider();

interface WeatherWidgetProps {
  /** Local date of the lunch (including time, e.g. 12:00) */
  dateTime: Date;
  latitude: number;
  longitude: number;
  provider?: WeatherProvider;
}

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; data: WeatherResult }
  | { status: "error"; error: string };

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  dateTime,
  latitude,
  longitude,
  provider = defaultProvider,
}) => {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading" });
      try {
        const data = await provider.getWeather({ dateTime, latitude, longitude });
        if (!cancelled) {
          setState({ status: "loaded", data });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            error:
              err instanceof Error ? err.message : "Failed to load weather",
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [dateTime, latitude, longitude, provider]);

  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className="mt-1 text-[0.7rem] text-stone-500">
        Checking what the sky was doing…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="mt-1 text-[0.7rem] text-stone-500">
        Weather gremlins interfered. (No data)
      </div>
    );
  }

  const { data } = state;
  const emoji = WeatherEmoji.emojiFromCode(data.weatherCode);
  const description = WeatherEmoji.descriptionFromCode(data.weatherCode);

  return (
    <div className="mt-1 flex items-center gap-2 text-[0.7rem] text-stone-700">
      <span className="text-base leading-none">{emoji}</span>
      <span>{Math.round(data.temperatureC)}°C</span>
      <span className="truncate">
        {description}
      </span>
    </div>
  );
};

export default WeatherWidget;
