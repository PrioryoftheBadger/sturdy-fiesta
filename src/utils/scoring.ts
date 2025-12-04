import { CATEGORIES } from "../categories";
import type { LunchRecord } from "../storage/StorageTypes";

export type ScoreTotals = {
  baseTotal: number;
  finalTotal: number;
};

export function computeFinalScore(
  scores: LunchRecord["scores"],
  bonuses: LunchRecord["bonuses"]
): ScoreTotals {
  const baseTotal = CATEGORIES.reduce(
    (sum, cat) => sum + (Number.isFinite(scores[cat.id]) ? (scores[cat.id] as number) : 0),
    0
  );

  let finalTotal = baseTotal;
  if (bonuses.serverRememberedName) finalTotal += 5;
  if (bonuses.someoneOrderedSalad) finalTotal -= 3;
  if (finalTotal < 0) finalTotal = 0;

  return { baseTotal, finalTotal };
}
