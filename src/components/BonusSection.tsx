// src/components/BonusSection.tsx
type BonusSectionProps = {
  bestQuote: string;
  mostRegrettableOrder: string;
  conspiracy: string;
  futureVenue: string;
  onBestQuoteChange: (value: string) => void;
  onMostRegrettableOrderChange: (value: string) => void;
  onConspiracyChange: (value: string) => void;
  onFutureVenueChange: (value: string) => void;
};

export default function BonusSection({
  bestQuote,
  mostRegrettableOrder,
  conspiracy,
  futureVenue,
  onBestQuoteChange,
  onMostRegrettableOrderChange,
  onConspiracyChange,
  onFutureVenueChange,
}: BonusSectionProps) {
  return (
    <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Bonus rounds</h2>
      <p className="text-sm text-slate-600">
        Completely non-scientific but essential for the official record.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Best Quote of the Lunch
          </label>
          <textarea
            className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={bestQuote}
            onChange={(e) => onBestQuoteChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Most Regrettable Order
          </label>
          <textarea
            className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={mostRegrettableOrder}
            onChange={(e) => onMostRegrettableOrderChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Conspiracy Theory of the Week
          </label>
          <textarea
            className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={conspiracy}
            onChange={(e) => onConspiracyChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Future Venue Nomination
          </label>
          <textarea
            className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={futureVenue}
            onChange={(e) => onFutureVenueChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
