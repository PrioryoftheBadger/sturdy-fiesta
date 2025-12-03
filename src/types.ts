// src/types.ts
export type Category = {
  id: string;
  name: string;
  description: string;
};

export type ScoresState = Record<string, number>;

export type LunchRecord = {
  id: string;
  venue: string;
  date: string;
  scores: ScoresState;
  serverRememberedName: boolean;
  someoneOrderedSalad: boolean;
  bestQuote: string;
  mostRegrettableOrder: string;
  conspiracy: string;
  futureVenue: string;
  baseTotal: number;
  finalTotal: number;
  createdAt: string;
};
