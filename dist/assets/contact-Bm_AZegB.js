import { r as React, j as e, useNavigate } from "./index-DPk8qX9O.js";
import { N as Navbar, m as motion, M as Mail, A as Arrow, F as Footer } from "./proxy-DtzmdYRh.js";
import { trackContactConversion } from "./safe-analytics.js";

const { useState } = React;

// Business API — independent of GTM. See api-gateway-resource-policy.json for CORS/Invoke fix.
const CONTACT_API = "https://4c6jwccg61.execute-api.ap-south-1.amazonaws.com/prod/contactUs";

async function submitContactForm(formData) {
  let response;
  try {
    response = await fetch(CONTACT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        contact_user_name: formData.name,
        contact_organizaiton_name: formData.firm,
        contact_user_email_id: formData.email,
        contact_number: formData.phone || "",
        contact_message: formData.message || "",
      }),
    });
  } catch (networkError) {
    const hint =
      networkError instanceof TypeError
        ? "Unable to reach the contact service (network or CORS). Please try again, or contact support if this persists."
        : "Unable to submit the form. Please try again.";
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
    result.success === true ||
    result.status === "success" ||
    result.status === "ok";

  const looksLikeSuccessMessage = (msg) => /thank|success|saved|received|submitted/i.test(msg);

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

const stats = [
  { v: "30+", l: "CA firms actively running audits on XcelAudit" },
  { v: "2,700+", l: "Audits executed end-to-end on the platform" },
  { v: "60%", l: "Faster audit cycle" },
  { v: "40%", l: "Less manual work" },
  { v: "3 Days", l: "Free trial — no card required" },
];

const steps = [
  { n: "01", t: "Our team reviews your inquiry within one business day." },
  { n: "02", t: "A CA who understands your firm's audit practice gets in touch." },
  { n: "03", t: "We walk you through XcelAudit on your own audit file — not a generic demo." },
];

function ContactPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      // Business action first — never gated on analytics.
      await submitContactForm({
        name: String(formData.get("name") || "").trim(),
        firm: String(formData.get("firm") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        message: String(formData.get("message") || "").trim(),
      });

      // Fire-and-forget conversion; blocked GTM must not abort navigation.
      try {
        trackContactConversion({ form_name: "contact", page_type: "contact" });
      } catch {
        // ignore
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
                    children: "Contact Us",
                  }),
                  e.jsxs("h1", {
                    className: "mt-4 text-balance text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]",
                    children: [
                      "Let's talk about ",
                      e.jsx("span", { className: "gradient-text", children: "your firm" }),
                      ".",
                    ],
                  }),
                  e.jsx("p", {
                    className: "mt-5 text-lg text-ink-soft leading-relaxed",
                    children: "From your first question to your first live audit — our team is here to help your firm get started the right way.",
                  }),
                  e.jsx("div", {
                    className: "mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5",
                    children: stats.map((item, index) =>
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
                  e.jsxs("div", { className: "mt-12", children: [
                    e.jsx("h3", {
                      className: "text-sm font-semibold uppercase tracking-wider text-ink-soft",
                      children: "What happens after you submit?",
                    }),
                    e.jsx("ol", {
                      className: "mt-5 space-y-4",
                      children: steps.map((item, index) =>
                        e.jsxs(motion.li, {
                          initial: { opacity: 0, x: -16 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: 0.3 + index * 0.1 },
                          className: "flex gap-4",
                          children: [
                            e.jsx("div", {
                              className: "flex-shrink-0 h-9 w-9 rounded-lg gradient-brand text-brand-foreground grid place-items-center text-sm font-semibold",
                              children: item.n,
                            }),
                            e.jsx("p", { className: "text-sm text-foreground leading-relaxed pt-1.5", children: item.t }),
                          ],
                        }, item.n)
                      ),
                    }),
                  ] }),
                  e.jsx("div", {
                    className: "mt-12 flex flex-wrap gap-6 text-sm",
                    children: e.jsxs("a", {
                      href: "mailto:sales@xcelaudit.com",
                      className: "inline-flex items-center gap-2 text-ink-soft hover:text-brand transition",
                      children: [e.jsx(Mail, { className: "h-4 w-4" }), " sales@xcelaudit.com"],
                    }),
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
                    e.jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: "Talk to our team." }),
                    e.jsx("p", {
                      className: "mt-2 text-sm text-ink-soft",
                      children: "Fill in your details and we'll get back to you within one business day.",
                    }),
                    e.jsxs("form", {
                      onSubmit: handleSubmit,
                      className: "mt-8 space-y-5",
                      children: [
                        e.jsx(Field, { label: "Name", name: "name", required: true, disabled: isSubmitting }),
                        e.jsx(Field, { label: "Firm Name", name: "firm", required: true, disabled: isSubmitting }),
                        e.jsx(Field, { label: "Email Address", name: "email", type: "email", required: true, disabled: isSubmitting }),
                        e.jsx(Field, { label: "Phone Number", name: "phone", type: "tel", disabled: isSubmitting }),
                        e.jsxs("div", {
                          children: [
                            e.jsxs("label", {
                              className: "text-sm font-medium",
                              htmlFor: "message",
                              children: [
                                "Message ",
                                e.jsx("span", { className: "text-muted-foreground font-normal", children: "(Optional)" }),
                              ],
                            }),
                            e.jsx("textarea", {
                              id: "message",
                              name: "message",
                              rows: 4,
                              disabled: isSubmitting,
                              className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60",
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
                        e.jsxs("button", {
                          type: "submit",
                          disabled: isSubmitting,
                          className: "w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md gradient-brand text-brand-foreground font-medium shadow-brand hover:opacity-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
                          children: [isSubmitting ? "Submitting..." : "Submit", e.jsx(Arrow, { className: "h-4 w-4" })],
                        }),
                        e.jsx("p", {
                          className: "text-xs text-muted-foreground text-center",
                          children: "We respect your time. No spam, ever.",
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

function Field({ label, name, type = "text", required = false, disabled = false }) {
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
        className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition disabled:opacity-60",
      }),
    ],
  });
}

export { ContactPage as component };
