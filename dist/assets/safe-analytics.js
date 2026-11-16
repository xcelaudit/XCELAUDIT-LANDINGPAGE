/**
 * Safe, non-blocking analytics helpers.
 *
 * Root cause (observed with ad blockers / privacy extensions):
 * - GTM / Google Ads may inject form listeners that fire requests to
 *   googletagmanager.com / google.com/pagead/form-data on submit.
 * - Those requests often fail with net::ERR_BLOCKED_BY_CLIENT.
 * - If business logic awaits or shares a try/catch with tracking, a
 *   blocked script or thrown error can abort organization creation.
 *
 * Protection:
 * - Never await analytics.
 * - Wrap every dataLayer / gtag touch in try/catch.
 * - Swallow all errors so tracking failures cannot abort form submission.
 * - Call track* only AFTER the business API succeeds (fire-and-forget).
 */

function getDataLayer() {
  if (typeof window === "undefined") return null;
  try {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  } catch {
    return null;
  }
}

/**
 * Push a payload to GTM dataLayer. Fire-and-forget; never throws.
 */
export function pushDataLayer(payload) {
  try {
    const dataLayer = getDataLayer();
    if (!dataLayer || typeof dataLayer.push !== "function") return;
    dataLayer.push(payload);
  } catch {
    // Ad blockers may stub or break dataLayer; ignore.
  }
}

/**
 * Optional gtag() call when the global exists. Fire-and-forget; never throws.
 */
export function safeGtag(...args) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag(...args);
  } catch {
    // Ignore blocked / missing gtag.
  }
}

/**
 * Track a successful signup conversion without blocking navigation.
 * Preserves existing GTM behavior when the container is available.
 */
export function trackSignupConversion(extra = {}) {
  // Intentionally not returned / not awaited by callers.
  try {
    pushDataLayer({
      event: "signup_form_conversion",
      form_name: "signup_organization",
      page_type: "signup",
      ...extra,
    });
    safeGtag("event", "conversion", {
      send_to: undefined,
      event_category: "signup",
      event_label: "create_organisation",
    });
  } catch {
    // Never rethrow — organization creation must not depend on tracking.
  }
}

/**
 * Track a successful contact conversion (thank-you / contact flows).
 */
export function trackContactConversion(extra = {}) {
  try {
    pushDataLayer({
      event: "contact_form_conversion",
      form_name: "contact",
      page_type: "thank_you",
      ...extra,
    });
  } catch {
    // Never rethrow.
  }
}
