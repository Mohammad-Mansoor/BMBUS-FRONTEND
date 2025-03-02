import * as React from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/system";
import { I18nextProvider } from "react-i18next";
import i18n from "./localization/i18-configuration.js";
import { ToastProvider } from "@heroui/react";
import Navbar from "./layouts/components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />

      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </HeroUIProvider>
  </StrictMode>
);
