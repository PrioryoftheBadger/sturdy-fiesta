// src/App.tsx
import { useMemo, useState } from "react";
import { CATEGORIES, MAX_BASE_TOTAL } from "./categories";
import type { ScoresState } from "./types";
import type { LunchRecord } from "./storage/StorageTypes";
import { useStorage } from "./storage/StorageProvider";

import MetaSection from "./components/MetaSection";
import CategoryList from "./components/CategoryList";
import BonusSection from "./components/BonusSection";

function App() {
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState<ScoresState>({});
  const [serverRememberedName, setServerRememberedName] = useState(false);
  const [someoneOrderedSalad, setSomeoneOrderedSalad] = useState(false);

  const [bestQuote, setBestQuote] = useState("");
  const [mostRegrettableOrder, setMostRegrettableOrder] = useState("");
  const [conspiracy, setConspiracy] = useState("");
  const [futureVenue, setFutureVenue] = useState("");

  const storage = useStorage();

  const baseTotal = useMemo(
    () =>
      CATEGORIES.reduce(
        (sum, cat) =>
          sum + (Number.isFinite(scores[cat.id]) ? scores[cat.id] : 0),
        0
      ),
    [scores]
  );

  const finalTotal = useMemo(() => {
    let total = baseTotal;
    if (serverRememberedName) total += 5;
    if (someoneOrderedSalad) total -= 3;
    if (total < 0) total = 0;
    return total;
  }, [baseTotal, serverRememberedName, someoneOrderedSalad]);

  const handleScoreChange = (id: string, value: string) => {
    const numeric = Math.max(0, Math.min(10, Number(value) || 0));
    setScores((prev) => ({ ...prev, [id]: numeric }));
  };

  const handleSave = async () => {
    if (!venue || !date) {
      alert("Please add a venue and date before saving.");
      return;
    }

    const record: LunchRecord = {
      id: `${date}-${venue}`.toLowerCase().replace(/\s+/g, "-"),
      venue,
      date,
      scores,
      bonuses: {
        serverRememberedName,
        someoneOrderedSalad,
      },
      bestQuote,
      mostRegrettableOrder,
      conspiracy,
      futureVenue,
    };

    try {
      await storage.save(record);
      alert("Lunch saved to this browser 🧾");
    } catch (err) {
      console.error(err);
      alert("Could not save lunch. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            🍔 Team Lunch Score App
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Because no meal is complete without dubious data and questionable
            metrics.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <MetaSection
          venue={venue}
          date={date}
          baseTotal={baseTotal}
          maxBaseTotal={MAX_BASE_TOTAL}
          finalTotal={finalTotal}
          serverRememberedName={serverRememberedName}
          someoneOrderedSalad={someoneOrderedSalad}
          onVenueChange={setVenue}
          onDateChange={setDate}
          onToggleServerRememberedName={setServerRememberedName}
          onToggleSomeoneOrderedSalad={setSomeoneOrderedSalad}
          onSave={handleSave}
        />

        <CategoryList scores={scores} onScoreChange={handleScoreChange} />

        <BonusSection
          bestQuote={bestQuote}
          mostRegrettableOrder={mostRegrettableOrder}
          conspiracy={conspiracy}
          futureVenue={futureVenue}
          onBestQuoteChange={setBestQuote}
          onMostRegrettableOrderChange={setMostRegrettableOrder}
          onConspiracyChange={setConspiracy}
          onFutureVenueChange={setFutureVenue}
        />

        <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <h2 className="text-base font-semibold">Summary (coming soon)</h2>
          <p className="mt-1">
            Next iteration: list all saved lunches from your configured storage
            backend and build a Hall of Fame / Shame leaderboard.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
