// src/storage/localStorageBackend.ts
import type {
  StorageBackend,
  LunchRecord,
  ListResult,
} from "./StorageTypes";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

/**
 * Safely access localStorage (avoids SSR / restricted-frame crashes).
 */
function safeLocalStorage() {
  if (!isBrowser) return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * A clean, spec-aligned LocalStorage backend.
 * Stores:
 *   team-lunch:record:<id> = JSON.stringify(LunchRecord)
 */
export function createLocalStorageBackend(
  options?: { prefix?: string }
): StorageBackend {
  const prefix = options?.prefix ?? "team-lunch:";
  const recordPrefix = `${prefix}record:`; // e.g. team-lunch:record:abc123

  const makeRecordKey = (id: string) => `${recordPrefix}${id}`;

  return {
    // -------------------------------------------------------------
    // SAVE
    // -------------------------------------------------------------
    async save(record: LunchRecord): Promise<void> {
      const ls = safeLocalStorage();
      if (!ls) return;

      const key = makeRecordKey(record.id);
      const json = JSON.stringify(record);
      ls.setItem(key, json);
    },

    // -------------------------------------------------------------
    // LOAD
    // -------------------------------------------------------------
    async load(id: string): Promise<LunchRecord | null> {
      const ls = safeLocalStorage();
      if (!ls) return null;

      const raw = ls.getItem(makeRecordKey(id));
      if (!raw) return null;

      try {
        return JSON.parse(raw) as LunchRecord;
      } catch {
        return null;
      }
    },

    // -------------------------------------------------------------
    // LIST
    // -------------------------------------------------------------
    async listRecords(): Promise<ListResult<LunchRecord>> {
      const ls = safeLocalStorage();
      if (!ls) return { items: [] };

      const items: LunchRecord[] = [];

      for (let i = 0; i < ls.length; i++) {
        const key = ls.key(i);
        if (!key) continue;
        if (!key.startsWith(recordPrefix)) continue;

        const raw = ls.getItem(key);
        if (!raw) continue;

        try {
          const parsed = JSON.parse(raw) as LunchRecord;
          items.push(parsed);
        } catch {
          // ignore corrupt items
        }
      }

      return { items };
    },

    // -------------------------------------------------------------
    // REMOVE
    // -------------------------------------------------------------
    async remove(id: string): Promise<void> {
      const ls = safeLocalStorage();
      if (!ls) return;

      ls.removeItem(makeRecordKey(id));
    },
  };
}
