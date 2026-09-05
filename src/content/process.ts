export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  outputs: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand the business, its users and the objective before proposing a single screen.",
    outputs: ["Stakeholder interviews", "Success metrics"],
  },
  {
    number: "02",
    title: "Define",
    description:
      "Product strategy, scope, requirements and technical architecture agreed up front.",
    outputs: ["Product brief", "Architecture plan"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Intuitive user experiences and a visual system that scales beyond the first release.",
    outputs: ["Flows & wireframes", "Design system"],
  },
  {
    number: "04",
    title: "Build",
    description:
      "Engineering in short, reviewable increments with tests, CI and a demo every week.",
    outputs: ["Weekly releases", "Test coverage"],
  },
  {
    number: "05",
    title: "Launch & Grow",
    description:
      "Deploy, measure real usage, then optimise and keep improving the product.",
    outputs: ["Monitoring", "Iteration roadmap"],
  },
];

export const differentiators = [
  {
    number: "01",
    title: "Product thinking",
    description: "We push back on scope that doesn't move a business metric.",
  },
  {
    number: "02",
    title: "Engineering quality",
    description: "Typed, tested, reviewed code that the next team can inherit.",
  },
  {
    number: "03",
    title: "Fast execution",
    description: "Small senior teams, weekly releases, no hand-off theatre.",
  },
  {
    number: "04",
    title: "Transparent communication",
    description: "Shared boards, honest estimates, no surprise invoices.",
  },
  {
    number: "05",
    title: "Scalable architecture",
    description: "Built for the traffic and team you'll have in two years.",
  },
  {
    number: "06",
    title: "Long-term partnership",
    description: "Most of our work is a second, third or fourth engagement.",
  },
];
