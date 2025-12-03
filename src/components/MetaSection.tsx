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
    <section className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-3">
      <div className="md:col-span-2 space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Venue name
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="e.g. The Hypothetical Bistro"
            value={venue}
            onChange={(e) => onVenueChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            type="date"
            className="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Current score
          </div>
          <div className="mt-1 text-2xl font-bold">
            {finalTotal}{" "}
            <span className="text-sm font-normal text-slate-500">
              / {maxBaseTotal}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Base: {baseTotal} (15 × 0–10) + bonuses
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={serverRememberedName}
              onChange={(e) => onToggleServerRememberedName(e.target.checked)}
            />
            Server remembered our name (+5)
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={someoneOrderedSalad}
              onChange={(e) => onToggleSomeoneOrderedSalad(e.target.checked)}
            />
            Someone ordered salad “just to be good” (−3)
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
