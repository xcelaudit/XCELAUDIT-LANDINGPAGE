/**
 * Form API client — no analytics imports, no tracking dependencies.
 * REST calls execute independently of GTM/GA/Ads/pixels.
 */
export const FORM_ENDPOINTS = {
  contact: "/submit/contact",
  signup: "/submit/signup",
};

export const CONVERSION_STORAGE_KEY = "xcel_pending_conversion";

/** Record successful submit for thank-you page analytics — sync, never throws */
export function queueConversion(meta) {
  try {
    sessionStorage.setItem(
      CONVERSION_STORAGE_KEY,
      JSON.stringify({ ...meta, ts: Date.now() })
    );
  } catch {
    // storage blocked — form success is unaffected
  }
}

function parseApiResponse(response, rawBody) {
  let result = {};

  if (rawBody) {
    try {
      result = JSON.parse(rawBody);
    } catch (error){
      console.log("error",error)
      throw new Error(error);
    }
  }

  if (typeof result.body === "string") {
    try {
      const nested = JSON.parse(result.body);
      result = { ...result, ...nested };
    } catch {
      // keep original result when body is plain text
    }
  }

  const statusCode = typeof result.statusCode === "number" ? result.statusCode : response.status;
  const errorMessage =
    result.message ||
    result.errorMessage ||
    (typeof result.error === "string" ? result.error : result.error?.message) ||
    null;

  const isExplicitFailure =
    result.success === false ||
    result.status === "error" ||
    result.status === "failed" ||
    statusCode >= 400 ||
    Boolean(result.error);

  const isExplicitSuccess =
    result.success === true || result.status === "success" || result.status === "ok";

  const looksLikeSuccessMessage = (msg) =>
    /thank|success|saved|received|submitted|created/i.test(msg);

  if (!response.ok || isExplicitFailure) {
    throw new Error(errorMessage || "Unable to submit the form. Please try again.");
  }

  if (errorMessage && !isExplicitSuccess && !looksLikeSuccessMessage(errorMessage)) {
    throw new Error(errorMessage);
  }

  if (!isExplicitSuccess && statusCode >= 300) {
    throw new Error(errorMessage || "Unable to submit the form. Please try again.");
  }

  return result;
}

/** POST JSON to same-origin form endpoint. Never calls analytics. */
export async function postJson(url, payload) {
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "same-origin",
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  const rawBody = await response.text().catch(() => "");
  return parseApiResponse(response, rawBody);
}
