/**
 * Every word on the site, carried over from the existing Qualiteknik pages.
 * The copy is the firm's own and it is unusually good — specific, anti-hype,
 * willing to say "don't build this". Edit wording here, never in a component.
 */

export const FIRM = {
  name: "Qualiteknik",
  legal: "Qualiteknik Inc.",
  tagline: "AI systems built with engineering rigor, not just prototypes.",
  blurb:
    "AI & ML engineering built on quality-first evaluation and delivery. Based in Toronto and Lucknow.",
  city: "Toronto, Canada · Lucknow, India",
  reach: "We work with teams across North America and India, in person and remote.",
  replyTime: "We typically respond within two business days.",
  email: "info@qualiteknik.online",
} as const;

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const HERO = {
  eyebrow: "AI & ML Engineering",
  lede: "Qualiteknik designs, ships, and hardens machine learning systems for teams who can't afford to find out in production that the model doesn't hold up. Applied AI, delivered like an engineering discipline.",
  pillars: [
    { label: "End-to-end", note: "From model design to production deployment" },
    { label: "Quality-first", note: "Evaluation & monitoring built in, not bolted on" },
    {
      label: "Two offices",
      note: "Toronto and Lucknow, working with teams across North America and India",
    },
  ],
};

/** The sectors the real engagements actually sit in. Four, not a padded five. */
export const SECTORS = [
  "Public Infrastructure",
  "Government & Civic Services",
  "Legal Technology",
  "Judicial Administration",
];

/** The four services. Deliberately unnumbered — they are not a sequence. */
export const SERVICES = [
  {
    slug: "product",
    title: "AI/ML Product Development",
    short:
      "Custom models and applied AI features, scoped, prototyped, and built to your product's real constraints — not a generic demo.",
    long: "From problem framing to a working model integrated into your product. We scope against your actual data and constraints — not a best-case demo — and build models, pipelines, and the surrounding application logic to ship them.",
    typical:
      "Model design & prototyping, feature pipelines, data labeling strategy, integration with existing product/backend.",
  },
  {
    slug: "mlops",
    title: "MLOps & Deployment",
    short:
      "Pipelines, infrastructure, and CI/CD for models — so retraining, rollout, and rollback are routine, not an emergency.",
    long: "The infrastructure that turns a working model into a system your team can operate: training and retraining pipelines, versioning, CI/CD for models, and deployment targets that match your existing stack.",
    typical:
      "Pipeline orchestration, model registry & versioning, rollout/rollback tooling, infrastructure-as-code.",
  },
  {
    slug: "evaluation",
    title: "Model Quality & Evaluation",
    short:
      "Evaluation frameworks, test harnesses, and monitoring that catch drift and regressions before your customers do.",
    long: "Most teams find out a model regressed when a customer complains. We build the evaluation sets, test harnesses, and production monitoring that catch it first — and give you a defensible way to say “this is ready.”",
    typical:
      "Eval set design, regression & drift testing, offline/online metric dashboards, release gating.",
  },
  {
    slug: "strategy",
    title: "Applied AI Strategy",
    short:
      "Technical audits and roadmaps for teams deciding where AI actually earns its keep in the product — and where it doesn't.",
    long: "For teams deciding whether and where AI belongs in the roadmap. A focused technical audit of your data, systems, and use cases, ending in a prioritized, honest recommendation — including “don't build this.”",
    typical:
      "Technical & data readiness audit, use-case prioritization, build vs. buy analysis, roadmap.",
  },
];

/** The process IS sequential, so this is the one list that earns numbering. */
export const PROCESS = [
  {
    title: "Scope against reality",
    note: "We start with your actual data, systems, and constraints — not a hypothetical clean dataset. If something isn't feasible, we say so before you pay for it.",
  },
  {
    title: "Define “working” up front",
    note: "Before we write model code, we agree on the evaluation criteria and metrics that will decide whether the system is ready to ship.",
  },
  {
    title: "Build, test, iterate",
    note: "Short cycles with visible progress — working software and evaluation results, not slide decks, are how you track status.",
  },
  {
    title: "Hand off, not walk away",
    note: "Documentation, runbooks, and monitoring so your team can operate and extend the system after we're gone.",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Built to be operated, not just demoed",
    note: "We hand off systems your team can run, retrain, and debug — with documentation and runbooks included.",
  },
  {
    title: "Evaluation before optimism",
    note: "We define what “working” means and measure against it before we call anything done.",
  },
  {
    title: "Senior engineers, direct access",
    note: "No account-manager layer between you and the people writing your system.",
  },
];

export const PRINCIPLES = [
  {
    title: "Define done before you build",
    note: "We agree on evaluation criteria before writing model code, so “is it ready” is a measurement, not an opinion.",
  },
  {
    title: "Systems, not scripts",
    note: "A model handed off with no pipeline, monitoring, or docs isn't finished. We build for the team that inherits it.",
  },
  {
    title: "Honest about fit",
    note: "If AI isn't the right tool for your problem, we'll tell you — even if it means a shorter engagement.",
  },
];

export const NDA_NOTE =
  "Client names and locations are withheld. These are real delivered engagements, and the technical detail is accurate — we're happy to walk through any of them in depth, and to arrange references.";

/**
 * Real engagements. Clients are never named, and nothing here is padded:
 * figures are the ones we can actually stand behind, and where a method comes
 * from published research it is credited rather than implied to be ours.
 */
export const WORK = [
  {
    sector: "Public Infrastructure",
    title: "Crowdsensed road surface monitoring at state scale",
    body: "A road network of roughly 589,000 km was monitored by manual photo-and-GPS reports: weeks to action, inconsistent data, and no way to separate genuine defects from ordinary vibration. We built a crowdsensing pipeline that reads smartphone accelerometer, GPS and camera data as vehicles drive, classifies the road surface it is travelling on, and distinguishes potholes from speed bumps and driver handling — the false-positive problem that makes accelerometer-based detection unreliable in the field. Smartphone imagery serves as the source of truth, so the models are retrained against evidence rather than assumption.",
    focus: "Deep learning (CNN, LSTM, reservoir computing), crowdsensing, computer vision",
    engagement: "Our own venture — built, deployed and publicly hosted",
    outcome: "93% accuracy on pothole and surface classification, with an imagery-backed retraining loop",
    credit:
      "Modelling approach follows published research on deep learning for road surface monitoring — Varona, Monteserin & Teyseyre, Personal and Ubiquitous Computing (2020).",
  },
  {
    sector: "Government & Civic Services",
    title: "Civic infrastructure complaint and repair platform",
    body: "A development authority tracked road repairs, footpaths, parking and waste hotspots through disconnected manual processes, with no shared view of what had been reported or resolved. We ran the feasibility study and wrote the SRS, then built a web and mobile platform with separate agency and administration dashboards: the full complaint lifecycle from report to resolution, categorisation by type and by responsible agency, configurable zones and sectors, and an audit log on every transaction so accountability survives a dispute.",
    focus: "Systems analysis, full-stack platform, real-time reporting",
    engagement: "Feasibility study, SRS, and build",
    outcome: "Real-time complaint dashboards with agency-level accountability and a complete audit trail",
  },
  {
    sector: "Legal Technology",
    title: "Resilient extraction pipeline for public court records",
    body: "A records pipeline against a public high-court portal kept breaking. It was built on absolute XPaths that failed the moment the page shifted, and — the more serious fault — it reported success it had never verified, so silent failures were indistinguishable from clean runs. We rebuilt it on ID- and content-based selectors, and moved success detection next to the operation performing it, so no step can report done without positive confirmation. One year's cohort produced around 150 structured case tables and 157 judgment documents, each retrieval checked rather than assumed.",
    focus: "Data engineering, failure detection, structured extraction",
    engagement: "Rebuild and hardening of an existing pipeline",
    outcome: "Verified retrieval in place of assumed success; silent failures made visible",
  },
  {
    sector: "Judicial Administration",
    title: "Court case notification and reporting system",
    body: "A court administration tracked hearings, orders and case status across spreadsheets and paper, which made it slow to answer two basic questions: what is listed today, and where does this case actually stand. We built an operator system covering the full case lifecycle — registration, order details, current status and final disposal — with hearing-wise listings, filtered search across the case register, and direct access to judgments and orders, so notifications of hearings, filings and deadlines are issued from the same record everyone works from.",
    focus: "Workflow design, full-stack application, reporting",
    engagement: "Design through delivery",
    outcome: "A single case register with hearing-wise listings and status visible to operators and administration",
  },
];

export const PROJECT_STAGES = [
  "Just an idea / exploring feasibility",
  "Have a prototype, need to productionize",
  "In production, need to improve reliability",
  "Other",
];
