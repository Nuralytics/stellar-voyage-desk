export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

/** Placeholder testimonials — replace with approved client quotes before launch. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They behaved like an internal product team from week one — the questions they asked changed what we built.",
    name: "Client name",
    role: "Head of Product",
    company: "Placeholder Co.",
  },
  {
    quote:
      "The first release shipped on the date we agreed, and the codebase was clean enough for our own engineers to take over.",
    name: "Client name",
    role: "CTO",
    company: "Placeholder Labs",
  },
  {
    quote:
      "Design and engineering moved together, so nothing got lost between a mockup and production.",
    name: "Client name",
    role: "Founder",
    company: "Placeholder Studio",
  },
];
