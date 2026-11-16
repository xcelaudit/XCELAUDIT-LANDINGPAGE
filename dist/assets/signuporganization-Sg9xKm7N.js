import { r as React, j as e, useNavigate } from "./index-DPk8qX9O.js";
import { N as Navbar, m as motion, A as Arrow, F as Footer } from "./proxy-DtzmdYRh.js";
import { COUNTRY_DATA, COUNTRIES } from "./country-states-data.js";
import { trackSignupConversion } from "./safe-analytics.js";

const { useState, useEffect } = React;

// Business API — must succeed independently of GTM/analytics.
// Note: API Gateway must allow anonymous execute-api:Invoke and return HTTP 2xx
// for OPTIONS preflight with Allow-Methods including POST (see api-gateway-resource-policy.json).
const SIGNUP_API = "https://u2jbv2odgg.execute-api.ap-south-1.amazonaws.com/prod/createOrganisation";

function deriveOrganisationCode(name) {
  const letters = name.replace(/[^a-zA-Z]/g, "");
  return letters.slice(0, 3).toUpperCase();
}

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

function isValidGSTIN(gstin) {
  return GST_REGEX.test(gstin.toUpperCase());
}

function sanitizeGSTINInput(value) {
  const raw = value.toUpperCase().replace(/[^0-9A-Z]/g, "");
  let result = "";

  for (let i = 0; i < raw.length && i < 15; i++) {
    const char = raw[i];

    if (i < 2) {
      if (/[0-9]/.test(char)) result += char;
    } else if (i < 7) {
      if (/[A-Z]/.test(char)) result += char;
    } else if (i < 11) {
      if (/[0-9]/.test(char)) result += char;
    } else if (i === 11) {
      if (/[A-Z]/.test(char)) result += char;
    } else if (i === 12) {
      if (/[1-9A-Z]/.test(char)) result += char;
    } else if (i === 13) {
      if (char === "Z") result += char;
    } else if (i === 14) {
      if (/[0-9A-Z]/.test(char)) result += char;
    }
  }

  return result;
}

const MOBILE_REGEX = /^[0-9]{10}$/;

function isValidMobileNumber(mobile) {
  return MOBILE_REGEX.test(mobile);
}

function sanitizeMobileInput(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}

const perks = [
  { v: "3 Days", l: "Full-featured free trial" },
  { v: "No Card", l: "Required to get started" },
  { v: "24 hrs", l: "Typical onboarding turnaround" },
  { v: "2,700+", l: "Audits executed end-to-end on the platform" },
  { v: "100%", l: "NFRA & Peer Review ready workflows" },
];

async function submitSignupForm(payload) {
  // Pure business call — no analytics, no GTM, no awaited tracking.
  let response;
  try {
    response = await fetch(SIGNUP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    // Browsers surface failed CORS preflight / blocked cross-origin as TypeError("Failed to fetch").
    // This is independent of ad blockers blocking GTM; do not conflate the two.
    const hint =
      networkError instanceof TypeError
        ? "Unable to reach the signup service (network or CORS). Please try again, or contact support if this persists."
        : "Unable to submit signup. Please try again.";
    throw new Error(hint);
  }

  const rawBody = await response.text().catch(() => "");
  let result = {};

  if (rawBody) {
    try {
      result = JSON.parse(rawBody);
    } catch {
      throw new Error("Unexpected response from server. Please try again.");
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

  const looksLikeSuccessMessage = (msg) => /thank|success|saved|received|submitted|created/i.test(msg);

  if (!response.ok || isExplicitFailure) {
    throw new Error(errorMessage || "Unable to submit signup. Please try again.");
  }

  if (errorMessage && !isExplicitSuccess && !looksLikeSuccessMessage(errorMessage)) {
    throw new Error(errorMessage);
  }

  if (!isExplicitSuccess && statusCode >= 300) {
    throw new Error(errorMessage || "Unable to submit signup. Please try again.");
  }

  return result;
}

function SignupOrganizationPage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [gstNumber, setGstNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const states = COUNTRY_DATA[country]?.states || [];

  useEffect(() => {
    const dial = COUNTRY_DATA[country]?.dial || "";
    setCountryCode(dial);
    setState("");
  }, [country]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!country.trim()) {
      setError("Please select a country.");
      return;
    }

    if (!state.trim()) {
      setError("Please select a state.");
      return;
    }

    const normalizedGstNumber = gstNumber.trim().toUpperCase();

    if (!isValidGSTIN(normalizedGstNumber)) {
      setError("Please enter a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5).");
      return;
    }

    const normalizedMobileNumber = mobileNumber.trim();

    if (!isValidMobileNumber(normalizedMobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const organisationName = String(formData.get("organisation_name") || "").trim();

    const payload = {
      organisation_name: organisationName,
      organisation_code: deriveOrganisationCode(organisationName),
      organisation_state: state,
      organisation_country: country,
      organisation_zip_code: String(formData.get("organisation_zip_code") || "").trim(),
      organisation_data_center: "Mumbai",
      gst_number: normalizedGstNumber,
      organisation_person_name: String(formData.get("organisation_person_name") || "").trim(),
      organisation_person_emailid: String(formData.get("organisation_person_emailid") || "").trim(),
      organisation_person_country_code: countryCode,
      organisation_person_contact: normalizedMobileNumber,
    };

    try {
      // 1) Business action only — must not depend on GTM / analytics.
      await submitSignupForm(payload);

      // 2) Tracking is fire-and-forget AFTER success. Never await.
      //    Ad blockers may block GTM/pagead; that must not undo signup or block navigation.
      try {
        trackSignupConversion();
      } catch {
        // Defense in depth: trackSignupConversion already swallows errors.
      }

      navigate({ to: "/thank-you" });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return e.jsxs("div", {
    className: "min-h-screen bg-background",
    children: [
      e.jsx(Navbar, {}),
      e.jsx("main", {
        className: "pt-32 pb-24",
        children: e.jsx("div", {
          className: "container-x",
          children: e.jsxs("div", {
            className: "grid lg:grid-cols-2 gap-12 lg:gap-20",
            children: [
              e.jsxs(motion.div, {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                children: [
                  e.jsx("p", {
                    className: "text-xs uppercase tracking-[0.18em] font-semibold text-brand",
                    children: "Start Free Trial",
                  }),
                  e.jsxs("h1", {
                    className: "mt-4 text-balance text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]",
                    children: [
                      "Set up your firm on ",
                      e.jsx("span", { className: "gradient-text", children: "XcelAudit" }),
                      ".",
                    ],
                  }),
                  e.jsx("p", {
                    className: "mt-5 text-lg text-ink-soft leading-relaxed",
                    children:
                      "Create your organisation profile to start a 3-day free trial. Full platform access — no credit card required.",
                  }),
                  e.jsx("div", {
                    className: "mt-10 grid grid-cols-2 gap-4",
                    children: perks.map((item, index) =>
                      e.jsxs(motion.div, {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 + index * 0.06 },
                        className: "rounded-xl border border-border bg-card p-4",
                        children: [
                          e.jsx("div", { className: "text-2xl font-semibold gradient-text", children: item.v }),
                          e.jsx("div", { className: "mt-1 text-xs text-ink-soft leading-snug", children: item.l }),
                        ],
                      }, item.l)
                    ),
                  }),
                  e.jsxs("div", {
                    className: "mt-10 rounded-2xl border border-border bg-muted/30 p-5",
                    children: [
                      e.jsx("p", {
                        className: "text-sm font-semibold text-foreground",
                        children: "What happens next?",
                      }),
                      e.jsx("p", {
                        className: "mt-2 text-sm text-ink-soft leading-relaxed",
                        children:
                          "After you submit, our team provisions your organisation workspace and reaches out within one business day with login details.",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx(motion.div, {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.15 },
                className: "lg:sticky lg:top-28 lg:self-start",
                children: e.jsxs("div", {
                  className: "rounded-3xl border border-border bg-card shadow-card p-8 md:p-10",
                  children: [
                    e.jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: "Organisation signup" }),
                    e.jsx("p", {
                      className: "mt-2 text-sm text-ink-soft",
                      children: "Tell us about your firm and primary contact person.",
                    }),
                    e.jsxs("form", {
                      onSubmit: handleSubmit,
                      className: "mt-8 space-y-6",
                      children: [
                        e.jsxs("div", {
                          className: "space-y-5",
                          children: [
                            e.jsx(SectionLabel, { children: "Organisation details" }),
                            e.jsx(Field, {
                              label: "Organisation Name",
                              name: "organisation_name",
                              required: true,
                              disabled: isSubmitting,
                            }),
                            e.jsxs("div", {
                              className: "grid sm:grid-cols-2 gap-5",
                              children: [
                                e.jsx(SearchableSelect, {
                                  label: "Country",
                                  name: "organisation_country",
                                  value: country,
                                  onChange: setCountry,
                                  options: COUNTRIES,
                                  placeholder: "Search country...",
                                  disabled: isSubmitting,
                                }),
                                e.jsx(SearchableSelect, {
                                  label: "State",
                                  name: "organisation_state",
                                  value: state,
                                  onChange: setState,
                                  options: states,
                                  placeholder: country ? "Search state..." : "Select country first",
                                  disabled: isSubmitting || states.length === 0,
                                }),
                              ],
                            }),
                            e.jsx(Field, {
                              label: "ZIP / Postal Code",
                              name: "organisation_zip_code",
                              required: true,
                              disabled: isSubmitting,
                            }),
                            e.jsx(GSTNumberField, {
                              value: gstNumber,
                              onChange: setGstNumber,
                              disabled: isSubmitting,
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "space-y-5 pt-2",
                          children: [
                            e.jsx(SectionLabel, { children: "Primary contact" }),
                            e.jsx(Field, {
                              label: "Contact Person Name",
                              name: "organisation_person_name",
                              required: true,
                              disabled: isSubmitting,
                            }),
                            e.jsx(Field, {
                              label: "Email Address",
                              name: "organisation_person_emailid",
                              type: "email",
                              required: true,
                              disabled: isSubmitting,
                            }),
                            e.jsx(Field, {
                              label: "Country Code",
                              name: "organisation_person_country_code",
                              value: countryCode,
                              readOnly: true,
                              disabled: true,
                            }),
                            e.jsx(MobileNumberField, {
                              value: mobileNumber,
                              onChange: setMobileNumber,
                              disabled: isSubmitting,
                            }),
                          ],
                        }),
                        error
                          ? e.jsx("p", {
                              className: "text-sm text-destructive text-center",
                              role: "alert",
                              children: error,
                            })
                          : null,
                        e.jsxs("div", {
                          className: "pt-6 mt-2",
                          children: [
                            e.jsxs("button", {
                              type: "submit",
                              disabled: isSubmitting,
                              className:
                                "w-full inline-flex items-center justify-center gap-2 h-14 px-8 py-3 rounded-md gradient-brand text-brand-foreground font-medium shadow-brand hover:opacity-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
                              children: [isSubmitting ? "Submitting..." : "Start Free 3-Day Trial", e.jsx(Arrow, { className: "h-4 w-4" })],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      }),
      e.jsx(Footer, {}),
    ],
  });
}

function SectionLabel({ children }) {
  return e.jsx("p", {
    className: "text-xs uppercase tracking-[0.16em] font-semibold text-brand",
    children,
  });
}

function MobileNumberField({ value, onChange, disabled = false }) {
  return e.jsxs("div", {
    children: [
      e.jsxs("label", {
        htmlFor: "organisation_person_contact",
        className: "text-sm font-medium",
        children: ["Mobile Number ", e.jsx("span", { className: "text-brand", children: "*" })],
      }),
      e.jsx("input", {
        id: "organisation_person_contact",
        name: "organisation_person_contact",
        type: "tel",
        required: true,
        disabled,
        value,
        maxLength: 10,
        inputMode: "numeric",
        autoComplete: "tel",
        placeholder: "e.g. 9876543210",
        pattern: "[0-9]{10}",
        title: "Enter a 10-digit mobile number using numbers only.",
        onChange: (event) => onChange(sanitizeMobileInput(event.target.value)),
        className:
          "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60",
      }),
    ],
  });
}

function GSTNumberField({ value, onChange, disabled = false }) {
  return e.jsxs("div", {
    children: [
      e.jsxs("label", {
        htmlFor: "gst_number",
        className: "text-sm font-medium",
        children: ["GST Number ", e.jsx("span", { className: "text-brand", children: "*" })],
      }),
      e.jsx("input", {
        id: "gst_number",
        name: "gst_number",
        type: "text",
        required: true,
        disabled,
        value,
        maxLength: 15,
        autoComplete: "off",
        spellCheck: false,
        inputMode: "text",
        placeholder: "e.g. 29ABCDE1234F1Z5",
        pattern: "[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]",
        title: "15-character GSTIN: 2-digit state code + PAN + entity number + Z + checksum (e.g. 29ABCDE1234F1Z5)",
        onChange: (event) => onChange(sanitizeGSTINInput(event.target.value)),
        className:
          "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60",
      }),
      e.jsx("p", {
        className: "mt-1.5 text-xs text-ink-soft",

      }),
    ],
  });
}

function Field({ label, name, type = "text", required = false, disabled = false, placeholder, maxLength, value, readOnly = false }) {
  return e.jsxs("div", {
    children: [
      e.jsxs("label", {
        htmlFor: name,
        className: "text-sm font-medium",
        children: [label, " ", required ? e.jsx("span", { className: "text-brand", children: "*" }) : null],
      }),
      e.jsx("input", {
        id: name,
        name,
        type,
        required,
        disabled,
        readOnly,
        placeholder,
        maxLength,
        value,
        className:
          "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60 read-only:bg-muted/40 read-only:cursor-default",
      }),
    ],
  });
}

function SearchableSelect({ label, name, value, onChange, options, disabled = false, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) setQuery(value || "");
  }, [value, open]);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? options.filter((option) => option.toLowerCase().includes(normalizedQuery))
    : options.slice(0, 80);

  function selectOption(option) {
    onChange(option);
    setQuery(option);
    setOpen(false);
  }

  return e.jsxs("div", {
    className: "relative",
    children: [
      e.jsxs("label", {
        htmlFor: name,
        className: "text-sm font-medium",
        children: [label, " ", e.jsx("span", { className: "text-brand", children: "*" })],
      }),
      e.jsx("input", {
        id: name,
        name,
        type: "text",
        role: "combobox",
        "aria-expanded": open,
        "aria-autocomplete": "list",
        disabled,
        value: open ? query : value,
        placeholder: value ? undefined : placeholder,
        autoComplete: "off",
        onChange: (event) => {
          setQuery(event.target.value);
          setOpen(true);
        },
        onFocus: () => {
          if (!disabled) setOpen(true);
        },
        onBlur: () => {
          setTimeout(() => setOpen(false), 150);
        },
        className:
          "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60",
      }),
      open && !disabled && filtered.length > 0
        ? e.jsx("ul", {
            className:
              "absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-card shadow-card py-1",
            children: filtered.map((option) =>
              e.jsx("li", {
                onMouseDown: (event) => {
                  event.preventDefault();
                  selectOption(option);
                },
                className: `px-3.5 py-2 text-sm cursor-pointer hover:bg-muted/60 ${option === value ? "bg-muted/40 font-medium" : ""}`,
                children: option,
              }, option)
            ),
          })
        : null,
      open && !disabled && filtered.length === 0
        ? e.jsx("div", {
            className:
              "absolute z-30 mt-1 w-full rounded-lg border border-border bg-card shadow-card px-3.5 py-2.5 text-sm text-muted-foreground",
            children: "No matches found",
          })
        : null,
    ],
  });
}

export { SignupOrganizationPage as component };
