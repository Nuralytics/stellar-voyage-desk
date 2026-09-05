export interface TechCategory {
  label: string;
  items: string[];
}

export const technologies: TechCategory[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Python", "FastAPI", "GraphQL"] },
  { label: "Mobile", items: ["React Native", "Swift", "Kotlin"] },
  { label: "Cloud", items: ["AWS", "Google Cloud", "Docker", "Terraform"] },
  { label: "Database", items: ["PostgreSQL", "Redis", "Supabase"] },
  { label: "AI", items: ["OpenAI", "Vector search", "LangGraph"] },
];
