export const site = {
  name: "Northform",
  tagline: "Digital product studio",
  description:
    "Northform is a digital product studio. We design and engineer high-performance web apps, SaaS platforms, mobile products and AI workflows for ambitious teams.",
  email: "hello@example.com",
  phone: "+00 000 000 0000",
  location: "Remote-first — global delivery",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export const navLinks = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const stats = [
  { value: "10+", label: "Products delivered" },
  { value: "5+", label: "Industries served" },
  { value: "99%", label: "Client satisfaction*" },
  { value: "24/7", label: "Global delivery" },
] as const;
