// src/App.tsx
import { useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  description: string;
};

const CATEGORIES: Category[] = [
  {
    id: "preLunchHype",
    name: "Pre-Lunch Hype",
    description:
      "How well was the lunch organised? Invites, menus, reminders – did it feel vaguely professional?",
  },
  {
    id: "distanceToVenue",
    name: "Distance to Venue",
    description:
      "Perfect balance between “brisk constitutional” and “why didn’t we take the bus?”.",
  },
  {
    id: "weatherManagement",
    name: "Weather Management",
    description:
      "Bonus vibes if it didn’t rain or gale. Double if someone forgot an umbrella.",
  },
  {
    id: "firstImpressions",
    name: "First Impressions",
    description:
      "Did the place look inviting, or like a front for something mildly unlicensed?",
  },
  {
    id: "ambianceAcoustics",
    name: "Ambiance & Acoustics",
    description:
      "Could you hear your colleagues, or only the espresso machine and existential dread?",
  },
  {
    id: "tableConfiguration",
    name: "Table Configuration",
    description:
      "Can everyone see everyone else, or is someone marooned on the orphan seat in the corner?",
  },
  {
    id: "serviceSpeed",
    name: "Service Speed",
    description: "Graded on a generous curve: faster than a glacier = 10.",
  },
  {
    id: "foodQuality",
    name: "Food Quality",
    description:
      "Tasted good? Looked edible? We’re not checking the kitchen hygiene rating today.",
  },
  {
    id: "beverageSelection",
    name: "Beer / Beverage Selection",
    description:
      "Range, quality, and price. Bonus vibes for non-alcoholic options that don’t taste like regret.",
  },
  {
    id: "conversationQuality",
    name: "Conversation Quality",
    description:
      "Witty banter, light gossip, or at least one non-awkward weekend plan.",
  },
  {
    id: "unexpectedGuestStar",
    name: "Unexpected Guest Star",
    description:
      "Boss? Client? That one person from IT? Did their presence improve or tank the mood?",
  },
  {
    id: "budgetCompliance",
    name: "Budget Compliance",
    description:
      "Did you stay within limit or creatively rebrand dessert as “staff morale initiative”?",
  },
  {
    id: "managerialApproval",
    name: "Managerial Approval Rating",
    description:
      "Would HR plausibly describe this as a “good use of public funds”?",
  },
  {
    id: "digestiveAftermath",
    name: "Digestive Aftermath",
    description:
      "Were naps discussed? Was regret felt? Would you do it again tomorrow?",
  },
  {
    id: "returnToOfficeVelocity",
    name: "Return to Office Velocity",
    description:
      "Did the walk back feel shorter or longer? Adjust for post-lunch lethargy.",
  },
];

type ScoresState = Record<string, number>;

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

  const baseTotal = useMemo(
    () =>
      CATEGORIES.reduce(
        (sum, cat) => sum + (Number.isFinite(scores[cat.id]) ? scores[cat.id] : 0),
        0
      ),
    [scores]
  );

  const maxBaseTotal = CATEGORIES.length * 10;

  const finalTotal = useMemo(() => {
    let total = baseTotal;
    if (serverRememberedName) total += 5;
    if (someoneOrderedSalad) total -= 3;
    // keep things sensible
    if (total < 0) total = 0;
    return total;
  }, [baseTotal, serverRememberedName, someoneOrderedSalad]);

  const handleScoreChange = (id: string, value: string) => {
    const numeric = Math.max(0, Math.min(10, Number(value) || 0));
    setScores((prev) => ({ ...prev, [id]: numeric }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">
            🥪 Team Lunch Score App
          </h1>
          <p className="mt-1 text-slate-600">
            Because no meal is complete without dubious data and questionable metrics.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Meta info */}
        <section className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Venue name
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. The Hypothetical Bistro"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                className="mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  checked={serverRememberedName}
                  onChange={(e) => setServerRememberedName(e.target.checked)}
                />
                Server remembered our name (+5)
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  checked={someoneOrderedSalad}
                  onChange={(e) => setSomeoneOrderedSalad(e.target.checked)}
                />
                Someone ordered salad “just to be good” (−3)
              </label>
            </div>
          </div>
        </section>

        {/* Category scores */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Scoring categories</h2>
          <p className="text-sm text-slate-600">
            Rate each category from <strong>0–10</strong>. Zero = “let’s never
            speak of this again”, ten = “legendary team lore”.
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
                        onChange={(e) =>
                          handleScoreChange(cat.id, e.target.value)
                        }
                        className="w-16 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

        {/* Bonus rounds */}
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
                className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={bestQuote}
                onChange={(e) => setBestQuote(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Most Regrettable Order
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={mostRegrettableOrder}
                onChange={(e) => setMostRegrettableOrder(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Conspiracy Theory of the Week
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={conspiracy}
                onChange={(e) => setConspiracy(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Future Venue Nomination
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={futureVenue}
                onChange={(e) => setFutureVenue(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Summary / export stub */}
        <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <h2 className="text-base font-semibold">Summary (coming soon)</h2>
          <p className="mt-1">
            Next iteration: export this lunch as JSON/CSV, save to{" "}
            <code>localStorage</code>, or build a “Hall of Fame / Shame”
            leaderboard.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
