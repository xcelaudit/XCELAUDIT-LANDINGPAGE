/**
 * Analytics layer — fully decoupled from business logic.
 * All functions are fire-and-forget; failures never throw or block forms/API calls.
 */
import { CONVERSION_STORAGE_KEY } from "./form-client.js";

const GTM_ID = "GTM-56ZDPRTS";
let gtmLoaded = false;

function safeRun(fn) {
  try {
    fn();
  } catch {
    // ad blocker or missing script — ignore
  }
}

/** Schedule analytics work so it never blocks rendering or navigation */
export function runWhenIdle(fn) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => safeRun(fn), { timeout: 2000 });
  } else {
    setTimeout(() => safeRun(fn), 0);
  }
}

export function loadGtm() {
  if (gtmLoaded || typeof window === "undefined") return;
  gtmLoaded = true;
  safeRun(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    script.onerror = () => {
      // GTM blocked — do nothing
    };
    document.head.appendChild(script);
  });
}

export function pushDataLayer(event) {
  safeRun(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  });
}

/** Queue conversion for thank-you page — implemented in form-client.js (no GTM deps) */

/** Fire queued conversion on thank-you page — never awaited by business logic */
export function flushQueuedConversion() {
  runWhenIdle(() => {
    loadGtm();
    safeRun(() => {
      const raw = sessionStorage.getItem(CONVERSION_STORAGE_KEY);
      if (!raw) {
        pushDataLayer({ event: "contact_form_conversion", page_type: "thank_you" });
        return;
      }
      sessionStorage.removeItem(CONVERSION_STORAGE_KEY);
      const meta = JSON.parse(raw);
      pushDataLayer({
        event: "contact_form_conversion",
        form_name: meta.form || "contact",
        page_type: "thank_you",
      });
    });
  });
}
