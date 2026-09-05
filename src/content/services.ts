import {
  Boxes,
  PenTool,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Product Development",
    description:
      "Web applications, SaaS platforms, dashboards and internal business systems built to scale.",
    icon: Boxes,
    capabilities: ["SaaS platforms", "Dashboards", "Internal tools"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Research, user flows, wireframes, interfaces and durable design systems.",
    icon: PenTool,
    capabilities: ["Product research", "Design systems", "Prototyping"],
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "High-performance marketing websites and web platforms engineered for speed and search.",
    icon: Globe,
    capabilities: ["Marketing sites", "Headless CMS", "Core Web Vitals"],
  },
  {
    number: "04",
    title: "Mobile Development",
    description:
      "Modern, reliable mobile applications for iOS and Android with a shared product core.",
    icon: Smartphone,
    capabilities: ["iOS & Android", "Offline-first", "Release pipelines"],
  },
  {
    number: "05",
    title: "AI & Automation",
    description:
      "AI-powered workflows, intelligent product features and automation of manual operations.",
    icon: Sparkles,
    capabilities: ["LLM features", "RAG & search", "Workflow automation"],
  },
  {
    number: "06",
    title: "Cloud & Infrastructure",
    description:
      "Scalable architecture, deployment pipelines, monitoring and cost optimisation.",
    icon: Cloud,
    capabilities: ["CI/CD", "Observability", "Cost tuning"],
  },
];
