import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

import { appWindow } from "@tauri-apps/api/window";
const minimizeButton = document.getElementById("titlebar-minimize");
if (minimizeButton) {
  minimizeButton.addEventListener("click", () => appWindow.minimize());
}

const maximizeButton = document.getElementById("titlebar-maximize");
if (maximizeButton) {
  maximizeButton.addEventListener("click", () => appWindow.toggleMaximize());
}

const closeButton = document.getElementById("titlebar-close");
if (closeButton) {
  closeButton.addEventListener("click", () => appWindow.close());
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
