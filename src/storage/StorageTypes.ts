// src/storage/StorageTypes.ts

/**
 * The shape of a single saved Team Lunch entry.
 * This can be expanded later (e.g., add ID, timestamps, versioning, etc.)
 */
export interface LunchRecord {
  id: string;                     // unique key (uuid, timestamp, etc.)
  venue: string;
  date: string;
  scores: Record<string, number>;
  bonuses: {
    serverRememberedName: boolean;
    someoneOrderedSalad: boolean;
  };
  bestQuote: string;
  mostRegrettableOrder: string;
  conspiracy: string;
  futureVenue: string;
}

/**
 * Result returned by listRecords()
 */
export interface ListResult<T> {
  items: T[];
}

/**
 * A backend must implement this interface to store Team Lunch records.
 * You can write adapters for:
 *   - localStorage
 *   - Google Sheets API
 *   - Supabase
 *   - a REST JSON API
 *   - Azure Functions or Cloudflare Workers
 */
export interface StorageBackend {
  /**
   * Saves or updates an existing record.
   */
  save(record: LunchRecord): Promise<void>;

  /**
   * Loads a single record by its ID.
   */
  load(id: string): Promise<LunchRecord | null>;

  /**
   * Lists all stored records.
   */
  listRecords(): Promise<ListResult<LunchRecord>>;

  /**
   * Deletes a record.
   */
  remove(id: string): Promise<void>;
}
