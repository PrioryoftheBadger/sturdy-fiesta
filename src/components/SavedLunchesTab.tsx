import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, MAX_BASE_TOTAL } from "../categories";
import type { LunchRecord } from "../storage/StorageTypes";
import { useStorage } from "../storage/StorageProvider";

function TabHeader({ onRefresh, refreshing }: { onRefresh: () => void; refreshing: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-100/70 px-3 py-2 text-sm font-semibold text-stone-800">
      <span className="flex items-center gap-2">
        <span aria-hidden="true">📖</span>
        Saved lunches
      </span>
      <button
        type="button"
        onClick={onRefresh}
        className="rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-amber-700 active:bg-amber-800 disabled:cursor-not-allowed disabled:bg-amber-300"
        disabled={refreshing}
      >
        {refreshing ? "Refreshing…" : "Refresh"}
      </button>
    </div>
  );
}

function LunchItem({
  record,
  onDelete,
}: {
  record: LunchRecord;
  onDelete: (id: string) => void;
}) {
  const baseTotal = useMemo(
    () =>
      CATEGORIES.reduce(
        (sum, cat) => sum + (Number.isFinite(record.scores[cat.id]) ? record.scores[cat.id] : 0),
        0
      ),
    [record.scores]
  );

  const finalTotal = useMemo(() => {
    let total = baseTotal;
    if (record.bonuses.serverRememberedName) total += 5;
    if (record.bonuses.someoneOrderedSalad) total -= 3;
    if (total < 0) total = 0;
    return total;
  }, [baseTotal, record.bonuses.serverRememberedName, record.bonuses.someoneOrderedSalad]);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-amber-100 bg-white/70 p-3 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-stone-900">{record.venue}</p>
          <p className="text-xs text-stone-600">{record.date}</p>
        </div>
        <div className="text-right text-xs text-stone-700">
          <p className="font-semibold text-stone-900">
            {finalTotal} <span className="text-[0.6rem] text-stone-500">/ {MAX_BASE_TOTAL}</span>
          </p>
          <p className="text-[0.65rem] text-stone-600">Base: {baseTotal}</p>
        </div>
      </header>

      <dl className="grid grid-cols-1 gap-2 text-xs text-stone-700 sm:grid-cols-2">
        {record.bestQuote && (
          <div className="rounded-lg bg-amber-50/70 px-2 py-1">
            <dt className="font-semibold text-stone-800">Best quote</dt>
            <dd className="mt-0.5 text-stone-700">“{record.bestQuote}”</dd>
          </div>
        )}
        {record.mostRegrettableOrder && (
          <div className="rounded-lg bg-amber-50/70 px-2 py-1">
            <dt className="font-semibold text-stone-800">Most regrettable</dt>
            <dd className="mt-0.5 text-stone-700">{record.mostRegrettableOrder}</dd>
          </div>
        )}
        {record.conspiracy && (
          <div className="rounded-lg bg-amber-50/70 px-2 py-1">
            <dt className="font-semibold text-stone-800">Conspiracy</dt>
            <dd className="mt-0.5 text-stone-700">{record.conspiracy}</dd>
          </div>
        )}
        {record.futureVenue && (
          <div className="rounded-lg bg-amber-50/70 px-2 py-1">
            <dt className="font-semibold text-stone-800">Future venue</dt>
            <dd className="mt-0.5 text-stone-700">{record.futureVenue}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-stone-600">
        <div className="flex items-center gap-2">
          {record.bonuses.serverRememberedName && (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Server remembered</span>
          )}
          {record.bonuses.someoneOrderedSalad && (
            <span className="rounded-full bg-red-100 px-2 py-1 text-red-700">Someone ordered salad</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDelete(record.id)}
          className="rounded-full bg-stone-200 px-3 py-1 font-semibold text-stone-700 hover:bg-stone-300 active:bg-stone-400"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default function SavedLunchesTab() {
  const storage = useStorage();
  const [records, setRecords] = useState<LunchRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await storage.listRecords();
      setRecords(result.items);
    } catch (err) {
      console.error(err);
      setError("Could not load saved lunches. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storage.remove(id);
      await loadRecords();
    } catch (err) {
      console.error(err);
      setError("Could not delete lunch. Check console for details.");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="space-y-3">
      <TabHeader onRefresh={loadRecords} refreshing={loading} />

      <div className="space-y-3">
        {loading && (
          <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/50 p-4 text-sm text-stone-700">
            Loading your saved lunches…
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/50 p-4 text-sm text-stone-700">
            No lunches saved yet. Save one from the Score tab to see it here.
          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="space-y-3">
            {records.map((record) => (
              <LunchItem key={record.id} record={record} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
