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
    "AI & ML engineering built on quality-first evaluation and delivery. Based in Toronto, Canada.",
  city: "Toronto, Canada",
  reach: "We work with teams across North America, in person and remote.",
  replyTime: "We typically respond within two business days.",
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
    { label: "Toronto", note: "Based in Canada, working with teams across North America" },
  ],
};

export const SECTORS = [
  "Manufacturing & Industrial",
  "Financial Services",
  "Logistics & Supply Chain",
  "SaaS & Software",
  "Retail & E-commerce",
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
  "Client names are withheld under NDA; the technical detail below is representative of the actual work. Ask us directly for references from comparable engagements.";

export const WORK = [
  {
    sector: "Manufacturing",
    title: "Automated visual quality inspection",
    body: "A mid-size manufacturer was relying on manual sampling to catch defects on a production line — slow, inconsistent, and unable to scale with volume. We built a computer vision inspection pipeline trained on their historical defect data, paired with a labeled evaluation set so the plant team could validate accuracy before rollout, and a monitoring dashboard to flag drift as line conditions changed.",
    focus: "Computer vision, MLOps, monitoring",
    engagement: "Prototype through production deployment",
    outcome: "Faster, more consistent inspection coverage; drift alerts in place before full rollout",
  },
  {
    sector: "Financial Services",
    title: "Evaluation harness for an internal risk model",
    body: "A fintech risk team had a scoring model in production but no repeatable way to test proposed changes before shipping — reviews were manual and inconsistent. We designed an evaluation framework with fixed benchmark sets and regression checks, and integrated it into their existing release process.",
    focus: "Model evaluation, release engineering",
    engagement: "Embedded with internal ML team, 8 weeks",
    outcome: "Repeatable pre-release testing; regressions caught before deploy",
  },
  {
    sector: "Logistics & Supply Chain",
    title: "Demand forecasting pipeline rebuild",
    body: "An existing forecasting model had accuracy that degraded silently over several months with no one noticing until planning was visibly off. We rebuilt the retraining pipeline with scheduled evaluation against holdout data, added alerting on forecast error, and documented the system for the internal team to maintain going forward.",
    focus: "MLOps, forecasting, monitoring",
    engagement: "Full rebuild and handoff",
    outcome: "Automated retraining with error alerting; internal team fully onboarded",
  },
  {
    sector: "SaaS & Software",
    title: "Applied AI feasibility audit",
    body: "A software company was under pressure to “add AI” to their product but hadn't validated whether their data supported it. We ran a focused audit of their data quality, use cases, and technical constraints, and delivered a prioritized recommendation — including which proposed features weren't worth building yet.",
    focus: "Applied AI strategy, data readiness",
    engagement: "3-week audit and roadmap",
    outcome: "Clear build/don't-build recommendation and a scoped roadmap for what remained",
  },
];

export const PROJECT_STAGES = [
  "Just an idea / exploring feasibility",
  "Have a prototype, need to productionize",
  "In production, need to improve reliability",
  "Other",
];
