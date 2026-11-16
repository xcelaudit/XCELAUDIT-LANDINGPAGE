import { j as e } from "./index-DPk8qX9O.js";
import { N as Navbar, m as motion, F as Footer } from "./proxy-DtzmdYRh.js";

const meta = [
  { label: "Operated by", value: "XcelAudit Technologies LLP" },
  { label: "Website / Service", value: "www.xcelaudit.com" },
  { label: "Effective date", value: "1 June 2025" },
  { label: "Last updated", value: "19 June 2026" },
];

const sections = [
  {
    title: "1. Purpose",
    blocks: [
      { type: "p", text: "1.1 This document explains how the Xcel Audit platform (the “Service”) preserves the integrity of audit data and working papers, and how it handles Microsoft Excel and other spreadsheet files on import and export. It is intended to give chartered accountants and audit firms a clear understanding of what the Service guarantees, what it does not, and where the Customer’s responsibilities lie." },
      { type: "p", text: "1.2 This document forms part of the Terms of Service. In the event of any conflict regarding the scope of warranties, the Terms of Service prevail." },
    ],
  },
  {
    title: "2. Why Document Integrity Matters",
    blocks: [
      { type: "p", text: "2.1 Auditors are required to maintain reliable, traceable audit documentation. Under Standard on Auditing (SA) 230 (Audit Documentation) and Standard on Quality Control (SQC) 1 issued by the Institute of Chartered Accountants of India (ICAI), audit documentation must be retained (ordinarily for not less than seven years from the date of the auditor’s report) and must not be altered without an appropriate record of changes." },
      { type: "p", text: "2.2 Separately, under Rule 3 of the Companies (Accounts) Rules, 2014, companies that maintain their books of account using accounting software must, with effect from 1 April 2023, use software that records an audit trail (edit log) of each transaction, creates an edit log of every change, and ensures the audit trail cannot be disabled. While Xcel Audit is a workflow and documentation tool and not the Customer’s primary accounting/books-of-account software, the Service is designed to support traceability and integrity consistent with the spirit of these requirements." },
    ],
  },
  {
    title: "3. Document Integrity Features",
    blocks: [
      { type: "p", text: "3.1 Audit trail / change history. The Service is designed to record key actions taken on audit records — such as creation, edits, status changes, and approvals — together with the identity of the User and a timestamp, to support traceability and accountability within an engagement." },
      { type: "p", text: "3.2 Access control. Role-based access controls allow firms to govern who may view, edit, or approve specific Audits, reducing the risk of unauthorised changes." },
      { type: "p", text: "3.3 Version handling. The Service maintains working versions of audit content so that the current state of working papers is preserved and changes are attributable." },
      { type: "p", text: "3.4 Data validation. Where the Service performs calculations or roll-ups, it applies validation logic intended to keep derived figures consistent with their source inputs. The Customer remains responsible for reviewing and exercising professional judgement over all figures and conclusions." },
      { type: "p", text: "3.5 Storage integrity. Audit data is stored on encrypted, backed-up infrastructure as described in the Security & Compliance document, reducing the risk of loss or corruption." },
    ],
  },
  {
    title: "4. Scope and Limitations of Integrity Features",
    blocks: [
      { type: "p", text: "4.1 The integrity features assist the Customer but do not replace the auditor’s own professional responsibilities. The Customer remains solely responsible for the accuracy, completeness, and appropriateness of audit documentation and conclusions." },
      { type: "p", text: "4.2 The Service’s audit trail records actions taken within the Service. It does not, and cannot, record changes made to data outside the Service (for example, edits made in an external spreadsheet before import, or after export)." },
      { type: "p", text: "4.3 Xcel Audit does not warrant that the Service satisfies every regulatory or professional requirement for any particular engagement. The Customer is responsible for assessing whether its use of the Service, together with its own controls, meets its statutory and ICAI obligations." },
    ],
  },
  {
    title: "5. Excel and Spreadsheet Compatibility",
    blocks: [
      { type: "p", text: "5.1 Supported formats. The Service supports import and export of Microsoft Excel and spreadsheet files in certain service actions, in the following formats: .xlsx, .xls, and .csv." },
      { type: "p", text: "5.2 Import behaviour. On import, the Service reads cell values, recognised formulas, and supported formatting from the source file and maps them into the Service’s data model. The Customer should review imported data to confirm it has been interpreted as intended before relying on it." },
      { type: "p", text: "5.3 Export behaviour. On export, the Service generates an Excel-compatible file reflecting the current state of the relevant content, suitable for review, sharing, and inclusion in the engagement file. The Customer should retain and archive exported files in accordance with SA 230 and SQC 1." },
    ],
  },
  {
    title: "6. Recommended Practices",
    blocks: [
      { type: "p", text: "6.1 To preserve integrity and minimise compatibility issues, Customers are encouraged but not mandated to:" },
      {
        type: "list",
        items: [
          "(a) keep an original copy of each source spreadsheet before import;",
          "(b) review imported data and key figures against the source before relying on them;",
          "(c) avoid relying on macros, add-ins, or external links within files intended for import;",
          "(d) export and archive final working papers as part of the engagement file in accordance with SA 230 and SQC 1; and",
          "(e) maintain independent backups in line with their record-retention obligations.",
        ],
      },
    ],
  },
  {
    title: "7. No Substitute for Professional Judgement",
    blocks: [
      { type: "p", text: "7.1 The Service is a tool to assist in the conduct and documentation of Audits. It does not perform the audit, does not provide an opinion, and does not constitute professional, accounting, assurance, or legal advice. All professional judgements, conclusions, and the audit opinion remain the sole responsibility of the Customer and its qualified personnel." },
    ],
  },
  {
    title: "8. Contact",
    blocks: [
      { type: "p", text: "8.1 For questions about document integrity, audit-trail behaviour, or Excel compatibility, contact:" },
      {
        type: "list",
        items: [
          "Contact: support@xcelaudit.com",
          "Address: XcelAudit Technologies LLP, No. 588, HMT Layout, Vidyaranyapura Main Road, Bangalore – 560097, India",
        ],
      },
    ],
  },
];

function renderBlock(block, index) {
  if (block.type === "list") {
    return e.jsx(
      "ul",
      {
        className: "mt-3 space-y-2.5 text-sm text-ink-soft leading-relaxed list-none",
        children: block.items.map((item) =>
          e.jsx("li", { className: "pl-4 border-l-2 border-brand/30", children: item }, item.slice(0, 40))
        ),
      },
      index
    );
  }

  return e.jsx(
    "p",
    {
      className: block.className || "text-sm text-ink-soft leading-relaxed",
      children: block.text,
    },
    index
  );
}

function renderSection(section, index) {
  return e.jsxs("section", {
    className: index > 0 ? "mt-12" : "",
    children: [
      e.jsx("h2", {
        className: "mb-6 text-xl font-semibold tracking-tight text-foreground",
        children: section.title,
      }),
      e.jsx("div", {
        className: "space-y-4",
        children: section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex)),
      }),
    ],
  });
}

function DocumentIntegrityPage() {
  return e.jsxs("div", {
    className: "min-h-screen bg-background",
    children: [
      e.jsx(Navbar, {}),
      e.jsx("main", {
        className: "pt-32 pb-24",
        children: e.jsxs("div", {
          className: "container-x max-w-3xl",
          children: [
            e.jsxs(motion.div, {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: [
                e.jsx("p", {
                  className: "text-xs uppercase tracking-[0.18em] font-semibold text-brand",
                  children: "Legal",
                }),
                e.jsxs("h1", {
                  className: "mt-4 text-balance text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]",
                  children: [
                    "Document ",
                    e.jsx("span", { className: "gradient-text", children: "Integrity" }),
                  ],
                }),
                e.jsx("p", {
                  className: "mt-4 text-lg text-ink-soft leading-relaxed",
                  children: "Xcel Audit — Audit Workflow Platform",
                }),
              ],
            }),
            e.jsx(motion.div, {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              className: "mt-8 rounded-3xl border border-border bg-card shadow-card p-8 md:p-10",
              children: e.jsx("div", {
                children: sections.map((section, index) => renderSection(section, index)),
              }),
            }),
            e.jsx(motion.div, {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card",
              children: e.jsx("dl", {
                className: "grid gap-4 sm:grid-cols-2",
                children: meta.map((item) =>
                  e.jsxs("div", {
                    children: [
                      e.jsx("dt", {
                        className: "text-xs uppercase tracking-wider font-semibold text-muted-foreground",
                        children: item.label,
                      }),
                      e.jsx("dd", {
                        className: "mt-1 text-sm text-foreground leading-relaxed",
                        children: item.value,
                      }),
                    ],
                  }, item.label)
                ),
              }),
            }),
          ],
        }),
      }),
      e.jsx(Footer, {}),
    ],
  });
}

export { DocumentIntegrityPage as component };
