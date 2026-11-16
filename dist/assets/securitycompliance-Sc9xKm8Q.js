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
    title: "1. Purpose and Scope",
    blocks: [
      { type: "p", text: "1.1 This Security & Compliance document describes the technical and organisational measures XcelAudit Technologies LLP (“Xcel Audit”) applies to protect the confidentiality, integrity, and availability of the Xcel Audit platform (the “Service”) and the data processed through it, and the compliance framework within which the Service operates." },
      { type: "p", text: "1.2 It is intended for chartered accountants, audit firms, and their clients who need to understand how their sensitive financial and audit data is safeguarded. It forms part of, and should be read together with, the Terms of Service and Privacy Policy." },
      { type: "p", text: "1.3 This document describes our security programme at a level appropriate for customer assurance. It does not disclose details that would themselves create security risk. Specific control evidence can be shared with prospective enterprise customers under a non-disclosure agreement." },
    ],
  },
  {
    title: "2. Regulatory and Standards Framework",
    blocks: [
      { type: "p", text: "2.1 Xcel Audit’s security and compliance programme is designed to align with:" },
      {
        type: "list",
        items: [
          "(a) the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules), which require maintenance of reasonable security practices for sensitive personal data;",
          "(b) the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025, including obligations to protect personal data and to notify personal-data breaches (being operationalised in phases through to approximately mid-2027);",
          "(c) the principles of the ISO/IEC 27001 information security management framework, which guide our control design. Xcel Audit is aligned to, and designs its controls around, ISO/IEC 27001 principles; Xcel Audit is not itself ISO 27001 certified, while our cloud infrastructure provider maintains independent certifications (see Section 3.1); and",
          "(d) relevant professional expectations applicable to our customers, including ICAI Standards on Auditing and SQC 1 record-retention norms, insofar as they affect how we retain and protect audit documentation.",
        ],
      },
    ],
  },
  {
    title: "3. Hosting and Infrastructure Security",
    blocks: [
      { type: "p", text: "3.1 Cloud hosting. The Service is hosted on Amazon Web Services (AWS), in AWS data-centre regions located in India (such as the AWS Asia Pacific (Mumbai) Region). AWS maintains industry-recognised certifications, including ISO/IEC 27001, ISO/IEC 27017, ISO/IEC 27018, SOC 2, and PCI DSS, as applicable to its services. Although Xcel Audit contracts for and bears the cost of this cloud infrastructure, this commercial arrangement does not change data ownership or access (see Section 3.4): AWS acts as Xcel Audit’s sub-processor under its data-processing terms and the AWS Shared Responsibility Model, under which the customer retains ownership and control of content." },
      { type: "p", text: "3.2 Network security. The infrastructure is protected by firewalls, network segmentation, security groups, and DDoS-mitigation controls. Administrative access to production infrastructure is restricted to authorised personnel over secured, authenticated channels." },
      { type: "p", text: "3.3 Environment separation. Production, staging, and development environments are logically separated. Production data is not used in non-production environments except where de-identified." },
      { type: "p", text: "3.4 Data ownership and custody. Customers retain ownership of their data at all times. In respect of audit files and working papers a Customer uploads about its own clients, the Customer is the controlling party and Xcel Audit acts as a processor on the Customer’s behalf. Ownership of, and access to, data are determined by our customer agreements, access controls, and encryption — not by which party contracts for or pays the underlying cloud account. The fact that Xcel Audit holds and funds the AWS account does not give Xcel Audit ownership of, or an independent right to access, Customer Data. Data hosted for the Service is resident in India; regulated Customers may request additional residency, export, or portability arrangements on exit (see Section 12)." },
    ],
  },
  {
    title: "4. Encryption",
    blocks: [
      { type: "p", text: "4.1 In transit. All data transmitted between Users and the Service is encrypted using TLS 1.2 or higher (HTTPS)." },
      { type: "p", text: "4.2 At rest. Customer Data and backups are encrypted at rest using industry-standard algorithms (such as AES-256)." },
      { type: "p", text: "4.3 Key management. Encryption keys are managed using the cloud provider’s managed key-management service (AWS KMS), with access restricted to authorised processes and personnel." },
    ],
  },
  {
    title: "5. Access Control and Authentication",
    blocks: [
      { type: "p", text: "5.1 Customer access. Each User authenticates with unique credentials. Passwords are stored in salted, hashed form. The Service supports role-based access within a Customer account so that firms can control which Users can view or edit particular Audits." },
      { type: "p", text: "5.2 Internal access (least privilege). Xcel Audit personnel are granted access to systems and data strictly on a need-to-know basis to perform their roles. Access to production systems requires individual authenticated accounts and is logged. Access is reviewed periodically and revoked promptly on role change or exit." },
      { type: "p", text: "5.3 Confidentiality of personnel. All employees and contractors are bound by confidentiality obligations and receive security-awareness training appropriate to their role." },
    ],
  },
  {
    title: "6. Logging, Monitoring, and Audit Trail",
    blocks: [
      { type: "p", text: "6.1 The Service maintains application and system logs, including authentication events and key actions taken within Audits, to support security monitoring, troubleshooting, and accountability." },
      { type: "p", text: "6.2 The Service is designed to maintain an audit trail of changes to audit records, supporting the integrity and traceability expectations relevant to our customers’ obligations. Details of in-application audit-trail behaviour are described in the Document Integrity & Excel Compatibility policy." },
      { type: "p", text: "6.3 Security-relevant events are monitored, and alerts are configured to enable timely detection of and response to anomalies." },
    ],
  },
  {
    title: "7. Data Segregation and Tenant Isolation",
    blocks: [
      { type: "p", text: "7.1 The Service is designed so that each Customer’s data is logically segregated, and one Customer cannot access another Customer’s data. Access-control checks are enforced at the application layer for every request." },
    ],
  },
  {
    title: "8. Backup, Resilience, and Business Continuity",
    blocks: [
      { type: "p", text: "8.1 Backups. Customer Data is backed up on a regular schedule. Backups are encrypted and stored in resilient storage." },
      { type: "p", text: "8.2 Recovery objectives. We maintain a business-continuity and disaster-recovery approach with defined recovery objectives, which we can share with enterprise customers under a non-disclosure agreement." },
      { type: "p", text: "8.3 Availability. We use commercially reasonable efforts to maintain high availability of the Service, subject to scheduled and emergency maintenance. Any contractual availability commitments will be stated in a separate service-level agreement." },
    ],
  },
  {
    title: "9. Secure Development and Change Management",
    blocks: [
      { type: "p", text: "9.1 We follow secure software-development practices, including code review, version control, and testing before production deployment. Changes to production are managed through a controlled change-management process." },
      { type: "p", text: "9.2 We perform vulnerability assessments and, periodically, penetration testing of the Service, and remediate identified issues on a risk-prioritised basis." },
      { type: "p", text: "9.3 Third-party libraries and dependencies are monitored for known vulnerabilities and updated as appropriate." },
    ],
  },
  {
    title: "10. Sub-processors and Vendor Management",
    blocks: [
      { type: "p", text: "10.1 We engage sub-processors (such as Amazon Web Services for cloud hosting and infrastructure, and email and payment providers) under written agreements that require appropriate confidentiality and security obligations. We assess the security posture of material vendors before onboarding and periodically thereafter. A list of categories of sub-processors is available on request at support@xcelaudit.com." },
    ],
  },
  {
    title: "11. Incident Response and Breach Notification",
    blocks: [
      { type: "p", text: "11.1 We maintain a documented incident-response process covering detection, triage, containment, eradication, recovery, and post-incident review." },
      { type: "p", text: "11.2 In the event of a personal-data breach, we will take remedial steps and provide notification to the Data Protection Board of India and affected individuals in accordance with the DPDP Act, DPDP Rules, and applicable timelines, and will notify affected Customers without undue delay so they can meet their own obligations." },
      { type: "p", text: "11.3 Security concerns or suspected vulnerabilities may be reported to support@xcelaudit.com. We welcome responsible disclosure and will acknowledge legitimate reports." },
    ],
  },
  {
    title: "12. Data Retention and Deletion",
    blocks: [
      { type: "p", text: "12.1 We retain Customer Data and personal data only as long as necessary for the purposes described in the Privacy Policy or as required by law, recognising the minimum audit-documentation retention period (ordinarily not shorter than seven years from the date of the auditor’s report) applicable to our customers under SQC 1. On expiry of the applicable period or on verified request, data is deleted or irreversibly de-identified, except where retention is legally required. See the Privacy Policy for full details." },
    ],
  },
  {
    title: "13. Customer Responsibilities (Shared Responsibility Model)",
    blocks: [
      { type: "p", text: "13.1 Security is a shared responsibility. While Xcel Audit secures the Service and infrastructure, Customers are responsible for:" },
      {
        type: "list",
        items: [
          "(a) safeguarding login credentials and enabling available authentication controls;",
          "(b) managing User access and promptly removing access for departing staff;",
          "(c) ensuring the lawful basis and consents for data they upload, and compliance with their professional and confidentiality obligations; and",
          "(d) maintaining their own statutory records and backups as required by ICAI and applicable law.",
        ],
      },
    ],
  },
  {
    title: "14. Compliance Requests and Contact",
    blocks: [
      { type: "p", text: "14.1 For security questionnaires, compliance documentation requests, or further information, contact:" },
      {
        type: "list",
        items: [
          "Security & Compliance Contact: Kundan",
          "Email: kundan@xcelaudit.com",
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

function SecurityCompliancePage() {
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
                    "Security & ",
                    e.jsx("span", { className: "gradient-text", children: "Compliance" }),
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

export { SecurityCompliancePage as component };
