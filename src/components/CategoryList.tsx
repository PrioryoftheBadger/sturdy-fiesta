// src/components/CategoryList.tsx
import { CATEGORIES } from "../categories";
import type { ScoresState } from "../types";

type CategoryListProps = {
  scores: ScoresState;
  onScoreChange: (id: string, value: string) => void;
};

export default function CategoryList({
  scores,
  onScoreChange,
}: CategoryListProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Scoring categories</h2>
      <p className="text-sm text-slate-600">
        Rate each category from <strong>0–10</strong>. Zero = “let’s never speak
        of this again”, ten = “legendary team lore”.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">{cat.name}</h3>
                <div className="flex items-baseline gap-1 text-sm">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={1}
                    value={scores[cat.id] ?? ""}
                    onChange={(e) => onScoreChange(cat.id, e.target.value)}
                    className="w-16 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-right text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-500">/ 10</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
