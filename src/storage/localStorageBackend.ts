// src/storage/localStorageBackend.ts
import type { StorageBackend } from "./StorageProvider";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

/**
 * Small helper to safely access localStorage without blowing up in
 * non-browser or restricted environments.
 */
function safeLocalStorage() {
  if (!isBrowser) return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function createLocalStorageBackend(
  options?: { prefix?: string }
): StorageBackend {
  const prefix = options?.prefix ?? "team-lunch:";

  const makeKey = (key: string) => `${prefix}${key}`;

  return {
    async getItem(key: string): Promise<string | null> {
      const ls = safeLocalStorage();
      if (!ls) return null;
      return ls.getItem(makeKey(key));
    },

    async setItem(key: string, value: string): Promise<void> {
      const ls = safeLocalStorage();
      if (!ls) return;
      ls.setItem(makeKey(key), value);
    },

    async removeItem(key: string): Promise<void> {
      const ls = safeLocalStorage();
      if (!ls) return;
      ls.removeItem(makeKey(key));
    },

    async listKeys(prefixFilter?: string): Promise<string[]> {
      const ls = safeLocalStorage();
      if (!ls) return [];
      const keys: string[] = [];
      const fullPrefix = prefixFilter
        ? makeKey(prefixFilter)
        : prefix;

      for (let i = 0; i < ls.length; i++) {
        const rawKey = ls.key(i);
        if (!rawKey) continue;
        if (rawKey.startsWith(fullPrefix)) {
          keys.push(rawKey);
        }
      }

      // Strip the global prefix back off
      return keys.map((k) => k.replace(prefix, ""));
    },
  };
}
