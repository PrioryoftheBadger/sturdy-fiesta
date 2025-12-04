// src/App.tsx
import { useMemo, useState } from "react";
import { MAX_BASE_TOTAL } from "./categories";
import type { ScoresState } from "./types";
import type { LunchRecord } from "./storage/StorageTypes";
import { useStorage } from "./storage/StorageProvider";
import { computeFinalScore } from "./utils/scoring";

import MetaSection from "./components/MetaSection";
import CategoryList from "./components/CategoryList";
import BonusSection from "./components/BonusSection";
import SavedLunchesTab from "./components/SavedLunchesTab";

function App() {
  const [activeTab, setActiveTab] = useState<"score" | "saved">("score");
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

  const { baseTotal, finalTotal } = useMemo(
    () =>
      computeFinalScore(scores, {
        serverRememberedName,
        someoneOrderedSalad,
      }),
    [scores, serverRememberedName, someoneOrderedSalad]
  );

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
    <div className="min-h-screen bg-amber-50 text-stone-900">
      {/* Toasty bun header */}
      <header className="sticky top-0 z-10 border-b border-amber-200 bg-amber-100/95 backdrop-blur">
        <div className="mx-auto max-w-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 shadow-inner">
              <span className="text-xl" aria-hidden="true">
                🍔
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Team Lunch Score App
              </h1>
              <p className="text-xs text-stone-700">
                Because no meal is complete without dubious data and questionable
            metrics.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col gap-5 px-4 py-5 pb-24">
        <section className="rounded-2xl border border-amber-200 bg-white/70 shadow-sm">
          <div className="flex items-center gap-2 border-b border-amber-100 px-3 py-2 text-sm font-semibold text-stone-700">
            <button
              type="button"
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                activeTab === "score"
                  ? "bg-amber-200 text-stone-900 shadow-inner"
                  : "hover:bg-amber-100"
              }`}
              onClick={() => setActiveTab("score")}
            >
              Score lunch
            </button>
            <button
              type="button"
              className={`flex-1 rounded-xl px-3 py-2 transition ${
                activeTab === "saved"
                  ? "bg-amber-200 text-stone-900 shadow-inner"
                  : "hover:bg-amber-100"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Saved lunches
            </button>
          </div>

          <div className="p-4">
            {activeTab === "score" ? (
              <div className="flex flex-col gap-5">
                {/* Meta + score overview */}
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

                {/* Categories */}
                <CategoryList scores={scores} onScoreChange={handleScoreChange} />

                {/* Bonus rounds */}
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
                    Next iteration: list all saved lunches from your configured
                    storage backend and build a Hall of Fame / Shame leaderboard.
                  </p>
                </section>
              </div>
            ) : (
              <SavedLunchesTab />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
