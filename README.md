# sturdy-fiesta
Vibe coded team lunch evaluation app

## Storage backends

The app supports multiple storage backends through `StorageProvider`:

- **localStorage** (default): lightweight, browser-only persistence.
- **Fireproof**: enable by setting `VITE_USE_FIREPROOF=true` in your `.env.local` or environment when running Vite. This instantiates a Fireproof database named `team-lunch` and stores each lunch record using its `id` as the Fireproof document `_id`.

### Seeding/migrating existing localStorage data

If you have existing lunches in localStorage and want to move them into Fireproof:

1. Start the dev server with Fireproof enabled (`VITE_USE_FIREPROOF=true npm run dev`). Keep your existing browser tab so localStorage data remains available.
2. In the browser console of the running app, execute:

   ```js
   const { createLocalStorageBackend } = await import("/src/storage/localStorageBackend.ts");
   const { createFireproofBackend } = await import("/src/storage/fireproofBackend.ts");

   const local = createLocalStorageBackend();
   const fireproof = createFireproofBackend();
   const { items } = await local.listRecords();
   await Promise.all(items.map((item) => fireproof.save(item)));

   console.info(`Migrated ${items.length} lunches into Fireproof.`);
   ```

3. Refresh the page; the Hall of Fame tab should now load from Fireproof.
