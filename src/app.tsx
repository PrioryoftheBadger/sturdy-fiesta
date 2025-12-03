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
        (sum, cat) =>
          sum + (Number.isFinite(scores[cat.id]) ? scores[cat.id] : 0),
        0
      ),
    [scores]
  );

  const maxBaseTotal = CATEGORIES.length * 10;

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
                Log the vibes, rate the burgers, crown the legends.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col gap-5 px-4 py-5 pb-24">
        {/* Meta + score overview */}
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
                onChange={(e) => setVenue(e.target.value)}
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
                onChange={(e) => setDate(e.target.value)}
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
                  ? "Solid Feed"
                  : "Try Again Next Time"}
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
                  onChange={(e) => setServerRememberedName(e.target.checked)}
                />
                <span>Server remembered our name (+5)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-stone-500 bg-stone-800 text-red-400 focus:ring-red-400"
                  checked={someoneOrderedSalad}
                  onChange={(e) => setSomeoneOrderedSalad(e.target.checked)}
                />
                <span>Someone ordered salad “just to be good” (−3)</span>
              </label>
            </div>
          </div>
        </section>

        {/* Categories */}
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
                        onChange={(e) =>
                          handleScoreChange(cat.id, e.target.value)
                        }
                        className="w-14 rounded-lg border border-amber-300 bg-white px-2 py-1 text-right text-sm shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                      />
                      <span className="text-[0.7rem] text-stone-500">/10</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bonus rounds */}
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
                onChange={(e) => setBestQuote(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Most regrettable order
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-300/60"
                value={mostRegrettableOrder}
                onChange={(e) => setMostRegrettableOrder(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Conspiracy theory of the week
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                value={conspiracy}
                onChange={(e) => setConspiracy(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-amber-200">
                Future venue nomination
              </label>
              <textarea
                className="mt-1 h-20 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm shadow-inner placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                value={futureVenue}
                onChange={(e) => setFutureVenue(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Summary / stub */}
        <section className="mb-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-4 text-xs text-stone-800">
          <h2 className="text-sm font-semibold">Summary (coming soon)</h2>
          <p className="mt-1">
            Next up: save this lunch to{" "}
            <code className="rounded bg-stone-900/90 px-1 py-0.5 text-[0.7rem] text-amber-100">
              localStorage
            </code>{" "}
            and build a{" "}
            <span className="font-semibold text-emerald-700">
              Hall of Fame / Shame
            </span>{" "}
            for all future burger adventures.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
