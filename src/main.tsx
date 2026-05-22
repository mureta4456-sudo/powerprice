import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// -----------------------------------------------------------------------------
// Service worker reģistrācija (PWA "Install App" + offline fallback).
//
// `updateViaCache: 'none'` ir KRITISKI svarīgs: tas liek pārlūkam NEKAD
// neserverēt /sw.js no HTTP keša, kad tas pārbauda atjauninājumus. Tas nozīmē,
// ka jauns deploy tiek pamanīts nākamajā lapas ielādē.
// -----------------------------------------------------------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((reg) => {
        // Papildus pārbaude reizi stundā, ja tabs paliek atvērts ilgi.
        setInterval(() => {
          reg.update().catch(() => { /* ignore */ });
        }, 60 * 60 * 1000);
      })
      .catch((err) => {
        console.warn("Service worker registration failed:", err);
      });

    // Kad jauns SW pārņem kontroli, automātiski pārlādējam lapu vienreiz,
    // lai lietotājs redzētu jaunāko HTML / bundle bez manuālas atsvaidzināšanas.
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}
