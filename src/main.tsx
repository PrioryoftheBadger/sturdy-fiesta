// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

import { StorageProvider } from "./storage/StorageProvider";
import { createLocalStorageBackend } from "./storage/localStorageBackend";

const backend = createLocalStorageBackend();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StorageProvider backend={backend}>
      <App />
    </StorageProvider>
  </React.StrictMode>
);
