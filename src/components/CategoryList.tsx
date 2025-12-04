// src/components/CategoryList.tsx
import { CATEGORIES } from "../categories";
import type { ScoresState } from "../types";
import WeatherWidget from "./components/WeatherWidget";

type CategoryListProps = {
  scores: ScoresState;
  onScoreChange: (id: string, value: string) => void;
};

export default function CategoryList({
  scores,
  onScoreChange,
}: CategoryListProps) {
  return (
    <section className="space-y-2">
                <div>
            <h2 className="text-base font-semibold text-stone-900">
              Rate the experience
            </h2>
            <p className="mt-0.5 text-xs text-stone-700">
              Score each from{" "}
              <span className="font-semibold text-emerald-700">0–10</span>.{" "}
              <span className="text-[0.7rem]">
                0 = “never again”, 10 = “lunch of legend”.
              </span>
            </p>
          </div>

      <div className="mt-2 space-y-3">
        {CATEGORIES.map((cat) => (
            <div
            key={cat.id}
            className="rounded-2xl border border-amber-200 bg-amber-50 p-3 shadow-sm"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-stone-900">
                            {cat.name}
                        </h3>
                        {cat.id === "weatherManagement" && (
                        <WeatherWidget
                            dateTime={
                            date
                                ? new Date(`${date}T12:00:00`)
                                : (() => {
                                    const now = new Date();
                                    now.setHours(12, 0, 0, 0);  // force lunch-time weather
                                    return now;
                                })()
                            }
                            latitude={-41.2865}
                            longitude={174.7762}
                        />
                        )}
                    
                        <p className="mt-1 text-[0.75rem] leading-snug text-stone-700">
                            {cat.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <label className="text-[0.65rem] font-semibold uppercase tracking-wide text-stone-600">
                            Score
                        </label>
                        <div className="mt-1 flex items-center gap-1 text-sm">
                            <input
                                type="number"
                                min={0}
                                max={10}
                                step={1}
                                value={scores[cat.id] ?? ""}
                                onChange={(e) => onScoreChange(cat.id, e.target.value)}
                                className="w-14 rounded-lg border border-amber-300 bg-white px-2 py-1 text-right text-sm shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                            />
                            <span className="text-[0.7rem] text-stone-500">/ 10</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}
