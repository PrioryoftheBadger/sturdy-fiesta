// src/storage/StorageProvider.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import type { StorageBackend } from "./StorageTypes";

/**
 * React context so the rest of the app doesn't care *how* we store,
 * only that we have something implementing StorageBackend.
 */
const StorageContext = createContext<StorageBackend | null>(null);

type StorageProviderProps = {
  backend: StorageBackend;
  children: ReactNode;
};

/**
 * StorageProvider – plug in any backend here (localStorage, Google Sheets proxy,
 * Supabase, etc.) and the rest of the app doesn't need to change.
 */
export function StorageProvider({ backend, children }: StorageProviderProps) {
  // Memoise to avoid re-renders if parent re-renders.
  const value = useMemo(() => backend, [backend]);

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}

/**
 * Hook to grab the backend anywhere in the tree.
 */
export function useStorage(): StorageBackend {
  const ctx = useContext(StorageContext);
  if (!ctx) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return ctx;
}
