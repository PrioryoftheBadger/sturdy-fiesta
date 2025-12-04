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
        <section className="space-y-3 rounded-2xl border border-stone-200 bg-stone-900/95 p-4 text-stone-50 shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 text-xs">
              🔥
            </span>
            Bonus rounds
          </h2>
          <p className="text-xs text-amber-100">
            The important qualitative data: quotes, chaos and future cravings.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Best quote of the lunch
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                value={bestQuote}
                onChange={(e) => onBestQuoteChange(e.target.value)}
              />
        </div>
        <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Most regrettable order
            </label>
            <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-300/60"           
                value={mostRegrettableOrder}
                onChange={(e) => onMostRegrettableOrderChange(e.target.value)}
            />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Conspiracy theory of the week
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                value={conspiracy}
                onChange={(e) => onConspiracyChange(e.target.value)}
              />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Future venue nomination
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                value={futureVenue}
                onChange={(e) => onFutureVenueChange(e.target.value)}
            />
        </div>
      </div>
    </section>
  );
}
