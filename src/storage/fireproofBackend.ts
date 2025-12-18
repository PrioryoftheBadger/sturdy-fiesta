// src/storage/fireproofBackend.ts
import { fireproof, index } from "fireproof";
import type { ListResult, LunchRecord, StorageBackend } from "./StorageTypes";

type FireproofDoc = LunchRecord & { _id: string };

function toDocument(record: LunchRecord): FireproofDoc {
  return { ...record, _id: record.id };
}

function toRecord(doc: FireproofDoc): LunchRecord {
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

function sortByDateVenue(a: LunchRecord, b: LunchRecord): number {
  // Newest date first, then alpha by venue to mirror current UI expectations.
  if (a.date !== b.date) {
    return b.date.localeCompare(a.date);
  }
  return a.venue.localeCompare(b.venue);
}

export function createFireproofBackend(options?: {
  databaseName?: string;
}): StorageBackend {
  const databaseName = options?.databaseName ?? "team-lunch";
  const db = fireproof(databaseName);

  const byDateVenue = index(
    `${databaseName}-by-date-venue`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc: FireproofDoc, map: (key: [string, string], value: any) => void) => {
      if (!doc.date || !doc.venue) return;
      map([doc.date, doc.venue], null);
    }
  );

  return {
    async save(record: LunchRecord): Promise<void> {
      await db.put(toDocument(record));
    },

    async load(id: string): Promise<LunchRecord | null> {
      try {
        const doc = (await db.get(id)) as FireproofDoc;
        if (!doc) return null;
        return toRecord(doc);
      } catch (err) {
        console.warn("Fireproof load failed", err);
        return null;
      }
    },

    async listRecords(): Promise<ListResult<LunchRecord>> {
      const queryResult = await db.query(byDateVenue, { include_docs: true });

      const rows: unknown[] =
        // query() returns { rows } when using indexes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (queryResult as any)?.rows ??
        // or raw docs if no rows shape is provided
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (queryResult as any)?.docs ??
        [];

      const docs: (FireproofDoc | null)[] = await Promise.all(
        rows.map(async (row: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const doc = (row as any)?.doc ?? (row as any)?.value ?? row;

          if (doc && typeof doc === "object" && "_id" in doc) {
            return doc as FireproofDoc;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const id = (row as any)?.id;
          if (!id) return null;

          try {
            return (await db.get(id)) as FireproofDoc;
          } catch (err) {
            console.warn("Fireproof listRecords failed to load doc", err);
            return null;
          }
        })
      );

      const items = docs
        .filter((doc): doc is FireproofDoc => Boolean(doc))
        .map(toRecord)
        .sort(sortByDateVenue);

      return { items };
    },

    async remove(id: string): Promise<void> {
      try {
        const doc = (await db.get(id)) as FireproofDoc;
        if (doc) {
          await db.del(doc);
        }
      } catch (err) {
        console.warn("Fireproof delete failed", err);
      }
    },
  };
}
