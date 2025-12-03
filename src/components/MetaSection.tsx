// src/components/MetaSection.tsx
type MetaSectionProps = {
  venue: string;
  date: string;
  baseTotal: number;
  maxBaseTotal: number;
  finalTotal: number;
  serverRememberedName: boolean;
  someoneOrderedSalad: boolean;
  onVenueChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onToggleServerRememberedName: (value: boolean) => void;
  onToggleSomeoneOrderedSalad: (value: boolean) => void;
  onSave: () => void;
};

export default function MetaSection({
  venue,
  date,
  baseTotal,
  maxBaseTotal,
  finalTotal,
  serverRememberedName,
  someoneOrderedSalad,
  onVenueChange,
  onDateChange,
  onToggleServerRememberedName,
  onToggleSomeoneOrderedSalad,
  onSave,
}: MetaSectionProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-amber-200 bg-amber-100/70 p-4 shadow-sm">
        <div className="space-y-3">
        <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-stone-700">
            Venue
            </label>
            <input
                type="text"
                className="mt-1 w-full rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm shadow-inner placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                placeholder="e.g. Big Bun Burgers"
                value={venue}
                onChange={(e) => onVenueChange(e.target.value)}
            />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-stone-700">
            Date
          </label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-stone-900 px-4 py-3 text-stone-50">
        <div className="flex items-baseline justify-between">
            <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-amber-200">
                    Current score
                </p>
                <p className="mt-1 text-2xl font-extrabold">
                    {finalTotal}
                    <span className="text-sm font-normal text-amber-200">
                    {" "}
                    / {maxBaseTotal}
                    </span>
                </p>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-emerald-100">
                {finalTotal >= maxBaseTotal * 0.75
                    ? "Hall of Fame"
                    : finalTotal >= maxBaseTotal * 0.5
                    ? "Solid Lunch"
                    : finalTotal >= maxBaseTotal * 0.25
                    ? "Never Again"
                    : "Burn The Place Down"}
                </div>
            </div>
            <p className="mt-1 text-[0.7rem] text-amber-100/80">
                Base: {baseTotal} (15 × 0–10) + secret burger bonuses.
            </p>
            <div className="mt-3 space-y-1.5 text-xs">
              <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-500 bg-stone-800 text-emerald-400 focus:ring-emerald-400"
                    checked={serverRememberedName}
                    onChange={(e) => onToggleServerRememberedName(e.target.checked)}
                />
                <span>Server remembered our name (+5)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-stone-500 bg-stone-800 text-red-400 focus:ring-red-400"
                  checked={someoneOrderedSalad}
                  onChange={(e) => onToggleSomeoneOrderedSalad(e.target.checked)}
                />
            <span>Someone ordered salad “just to be good” (−3)</span>
          </label>
        </div>

            <button
            type="button"
            onClick={onSave}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-amber-700 active:bg-amber-800"
            >
            🍔 Save this lunch
            </button>
        </div>
    </section>
  );
}
