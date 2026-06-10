/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./hooks/LanguageContext.jsx";
import Language from "./Language.jsx";
import Effect from "./hooks/Effect.jsx";
import Score from "./hooks/Score.jsx";
import Callback from "./hooks/Callback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <LanguageProvider>
      <Language />
    </LanguageProvider>
    <Effect />
    <Score />
    <Callback />
  </StrictMode>,
);
