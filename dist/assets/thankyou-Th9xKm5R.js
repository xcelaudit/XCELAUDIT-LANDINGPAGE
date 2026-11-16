import { r as React, j as e, L as Link } from "./index-DPk8qX9O.js";
import { N as Navbar, m as motion, C as Check, F as Footer } from "./proxy-DtzmdYRh.js";
import { trackContactConversion } from "./safe-analytics.js";

const { useEffect } = React;

function ThankYouPage() {
  useEffect(() => {
    // Safe / non-blocking: ad blockers may break dataLayer or block GTM beacons.
    // This page must still render even when tracking is unavailable.
    try {
      trackContactConversion();
    } catch {
      // ignore — thank-you UX must not depend on analytics
    }
  }, []);

  return e.jsxs("div", {
    className: "min-h-screen bg-background",
    children: [
      e.jsx(Navbar, {}),
      e.jsx("main", {
        className: "relative pt-32 pb-24 flex items-center overflow-hidden",
        children: e.jsxs(e.Fragment, {
          children: [
            // Ambient background accents
            e.jsx("div", {
              className: "pointer-events-none absolute inset-0 -z-10",
              style: {
                background:
                  "radial-gradient(50% 40% at 50% 0%, oklch(0.56 0.22 260 / 0.12), transparent 70%)",
              },
            }),
            e.jsx("div", {
              className: "pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[420px] rounded-full blur-3xl",
              style: { background: "oklch(0.56 0.22 260 / 0.08)" },
            }),

            e.jsx("div", {
              className: "container-x w-full max-w-2xl mx-auto",
              children: e.jsxs(motion.div, {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                className:
                  "relative overflow-hidden rounded-[2rem] border border-border bg-card/80 backdrop-blur-xl shadow-card px-8 py-14 md:px-16 md:py-20",
                children: [
                  // Gradient hairline border accent at top
                  e.jsx("div", {
                    className: "absolute top-0 left-0 right-0 h-px gradient-brand opacity-60",
                  }),

                  // Inner glow
                  e.jsx("div", {
                    className: "pointer-events-none absolute inset-0",
                    style: {
                      background:
                        "radial-gradient(60% 60% at 50% 0%, oklch(0.56 0.22 260 / 0.10), transparent 70%)",
                    },
                  }),

                  e.jsxs("div", {
                    className: "relative",
                    children: [
                      // Icon with layered glow + spring entrance
                      e.jsxs(motion.div, {
                        initial: { scale: 0.6, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: { duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] },
                        className: "relative mx-auto h-20 w-20",
                        children: [
                          e.jsx("div", {
                            className: "absolute inset-0 rounded-full gradient-brand blur-xl opacity-40 scale-110",
                          }),
                          e.jsx("div", {
                            className:
                              "relative h-20 w-20 rounded-full gradient-brand grid place-items-center text-brand-foreground shadow-brand ring-1 ring-white/20",
                            children: e.jsx(motion.div, {
                              initial: { scale: 0, rotate: -45 },
                              animate: { scale: 1, rotate: 0 },
                              transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
                              children: e.jsx(Check, { className: "h-9 w-9", strokeWidth: 2.5 }),
                            }),
                          }),
                        ],
                      }),

                      e.jsx(motion.h1, {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.45 },
                        className:
                          "mt-9 text-3xl md:text-[2.65rem] font-semibold tracking-tight leading-[1.08] text-balance text-center",
                        children: "Thank You",
                      }),

                      e.jsx(motion.p, {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.55 },
                        className:
                          "mt-4 text-base md:text-lg text-ink-soft leading-relaxed text-center max-w-lg mx-auto",
                        children:
                          "We've received your request. Here's what happens next.",
                      }),

                      e.jsx(motion.ol, {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.65 },
                        className: "mt-10 space-y-5 list-none p-0 m-0",
                        children: [
                          {
                            num: "01",
                            text: "One of our sales executives will get in touch within 24 hours.",
                          },
                          {
                            num: "02",
                            text: "Your walkthrough will be conducted by a Chartered Accountant from our team.",
                          },
                          {
                            num: "03",
                            text: "The session will focus on real audit workflows and firm requirements—not a generic software demo.",
                          },
                        ].map((step) =>
                          e.jsxs(
                            "li",
                            {
                              className:
                                "flex gap-4 md:gap-5 items-start rounded-2xl border border-border bg-muted/30 px-5 py-4 md:px-6 md:py-5 backdrop-blur-sm",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "shrink-0 text-sm md:text-base font-semibold tracking-wide text-brand tabular-nums",
                                  children: step.num,
                                }),
                                e.jsx("p", {
                                  className:
                                    "text-sm md:text-base text-ink-soft leading-relaxed pt-0.5",
                                  children: step.text,
                                }),
                              ],
                            },
                            step.num
                          )
                        ),
                      }),

                      e.jsx(motion.div, {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.85 },
                        className: "mt-11 flex justify-center",
                        children: e.jsx(motion.div, {
                          whileHover: { scale: 1.03 },
                          whileTap: { scale: 0.98 },
                          transition: { duration: 0.2, ease: "easeOut" },
                          children: e.jsx(Link, {
                            to: "/",
                            className:
                              "inline-flex items-center justify-center min-w-[200px] h-12 px-8 mt-6 rounded-md gradient-brand text-brand-foreground font-medium shadow-brand hover:shadow-lg hover:opacity-95 transition-all duration-300",
                            children: "Back to Home",
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      e.jsx(Footer, {}),
    ],
  });
}

export { ThankYouPage as component };