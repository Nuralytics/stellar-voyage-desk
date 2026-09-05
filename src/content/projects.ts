import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export interface Project {
  slug: string;
  name: string;
  industry: string;
  year: string;
  description: string;
  services: string[];
  tech: string[];
  image: string;
  alt: string;
}

export const projects: Project[] = [
  {
    slug: "treasury-analytics-platform",
    name: "Treasury Analytics Platform",
    industry: "Fintech",
    year: "2025",
    description:
      "A real-time analytics workspace that replaced spreadsheet reporting for a finance team, cutting close time from days to hours.",
    services: ["Product strategy", "UI/UX design", "Engineering"],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: work1,
    alt: "Dark analytics dashboard displayed on a monitor in a studio",
  },
  {
    slug: "care-companion-app",
    name: "Care Companion App",
    industry: "Healthcare",
    year: "2025",
    description:
      "A patient companion app for medication adherence and care plans, designed for accessibility and low-bandwidth conditions.",
    services: ["UX research", "Mobile design", "Mobile engineering"],
    tech: ["React Native", "TypeScript", "FastAPI", "Redis"],
    image: work2,
    alt: "Two smartphones showing a clean healthcare mobile app interface",
  },
  {
    slug: "freight-network-console",
    name: "Freight Network Console",
    industry: "Logistics",
    year: "2024",
    description:
      "An operations console that visualises live fleet movement and routing exceptions across a multi-region network.",
    services: ["Architecture", "Data visualisation", "Engineering"],
    tech: ["Next.js", "Python", "Docker", "Google Cloud"],
    image: work3,
    alt: "Abstract visualisation of a logistics network of glowing routes",
  },
  {
    slug: "knowledge-copilot",
    name: "Knowledge Copilot",
    industry: "B2B SaaS",
    year: "2024",
    description:
      "An AI assistant grounded in a company's own documentation, with retrieval, citations and human review built in.",
    services: ["AI product design", "Engineering", "Cloud"],
    tech: ["TypeScript", "OpenAI", "PostgreSQL", "AWS"],
    image: work4,
    alt: "Abstract dark interface with panels and a network of connected nodes",
  },
];
